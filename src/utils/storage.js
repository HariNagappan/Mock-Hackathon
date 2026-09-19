import { MAX_TITLE_LENGTH, PRIORITY_BY_VALUE, STORAGE_KEY } from '../constants';

/** Never trust what comes out of localStorage: keep only well-formed tasks. */
export function sanitizeTasks(raw) {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (task) =>
        task &&
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        task.title.trim() !== '' &&
        task.priority in PRIORITY_BY_VALUE,
    )
    .map((task) => ({
      id: task.id,
      title: task.title.trim().slice(0, MAX_TITLE_LENGTH),
      priority: task.priority,
      completed: Boolean(task.completed),
      createdAt: Number.isFinite(task.createdAt) ? task.createdAt : Date.now(),
    }));
}

export function loadTasks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeTasks(JSON.parse(raw)) : [];
  } catch {
    return []; // corrupted JSON or storage blocked: start fresh instead of crashing
  }
}

export function saveTasks(tasks) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Quota exceeded or private mode: the app keeps working in memory.
  }
}
