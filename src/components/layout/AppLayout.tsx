import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FeedbackButton } from '@/components/shared/FeedbackButton';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-6xl flex-1">
        <Outlet />
      </main>
      <FeedbackButton />
      <footer className="container mx-auto px-4 max-w-6xl pb-6 pt-4 border-t border-border text-center text-xs text-muted-foreground space-y-1">
        <p>Built by <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> &{' '}
        <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a>.
        {' '}Approved by Jerry the 🐕</p>
        <p className="text-muted-foreground/60">telc is a registered trademark of telc gGmbH. This app is not affiliated with or endorsed by telc gGmbH.</p>
      </footer>
    </div>
  );
}
