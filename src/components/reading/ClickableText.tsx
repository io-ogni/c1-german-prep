import { useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  content: string;
  textId: string;
  textType: string;
  gapAnswers?: Record<string, string>;
  gapOptions?: { id: string; text: string }[];
  checked?: boolean;
  correctMap?: Record<string, string>;
  onGapClick?: (gapNumber: string) => void;
  onSelectOption?: (gapNum: string, optionId: string) => void;
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

function InlineDropGap({
  gapNum,
  assignedText,
  checked,
  isCorrect,
  isWrong,
  onRemove,
}: {
  gapNum: string;
  assignedText: string | null;
  checked: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  onRemove: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `gap-${gapNum}` });

  if (assignedText) {
    return (
      <span
        ref={setNodeRef}
        className={cn(
          'inline rounded px-1.5 py-0.5 mx-0.5 font-medium text-sm cursor-pointer transition-colors',
          isCorrect && 'bg-primary/15 text-primary',
          isWrong && 'bg-destructive/15 text-destructive line-through',
          !checked && 'bg-primary/10 text-primary hover:bg-primary/20',
          isOver && !checked && 'ring-2 ring-primary'
        )}
        onClick={() => { if (!checked) onRemove(); }}
      >
        {assignedText}
        {!checked && <span className="ml-1 text-xs opacity-60">✕</span>}
      </span>
    );
  }

  return (
    <span
      ref={setNodeRef}
      className={cn(
        'inline-block min-w-[6rem] mx-0.5 px-2 py-0.5 rounded border-2 border-dashed text-sm font-medium transition-colors',
        isOver
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-muted-foreground/30 text-muted-foreground'
      )}
    >
      ____{gapNum}____
    </span>
  );
}

export function ClickableText({ content, textId, textType, gapAnswers, gapOptions, checked = false, correctMap, onGapClick }: Props) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const [lookupCache, setLookupCache] = useState<Record<string, { word_de: string; article: string | null; translation_en: string } | null>>({});

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

  const resolveGapText = (optionId: string): string | null => {
    if (!gapOptions) return optionId;
    const opt = gapOptions.find(o => o.id === optionId);
    return opt?.text ?? null;
  };

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
                  const assignedId = gapAnswers?.[gapNum];
                  const assignedText = assignedId ? resolveGapText(assignedId) : null;
                  const isCorrect = checked && !!assignedId && correctMap?.[gapNum] === assignedId;
                  const isWrong = checked && !!assignedId && correctMap?.[gapNum] !== assignedId;

                  if (isTextrekonstruktion) {
                    return (
                      <InlineDropGap
                        key={partIdx}
                        gapNum={gapNum}
                        assignedText={assignedText}
                        checked={checked}
                        isCorrect={isCorrect}
                        isWrong={isWrong}
                        onRemove={() => onGapClick?.(gapNum)}
                      />
                    );
                  }

                  return (
                    <span
                      key={partIdx}
                      className={`inline-block min-w-[3rem] mx-1 px-2 py-0.5 rounded border-2 border-dashed text-sm font-medium cursor-pointer transition-colors ${
                        assignedId
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted-foreground/30 text-muted-foreground'
                      }`}
                      onClick={() => onGapClick?.(gapNum)}
                    >
                      {assignedId ? `[${assignedId}]` : `___${gapNum}___`}
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
