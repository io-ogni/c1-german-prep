import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Table2, Layers, Dumbbell, Play } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const NAV_ITEMS = [
  { path: '/it-deutsch', icon: Play, labelKey: null, label: 'Medien' },
  { path: '/it-deutsch/uebungen', icon: Dumbbell, labelKey: null, label: 'Übungen' },
  { path: '/it-deutsch/vokabular', icon: Table2, labelKey: null, label: 'IT-Vokabular' },

  { path: '/it-deutsch/redewendungen', icon: BookOpen, labelKey: 'it_redewendungen' as const },
  { path: '/flashcards', icon: Layers, labelKey: null, label: 'Lernkarten' },
];

export function ITDeutschNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="inline-flex items-center rounded-lg bg-muted/80 border border-border p-1 gap-0.5 flex-wrap">
      {NAV_ITEMS.map(({ path, icon: Icon, labelKey, label }) => {
        const isActive = path === '/it-deutsch'
          ? location.pathname === '/it-deutsch'
          : location.pathname.startsWith(path);
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? 'bg-fuchsia-500 text-white shadow-sm'
                : 'text-foreground/70 hover:bg-fuchsia-500 hover:text-white hover:shadow-sm'
            }`}
          >
            <Icon className="h-4 w-4" />
            {labelKey ? t(labelKey) : label}
          </button>
        );
      })}
    </div>
  );
}
