import { useState, Fragment } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil } from 'lucide-react';
import { toast } from 'sonner';

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

function getSentence(text: string, wordIndex: number): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  let charCount = 0;
  // Find which sentence contains the approximate character position
  let wordCharPos = 0;
  const words = text.split(/(\s+)/);
  for (let i = 0; i < wordIndex * 2 && i < words.length; i++) {
    wordCharPos += words[i].length;
  }
  for (const sentence of sentences) {
    charCount += sentence.length + 1;
    if (charCount >= wordCharPos) return sentence.trim();
  }
  return sentences[0] || '';
}

export function ClickableText({ content, textId, textType, gapAnswers, onGapClick }: Props) {
  const { t, lang: language } = useTranslation();
  const { profile } = useRequiredAuth();
  const [lookupCache, setLookupCache] = useState<Record<string, { word_de: string; article: string | null; translation_en: string } | null>>({});
  const [customTranslation, setCustomTranslation] = useState('');
  const [editingWord, setEditingWord] = useState<string | null>(null);
  const [openWord, setOpenWord] = useState<string | null>(null);

  const lookupWord = async (cleanWord: string) => {
    if (lookupCache[cleanWord.toLowerCase()] !== undefined) return;
    const { data } = await supabase
      .from('dictionary')
      .select('word_de, article, translation_en')
      .ilike('word_de', cleanWord)
      .limit(1)
      .single();
    setLookupCache(prev => ({ ...prev, [cleanWord.toLowerCase()]: data }));
  };

  const addToVocabulary = async (wordDe: string, translationEn: string, sentence: string) => {
    if (!profile) return;
    const { error } = await supabase.from('personal_vocabulary').insert({
      user_id: profile.user_id,
      word_de: wordDe,
      translation_en: translationEn,
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
    }
  };

  // Split content into paragraphs, then words, preserving gaps
  const paragraphs = content.split('\n\n');

  return (
    <div className="space-y-4 leading-relaxed text-foreground">
      {paragraphs.map((para, pIdx) => {
        // Check for gap markers [___N___]
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

              // Regular text — split into words
              const words = part.split(/(\s+)/);
              return (
                <Fragment key={partIdx}>
                  {words.map((word, wIdx) => {
                    if (/^\s+$/.test(word)) return <span key={wIdx}>{word}</span>;
                    const clean = stripPunctuation(word);
                    if (!clean) return <span key={wIdx}>{word}</span>;

                    const entry = lookupCache[clean.toLowerCase()];

                    return (
                      <Popover key={wIdx} onOpenChange={(open) => { if (open) lookupWord(clean); }}>
                        <PopoverTrigger asChild>
                          <span className="cursor-pointer rounded px-0.5 transition-colors hover:bg-accent hover:text-accent-foreground">
                            {word}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-3 space-y-2" side="top">
                          {entry === undefined ? (
                            <p className="text-xs text-muted-foreground">{t('common_loading')}</p>
                          ) : entry ? (
                            <>
                              <p className="font-semibold text-sm text-foreground">
                                {entry.article ? `${entry.article} ${entry.word_de}` : entry.word_de}
                              </p>
                              <p className="text-xs text-muted-foreground">EN: {entry.translation_en}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold text-sm text-foreground">{clean}</p>
                              <p className="text-xs text-muted-foreground">{t('word_not_found')}</p>
                              {editingWord === clean ? (
                                <div className="flex gap-1">
                                  <Input
                                    value={customTranslation}
                                    onChange={e => setCustomTranslation(e.target.value)}
                                    placeholder="Translation"
                                    className="h-7 text-xs"
                                  />
                                  <Button size="sm" className="h-7 text-xs" onClick={() => {
                                    if (customTranslation) {
                                      setLookupCache(prev => ({
                                        ...prev,
                                        [clean.toLowerCase()]: { word_de: clean, article: null, translation_en: customTranslation },
                                      }));
                                      setEditingWord(null);
                                    }
                                  }}>OK</Button>
                                </div>
                              ) : (
                                <Button variant="outline" size="sm" className="w-full gap-1 text-xs h-7" onClick={() => {
                                  setEditingWord(clean);
                                  setCustomTranslation('');
                                }}>
                                  <Pencil className="h-3 w-3" />
                                  {t('word_edit_translation')}
                                </Button>
                              )}
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-1 text-xs h-7"
                            onClick={() => {
                              const translation = entry?.translation_en || customTranslation || clean;
                              const wordWithArticle = entry?.article ? `${entry.article} ${entry.word_de}` : clean;
                              addToVocabulary(wordWithArticle, translation, getSentence(content, pIdx));
                            }}
                          >
                            <Plus className="h-3 w-3" />
                            {t('word_add_to_vocabulary')}
                          </Button>
                        </PopoverContent>
                      </Popover>
                    );
                  })}
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
