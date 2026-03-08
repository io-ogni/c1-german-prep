import { useState, useEffect, useCallback } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { BookOpen, Plus, Search, Eye, EyeOff, CheckCircle, XCircle, Trash2 } from 'lucide-react';

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
  source_id: string | null;
  created_at: string;
}

const BOX_INTERVALS = [1, 3, 7, 14, 30]; // days per box level

export default function MyVocabularyPage() {
  const { t, lang } = useTranslation();
  const { profile } = useRequiredAuth();
  const [dueCards, setDueCards] = useState<VocabWord[]>([]);
  const [allWords, setAllWords] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Review state
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  // Add word dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newWord, setNewWord] = useState({ word_de: '', translation_en: '', translation_custom: '', example_sentence: '' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!profile) return;
    const now = new Date().toISOString();
    const [dueRes, allRes] = await Promise.all([
      supabase.from('personal_vocabulary').select('*').eq('user_id', profile.user_id).lte('next_review_at', now).order('next_review_at'),
      supabase.from('personal_vocabulary').select('*').eq('user_id', profile.user_id).order('created_at', { ascending: false }),
    ]);
    if (dueRes.data) setDueCards(dueRes.data);
    if (allRes.data) setAllWords(allRes.data);
    setLoading(false);
  }, [profile]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleReview = async (knewIt: boolean) => {
    const card = dueCards[reviewIndex];
    if (!card || !profile) return;

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
  };

  const handleAddWord = async () => {
    if (!profile || !newWord.word_de || !newWord.translation_en) return;
    setSaving(true);
    const { error } = await supabase.from('personal_vocabulary').insert({
      user_id: profile.user_id,
      word_de: newWord.word_de,
      translation_en: newWord.translation_en,
      translation_custom: newWord.translation_custom || null,
      example_sentence: newWord.example_sentence || null,
      source_type: 'manual',
      box_number: 1,
      next_review_at: new Date().toISOString(),
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t('word_added'));
      setNewWord({ word_de: '', translation_en: '', translation_custom: '', example_sentence: '' });
      setAddOpen(false);
      fetchData();
    }
  };

  const filteredWords = searchQuery
    ? allWords.filter(w =>
        w.word_de.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.translation_en.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allWords;

  const currentCard = dueCards[reviewIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          {lang === 'de' ? 'Mein Wortschatz' : 'My Vocabulary'}
        </h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" />{t('vocab_add_word')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{t('vocab_add_word')}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Word (DE) *</Label><Input value={newWord.word_de} onChange={e => setNewWord({ ...newWord, word_de: e.target.value })} /></div>
              <div><Label>Translation (EN) *</Label><Input value={newWord.translation_en} onChange={e => setNewWord({ ...newWord, translation_en: e.target.value })} /></div>
              <div><Label>Custom translation</Label><Input value={newWord.translation_custom} onChange={e => setNewWord({ ...newWord, translation_custom: e.target.value })} /></div>
              <div><Label>Example sentence</Label><Input value={newWord.example_sentence} onChange={e => setNewWord({ ...newWord, example_sentence: e.target.value })} /></div>
              <Button onClick={handleAddWord} disabled={saving || !newWord.word_de || !newWord.translation_en} className="w-full">
                {saving ? t('common_loading') : t('vocab_add_word')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="review">
        <TabsList>
          <TabsTrigger value="review">{t('vocab_review_due')} ({dueCards.length})</TabsTrigger>
          <TabsTrigger value="all">{t('vocab_all_words')} ({allWords.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="mt-4">
          {loading ? (
            <p className="text-muted-foreground">{t('common_loading')}</p>
          ) : dueCards.length === 0 || reviewIndex >= dueCards.length ? (
            <Card>
              <CardContent className="py-12 text-center space-y-2">
                <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                <p className="text-foreground font-medium">
                  {reviewIndex > 0
                    ? `${reviewed} ${t('vocab_reviewed')}!`
                    : t('vocab_no_reviews')
                  }
                </p>
              </CardContent>
            </Card>
          ) : currentCard && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {reviewed + 1} / {dueCards.length} · {t('vocab_cards_remaining')}: {dueCards.length - reviewIndex}
              </p>
              <Card className="min-h-[200px] flex flex-col items-center justify-center">
                <CardContent className="py-8 text-center space-y-4 w-full">
                  <p className="text-xl font-bold text-foreground">{currentCard.word_de}</p>
                  <p className="text-xs text-muted-foreground">{t('vocab_box')} {currentCard.box_number} / 5</p>
                  {!showAnswer ? (
                    <Button onClick={() => setShowAnswer(true)} variant="outline">
                      <Eye className="h-4 w-4 mr-1" />{t('vocab_show_answer')}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-lg text-foreground">→ {currentCard.translation_en}</p>
                      {currentCard.translation_custom && (
                        <p className="text-sm text-muted-foreground">→ {currentCard.translation_custom}</p>
                      )}
                      {currentCard.example_sentence && (
                        <p className="text-xs text-muted-foreground italic">"{currentCard.example_sentence}"</p>
                      )}
                      <div className="flex gap-3 justify-center pt-2">
                        <Button onClick={() => handleReview(true)} className="gap-1">
                          <CheckCircle className="h-4 w-4" />{t('vocab_knew_it')}
                        </Button>
                        <Button onClick={() => handleReview(false)} variant="destructive" className="gap-1">
                          <XCircle className="h-4 w-4" />{t('vocab_didnt_know')}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('vocab_search')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {filteredWords.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {allWords.length === 0 ? (lang === 'de' ? 'Noch keine Wörter gespeichert.' : 'No words saved yet.') : (lang === 'de' ? 'Keine Ergebnisse.' : 'No results.')}
            </p>
          ) : (
            <div className="space-y-2">
              {filteredWords.map(w => (
                <Card key={w.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{w.word_de}</p>
                      <p className="text-xs text-muted-foreground">{w.translation_en}{w.translation_custom ? ` · ${w.translation_custom}` : ''}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{t('vocab_box')} {w.box_number}/5</p>
                      <p>{w.source_type}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
