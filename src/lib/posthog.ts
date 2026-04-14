import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;

// Pages where session recording is paused (sensitive data)
const NO_RECORDING_PAGES = ['/settings', '/writing', '/signup', '/login', '/forgot-password', '/reset-password'];

export function initPostHog() {
  if (!POSTHOG_KEY) return;
  posthog.init(POSTHOG_KEY, {
    api_host: 'https://eu.i.posthog.com',
    persistence: 'localStorage', // anonymous ID persists across sessions for retention tracking — no cookies
    capture_pageview: false, // we fire manually on route change
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true, // mask all input fields globally as safety net
    },
  });
}

/** Pause or resume session recording based on current page */
export function updateRecordingForPage(path: string) {
  if (!POSTHOG_KEY) return;
  const shouldPause = NO_RECORDING_PAGES.some(p => path.startsWith(p));
  if (shouldPause) {
    posthog.stopSessionRecording();
  } else if (!posthog.sessionRecordingStarted()) {
    posthog.startSessionRecording();
  }
}

/** Track an event. No-op if PostHog isn't initialized. */
export function track(event: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY) return;
  posthog.capture(event, properties);
}

/** Identify user by UUID only — NEVER send personal data. */
export function identifyUser(userId: string) {
  if (!POSTHOG_KEY) return;
  posthog.identify(userId);
}

/** Reset identity on logout/account deletion. */
export function resetUser() {
  if (!POSTHOG_KEY) return;
  posthog.reset();
}

/** Capture a page view (called on route change). */
export function trackPageView(path: string) {
  if (!POSTHOG_KEY) return;
  posthog.capture('$pageview', { $current_url: path });
}
