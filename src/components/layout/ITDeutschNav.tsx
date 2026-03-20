import { useNavigate, useLocation } from 'react-router-dom';
import { Drama, Table2, Layers, Dumbbell, Play } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { NAV_CONTAINER, navFuchsiaClasses } from '@/components/shared/navStyles';
import type { LucideIcon } from 'lucide-react';

type NavItem = { value: string; icon: LucideIcon; label: string; labelKey?: string };

const NAV_ITEMS: NavItem[] = [
  { value: '/it-deutsch', icon: Play, label: 'Medien' },
  { value: '/it-deutsch/vokabular', icon: Table2, label: 'IT-Vokabular' },
  { value: '/it-deutsch/redewendungen', icon: Drama, labelKey: 'it_redewendungen', label: '' },
  { value: '/it-deutsch/uebungen', icon: Dumbbell, label: 'Übungen' },
  { value: '/flashcards', icon: Layers, label: 'Lernkarten' },
];

export function ITDeutschNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const activePath = NAV_ITEMS.find(item =>
    item.value === '/it-deutsch'
      ? location.pathname === '/it-deutsch'
      : location.pathname.startsWith(item.value)
  )?.value ?? '/it-deutsch';

  return (
    <div className={NAV_CONTAINER}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const label = item.labelKey ? (t(item.labelKey as any) as string) : item.label;
        return (
          <button
            key={item.value}
            onClick={() => navigate(item.value)}
            className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${navFuchsiaClasses(activePath === item.value)}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
