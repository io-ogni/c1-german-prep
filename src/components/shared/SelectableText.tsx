import { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Props {
  /** The text to render as clickable words */
  text: string;
  /** Optional source info for vocabulary entries */
  sourceType?: string;
  sourceId?: string;
  /** Extra class on the text container */
  className?: string;
}

function stripPunctuation(word: string): string {
  return word.replace(/^[^\wäöüÄÖÜß]+|[^\wäöüÄÖÜß]+$/g, '');
}

const GAP_HTML = '<span class="inline-block border-b-2 border-primary px-2 mx-1 min-w-[4rem]">&nbsp;</span>';

type DictEntry = { word_de: string; article: string | null; translation_en: string } | null;

export function SelectableText({ text, sourceType = 'grammar', sourceId, className }: Props) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const [lookupCache, setLookupCache] = useState<Record<string, DictEntry>>({});
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedTexts, setSelectedTexts] = useState<string[]>([]);
  const [customTranslation, setCustomTranslation] = useState('');
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear selection when text changes (new exercise)
  const prevText = useRef(text);
  useEffect(() => {
    if (prevText.current !== text) {
      prevText.current = text;
      setSelectedKeys([]);
      setSelectedTexts([]);
      setCustomTranslation('');
    }
  }, [text]);

  const combinedExpression = selectedTexts.join(' ');
  const firstClean = selectedTexts.length === 1 ? stripPunctuation(selectedTexts[0]) : null;
  const dictEntry = firstClean ? lookupCache[firstClean.toLowerCase()] : null;
  const hasDictTranslation = !!dictEntry?.translation_en;
  const hasSelection = selectedKeys.length > 0;
  const needsTranslation = selectedTexts.length > 1 || !hasDictTranslation;
  const canAdd = hasSelection && (hasDictTranslation || customTranslation.trim().length > 0);

  const lookupWord = useCallback(async (cleanWord: string) => {
    const key = cleanWord.toLowerCase();
    if (lookupCache[key] !== undefined) return;

    // Build candidate forms: exact word + common infinitive derivations
    const lw = cleanWord.toLowerCase();
    const candidates = [lw];
    if (lw.endsWith('e')) candidates.push(lw + 'n');             // stelle → stellen
    if (lw.endsWith('t')) candidates.push(lw.slice(0, -1) + 'en'); // stellt → stellen
    if (lw.endsWith('st')) candidates.push(lw.slice(0, -2) + 'en'); // stellst → stellen
    if (lw.endsWith('te')) candidates.push(lw.slice(0, -2) + 'en'); // stellte → stellen
    if (lw.endsWith('et')) candidates.push(lw.slice(0, -2) + 'en'); // arbeitet → arbeiten
    candidates.push(lw + 'en', lw + 'n');

    const unique = [...new Set(candidates)];

    const { data } = await supabase
      .from('dictionary')
      .select('word_de, article, translation_en')
      .in('word_de', unique.map(c => c.charAt(0).toUpperCase() + c.slice(1)) // Try capitalized
        .concat(unique)) // and lowercase
      .limit(5);

    if (data && data.length > 0) {
      // Prefer exact match, then verb (no article) over noun
      const exactMatch = data.find(d => d.word_de.toLowerCase() === lw);
      const verbMatch = data.find(d => !d.article);
      const best = exactMatch ?? verbMatch ?? data[0];
      setLookupCache(prev => ({ ...prev, [key]: best }));
    } else {
      setLookupCache(prev => ({ ...prev, [key]: null }));
    }
  }, [lookupCache]);

  const clearSelection = useCallback(() => {
    setSelectedKeys([]);
    setSelectedTexts([]);
    setCustomTranslation('');
  }, []);

  // ESC to dismiss
  useEffect(() => {
    if (!hasSelection) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [hasSelection, clearSelection]);

  // Click outside to dismiss
  useEffect(() => {
    if (!hasSelection) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target) || popupRef.current?.contains(target)) return;
      clearSelection();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [hasSelection, clearSelection]);

  const handleWordClick = (wordKey: string, cleanWord: string, e: React.MouseEvent) => {
    const idx = selectedKeys.indexOf(wordKey);
    if (idx >= 0) {
      setSelectedKeys(prev => prev.filter(k => k !== wordKey));
      setSelectedTexts(prev => prev.filter((_, i) => i !== idx));
      setCustomTranslation('');
      return;
    }
    // Position popup near the clicked word
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopupPos({ top: rect.bottom + 8, left: rect.left });
    setSelectedKeys(prev => [...prev, wordKey]);
    setSelectedTexts(prev => [...prev, cleanWord]);
    setCustomTranslation('');
    lookupWord(cleanWord);
  };

  const addToVocabulary = async () => {
    if (!profile) return;
    const expression = combinedExpression;
    if (!expression) return;
    const translation = hasDictTranslation ? dictEntry!.translation_en : customTranslation;
    if (!translation) return;

    const wordDisplay = (hasDictTranslation && dictEntry?.article)
      ? `${dictEntry.article} ${dictEntry.word_de}`
      : expression;

    const { error } = await supabase.from('personal_vocabulary').insert({
      user_id: profile.user_id,
      word_de: wordDisplay,
      translation_en: translation,
      source_type: sourceType,
      source_id: sourceId ?? null,
      example_sentence: text.length <= 200 ? text : null,
      box_number: 1,
      next_review_at: new Date().toISOString(),
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t('word_added'));
      clearSelection();
    }
  };

  // Render text as clickable words, with ___ rendered as gap spans
  const renderWords = () => {
    // Split on ___ to handle gaps
    const segments = text.split(/(___)/);
    let wordCounter = 0;

    return segments.map((segment, segIdx) => {
      if (segment === '___') {
        return <span key={`gap-${segIdx}`} dangerouslySetInnerHTML={{ __html: GAP_HTML }} />;
      }

      const words = segment.split(/(\s+)/);
      return (
        <Fragment key={`seg-${segIdx}`}>
          {words.map((word, wIdx) => {
            if (/^\s+$/.test(word)) return <Fragment key={wIdx}>{word}</Fragment>;
            const clean = stripPunctuation(word);
            if (!clean) return <Fragment key={wIdx}>{word}</Fragment>;

            const wordKey = `w-${wordCounter++}`;
            const selected = selectedKeys.includes(wordKey);

            return (
              <span
                key={wIdx}
                className={cn(
                  'cursor-pointer rounded px-0.5 transition-colors',
                  selected
                    ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleWordClick(wordKey, clean, ev);
                }}
              >
                {word}
              </span>
            );
          })}
        </Fragment>
      );
    });
  };

  // --- TEMPORARILY DISABLED: click-to-add-to-Wortschatz ---
  // Render text with gap support but no interactive word selection.
  // The full interactive version (word clicking, popup, addToVocabulary)
  // is preserved above and can be re-enabled by uncommenting the return below.

  const renderPlainWords = () => {
    const segments = text.split(/(___)/);
    return segments.map((segment, segIdx) => {
      if (segment === '___') {
        return <span key={`gap-${segIdx}`} dangerouslySetInnerHTML={{ __html: GAP_HTML }} />;
      }
      return <Fragment key={`seg-${segIdx}`}>{segment}</Fragment>;
    });
  };

  return (
    <div className="relative">
      <p className={cn('text-base text-foreground leading-relaxed', className)}>{renderPlainWords()}</p>
    </div>
  );

  /* --- RE-ENABLE: replace the return above with this one ---
  return (
    <div ref={containerRef} className="relative">
      <p className={cn('text-base text-foreground leading-relaxed', className)}>{renderWords()}</p>

      {hasSelection && popupPos && (
        <div
          ref={popupRef}
          style={{ top: popupPos.top, left: Math.min(popupPos.left, window.innerWidth - 320) }}
          className="fixed w-72 max-w-[calc(100vw-2rem)] rounded-xl border-2 border-primary/30 bg-background p-3 shadow-xl shadow-primary/10 space-y-2 z-50"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                {selectedTexts.length > 1 ? 'Ausdruck' : 'Wort'}
              </p>
              <p className="font-semibold text-sm text-foreground break-words">
                {hasDictTranslation && dictEntry?.article
                  ? `${dictEntry.article} ${dictEntry.word_de}`
                  : combinedExpression}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0" onClick={clearSelection}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          {hasDictTranslation && (
            <p className="text-xs text-muted-foreground">EN: {dictEntry!.translation_en}</p>
          )}

          {needsTranslation && (
            <div className="space-y-1">
              <Input
                value={customTranslation}
                onChange={e => setCustomTranslation(e.target.value)}
                placeholder="Übersetzung eingeben..."
                className="h-7 text-xs"
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter' && canAdd) {
                    e.stopPropagation();
                    addToVocabulary();
                  }
                }}
              />
              {!customTranslation.trim() && (
                <p className="text-[10px] text-muted-foreground">Übersetzung erforderlich</p>
              )}
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1 text-xs h-7"
            disabled={!canAdd}
            onClick={addToVocabulary}
          >
            <Plus className="h-3 w-3" />
            {t('word_add_to_vocabulary')}
          </Button>
        </div>
      )}
    </div>
  );
  --- END RE-ENABLE --- */
}
