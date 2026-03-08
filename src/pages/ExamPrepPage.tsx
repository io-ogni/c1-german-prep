import { useTranslation } from '@/i18n/useTranslation';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { GraduationCap, BookOpen, FileText, Headphones, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExamPrepPage() {
  const { t, lang } = useTranslation();
  const { profile } = useRequiredAuth();
  const navigate = useNavigate();
  const hasApiKey = !!profile?.api_key_encrypted;

  const sections = [
    {
      key: 'leseverstehen',
      icon: BookOpen,
      title: t('exam_leseverstehen'),
      description: lang === 'de'
        ? 'Alle 3 Leseteile + Sprachbausteine üben'
        : 'Practice all 3 reading parts + language blocks',
      time: '90 min',
      telc: true,
      enabled: true,
      route: '/reading?exam=telc',
    },
    {
      key: 'sprachbausteine',
      icon: FileText,
      title: t('exam_sprachbausteine'),
      description: lang === 'de'
        ? '22 Multiple-Choice-Fragen im telc-Format'
        : '22 multiple-choice questions in telc format',
      time: lang === 'de' ? 'Teil des Leseverstehens' : 'Part of reading section',
      telc: true,
      enabled: true,
      route: '/grammar?tab=sprachbausteine',
    },
    {
      key: 'schriftlicher_ausdruck',
      icon: FileText,
      title: t('exam_schriftlicher_ausdruck'),
      description: lang === 'de'
        ? 'Einen vollständigen Text mit Bewertung schreiben'
        : 'Write one full text with evaluation',
      time: '70 min',
      telc: true,
      enabled: true,
      route: '/writing',
    },
    {
      key: 'hoerverstehen',
      icon: Headphones,
      title: t('exam_hoerverstehen'),
      description: t('exam_coming_soon'),
      time: '',
      telc: true,
      enabled: false,
      disabledReason: t('exam_coming_soon'),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <GraduationCap className="h-6 w-6" />
        {lang === 'de' ? 'Prüfungsvorbereitung' : 'Exam Preparation'}
      </h1>
      <p className="text-sm text-muted-foreground">
        {lang === 'de'
          ? 'Üben Sie einzelne Prüfungsabschnitte unter Zeitdruck im telc C1-Format.'
          : 'Practice individual exam sections under timed conditions in telc C1 format.'}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map(section => (
          <Card
            key={section.key}
            className={`transition-colors ${section.enabled ? 'hover:bg-accent/50 cursor-pointer' : 'opacity-50'}`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                {section.title}
                {section.telc && <TelcBadge />}
              </CardTitle>
              <CardDescription className="text-xs">{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                {section.time && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />{section.time}
                  </span>
                )}
                {section.enabled && section.route ? (
                  <Button size="sm" variant="outline" onClick={() => navigate(section.route!)}>
                    {t('exam_start')}
                  </Button>
                ) : section.disabledReason ? (
                  <span className="text-xs text-muted-foreground">{section.disabledReason}</span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/50">
        <CardContent className="py-4 text-center">
          <p className="text-sm text-muted-foreground">
            {lang === 'de'
              ? 'Die zeitgesteuerte Prüfungssimulation wird in einem zukünftigen Update verfügbar sein.'
              : 'Timed exam simulation will be available in a future update.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
