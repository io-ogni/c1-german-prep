import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, BookOpenCheck, FileText, GraduationCap, Monitor, Languages, PenLine, Headphones, Mic } from 'lucide-react';
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

const examLinks = [
  { key: 'nav_vocabulary' as const, path: '/vocabulary', icon: Languages },
  { key: 'nav_grammar' as const, path: '/grammar', icon: BookOpen },
  { key: 'nav_writing' as const, path: '/writing', icon: PenLine },
  { key: 'nav_reading' as const, path: '/reading', icon: BookOpenCheck },
  { key: 'nav_listening' as const, path: '/listening', icon: Headphones },
  { key: 'nav_speaking' as const, path: '/speaking', icon: Mic },
];

const itLinks = [
  { key: 'nav_it_deutsch' as const, path: '/it-deutsch' },
];

const allLinks = [...examLinks, ...itLinks];

export function Navbar() {
  const { t } = useTranslation();
  const { user, profile, logout } = useRequiredAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open (iOS needs position:fixed)
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 56) setHidden(true);
      else setHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/home') return location.pathname === '/home';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-transform duration-200",
      hidden && !mobileOpen && "lg:translate-y-0 -translate-y-full"
    )}>
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/home" onClick={() => setMobileOpen(false)} className="relative z-[1000] flex items-center gap-2 font-bold text-lg text-foreground">
          <img src="/logo.png" alt="C1" className="h-7 w-7 rounded-md" />
          <span className="hidden sm:inline bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Werkstatt</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {examLinks.map((link) => (
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
          <div className="mx-1 h-5 w-px bg-border" />
          <Link
            to="/it-deutsch"
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-bold transition-colors',
              isActive('/it-deutsch')
                ? 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-900/20'
                : 'text-fuchsia-600/80 dark:text-fuchsia-400/80 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20'
            )}
          >
            {t('nav_it_deutsch')}
          </Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-sm max-w-[150px]">
                <span className="ph-no-capture truncate">{profile?.display_name || user?.email?.split('@')[0] || ''}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/my-vocabulary" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {t('nav_my_vocabulary')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-texts" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t('nav_my_texts')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/exam-prep" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  {t('nav_exam_prep')}
                </Link>
              </DropdownMenuItem>
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

      {mobileOpen && createPortal(
        <>
        <div className="fixed inset-0 top-14 z-[998] bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
        <div className="fixed top-14 left-0 right-0 z-[999] border-t border-border bg-card px-4 pb-6 pt-2 shadow-xl lg:hidden max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {examLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(link.key)}
                </Link>
              );
            })}
            <div className="my-2 border-t border-border" />
            <Link
              to="/it-deutsch"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-bold transition-colors',
                isActive('/it-deutsch')
                  ? 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-900/20'
                  : 'text-fuchsia-600/80 dark:text-fuchsia-400/80 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20'
              )}
            >
              <Monitor className="h-4 w-4 inline-block mr-1" />
              {t('nav_it_deutsch')}
            </Link>
            <div className="my-2 border-t border-border" />
            <Link to="/my-vocabulary" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <BookOpen className="h-4 w-4" /> {t('nav_my_vocabulary')}
            </Link>
            <Link to="/my-texts" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <FileText className="h-4 w-4" /> {t('nav_my_texts')}
            </Link>
            <Link to="/exam-prep" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <GraduationCap className="h-4 w-4" /> {t('nav_exam_prep')}
            </Link>
            <Link to="/settings" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              {t('nav_settings')}
            </Link>
            <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10">
              {t('nav_logout')}
            </button>
          </div>
        </div>
        </>,
        document.body
      )}
    </nav>
  );
}
