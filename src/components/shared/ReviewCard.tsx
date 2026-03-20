import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

interface VocabWord {
  id: string;
  word_de: string;
  translation_en: string;
  translation_custom: string | null;
  example_sentence: string | null;
  box_number: number;
  next_review_at: string;
  review_count: number;
  source_type: string;
}

const BOX_INTERVALS = [1, 3, 7, 14, 30];

const SOURCE_LABELS: Record<string, string> = {
  manual: 'Manuell',
  'it-nomen': 'IT Nomen',
  'it-verben': 'IT Verben',
  'it-kollokationen': 'IT Kollokationen',
  'it-workshop': 'IT Workshop',
  'it-refinement': 'IT Refinement',
  'it-souveränität': 'IT Souveränität',
  'it-notfallkit': 'IT Notfall-Kit',
  'it-redewendungen': 'IT Redewendungen',
  'sprechen-praesentation': 'Präsentation',
  'sprechen-diskussion': 'Diskussion',
  'sprechen-zusammenfassung': 'Zusammenfassung',
  'sprechen-redemittel': 'Redemittel',
  'sprechen-redewendungen': 'Redewendungen',
};

interface ReviewCardProps {
  dueCards: VocabWord[];
  onCardReviewed?: () => void;
  compact?: boolean;
}

export function ReviewCard({ dueCards, onCardReviewed, compact }: ReviewCardProps) {
  const { t } = useTranslation();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const handleReview = async (knewIt: boolean) => {
    const card = dueCards[reviewIndex];
    if (!card) return;

    const newBox = knewIt ? Math.min(card.box_number + 1, 5) : 1;
    const daysUntilNext = BOX_INTERVALS[newBox - 1];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysUntilNext);

    await supabase.from('personal_vocabulary').update({
      box_number: newBox,
      next_review_at: nextReview.toISOString(),
      review_count: card.review_count + 1,
    }).eq('id', card.id);

    setReviewed(r => r + 1);
    setShowAnswer(false);
    setReviewIndex(i => i + 1);
    onCardReviewed?.();
  };

  if (dueCards.length === 0 || reviewIndex >= dueCards.length) {
    return (
      <Card>
        <CardContent className={`${compact ? 'py-6' : 'py-12'} text-center space-y-2`}>
          <CheckCircle className={`${compact ? 'h-8 w-8' : 'h-10 w-10'} text-primary mx-auto`} />
          <p className="text-foreground font-medium">
            {reviewIndex > 0
              ? `${reviewed} ${t('vocab_reviewed')}!`
              : t('vocab_no_reviews')
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentCard = dueCards[reviewIndex];

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {reviewed + 1} / {dueCards.length} · {t('vocab_cards_remaining')}: {dueCards.length - reviewIndex}
      </p>
      <Card className={`${compact ? 'min-h-[160px]' : 'min-h-[200px]'} flex flex-col items-center justify-center`}>
        <CardContent className={`${compact ? 'py-5' : 'py-8'} text-center space-y-4 w-full`}>
          <p className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-foreground`}>{currentCard.word_de}</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs text-muted-foreground">{t('vocab_box')} {currentCard.box_number} / 5</p>
            {currentCard.source_type !== 'manual' && (
              <Badge variant="secondary" className="text-[10px] font-normal">
                {SOURCE_LABELS[currentCard.source_type] ?? currentCard.source_type}
              </Badge>
            )}
          </div>
          {!showAnswer ? (
            <Button onClick={() => setShowAnswer(true)} variant="outline" size={compact ? 'sm' : 'default'}>
              <Eye className="h-4 w-4 mr-1" />{t('vocab_show_answer')}
            </Button>
          ) : (
            <div className="space-y-3">
              <p className={`${compact ? 'text-base' : 'text-lg'} text-foreground`}>→ {currentCard.translation_en}</p>
              {currentCard.translation_custom && (
                <p className="text-sm text-muted-foreground">→ {currentCard.translation_custom}</p>
              )}
              {currentCard.example_sentence && (
                <p className="text-xs text-muted-foreground italic">"{currentCard.example_sentence}"</p>
              )}
              <div className="flex gap-3 justify-center pt-2">
                <Button onClick={() => handleReview(true)} size={compact ? 'sm' : 'default'} className="gap-1">
                  <CheckCircle className="h-4 w-4" />{t('vocab_knew_it')}
                </Button>
                <Button onClick={() => handleReview(false)} variant="destructive" size={compact ? 'sm' : 'default'} className="gap-1">
                  <XCircle className="h-4 w-4" />{t('vocab_didnt_know')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
