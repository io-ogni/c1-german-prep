import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, updateRecordingForPage } from '@/lib/posthog';

export function PostHogPageTracker() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location.pathname);
    updateRecordingForPage(location.pathname);
  }, [location.pathname]);

  return null;
}
