import type { LucideIcon } from 'lucide-react';
import { pillBlueClasses, pillFuchsiaClasses } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';

export type TertiaryNavItem = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

interface TertiaryNavProps {
  items: TertiaryNavItem[];
  activeValue: string;
  onChange: (value: string) => void;
  color?: 'blue' | 'fuchsia';
}

export function TertiaryNav({ items, activeValue, onChange, color = 'blue' }: TertiaryNavProps) {
  const classes = color === 'fuchsia' ? pillFuchsiaClasses : pillBlueClasses;

  return (
    <ScrollNav>
      <div className="flex flex-nowrap lg:flex-wrap gap-1 lg:gap-1.5">
        {items.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${classes(activeValue === value)}`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {label}
          </button>
        ))}
      </div>
    </ScrollNav>
  );
}
