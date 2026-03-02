import { useTranslation } from '@/i18n/useTranslation';
import { Link } from 'react-router-dom';
import { BookOpen, PenLine, BookOpenCheck, Headphones, GraduationCap, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const areas = [
  { key: 'nav.vocabulary' as const, path: '/vocabulary', icon: Languages, color: 'text-primary' },
  { key: 'nav.grammar' as const, path: '/grammar', icon: BookOpen, color: 'text-primary' },
  { key: 'nav.writing' as const, path: '/writing', icon: PenLine, color: 'text-primary' },
  { key: 'nav.reading' as const, path: '/reading', icon: BookOpenCheck, color: 'text-primary' },
  { key: 'nav.listening' as const, path: '/listening', icon: Headphones, color: 'text-primary' },
  { key: 'nav.examPrep' as const, path: '/exam-prep', icon: GraduationCap, color: 'text-primary' },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('home.welcome')}</h1>
        <p className="mt-1 text-muted-foreground">{t('home.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {areas.map((area) => {
          const Icon = area.icon;
          return (
            <Link key={area.path} to={area.path}>
              <Card className="transition-shadow hover:shadow-md cursor-pointer h-full">
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <Icon className={`h-8 w-8 ${area.color}`} />
                  <span className="text-sm font-semibold text-card-foreground">{t(area.key)}</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
