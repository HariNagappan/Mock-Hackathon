import { useCallback, useEffect, useState } from 'react';
import { THEME_KEY } from '../constants';

/**
 * The initial theme is applied by a tiny inline script in index.html (no flash).
 * Here we only read it back and let the user override it; an explicit choice is remembered.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* storage unavailable: the choice just won't persist */
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
