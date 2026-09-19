import { useEffect, useMemo, useReducer } from 'react';
import { STORAGE_KEY } from '../constants';
import { createInitialState, tasksReducer } from '../state/tasksReducer';
import { loadTasks, saveTasks } from '../utils/storage';
import { createTask } from '../utils/tasks';

/** Owns the task list: state, persistence to localStorage and cross-tab sync. */
export function useTasks() {
  const [state, dispatch] = useReducer(tasksReducer, undefined, () =>
    createInitialState(loadTasks()),
  );

  useEffect(() => {
    saveTasks(state.tasks);
  }, [state.tasks]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) dispatch({ type: 'replace', tasks: loadTasks() });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // `dispatch` is stable, so these callbacks are too, which keeps memoised rows from re-rendering.
  const actions = useMemo(
    () => ({
      addTask: (title, priority) => dispatch({ type: 'add', task: createTask(title, priority) }),
      toggleTask: (id) => dispatch({ type: 'toggle', id }),
      editTask: (id, { title, priority }) => dispatch({ type: 'edit', id, title, priority }),
      removeTask: (id) => dispatch({ type: 'remove', id }),
      clearCompleted: () => dispatch({ type: 'clearCompleted' }),
      undoLast: () => dispatch({ type: 'undo' }),
      dismissUndo: () => dispatch({ type: 'dismissUndo' }),
    }),
    [],
  );

  return { tasks: state.tasks, undo: state.undo, ...actions };
}
