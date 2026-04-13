import { useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Plus, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { markHintInteraction } from '@/components/shared/SelectionHint';
import { track } from '@/lib/posthog';

interface Props {
  content: string;
  textId: string;
  textType: string;
  wordAnnotations?: Record<string, { de: string; en: string }>;
  gapAnswers?: Record<string, string>;
  gapOptions?: Record<string, { id: string; text: string }[]>;
  gapCorrect?: Record<string, string>;
  checked?: boolean;
  onGapSelect?: (gapNumber: string, optionId: string) => void;
  onGapClear?: (gapNumber: string) => void;
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

function InlineGap({
  gapNum,
  assignedText,
  assignedId,
  options,
  checked,
  isCorrect,
  isWrong,
  correctText,
  onSelect,
  onClear,
}: {
  gapNum: string;
  assignedText: string | null;
  assignedId: string | null;
  options: { id: string; text: string }[];
  checked: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  correctText: string | null;
  onSelect: (optionId: string) => void;
  onClear: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!dropdownOpen || !ref.current) return;
    const vw = window.innerWidth;
    if (vw < 640) {
      // Mobile: bottom sheet, compact
      setDropdownStyle({ position: 'fixed', left: 8, right: 8, bottom: 8, maxHeight: '40vh' });
    } else {
      // Desktop: simple absolute dropdown below the gap — like the original Lovable implementation
      setDropdownStyle({});
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  if (assignedText) {
    return (
      <span ref={ref} className="inline relative">
        <span
          className={cn(
            'inline rounded px-1.5 py-0.5 mx-0.5 font-medium cursor-pointer transition-colors',
            checked && isCorrect && 'bg-primary/15 text-primary',
            checked && isWrong && 'bg-destructive/15 text-destructive line-through',
            !checked && 'bg-primary/15 text-primary hover:bg-primary/25'
          )}
          onClick={() => { if (!checked) onClear(); }}
        >
          {assignedText}
          {!checked && (
            <button
              className="ml-1 text-primary/60 hover:text-destructive inline align-middle text-xs"
              onClick={(e) => { e.stopPropagation(); onClear(); }}
            >
              <X className="h-3 w-3 inline" />
            </button>
          )}
        </span>
        {checked && isWrong && correctText && (
          <span className="block text-xs text-primary mt-0.5 ml-0.5">→ {correctText}</span>
        )}
      </span>
    );
  }

  return (
    <span ref={ref} className="inline-block relative align-bottom">
      <button
        className={cn(
          'inline-flex items-center gap-0.5 min-w-[4rem] px-2 py-0.5 mx-0.5 rounded border-2 border-dashed text-sm font-medium transition-colors',
          dropdownOpen
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-muted-foreground/40 text-muted-foreground hover:border-primary/60 hover:bg-primary/5'
        )}
        onClick={() => { if (!checked && options.length > 0) setDropdownOpen(!dropdownOpen); }}
        disabled={checked}
      >
        <span className="font-mono text-xs">{gapNum}</span>
        {!checked && options.length > 0 && <ChevronDown className="h-3 w-3 ml-0.5" />}
      </button>

      {dropdownOpen && !checked && (
        <span
          ref={dropdownRef}
          className={cn(
            'z-50 rounded-lg bg-blue-100 dark:bg-blue-900 p-1 space-y-0.5 shadow-2xl scrollbar-visible overflow-y-auto overflow-x-hidden',
            dropdownStyle.position === 'fixed' ? 'fixed' : 'absolute left-0 top-full mt-1 w-[min(28rem,85vw)] max-h-[320px]'
          )}
          style={dropdownStyle.position === 'fixed' ? dropdownStyle : undefined}
        >
          {options.map(opt => (
            <button
              key={opt.id}
              className="w-full text-left rounded-md px-3 py-1.5 text-sm text-popover-foreground bg-white dark:bg-card hover:bg-accent transition-colors break-words"
              onClick={(e) => { e.stopPropagation(); onSelect(opt.id); setDropdownOpen(false); }}
            >
              <span className="line-clamp-3">{opt.text}</span>
            </button>
          ))}
          {options.length === 0 && (
            <span className="block px-3 py-2 text-xs text-muted-foreground italic">Keine Sätze verfügbar</span>
          )}
        </span>
      )}

      {checked && correctText && (
        <span className="block text-xs text-primary mt-0.5 ml-0.5">→ {correctText}</span>
      )}
    </span>
  );
}

function VocabPopupContent({
  word,
  annotation,
  canAdd,
  onAdd,
  onClose,
  addLabel,
}: {
  word: string;
  annotation: { de: string; en: string };
  canAdd: boolean;
  onAdd: () => void;
  onClose: () => void;
  addLabel: string;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground break-words">{annotation.de}</p>
          <p className="text-xs text-muted-foreground mt-1">{annotation.en}</p>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0" onClick={onClose}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full gap-1 text-xs h-7"
        disabled={!canAdd}
        onClick={onAdd}
      >
        <Plus className="h-3 w-3" />
        {addLabel}
      </Button>
    </>
  );
}

export function ClickableText({
  content,
  textId,
  textType,
  wordAnnotations,
  gapAnswers,
  gapOptions,
  gapCorrect,
  checked,
  onGapSelect,
  onGapClear,
}: Props) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const isMobile = useIsMobile();

  const [selectedKey, setSelectedKey] = useState<WordKey | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const annotation = selectedWord ? wordAnnotations?.[selectedWord.toLowerCase()] ?? null : null;

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

  const handleWordClick = (key: WordKey, cleanWord: string, e?: React.MouseEvent) => {
    if (selectedKey === key) {
      clearSelection();
      return;
    }

    if (e && containerRef.current) {
      const wordRect = (e.target as HTMLElement).getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setPopupPos({
        top: wordRect.bottom - containerRect.top + 8,
        left: Math.min(
          Math.max(wordRect.left - containerRect.left, 0),
          containerRect.width - 320
        ),
      });
    }

    setSelectedKey(key);
    setSelectedWord(cleanWord);
  };

  const addToVocabulary = async () => {
    if (!profile || !selectedWord || !annotation) return;

    const sentence = getSentenceAtPosition(content, content.toLowerCase().indexOf(selectedWord.toLowerCase()));

    const { error } = await supabase.from('personal_vocabulary').insert({
      user_id: profile.user_id,
      word_de: annotation.de,
      translation_en: annotation.en,
      source_type: 'reading',
      source_id: textId,
      example_sentence: sentence,
      box_number: 1,
      next_review_at: new Date().toISOString(),
    });
    if (error) {
      toast.error(error.message);
    } else {
      markHintInteraction('reading');
      track('vocab_saved', { word_de: annotation.de, source_type: 'reading', source_page: 'reading' });
      toast.success(t('word_added'));
      clearSelection();
    }
  };

  const hasAnnotations = !!wordAnnotations && Object.keys(wordAnnotations).length > 0;
  const hasSelection = !!selectedKey;
  const isTextrekonstruktion = textType === 'textrekonstruktion';
  const assignedOptionsSet = new Set(Object.values(gapAnswers ?? {}));

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
                if (gapMatch && isTextrekonstruktion) {
                  const gapNum = gapMatch[1];
                  const assignedId = gapAnswers?.[gapNum] ?? null;

                  let assignedText: string | null = null;
                  if (assignedId && gapOptions) {
                    const allOpts = Object.values(gapOptions).flat();
                    assignedText = allOpts.find(o => o.id === assignedId)?.text ?? null;
                  }

                  let availableOpts: { id: string; text: string }[] = [];
                  if (gapOptions?.[gapNum]) {
                    availableOpts = gapOptions[gapNum].filter(o => !assignedOptionsSet.has(o.id) || o.id === assignedId);
                    availableOpts = availableOpts.filter(o => o.id !== assignedId);
                  } else if (gapOptions?.['_shared']) {
                    availableOpts = gapOptions['_shared'].filter(o => !assignedOptionsSet.has(o.id));
                  }

                  const isCorrect = !!checked && !!assignedId && gapCorrect?.[gapNum] === assignedId;
                  const isWrong = !!checked && !!assignedId && gapCorrect?.[gapNum] !== assignedId;
                  const isEmpty = !assignedId;
                  const isWrongEmpty = !!checked && isEmpty;

                  let correctText: string | null = null;
                  if ((isWrong || isWrongEmpty) && gapCorrect?.[gapNum] && gapOptions) {
                    const allOpts = Object.values(gapOptions).flat();
                    correctText = allOpts.find(o => o.id === gapCorrect[gapNum])?.text ?? null;
                  }

                  return (
                    <InlineGap
                      key={partIdx}
                      gapNum={gapNum}
                      assignedText={assignedText}
                      assignedId={assignedId}
                      options={availableOpts}
                      checked={!!checked}
                      isCorrect={isCorrect}
                      isWrong={isWrong}
                      correctText={correctText}
                      onSelect={(optId) => onGapSelect?.(gapNum, optId)}
                      onClear={() => onGapClear?.(gapNum)}
                    />
                  );
                }

                // Regular text — clickable words for annotation lookup
                const words = part.split(/(\s+)/);
                return (
                  <Fragment key={partIdx}>
                    {words.map((word, wIdx) => {
                      if (/^\s+$/.test(word)) return <span key={wIdx}>{word}</span>;
                      const clean = stripPunctuation(word);
                      if (!clean) return <span key={wIdx}>{word}</span>;

                      const key: WordKey = `${pIdx}-${partIdx}-${wIdx}`;
                      const selected = selectedKey === key;
                      const hasAnnotation = hasAnnotations && !!wordAnnotations[clean.toLowerCase()];

                      return (
                        <span
                          key={wIdx}
                          className={cn(
                            'rounded px-0.5 transition-colors',
                            hasAnnotations && 'cursor-pointer',
                            selected
                              ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                              : hasAnnotation
                                ? 'hover:bg-accent hover:text-accent-foreground'
                                : hasAnnotations
                                  ? 'hover:bg-muted/50'
                                  : ''
                          )}
                          onClick={hasAnnotations ? (e) => {
                            e.stopPropagation();
                            handleWordClick(key, clean, e);
                          } : undefined}
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

      {/* Vocabulary popup — drawer on mobile, positioned card on desktop */}
      {hasSelection && annotation && isMobile && (
        <Drawer open={true} onOpenChange={(open) => { if (!open) clearSelection(); }}>
          <DrawerContent>
            <DrawerTitle className="sr-only">Wort hinzufügen</DrawerTitle>
            <div className="p-4 pb-8 space-y-2">
              <VocabPopupContent
                word={selectedWord!}
                annotation={annotation}
                canAdd={true}
                onAdd={addToVocabulary}
                onClose={clearSelection}
                addLabel={t('word_add_to_vocabulary')}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
      {hasSelection && annotation && !isMobile && popupPos && (
        <div
          ref={popupRef}
          className="absolute z-30 w-80 rounded-xl border-2 border-primary/30 bg-card p-4 shadow-xl space-y-2"
          style={{ top: popupPos.top, left: popupPos.left }}
        >
          <VocabPopupContent
            word={selectedWord!}
            annotation={annotation}
            canAdd={true}
            onAdd={addToVocabulary}
            onClose={clearSelection}
            addLabel={t('word_add_to_vocabulary')}
          />
        </div>
      )}
      {/* No annotation available — show the raw word */}
      {hasSelection && !annotation && isMobile && (
        <Drawer open={true} onOpenChange={(open) => { if (!open) clearSelection(); }}>
          <DrawerContent>
            <DrawerTitle className="sr-only">Wort</DrawerTitle>
            <div className="p-4 pb-8 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm text-foreground">{selectedWord}</p>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0" onClick={clearSelection}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Keine Übersetzung verfügbar</p>
            </div>
          </DrawerContent>
        </Drawer>
      )}
      {hasSelection && !annotation && !isMobile && popupPos && (
        <div
          ref={popupRef}
          className="absolute z-30 w-80 rounded-xl border-2 border-primary/30 bg-card p-4 shadow-xl space-y-2"
          style={{ top: popupPos.top, left: popupPos.left }}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-sm text-foreground">{selectedWord}</p>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0" onClick={clearSelection}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Keine Übersetzung verfügbar</p>
        </div>
      )}
    </div>
  );
}
