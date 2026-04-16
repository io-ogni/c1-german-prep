import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FeedbackButton } from '@/components/shared/FeedbackButton';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-6xl flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border mt-6">
        <div className="container mx-auto px-4 max-w-6xl py-3 space-y-2">
          <FeedbackButton />
          <hr className="border-border lg:hidden" />
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs">
            <Link to="/about" className="text-primary hover:underline">About this app</Link>
            <Link to="/datenschutz" className="text-primary hover:underline">Datenschutz</Link>
            <a href="https://ioana-ognibeni.eu/impressum/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Impressum</a>
          </nav>
          <p className="text-center text-xs text-muted-foreground">
            Built by{' '}
            <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> &{' '}
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a>.
            {' '}Approved by Jerry the 🐕
          </p>
        </div>
      </footer>
    </div>
  );
}
