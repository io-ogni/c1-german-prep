/**
 * Shared nav styles — two levels:
 *   Secondary = muted bar with squarish items (LevelTabs, SpeakingPage, WritingPage, ReadingPage, ITDeutschNav)
 *   Tertiary  = transparent bg with rounded pill items (ITVokabularPage tabs, Schreiben Redemittel sub-tabs)
 */

/* ── Secondary nav (bar style) ─────────────────────────────────── */

/** Container: muted background with border, items sit tight together */
export const NAV_CONTAINER = 'inline-flex items-center flex-nowrap lg:flex-wrap bg-muted border border-border p-1 gap-0 lg:gap-1 rounded-lg';

/** Tab trigger for blue secondary nav — Radix TabsTrigger */
export const TAB_TRIGGER_BLUE =
  'whitespace-nowrap text-xs lg:text-sm data-[state=inactive]:bg-white dark:data-[state=inactive]:bg-card data-[state=inactive]:text-foreground/70 data-[state=inactive]:hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

/** Active/inactive classes for fuchsia secondary nav — plain buttons (ITDeutschNav) */
export const navFuchsiaClasses = (isActive: boolean) =>
  isActive
    ? 'bg-fuchsia-500 text-white shadow-sm'
    : 'bg-white dark:bg-card text-foreground/70 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20';

/* ── Tertiary nav (pill style) ─────────────────────────────────── */

/** Container: transparent background, flex-wrap with gap between pills */
export const PILL_CONTAINER = 'flex flex-nowrap lg:flex-wrap h-auto gap-1 lg:gap-1.5 justify-start bg-transparent p-0';

/** Pill trigger for fuchsia tertiary nav — Radix TabsTrigger (ITVokabularPage) */
export const TAB_TRIGGER_FUCHSIA =
  'whitespace-nowrap gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs shadow-sm data-[state=inactive]:bg-white dark:data-[state=inactive]:bg-card data-[state=inactive]:text-foreground/70 data-[state=inactive]:hover:bg-fuchsia-50 dark:data-[state=inactive]:hover:bg-fuchsia-900/20 data-[state=active]:border-fuchsia-500 data-[state=active]:bg-fuchsia-500 data-[state=active]:text-white';

/** Active/inactive pill classes for blue tertiary nav — plain buttons (TertiaryNav) */
export const pillBlueClasses = (isActive: boolean) =>
  isActive
    ? 'border border-primary bg-primary text-primary-foreground shadow-sm'
    : 'border border-border bg-white dark:bg-card shadow-sm text-foreground/70 hover:bg-primary/10';

/** Active/inactive pill classes for fuchsia tertiary nav — plain buttons (TertiaryNav) */
export const pillFuchsiaClasses = (isActive: boolean) =>
  isActive
    ? 'border border-fuchsia-500 bg-fuchsia-500 text-white shadow-sm'
    : 'border border-border bg-white dark:bg-card shadow-sm text-foreground/70 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20';
