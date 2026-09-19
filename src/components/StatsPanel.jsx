const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getNote({ total, pending }) {
  if (total === 0) return 'Add a task to get started.';
  if (pending === 0) return 'All caught up. Nice work.';
  return `${pending} to go.`;
}

export default function StatsPanel({ stats }) {
  const { total, completed, pending, percent } = stats;
  const isComplete = total > 0 && pending === 0;

  return (
    <section className="stats" aria-labelledby="stats-title" data-complete={isComplete}>
      <h2 className="stats__title" id="stats-title">
        Today&rsquo;s progress
      </h2>

      <div className="ring" role="img" aria-label={`${percent}% of tasks completed`}>
        <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <circle className="ring__track" cx="60" cy="60" r={RADIUS} />
          <circle
            className="ring__value"
            cx="60"
            cy="60"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
            style={{ opacity: percent === 0 ? 0 : 1 }}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="ring__label" aria-hidden="true">
          <span className="ring__percent">{percent}%</span>
          <span className="ring__caption">done</span>
        </div>
      </div>

      <dl className="stats__list">
        <div className="stat" data-kind="total" data-testid="stat-total">
          <dt>Total Tasks</dt>
          <dd>{total}</dd>
        </div>
        <div className="stat" data-kind="completed" data-testid="stat-completed">
          <dt>Completed Tasks</dt>
          <dd>{completed}</dd>
        </div>
        <div className="stat" data-kind="pending" data-testid="stat-pending">
          <dt>Pending Tasks</dt>
          <dd>{pending}</dd>
        </div>
      </dl>

      <p className="stats__note">{getNote(stats)}</p>
    </section>
  );
}
