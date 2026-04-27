import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useRequiredAuth, useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { BookOpen, Plus, Search, Trash2, Languages } from 'lucide-react';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { syncStarredToDb } from '@/lib/syncStarredVocab';
import { NAV_CONTAINER, TAB_TRIGGER_BLUE } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';

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



// ─── Source labels for display ───

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
  'schreiben-einleitung': 'Schreiben: Einleitung',
  'schreiben-hauptteil': 'Schreiben: Hauptteil',
  'schreiben-schluss': 'Schreiben: Schluss',
  'schreiben-c1-strukturen': 'Schreiben: C1-Strukturen',
};

export default function MyVocabularyPage() {
  const { t, lang } = useTranslation();
  const { profile } = useRequiredAuth();
  const auth = useAuth();
  const userId = auth?.user?.id ?? 'anon';
  const [searchParams, setSearchParams] = useSearchParams();
  const vocabTab = searchParams.get('tab') || 'review';
  const setVocabTab = (v: string) => setSearchParams({ tab: v }, { replace: true });
  const [dueCards, setDueCards] = useState<VocabWord[]>([]);
  const [allWords, setAllWords] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  // Add word dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newWord, setNewWord] = useState({ word_de: '', translation_en: '', translation_custom: '', example_sentence: '' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!profile) return;

    // Auto-sync starred items from localStorage to DB
    await syncStarredToDb(profile.user_id);

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

  const handleDeleteWord = async (id: string) => {
    const { error } = await supabase.from('personal_vocabulary').delete().eq('id', id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(lang === 'de' ? 'Wort gelöscht' : 'Word deleted');
      fetchData();
    }
  };

  const handleDeleteAll = async () => {
    if (!profile) return;
    const { error } = await supabase.from('personal_vocabulary').delete().eq('user_id', profile.user_id);
    if (error) {
      toast.error(error.message);
    } else {
      // Clear all highlights so auto-sync doesn't re-insert them
      localStorage.removeItem(`it-vokabular-highlights-${userId}`);
      localStorage.removeItem('it-redewendungen-highlights');
      localStorage.removeItem('speaking-highlights');
      localStorage.removeItem('writing-tips-highlights');
      localStorage.removeItem(`nv-verbindungen-highlights-${userId}`);
      localStorage.removeItem(`praepositionen-highlights-${userId}`);
      toast.success(lang === 'de' ? 'Alle Wörter und Sätze gelöscht' : 'All words and sentences deleted');
      fetchData();
    }
  };

  const filteredWords = searchQuery
    ? allWords.filter(w =>
        w.word_de.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.translation_en.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allWords;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          {lang === 'de' ? 'Mein Wortschatz' : 'My Vocabulary'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <button className="text-primary hover:underline inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5" />{t('vocab_add_word')}</button>
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
        </p>
      </div>

      <Tabs value={vocabTab} onValueChange={setVocabTab}>
        <ScrollNav>
          <TabsList className={`${NAV_CONTAINER} h-auto gap-1`}>
            <TabsTrigger value="review" className={`${TAB_TRIGGER_BLUE} gap-1.5`}>{t('vocab_review_due')} ({dueCards.length})</TabsTrigger>
            <TabsTrigger value="all" className={`${TAB_TRIGGER_BLUE} gap-1.5`}>{t('vocab_all_words')} ({allWords.length})</TabsTrigger>
          </TabsList>
        </ScrollNav>

        <TabsContent value="review" className="mt-4">
          {loading ? (
            <p className="text-muted-foreground">{t('common_loading')}</p>
          ) : allWords.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <Languages className="h-10 w-10 mx-auto text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Noch keine Wörter gesammelt</p>
              <p className="text-xs text-muted-foreground/70">Markiere Wörter in <Link to="/it-deutsch/vokabular" className="text-primary hover:underline">IT-Vokabular</Link>, <Link to="/speaking" className="text-primary hover:underline">Sprechen</Link> oder tippe auf ein Wort in einem <Link to="/reading" className="text-primary hover:underline">Lesetext</Link>.</p>
            </div>
          ) : (
            <ReviewCard dueCards={dueCards} />
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('vocab_search')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {allWords.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-1 shrink-0">
                    <Trash2 className="h-4 w-4" />
                    {lang === 'de' ? 'Alle löschen' : 'Delete All'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{lang === 'de' ? 'Alle Wörter und Sätze löschen?' : 'Delete all words and sentences?'}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {lang === 'de'
                        ? `${allWords.length} Einträge werden unwiderruflich gelöscht. Alle Markierungen in den Tabellen werden ebenfalls entfernt.`
                        : `${allWords.length} entries will be permanently deleted. All highlights in the tables will also be removed.`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{lang === 'de' ? 'Abbrechen' : 'Cancel'}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      {lang === 'de' ? 'Alle löschen' : 'Delete All'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          {filteredWords.length === 0 ? (
            allWords.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <Languages className="h-10 w-10 mx-auto text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Noch leer — aber nicht lange.</p>
                <p className="text-xs text-muted-foreground/70">Markiere Wörter in <Link to="/it-deutsch/vokabular" className="text-primary hover:underline">IT-Vokabular</Link>, <Link to="/speaking" className="text-primary hover:underline">Sprechen</Link> oder tippe auf ein Wort in einem <Link to="/reading" className="text-primary hover:underline">Lesetext</Link>.</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">{lang === 'de' ? 'Keine Ergebnisse.' : 'No results.'}</p>
            )
          ) : (
            <div className="space-y-2">
              {filteredWords.map(w => (
                <Card key={w.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{w.word_de}</p>
                      <p className="text-xs text-muted-foreground">{w.translation_en}{w.translation_custom ? ` · ${w.translation_custom}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="secondary" className="text-[10px] font-normal whitespace-nowrap">
                        {SOURCE_LABELS[w.source_type] ?? w.source_type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteWord(w.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
