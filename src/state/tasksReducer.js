import { pluralize } from '../utils/text';

export const createInitialState = (tasks = []) => ({ tasks, undo: null });

/**
 * `undo` remembers only what was removed (not a full snapshot), so undoing
 * never wipes out tasks added or edited after the delete.
 */
function withUndo(state, tasks, removed, message) {
  return {
    tasks,
    undo: { key: (state.undo?.key ?? 0) + 1, message, removed },
  };
}

export function tasksReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, tasks: [action.task, ...state.tasks] };

    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task,
        ),
      };

    case 'edit': {
      const title = action.title.trim();
      if (!title) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, title, priority: action.priority } : task,
        ),
      };
    }

    case 'remove': {
      const removed = state.tasks.filter((task) => task.id === action.id);
      if (removed.length === 0) return state;
      return withUndo(
        state,
        state.tasks.filter((task) => task.id !== action.id),
        removed,
        'Task deleted',
      );
    }

    case 'clearCompleted': {
      const removed = state.tasks.filter((task) => task.completed);
      if (removed.length === 0) return state;
      return withUndo(
        state,
        state.tasks.filter((task) => !task.completed),
        removed,
        `${pluralize(removed.length, 'completed task')} cleared`,
      );
    }

    case 'undo':
      if (!state.undo) return state;
      // Display order is derived from createdAt, so appending is enough.
      return { tasks: [...state.tasks, ...state.undo.removed], undo: null };

    case 'dismissUndo':
      return state.undo ? { ...state, undo: null } : state;

    case 'replace': // used to sync with changes made in another browser tab
      return { tasks: action.tasks, undo: null };

    default:
      return state;
  }
}
