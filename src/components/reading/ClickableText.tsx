import { useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Plus, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Props {
  content: string;
  textId: string;
  textType: string;
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

  // Position dropdown within viewport
  useEffect(() => {
    if (!dropdownOpen || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    // On mobile, anchor to left edge of screen with some padding
    if (vw < 640) {
      setDropdownStyle({ position: 'fixed', left: 8, right: 8, top: rect.bottom + 4 });
    } else {
      setDropdownStyle({});
    }
  }, [dropdownOpen]);

  // Close dropdown on click outside
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

  // Filled gap
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
          onClick={() => {
            if (!checked) onClear();
          }}
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
        {/* Show correct answer below if wrong */}
        {checked && isWrong && correctText && (
          <span className="block text-xs text-primary mt-0.5 ml-0.5">
            → {correctText}
          </span>
        )}
      </span>
    );
  }

  // Empty gap — clickable with dropdown
  return (
    <span ref={ref} className="inline-block relative align-bottom">
      <button
        className={cn(
          'inline-flex items-center gap-0.5 min-w-[4rem] px-2 py-0.5 mx-0.5 rounded border-2 border-dashed text-sm font-medium transition-colors',
          dropdownOpen
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-muted-foreground/40 text-muted-foreground hover:border-primary/60 hover:bg-primary/5'
        )}
        onClick={() => {
          if (!checked && options.length > 0) setDropdownOpen(!dropdownOpen);
        }}
        disabled={checked}
      >
        <span className="font-mono text-xs">{gapNum}</span>
        {!checked && options.length > 0 && <ChevronDown className="h-3 w-3 ml-0.5" />}
      </button>

      {/* Dropdown */}
      {dropdownOpen && !checked && (
        <span
          ref={dropdownRef}
          className={cn(
            'z-50 rounded-lg border bg-gray-100 dark:bg-gray-800 p-1 shadow-xl',
            dropdownStyle.position === 'fixed' ? 'fixed' : 'absolute left-0 top-full mt-1 w-[min(28rem,85vw)]'
          )}
          style={dropdownStyle.position === 'fixed' ? dropdownStyle : undefined}
        >
          {options.map(opt => (
            <button
              key={opt.id}
              className="w-full text-left rounded-md px-3 py-2 text-xs text-popover-foreground bg-white dark:bg-card hover:bg-accent transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(opt.id);
                setDropdownOpen(false);
              }}
            >
              <span className="line-clamp-2">{opt.text}</span>
            </button>
          ))}
          {options.length === 0 && (
            <span className="block px-3 py-2 text-xs text-muted-foreground italic">Keine Sätze verfügbar</span>
          )}
        </span>
      )}

      {/* Show correct answer if checked and was empty */}
      {checked && correctText && (
        <span className="block text-xs text-primary mt-0.5 ml-0.5">
          → {correctText}
        </span>
      )}
    </span>
  );
}

