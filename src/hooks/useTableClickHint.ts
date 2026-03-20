import { useState, useCallback } from 'react';

const KEY = 'table-row-click-hint-seen';

export function useTableClickHint() {
  const [show, setShow] = useState(() => localStorage.getItem(KEY) !== '1');

  const dismiss = useCallback(() => {
    setShow(false);
    localStorage.setItem(KEY, '1');
  }, []);

  return { showClickHint: show, dismissClickHint: dismiss };
}
