import { PRIORITY_BY_VALUE } from '../constants';

function createId() {
  // randomUUID only exists in secure contexts (https / localhost), so keep a fallback.
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  );
}

/** Key order matters: storage.js writes tasks in the same order so JSON stays stable. */
export function createTask(title, priority) {
  return {
    id: createId(),
    title: title.trim(),
    priority,
    completed: false,
    createdAt: Date.now(),
  };
}

export function getStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  return {
    total,
    completed,
    pending: total - completed,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

/** Simple brute-force check: case-insensitive substring match on the title. */
export function matchesFilters(task, { query, status, priority }) {
  const needle = query.trim().toLowerCase();
  if (needle && !task.title.toLowerCase().includes(needle)) return false;
  if (status === 'active' && task.completed) return false;
  if (status === 'completed' && !task.completed) return false;
  if (priority !== 'all' && task.priority !== priority) return false;
  return true;
}

const SORTERS = {
  newest: (a, b) => b.createdAt - a.createdAt,
  oldest: (a, b) => a.createdAt - b.createdAt,
  priority: (a, b) =>
    PRIORITY_BY_VALUE[a.priority].rank - PRIORITY_BY_VALUE[b.priority].rank ||
    b.createdAt - a.createdAt,
};

/** Derives the list on screen from the source-of-truth task array. Never mutates `tasks`. */
export function getVisibleTasks(tasks, filters) {
  const sorter = SORTERS[filters.sort] ?? SORTERS.newest;
  return tasks.filter((task) => matchesFilters(task, filters)).sort(sorter);
}

export function hasActiveFilters({ query, status, priority }) {
  return query.trim() !== '' || status !== 'all' || priority !== 'all';
}

/** "Today, 3:41 PM", "Yesterday", or "19 Sep". */
export function formatAdded(timestamp, now = new Date()) {
  const date = new Date(timestamp);
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const dayDiff = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000);

  if (dayDiff === 0) {
    const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
    return `Today, ${time}`;
  }
  if (dayDiff === 1) return 'Yesterday';
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' }).format(date);
}
