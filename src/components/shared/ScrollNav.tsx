import { type ReactNode, useRef, useEffect, useState, useCallback } from 'react';

/**
 * Below lg (<1024px): horizontal scroll wrapper that bleeds to screen edges.
 * Shows a right-edge fade when there's more content to scroll.
 * On desktop (>=1024px): renders children as-is.
 */
export function ScrollNav({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  const checkFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowFade(el.scrollWidth - el.scrollLeft - el.clientWidth > 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkFade();
    el.addEventListener('scroll', checkFade, { passive: true });
    return () => el.removeEventListener('scroll', checkFade);
  }, [checkFade]);

  return (
    <>
      {/* Mobile: scroll wrapper with fade hint */}
      <div className="lg:hidden relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide -mx-4 pl-4 pr-6"
        >
          {children}
        </div>
        {showFade && (
          <div className="pointer-events-none absolute inset-y-0 -right-4 w-20 bg-gradient-to-l from-background via-background/80 to-transparent" />
        )}
      </div>
      {/* Desktop: passthrough */}
      <div className="hidden lg:block">
        {children}
      </div>
    </>
  );
}
