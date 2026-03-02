import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, FileText } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useRequiredAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mainLinks = [
  { key: 'nav_home' as const, path: '/' },
  { key: 'nav_vocabulary' as const, path: '/vocabulary' },
  { key: 'nav_grammar' as const, path: '/grammar' },
  { key: 'nav_writing' as const, path: '/writing' },
  { key: 'nav_reading' as const, path: '/reading' },
  { key: 'nav_listening' as const, path: '/listening' },
  { key: 'nav_exam_prep' as const, path: '/exam-prep' },
];

export function Navbar() {
  const { t } = useTranslation();
  const { user, profile, logout } = useRequiredAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <span className="text-primary">C1</span>
          <span>Werkstatt</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive(link.path)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/my-vocabulary"
            className={cn(
              'flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors',
              isActive('/my-vocabulary') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <BookOpen className="h-4 w-4" />
            {t('nav_my_vocabulary')}
          </Link>
          <Link
            to="/my-texts"
            className={cn(
              'flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors',
              isActive('/my-texts') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <FileText className="h-4 w-4" />
            {t('nav_my_texts')}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-sm">
                {profile?.display_name || user?.email?.split('@')[0] || ''}
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/settings">{t('nav_settings')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>{t('nav_logout')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            <Link to="/my-vocabulary" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <BookOpen className="h-4 w-4" /> {t('nav_my_vocabulary')}
            </Link>
            <Link to="/my-texts" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <FileText className="h-4 w-4" /> {t('nav_my_texts')}
            </Link>
            <Link to="/settings" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              {t('nav_settings')}
            </Link>
            <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10">
              {t('nav_logout')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
