import { useNavigate, useLocation } from 'react-router-dom';
import { Drama, Table2, Play } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { NAV_CONTAINER, navFuchsiaClasses } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';
import type { LucideIcon } from 'lucide-react';

type NavItem = { value: string; icon?: LucideIcon; label: string; labelKey?: string };

const NAV_ITEMS: NavItem[] = [
  { value: '/it-deutsch/uebungen', label: 'Übungen' },
  { value: '/it-deutsch/vokabular', icon: Table2, label: 'IT-Vokabular' },
  { value: '/it-deutsch', icon: Play, label: 'Medien' },
  { value: '/it-deutsch/redewendungen', icon: Drama, labelKey: 'it_redewendungen', label: '' },
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
    <ScrollNav>
      <div className={NAV_CONTAINER}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const label = item.labelKey ? (t(item.labelKey as any) as string) : item.label;
          return (
            <button
              key={item.value}
              onClick={() => navigate(item.value)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap transition-all ${navFuchsiaClasses(activePath === item.value)}`}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </button>
          );
        })}
      </div>
    </ScrollNav>
  );
}
