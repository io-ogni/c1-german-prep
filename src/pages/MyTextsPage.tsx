import { useState, useEffect, useCallback } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, PenTool, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Submission {
  id: string;
  prompt_id: string;
  text_content: string;
  word_count: number;
  score_aufgabengerechtheit: string | null;
  score_korrektheit: string | null;
  score_repertoire: string | null;
  score_kommunikative_gestaltung: string | null;
  total_points: number | null;
  llm_feedback_de: string | null;
  llm_feedback_en: string | null;
  llm_corrections: any;
  created_at: string;
  writing_prompts?: { title_de: string; title_en: string } | null;
}

const GRADE_COLORS: Record<string, string> = {
  A: 'text-primary',
  B: 'text-primary/80',
  C: 'text-orange-500',
  D: 'text-destructive',
};

export default function MyTextsPage() {
  const { t, lang } = useTranslation();
  const { profile } = useRequiredAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      const { data } = await supabase
        .from('writing_submissions')
        .select('*, writing_prompts(title_de, title_en)')
        .eq('user_id', profile.user_id)
        .order('created_at', { ascending: false });
      if (data) setSubmissions(data as any);
      setLoading(false);
    })();
  }, [profile]);

  const GradeBadge = ({ grade }: { grade: string | null }) => {
    if (!grade) return null;
    return <span className={`font-bold ${GRADE_COLORS[grade] || 'text-foreground'}`}>{grade}</span>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <FileText className="h-6 w-6" />
        {lang === 'de' ? 'Meine Texte' : 'My Texts'}
      </h1>

      {loading ? (
        <p className="text-muted-foreground">{t('common_loading')}</p>
      ) : submissions.length === 0 ? (
        <Card><CardContent className="py-10 text-center space-y-3">
          <PenTool className="h-10 w-10 mx-auto text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Hier erscheinen deine Texte, nachdem du eine Schreibübung abgeschlossen hast.</p>
          <Link to="/writing" className="inline-block text-sm text-primary hover:underline">Schreibübung starten →</Link>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {submissions.map(sub => {
            const expanded = expandedId === sub.id;
            const prompt = sub.writing_prompts;
            const title = prompt ? (lang === 'de' ? prompt.title_de : prompt.title_en) : 'Untitled';
            const date = new Date(sub.created_at).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });

            return (
              <Card key={sub.id} className="cursor-pointer" onClick={() => setExpandedId(expanded ? null : sub.id)}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm text-foreground">{title}</h3>
                      <p className="text-xs text-muted-foreground">{date} · {sub.word_count} {t('writing_word_count')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {sub.total_points != null && (
                        <span className="text-sm font-bold text-foreground">{sub.total_points}/48</span>
                      )}
                      {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>

                  {/* Grades row */}
                  <div className="flex gap-4 text-xs">
                    <span>Aufgabe: <GradeBadge grade={sub.score_aufgabengerechtheit} /></span>
                    <span>Korrektheit: <GradeBadge grade={sub.score_korrektheit} /></span>
                    <span>Repertoire: <GradeBadge grade={sub.score_repertoire} /></span>
                    <span>Gestaltung: <GradeBadge grade={sub.score_kommunikative_gestaltung} /></span>
                  </div>

                  {expanded && (
                    <div className="pt-3 border-t border-border space-y-3">
                      {/* Feedback */}
                      {(sub.llm_feedback_de || sub.llm_feedback_en) && (
                        <div className="bg-secondary rounded-lg p-3">
                          <p className="text-xs font-medium text-foreground mb-1">{t('eval_detailed_feedback')}</p>
                          <p className="text-xs text-muted-foreground">
                            {lang === 'de' ? sub.llm_feedback_de : sub.llm_feedback_en}
                          </p>
                        </div>
                      )}

                      {/* Corrections */}
                      {Array.isArray(sub.llm_corrections) && sub.llm_corrections.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">{t('eval_corrections')}</p>
                          <div className="space-y-1">
                            {sub.llm_corrections.map((c: any, i: number) => (
                              <div key={i} className="text-xs bg-secondary rounded p-2">
                                <span className="text-destructive line-through">{c.original}</span>
                                {' → '}
                                <span className="text-primary font-medium">{c.corrected}</span>
                                <p className="text-muted-foreground mt-0.5">
                                  {lang === 'de' ? c.explanation_de : c.explanation_en}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Original text */}
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">{lang === 'de' ? 'Ihr Text' : 'Your text'}</p>
                        <p className="text-xs text-muted-foreground whitespace-pre-wrap">{sub.text_content}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
