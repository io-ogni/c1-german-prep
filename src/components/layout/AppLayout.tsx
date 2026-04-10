import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-6xl flex-1">
        <Outlet />
      </main>
    </div>
  );
}
