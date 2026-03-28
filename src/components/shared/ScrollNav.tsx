import { type ReactNode, useRef, useEffect } from 'react';

/**
 * Below lg (<1024px): horizontal scroll wrapper that bleeds to screen edges.
 * Adjusts padding so a nav item is always partially cut off at the right edge.
 * On desktop (>=1024px): renders children as-is.
 */
export function ScrollNav({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;

    // Find the last item whose left edge is within the visible area
    const items = el.querySelectorAll(':scope > * > *'); // nav children
    if (!items.length) return;

    const containerRight = el.getBoundingClientRect().right;
    let needsAdjust = true;

    for (const item of items) {
      const rect = item.getBoundingClientRect();
      // If any item is partially visible (cut off), we're good
      if (rect.left < containerRight && rect.right > containerRight) {
        needsAdjust = false;
        break;
      }
    }

    if (needsAdjust) {
      // Scroll a tiny bit so the next item peeks in, cut off
      el.scrollLeft = 8;
    }
  }, []);

  return (
    <>
      {/* Mobile: scroll wrapper */}
      <div
        ref={scrollRef}
        className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 pl-4 pr-2"
      >
        {children}
      </div>
      {/* Desktop: passthrough */}
      <div className="hidden lg:block">
        {children}
      </div>
    </>
  );
}
