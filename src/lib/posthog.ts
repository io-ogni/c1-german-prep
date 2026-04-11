import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;

export function initPostHog() {
  if (!POSTHOG_KEY) return;
  posthog.init(POSTHOG_KEY, {
    api_host: 'https://eu.i.posthog.com',
    persistence: 'memory', // cookieless — no consent banner needed
    capture_pageview: false, // we fire manually on route change
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: false,
  });
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
