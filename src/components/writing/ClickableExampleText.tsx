import { useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { markHintInteraction } from '@/components/shared/SelectionHint';
import { track } from '@/lib/posthog';

interface Props {
  text: string;
  promptId: string;
  wordAnnotations?: Record<string, { de: string; en: string }>;
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

type WordKey = `${number}-${number}`;

// Words that shouldn't be clickable — basic function words a learner doesn't need to save
const SKIP_WORDS = new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einem', 'einen', 'einer', 'eines',
  'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'mich', 'mir', 'dich', 'dir', 'ihm', 'ihn',
  'uns', 'euch', 'sich', 'man', 'dies', 'diese', 'dieser', 'diesem', 'diesen', 'dieses',
  'jeder', 'jede', 'jedem', 'jeden', 'jedes', 'alle', 'allem', 'allen', 'aller', 'alles',
  'ist', 'sind', 'war', 'hat', 'haben', 'wird', 'werden', 'kann', 'muss', 'soll', 'will',
  'und', 'oder', 'aber', 'dass', 'wenn', 'weil', 'ob', 'als', 'wie', 'so', 'da',
  'in', 'auf', 'an', 'von', 'mit', 'zu', 'für', 'bei', 'nach', 'aus', 'um', 'über', 'unter',
  'vor', 'zwischen', 'durch', 'gegen', 'ohne', 'bis', 'seit', 'während', 'zum', 'zur', 'im', 'am',
  'nicht', 'kein', 'keine', 'keinem', 'keinen', 'keiner',
  'auch', 'noch', 'schon', 'nur', 'ja', 'doch', 'sehr', 'mehr', 'dann', 'hier', 'dort',
]);

function findAnnotation(
  word: string,
  annotations?: Record<string, { de: string; en: string }>
): { de: string; en: string } | null {
  if (!annotations) return null;
  const lower = word.toLowerCase();
  // Direct match
  if (annotations[lower]) return annotations[lower];
  // Try without trailing 's' (genitive), 'n', 'en', 'er', 'es', 'em'
  for (const suffix of ['s', 'es', 'en', 'n', 'er', 'em', 'e']) {
    if (lower.length > suffix.length + 2) {
      const stem = lower.slice(0, -suffix.length);
      if (annotations[stem]) return annotations[stem];
    }
  }
  // Try last part of hyphenated compound (e.g., "Social-Media-Verbots" → "verbots" → "verbot")
  if (lower.includes('-')) {
    const lastPart = lower.split('-').pop()!;
    if (annotations[lastPart]) return annotations[lastPart];
    for (const suffix of ['s', 'es', 'en', 'n', 'er', 'em', 'e']) {
      if (lastPart.length > suffix.length + 2) {
        const stem = lastPart.slice(0, -suffix.length);
        if (annotations[stem]) return annotations[stem];
      }
    }
  }
  return null;
}

export function ClickableExampleText({ text, promptId, wordAnnotations }: Props) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const isMobile = useIsMobile();

  const [selectedKey, setSelectedKey] = useState<WordKey | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearSelection = useCallback(() => {
    setSelectedKey(null);
    setSelectedWord(null);
    setPopupPos(null);
  }, []);

  useEffect(() => {
    if (!selectedKey) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') clearSelection(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [selectedKey, clearSelection]);

  useEffect(() => {
    if (!selectedKey) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target) || popupRef.current?.contains(target)) return;
      // Don't close if clicking inside a Drawer (portal)
      if ((target as HTMLElement).closest?.('[data-vaul-drawer]')) return;
      clearSelection();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [selectedKey, clearSelection]);

  const handleWordClick = (key: WordKey, cleanWord: string, e: React.MouseEvent) => {
    if (selectedKey === key) { clearSelection(); return; }

    if (containerRef.current) {
      const wordRect = (e.target as HTMLElement).getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setPopupPos({
        top: wordRect.bottom - containerRect.top + 8,
        left: Math.min(
          Math.max(wordRect.left - containerRect.left, 0),
          containerRect.width - 280
        ),
      });
    }

    setSelectedKey(key);
    setSelectedWord(cleanWord);
  };

  const annotation = selectedWord ? findAnnotation(selectedWord, wordAnnotations) : null;

  const addToVocabulary = async () => {
    if (!profile || !selectedWord) return;

    const sentence = getSentenceAtPosition(text, text.toLowerCase().indexOf(selectedWord.toLowerCase()));
    const wordDe = annotation?.de || selectedWord;
    const translationEn = annotation?.en || '';

    const { error } = await supabase.from('personal_vocabulary').insert({
      user_id: profile.user_id,
      word_de: wordDe,
      translation_en: translationEn,
      source_type: 'schreiben-beispiel',
      source_id: promptId,
      example_sentence: sentence,
      box_number: 1,
      next_review_at: new Date().toISOString(),
    });
    if (error && error.code !== '23505') {
      toast.error(error.message);
    } else {
      markHintInteraction('writing-beispiele');
      track('vocab_saved', { word_de: wordDe, source_type: 'schreiben-beispiel', source_page: 'writing' });
      toast.success(t('word_added'));
      clearSelection();
    }
  };

  const paragraphs = text.split('\n\n');

  const popupContent = selectedWord ? (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground break-words">
            {annotation?.de || selectedWord}
          </p>
          {annotation?.en && (
            <p className="text-xs text-muted-foreground mt-1">{annotation.en}</p>
          )}
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0" onClick={clearSelection}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-1 text-xs h-7"
        onClick={addToVocabulary}
      >
        <Plus className="h-3 w-3" />
        {t('word_add_to_vocabulary')}
      </Button>
    </>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-5 leading-[1.8] text-foreground text-base sm:text-lg">
        {paragraphs.map((para, pIdx) => {
          const words = para.split(/(\s+)/);
          return (
            <p key={pIdx} className="text-justify">
              {words.map((word, wIdx) => {
                if (/^\s+$/.test(word)) return <span key={wIdx}>{word}</span>;
                const clean = stripPunctuation(word);
                if (!clean) return <span key={wIdx}>{word}</span>;

                const hasAnnotation = !!findAnnotation(clean, wordAnnotations);
                if (!hasAnnotation) return <span key={wIdx}>{word}</span>;

                const key: WordKey = `${pIdx}-${wIdx}`;
                const selected = selectedKey === key;

                return (
                  <span
                    key={wIdx}
                    className={cn(
                      'rounded px-0.5 transition-colors cursor-pointer',
                      selected
                        ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                    onClick={(e) => { e.stopPropagation(); handleWordClick(key, clean, e); }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>

      {/* Desktop popup */}
      {selectedKey && popupPos && !isMobile && popupContent && (
        <div
          ref={popupRef}
          className="absolute z-50 w-64 rounded-lg border border-border bg-popover shadow-lg p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150"
          style={{ top: popupPos.top, left: popupPos.left }}
        >
          {popupContent}
        </div>
      )}

      {/* Mobile drawer */}
      <Drawer open={!!selectedKey && isMobile} onOpenChange={(open) => { if (!open) clearSelection(); }}>
        <DrawerContent className="px-4 pb-6 pt-4">
          <DrawerTitle className="sr-only">Wort</DrawerTitle>
          <div className="space-y-3">
            {popupContent}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
