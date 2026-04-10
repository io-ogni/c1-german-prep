import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import WelcomePage from '@/pages/WelcomePage';

export function RootRoute() {
  const auth = useAuth();

  // Supabase recovery links land on / with #type=recovery — redirect to reset page
  const hash = window.location.hash;
  if (hash.includes('type=recovery')) {
    return <Navigate to={`/reset-password${hash}`} replace />;
  }

  if (auth?.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (auth?.user) {
    return <Navigate to="/home" replace />;
  }

  return <WelcomePage />;
}
