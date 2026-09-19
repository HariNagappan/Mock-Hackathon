export const STORAGE_KEY = 'focuslist:tasks:v1';
export const THEME_KEY = 'focuslist:theme';
export const MAX_TITLE_LENGTH = 120;

/** `level` drives the signal-bar icon, `rank` drives priority sorting (lower = more urgent). */
export const PRIORITIES = [
  { value: 'high', label: 'High', level: 3, rank: 0 },
  { value: 'medium', label: 'Medium', level: 2, rank: 1 },
  { value: 'low', label: 'Low', level: 1, rank: 2 },
];

export const DEFAULT_PRIORITY = 'medium';

export const PRIORITY_BY_VALUE = Object.fromEntries(PRIORITIES.map((p) => [p.value, p]));

export const PRIORITY_OPTIONS = PRIORITIES.map(({ value, label }) => ({ value, label, tone: value }));

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export const PRIORITY_FILTER_OPTIONS = [{ value: 'all', label: 'Any' }, ...PRIORITY_OPTIONS];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'priority', label: 'Highest priority' },
];

export const DEFAULT_FILTERS = { query: '', status: 'all', priority: 'all', sort: 'newest' };
