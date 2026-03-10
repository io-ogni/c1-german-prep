import { useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Props {
  content: string;
  textId: string;
  textType: string;
  gapAnswers?: Record<string, string>;
  onGapClick?: (gapNumber: string) => void;
}

function stripPunctuation(word: string): string {
  return word.replace(/^[^\wäöüÄÖÜß]+|[^\wäöüÄÖÜß]+$/g, '');
}

function getSentenceAtPosition(text: string, charPos: number): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  let offset = 0;
  for (const sentence of sentences) {
    offset += sentence.length + 1;
    if (offset >= charPos) return sentence.trim();
  }
  return sentences[0] || '';
}

type WordKey = `${number}-${number}-${number}`;

export function ClickableText({ content, textId, textType, gapAnswers, onGapClick }: Props) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const [lookupCache, setLookupCache] = useState<Record<string, { word_de: string; article: string | null; translation_en: string } | null>>({});

  // Selection state: ordered list of selected word keys
  const [selectedWords, setSelectedWords] = useState<WordKey[]>([]);
  const [selectedTexts, setSelectedTexts] = useState<string[]>([]);
  const [customTranslation, setCustomTranslation] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // The combined expression from selected words
  const combinedExpression = selectedTexts.join(' ');
  const firstSelectedClean = selectedTexts.length === 1 ? stripPunctuation(selectedTexts[0]) : null;
  const dictEntry = firstSelectedClean ? lookupCache[firstSelectedClean.toLowerCase()] : null;
  const hasDictTranslation = !!dictEntry?.translation_en;

  const lookupWord = useCallback(async (cleanWord: string) => {
    if (lookupCache[cleanWord.toLowerCase()] !== undefined) return;
    const { data } = await supabase
      .from('dictionary')
      .select('word_de, article, translation_en')
      .ilike('word_de', cleanWord)
      .limit(1)
      .single();
    setLookupCache(prev => ({ ...prev, [cleanWord.toLowerCase()]: data }));
  }, [lookupCache]);

  const clearSelection = useCallback(() => {
    setSelectedWords([]);
    setSelectedTexts([]);
    setCustomTranslation('');
  }, []);

  // ESC to dismiss
  useEffect(() => {
    if (selectedWords.length === 0) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [selectedWords.length, clearSelection]);

  // Click outside to dismiss
  useEffect(() => {
    if (selectedWords.length === 0) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) return;
      clearSelection();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [selectedWords.length, clearSelection]);

  const handleWordClick = (key: WordKey, cleanWord: string) => {
    // Toggle: if already selected, remove it
    const idx = selectedWords.indexOf(key);
    if (idx >= 0) {
      setSelectedWords(prev => prev.filter(k => k !== key));
      setSelectedTexts(prev => prev.filter((_, i) => i !== idx));
      setCustomTranslation('');
      return;
    }

    // Add to selection
    setSelectedWords(prev => [...prev, key]);
    setSelectedTexts(prev => [...prev, cleanWord]);
    setCustomTranslation('');

    // Lookup single words in dictionary
    lookupWord(cleanWord);
  };

  const addToVocabulary = async () => {
    if (!profile) return;
    const expression = combinedExpression;
    if (!expression) return;

    // For single words with dict entry, use dict translation; otherwise require custom
    const translation = hasDictTranslation ? dictEntry!.translation_en : customTranslation;
    if (!translation) return;

    const wordDisplay = (hasDictTranslation && dictEntry?.article)
      ? `${dictEntry.article} ${dictEntry.word_de}`
      : expression;

    // Approximate sentence from first selected word position
    const sentence = getSentenceAtPosition(content, content.indexOf(stripPunctuation(selectedTexts[0])));

    const { error } = await supabase.from('personal_vocabulary').insert({
      user_id: profile.user_id,
      word_de: wordDisplay,
      translation_en: translation,
      source_type: 'reading',
      source_id: textId,
      example_sentence: sentence,
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

  const isSelected = (key: WordKey) => selectedWords.includes(key);
  const hasSelection = selectedWords.length > 0;
  const needsTranslation = selectedTexts.length > 1 || !hasDictTranslation;
  const canAdd = hasSelection && (hasDictTranslation || customTranslation.trim().length > 0);

  // Split content into paragraphs, then words, preserving gaps
  const paragraphs = content.split('\n\n');

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-4 leading-relaxed text-foreground">
        {paragraphs.map((para, pIdx) => {
          const parts = para.split(/(\[___\d+___\])/g);

          return (
            <p key={pIdx}>
              {parts.map((part, partIdx) => {
                const gapMatch = part.match(/\[___(\d+)___\]/);
                if (gapMatch) {
                  const gapNum = gapMatch[1];
                  const assigned = gapAnswers?.[gapNum];
                  return (
                    <span
                      key={partIdx}
                      className={`inline-block min-w-[3rem] mx-1 px-2 py-0.5 rounded border-2 border-dashed text-sm font-medium cursor-pointer transition-colors ${
                        assigned
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted-foreground/30 text-muted-foreground'
                      }`}
                      onClick={() => onGapClick?.(gapNum)}
                    >
                      {assigned ? `[${assigned}]` : `___${gapNum}___`}
                    </span>
                  );
                }

                const words = part.split(/(\s+)/);
                return (
                  <Fragment key={partIdx}>
                    {words.map((word, wIdx) => {
                      if (/^\s+$/.test(word)) return <span key={wIdx}>{word}</span>;
                      const clean = stripPunctuation(word);
                      if (!clean) return <span key={wIdx}>{word}</span>;

                      const key: WordKey = `${pIdx}-${partIdx}-${wIdx}`;
                      const selected = isSelected(key);

                      return (
                        <span
                          key={wIdx}
                          className={cn(
                            'cursor-pointer rounded px-0.5 transition-colors',
                            selected
                              ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWordClick(key, clean);
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </Fragment>
                );
              })}
            </p>
          );
        })}
      </div>

      {/* Floating translation popup */}
      {hasSelection && (
        <div
          ref={popupRef}
          className="sticky bottom-4 mt-4 mx-auto max-w-md rounded-xl border-2 border-primary/30 bg-primary/5 p-4 shadow-xl shadow-primary/10 space-y-2 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
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

          {/* Show dict translation if available for single word */}
          {hasDictTranslation && (
            <p className="text-xs text-muted-foreground">EN: {dictEntry!.translation_en}</p>
          )}

          {/* Translation input — required when no dict entry or multi-word */}
          {needsTranslation && (
            <div className="space-y-1">
              <Input
                value={customTranslation}
                onChange={e => setCustomTranslation(e.target.value)}
                placeholder="Übersetzung eingeben..."
                className="h-8 text-sm"
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter' && canAdd) addToVocabulary();
                }}
              />
              {!customTranslation.trim() && (
                <p className="text-xs text-muted-foreground">
                  Übersetzung erforderlich
                </p>
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
}