function VocabPopupContent({
  selectedTexts,
  combinedExpression,
  dictEntry,
  hasDictTranslation,
  needsTranslation,
  customTranslation,
  setCustomTranslation,
  canAdd,
  onAdd,
  onClose,
  addLabel,
}: {
  selectedTexts: string[];
  combinedExpression: string;
  dictEntry: { word_de: string; article: string | null; translation_en: string } | null | undefined;
  hasDictTranslation: boolean;
  needsTranslation: boolean;
  customTranslation: string;
  setCustomTranslation: (v: string) => void;
  canAdd: boolean;
  onAdd: () => void;
  onClose: () => void;
  addLabel: string;
}) {
  return (
    <>
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
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0" onClick={onClose}>
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
            className="h-8 text-sm"
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter' && canAdd) onAdd();
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
  gapAnswers,
  gapOptions,
  gapCorrect,
  checked,
  onGapSelect,
  onGapClear,
}: Props) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const [lookupCache, setLookupCache] = useState<Record<string, { word_de: string; article: string | null; translation_en: string } | null>>({});

  // Selection state for vocabulary lookup
  const [selectedWords, setSelectedWords] = useState<WordKey[]>([]);
  const [selectedTexts, setSelectedTexts] = useState<string[]>([]);
  const [customTranslation, setCustomTranslation] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const combinedExpression = selectedTexts.join(' ');
  const firstSelectedClean = selectedTexts.length === 1 ? stripPunctuation(selectedTexts[0]) : null;
  const dictEntry = firstSelectedClean ? lookupCache[firstSelectedClean.toLowerCase()] : null;
  const hasDictTranslation = !!dictEntry?.translation_en;

  const lookupWord = useCallback(async (cleanWord: string) => {
    const key = cleanWord.toLowerCase();
    if (lookupCache[key] !== undefined) return;

    const lw = key;
    const candidates = [lw];
    if (lw.endsWith('e')) candidates.push(lw + 'n');
    if (lw.endsWith('t')) candidates.push(lw.slice(0, -1) + 'en');
    if (lw.endsWith('st')) candidates.push(lw.slice(0, -2) + 'en');
    if (lw.endsWith('te')) candidates.push(lw.slice(0, -2) + 'en');
    if (lw.endsWith('et')) candidates.push(lw.slice(0, -2) + 'en');
    candidates.push(lw + 'en', lw + 'n');

    const unique = [...new Set(candidates)];

    const { data } = await supabase
      .from('dictionary')
      .select('word_de, article, translation_en')
      .in('word_de', unique.map(c => c.charAt(0).toUpperCase() + c.slice(1)).concat(unique))
      .limit(5);

    if (data && data.length > 0) {
      const exactMatch = data.find(d => d.word_de.toLowerCase() === lw);
      const verbMatch = data.find(d => !d.article);
      const best = exactMatch ?? verbMatch ?? data[0];
      setLookupCache(prev => ({ ...prev, [key]: best }));
    } else {
      setLookupCache(prev => ({ ...prev, [key]: null }));
    }
  }, [lookupCache]);

  const clearSelection = useCallback(() => {
    setSelectedWords([]);
    setSelectedTexts([]);
    setCustomTranslation('');
  }, []);

  useEffect(() => {
    if (selectedWords.length === 0) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [selectedWords.length, clearSelection]);

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
    const idx = selectedWords.indexOf(key);
    if (idx >= 0) {
      setSelectedWords(prev => prev.filter(k => k !== key));
      setSelectedTexts(prev => prev.filter((_, i) => i !== idx));
      setCustomTranslation('');
      return;
    }

    setSelectedWords(prev => [...prev, key]);
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

                  // Find the assigned option's text
                  let assignedText: string | null = null;
                  if (assignedId && gapOptions) {
                    const allOpts = Object.values(gapOptions).flat();
                    assignedText = allOpts.find(o => o.id === assignedId)?.text ?? null;
                  }

                  // Get available (unassigned) options for this gap
                  let availableOpts: { id: string; text: string }[] = [];
                  if (gapOptions?.[gapNum]) {
                    // Per-gap options (Format B)
                    availableOpts = gapOptions[gapNum].filter(o => !assignedOptionsSet.has(o.id) || o.id === assignedId);
                    // Exclude the currently assigned one from dropdown
                    availableOpts = availableOpts.filter(o => o.id !== assignedId);
                  } else if (gapOptions?.['_shared']) {
                    // Shared pool (Format A)
                    availableOpts = gapOptions['_shared'].filter(o => !assignedOptionsSet.has(o.id));
                  }

                  const isCorrect = !!checked && !!assignedId && gapCorrect?.[gapNum] === assignedId;
                  const isWrong = !!checked && !!assignedId && gapCorrect?.[gapNum] !== assignedId;
                  const isEmpty = !assignedId;
                  const isWrongEmpty = !!checked && isEmpty;

                  // Find correct answer text for display when wrong
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

                // Regular text — clickable words for dictionary lookup
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

      {/* Vocabulary popup — drawer on mobile, sticky card on desktop */}
      {hasSelection && (
        <>
          {/* Desktop: sticky card */}
          <div
            ref={popupRef}
            className="hidden sm:block sticky bottom-4 mt-4 mx-auto max-w-md rounded-xl border-2 border-primary/30 bg-card p-4 shadow-xl space-y-2"
          >
            <VocabPopupContent
              selectedTexts={selectedTexts}
              combinedExpression={combinedExpression}
              dictEntry={dictEntry}
              hasDictTranslation={hasDictTranslation}
              needsTranslation={needsTranslation}
              customTranslation={customTranslation}
              setCustomTranslation={setCustomTranslation}
              canAdd={canAdd}
              onAdd={addToVocabulary}
              onClose={clearSelection}
              addLabel={t('word_add_to_vocabulary')}
            />
          </div>

          {/* Mobile: bottom drawer */}
          <Drawer open={true} onOpenChange={(open) => { if (!open) clearSelection(); }}>
            <DrawerContent className="sm:hidden">
              <DrawerTitle className="sr-only">Wort hinzufügen</DrawerTitle>
              <div className="p-4 pb-8 space-y-2">
                <VocabPopupContent
                  selectedTexts={selectedTexts}
                  combinedExpression={combinedExpression}
                  dictEntry={dictEntry}
                  hasDictTranslation={hasDictTranslation}
                  needsTranslation={needsTranslation}
                  customTranslation={customTranslation}
                  setCustomTranslation={setCustomTranslation}
                  canAdd={canAdd}
                  onAdd={addToVocabulary}
                  onClose={clearSelection}
                  addLabel={t('word_add_to_vocabulary')}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </div>
  );
}
