import { useEffect, useRef } from 'react';

const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/** Runs `handler` when `key` is pressed, unless the user is typing or using a modifier. */
export function useHotkey(key, handler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== key || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (TYPING_TAGS.has(target.tagName) || target.isContentEditable) return;
      event.preventDefault();
      handlerRef.current(event);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key]);
}
