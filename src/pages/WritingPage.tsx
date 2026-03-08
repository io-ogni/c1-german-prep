import { useState, useEffect, useCallback, useRef } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, PenLine, FileText, GraduationCap, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import type { Tables } from '@/integrations/supabase/types';

type WritingPrompt = Tables<'writing_prompts'>;
type WritingSubmission = Tables<'writing_submissions'>;
type WritingLevel = 'rusty' | 'solid_b2' | 'almost_c1';

interface CriterionResult {
  grade: string;
  feedback_de: string;
  feedback_en: string;
  corrections?: Correction[];
}

interface Correction {
  original: string;
  corrected: string;
  category: string;
  explanation_de: string;
  explanation_en: string;
}

interface EvaluationResponse {
  aufgabengerechtheit: CriterionResult;
  korrektheit: CriterionResult & { corrections?: Correction[] };
  repertoire: CriterionResult;
  kommunikative_gestaltung: CriterionResult;
  overall_feedback_de: string;
  overall_feedback_en: string;
  improved_version: string;
  total_points: number;
  max_points: number;
  error?: string;
  code?: string;
}

// ─── API Key Banner ───────────────────────────────────

function ApiKeyBanner() {
  const { t } = useTranslation();
  return (
    <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950/30">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">{t('writing_api_key_needed')}</span>
        <Link to="/settings">
          <Button variant="outline" size="sm">{t('nav_settings')}</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}

// ─── Level Selector ───────────────────────────────────

function LevelSelector({ onSelect }: { onSelect: (level: WritingLevel) => void }) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const lang = profile?.ui_language || 'de';

  const levels: { key: WritingLevel; icon: React.ReactNode; subtitle_de: string; subtitle_en: string }[] = [
    {
      key: 'rusty',
      icon: <PenLine className="h-8 w-8 text-amber-500" />,
      subtitle_de: 'Kurze Mikro-Übungen (30–80 Wörter)',
      subtitle_en: 'Short micro-exercises to rebuild confidence (30-80 words each)',
    },
    {
      key: 'solid_b2',
      icon: <FileText className="h-8 w-8 text-primary" />,
      subtitle_de: 'Absatz-Antworten (100–180 Wörter)',
      subtitle_en: 'Paragraph-level responses (100-180 words each)',
    },
    {
      key: 'almost_c1',
      icon: <GraduationCap className="h-8 w-8 text-emerald-600" />,
      subtitle_de: 'Vollständige Texte im telc-Format (~350 Wörter)',
      subtitle_en: 'Full texts in telc format (~350 words each)',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t('writing_level_select')}</h1>
        <Link to="/writing/tips">
          <Button variant="default" size="default" className="gap-2 font-semibold shadow-md">
            <FileText className="h-5 w-5" />
            Tipps & Redemittel
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {levels.map((l) => (
          <Card
            key={l.key}
            className="cursor-pointer transition-all hover:ring-2 hover:ring-primary hover:shadow-lg"
            onClick={() => onSelect(l.key)}
          >
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              {l.icon}
              <h3 className="text-lg font-semibold text-foreground">
                {t(`writing_${l.key}` as any)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`writing_${l.key}_desc` as any)}
              </p>
              <p className="text-xs text-muted-foreground">
                {lang === 'de' ? l.subtitle_de : l.subtitle_en}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Prompt List ──────────────────────────────────────

function PromptList({
  prompts,
  submissions,
  hasApiKey,
  onSelect,
  onChangeLevel,
}: {
  prompts: WritingPrompt[];
  submissions: Map<string, WritingSubmission>;
  hasApiKey: boolean;
  onSelect: (p: WritingPrompt) => void;
  onChangeLevel: () => void;
}) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const lang = profile?.ui_language || 'de';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onChangeLevel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">{t('page_writing')}</h1>
      </div>
      {!hasApiKey && <ApiKeyBanner />}
      <div className="grid gap-3">
        {prompts.map((p) => {
          const sub = submissions.get(p.id);
          return (
            <Card
              key={p.id}
              className="cursor-pointer transition-colors hover:bg-accent/50"
              onClick={() => onSelect(p)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {lang === 'de' ? p.title_de : p.title_en}
                    </span>
                    {p.exam_format === 'telc' && <TelcBadge />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {p.text_type.replace(/_/g, ' ')}
                    </Badge>
                    <span>~{p.target_word_count} {t('writing_word_count')}</span>
                  </div>
                </div>
                <div className="text-sm">
                  {sub ? (
                    <Badge variant="default">
                      {t('writing_submitted')} ({sub.total_points ?? '?'} {t('eval_points')})
                    </Badge>
                  ) : (
                    <Badge variant="outline">{t('writing_not_started')}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Grade helpers ────────────────────────────────────

const GRADE_POINTS: Record<string, number> = { A: 12, B: 8, C: 4, D: 0 };

function gradeColor(grade: string) {
  switch (grade) {
    case 'A': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
    case 'B': return 'text-primary bg-primary/10';
    case 'C': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
    case 'D': return 'text-destructive bg-destructive/10';
    default: return 'text-muted-foreground bg-muted';
  }
}

function ScoreCard({ label, grade }: { label: string; grade: string }) {
  if (!grade) return null;
  const points = GRADE_POINTS[grade] ?? 0;
  return (
    <div className={`rounded-lg p-3 text-center ${gradeColor(grade)}`}>
      <div className="text-xs font-medium opacity-80">{label}</div>
      <div className="text-lg font-bold">{grade} ({points}/12)</div>
    </div>
  );
}

// ─── Evaluation Display ──────────────────────────────

function EvaluationDisplay({ evaluation }: { evaluation: EvaluationResponse }) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const lang = profile?.ui_language || 'de';

  const corrections = evaluation.korrektheit?.corrections ?? [];
  const feedback = lang === 'de' ? evaluation.overall_feedback_de : evaluation.overall_feedback_en;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <h3 className="text-lg font-semibold text-foreground">{t('eval_results')}</h3>

      <div className="grid grid-cols-2 gap-3">
        <ScoreCard label={t('eval_aufgabengerechtheit')} grade={evaluation.aufgabengerechtheit?.grade} />
        <ScoreCard label={t('eval_korrektheit')} grade={evaluation.korrektheit?.grade} />
        <ScoreCard label={t('eval_repertoire')} grade={evaluation.repertoire?.grade} />
        <ScoreCard label={t('eval_kommunikative_gestaltung')} grade={evaluation.kommunikative_gestaltung?.grade} />
      </div>

      <div className="text-center text-lg font-bold text-foreground">
        {t('eval_total')}: {evaluation.total_points}/{evaluation.max_points}
      </div>

      <Accordion type="multiple" className="w-full">
        {feedback && (
          <AccordionItem value="feedback">
            <AccordionTrigger>{t('eval_detailed_feedback')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-foreground">
                {(['aufgabengerechtheit', 'korrektheit', 'repertoire', 'kommunikative_gestaltung'] as const).map((key) => {
                  const c = evaluation[key];
                  if (!c) return null;
                  const fb = lang === 'de' ? c.feedback_de : c.feedback_en;
                  return (
                    <div key={key}>
                      <p className="font-medium">{t(`eval_${key}` as any)} ({c.grade})</p>
                      <p className="text-muted-foreground">{fb}</p>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {corrections.length > 0 && (
          <AccordionItem value="corrections">
            <AccordionTrigger>{t('eval_corrections')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {corrections.map((c, i) => (
                  <div key={i} className="rounded border border-border p-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="line-through text-destructive">{c.original}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-emerald-600">{c.corrected}</span>
                      <Badge variant="secondary" className="text-[10px]">{c.category}</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {lang === 'de' ? c.explanation_de : c.explanation_en}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {evaluation.improved_version && (
          <AccordionItem value="improved">
            <AccordionTrigger>{t('eval_improved_version')}</AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-wrap text-sm text-foreground">{evaluation.improved_version}</p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}

// ─── Writing Interface ────────────────────────────────

function WritingInterface({
  prompt,
  existingSubmission,
  hasApiKey,
  onBack,
  onSubmitted,
}: {
  prompt: WritingPrompt;
  existingSubmission?: WritingSubmission;
  hasApiKey: boolean;
  onBack: () => void;
  onSubmitted: (sub: WritingSubmission) => void;
}) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const lang = profile?.ui_language || 'de';

  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const context = lang === 'de' ? prompt.context_de : prompt.context_en;
  const starterQuotes = (prompt.starter_quotes as unknown as { text: string; source: string }[] | null) ?? [];

  const handleSubmit = async () => {
    if (!hasApiKey) {
      toast({ title: t('writing_api_key_needed'), variant: 'destructive' });
      return;
    }
    setSubmitting(true);

    try {
      const res = await supabase.functions.invoke('evaluate-writing', {
        body: {
          prompt_type: prompt.prompt_type,
          topic: prompt.title_de,
          context: prompt.context_de,
          user_text: text,
          prompt_id: prompt.id,
        },
      });

      if (res.error) throw res.error;
      const data = res.data as EvaluationResponse;

      if (data.error) {
        // Handle specific error codes from the edge function
        if (data.code === 'no_api_key') {
          toast({ title: data.error, variant: 'destructive' });
          return;
        }
        toast({ title: data.error, variant: 'destructive' });
        return;
      }

      setEvaluation(data);

      // Refresh submissions list
      const { data: newSub } = await supabase
        .from('writing_submissions')
        .select('*')
        .eq('prompt_id', prompt.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (newSub) {
        onSubmitted(newSub as WritingSubmission);
      }
    } catch (err: any) {
      toast({ title: t('common_error'), description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold text-foreground">
          {lang === 'de' ? prompt.title_de : prompt.title_en}
        </h2>
        {prompt.exam_format === 'telc' && <TelcBadge />}
      </div>

      {!hasApiKey && <ApiKeyBanner />}

      {/* Context box */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
        <p className="text-sm text-foreground whitespace-pre-wrap">{context}</p>
      </div>

      {/* Starter quotes */}
      {starterQuotes.length > 0 && (
        <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
          {starterQuotes.map((q, i) => (
            <blockquote key={i} className="border-l-2 border-primary pl-3 text-sm italic text-foreground">
              „{q.text}" — <span className="not-italic text-muted-foreground">{q.source}</span>
            </blockquote>
          ))}
        </div>
      )}

      {/* Target info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{t('writing_target')}: ~{prompt.target_word_count} {t('writing_word_count')}</span>
        {hasApiKey && <span>{t('writing_cost_note')}</span>}
      </div>

      {/* Textarea */}
      {!evaluation && (
        <>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={lang === 'de' ? 'Schreibe hier deinen Text...' : 'Write your text here...'}
            className="min-h-[200px] resize-y text-base"
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t('writing_word_count')}: {wordCount}/{prompt.target_word_count}
            </span>
            <Button
              onClick={handleSubmit}
              disabled={submitting || wordCount < 10 || !hasApiKey}
              title={!hasApiKey ? t('writing_api_key_needed') : undefined}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('writing_evaluating')}
                </>
              ) : (
                t('writing_submit')
              )}
            </Button>
          </div>
        </>
      )}

      {/* Results */}
      {evaluation && <EvaluationDisplay evaluation={evaluation} />}

      {evaluation && (
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setEvaluation(null); setText(''); }}>
            {t('exercise_try_again')}
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────

export default function WritingPage() {
  const { user, profile, refreshProfile } = useRequiredAuth();
  const [prompts, setPrompts] = useState<WritingPrompt[]>([]);
  const [submissions, setSubmissions] = useState<Map<string, WritingSubmission>>(new Map());
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const writingLevel = profile?.writing_level as WritingLevel | null;
  const hasApiKey = !!profile?.api_key_encrypted;

  const selectLevel = async (level: WritingLevel) => {
    if (!user) return;
    await supabase.from('profiles').update({ writing_level: level }).eq('user_id', user.id);
    await refreshProfile();
  };

  const loadData = useCallback(async () => {
    if (!user || !writingLevel) { setLoading(false); return; }

    const [promptsRes, subsRes] = await Promise.all([
      supabase.from('writing_prompts').select('*').eq('level', writingLevel).order('sort_order'),
      supabase.from('writing_submissions').select('*').eq('user_id', user.id),
    ]);

    setPrompts(promptsRes.data ?? []);
    const subMap = new Map<string, WritingSubmission>();
    (subsRes.data ?? []).forEach((s) => subMap.set(s.prompt_id, s as WritingSubmission));
    setSubmissions(subMap);
    setLoading(false);
  }, [user, writingLevel]);

  useEffect(() => { loadData(); }, [loadData]);

  if (!writingLevel) {
    return <LevelSelector onSelect={selectLevel} />;
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  if (selectedPrompt) {
    return (
      <WritingInterface
        prompt={selectedPrompt}
        existingSubmission={submissions.get(selectedPrompt.id)}
        hasApiKey={hasApiKey}
        onBack={() => setSelectedPrompt(null)}
        onSubmitted={(sub) => {
          setSubmissions((prev) => new Map(prev).set(sub.prompt_id, sub));
        }}
      />
    );
  }

  const handleChangeLevel = async () => {
    if (!user) return;
    await supabase.from('profiles').update({ writing_level: null }).eq('user_id', user.id);
    await refreshProfile();
  };

  return (
    <PromptList
      prompts={prompts}
      submissions={submissions}
      hasApiKey={hasApiKey}
      onSelect={setSelectedPrompt}
      onChangeLevel={handleChangeLevel}
    />
  );
}
