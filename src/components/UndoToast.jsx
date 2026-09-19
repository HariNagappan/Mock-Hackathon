import { useEffect, useState } from 'react';
import { CloseIcon, UndoIcon } from './icons';

const AUTO_DISMISS_MS = 6000;

/**
 * Confirms a destructive action and offers Undo. The live region is always in the DOM
 * so screen readers announce the message when it appears. The timer pauses on hover/focus.
 */
export default function UndoToast({ undo, onUndo, onDismiss }) {
  const [paused, setPaused] = useState(false);
  const key = undo?.key;

  useEffect(() => {
    if (key === undefined || paused) return undefined;
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [key, paused, onDismiss]);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {undo && (
        <div
          className="toast"
          key={undo.key}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className="toast__message">{undo.message}</span>
          <button type="button" className="toast__action" onClick={onUndo} data-testid="undo-button">
            <UndoIcon width={16} height={16} />
            Undo
          </button>
          <button type="button" className="toast__close" onClick={onDismiss} aria-label="Dismiss">
            <CloseIcon width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  );
}
