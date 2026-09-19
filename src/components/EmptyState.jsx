const COPY = {
  empty: {
    title: 'Nothing on your list yet',
    body: 'Add your first task above. Give it a priority so the important ones stand out.',
  },
  'no-results': {
    title: 'No tasks match',
    body: 'Try a different search, or clear the filters to see everything.',
  },
};

export default function EmptyState({ variant, onReset }) {
  const { title, body } = COPY[variant];

  return (
    <div className="empty" data-testid="empty-state">
      <svg className="empty__art" width="72" height="72" viewBox="0 0 72 72" aria-hidden="true" focusable="false">
        <circle cx="36" cy="36" r="26" fill="none" stroke="var(--line-strong)" strokeWidth="6" />
        <path d="M36 10a26 26 0 0 1 24 16" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="36" cy="36" r="7" fill="var(--accent)" />
      </svg>
      <h3 className="empty__title">{title}</h3>
      <p className="empty__body">{body}</p>
      {variant === 'no-results' && (
        <button type="button" className="btn btn--secondary" onClick={onReset}>
          Clear filters
        </button>
      )}
    </div>
  );
}
