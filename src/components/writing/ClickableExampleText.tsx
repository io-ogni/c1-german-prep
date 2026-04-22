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

export function ClickableExampleText({ text, promptId }: Props) {
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

  const addToVocabulary = async () => {
    if (!profile || !selectedWord) return;

    const sentence = getSentenceAtPosition(text, text.toLowerCase().indexOf(selectedWord.toLowerCase()));

    const { error } = await supabase.from('personal_vocabulary').insert({
      user_id: profile.user_id,
      word_de: selectedWord,
      translation_en: '',
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
      track('vocab_saved', { word_de: selectedWord, source_type: 'schreiben-beispiel', source_page: 'writing' });
      toast.success(t('word_added'));
      clearSelection();
    }
  };

  const paragraphs = text.split('\n\n');

  const popupContent = selectedWord ? (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground break-words">{selectedWord}</p>
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
        {t('add_to_vocabulary')}
      </Button>
    </>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-4 leading-relaxed text-foreground text-[15px]">
        {paragraphs.map((para, pIdx) => {
          const words = para.split(/(\s+)/);
          return (
            <p key={pIdx} className="text-justify">
              {words.map((word, wIdx) => {
                if (/^\s+$/.test(word)) return <span key={wIdx}>{word}</span>;
                const clean = stripPunctuation(word);
                if (!clean) return <span key={wIdx}>{word}</span>;

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
