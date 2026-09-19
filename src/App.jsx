import { useCallback, useMemo, useRef, useState } from 'react';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Toolbar from './components/Toolbar';
import UndoToast from './components/UndoToast';
import { DEFAULT_FILTERS } from './constants';
import { useHotkey } from './hooks/useHotkey';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { pluralize } from './utils/text';
import { getStats, getVisibleTasks, hasActiveFilters, matchesFilters } from './utils/tasks';

export default function App() {
  const { tasks, undo, addTask, toggleTask, editTask, removeTask, clearCompleted, undoLast, dismissUndo } =
    useTasks();
  const { theme, toggleTheme } = useTheme();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const searchRef = useRef(null);

  useHotkey('/', () => searchRef.current?.focus());

  const updateFilters = useCallback((patch) => setFilters((prev) => ({ ...prev, ...patch })), []);
  const resetFilters = useCallback(
    () => setFilters((prev) => ({ ...DEFAULT_FILTERS, sort: prev.sort })),
    [],
  );

  // If a filter would hide the task the user just added, clear the filters so it doesn't "vanish".
  const handleAdd = useCallback(
    (title, priority) => {
      addTask(title, priority);
      setFilters((prev) =>
        matchesFilters({ title, priority, completed: false }, prev)
          ? prev
          : { ...DEFAULT_FILTERS, sort: prev.sort },
      );
    },
    [addTask],
  );

  const stats = useMemo(() => getStats(tasks), [tasks]);
  const visibleTasks = useMemo(() => getVisibleTasks(tasks, filters), [tasks, filters]);
  const filtersActive = hasActiveFilters(filters);

  return (
    <div className="app">
      <a className="skip-link" href="#tasks">
        Skip to your tasks
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="layout">
        <StatsPanel stats={stats} />
        <TaskForm onAdd={handleAdd} />
        <Toolbar filters={filters} onChange={updateFilters} searchRef={searchRef} />

        <section className="list" id="tasks" aria-labelledby="list-title">
          <div className="list__head">
            <div>
              <h2 className="list__title" id="list-title">
                Your tasks
              </h2>
              <p className="list__count" role="status" aria-live="polite" data-testid="result-count">
                Showing {visibleTasks.length} of {pluralize(tasks.length, 'task')}
              </p>
            </div>
            <div className="list__actions">
              {filtersActive && (
                <button type="button" className="text-btn" onClick={resetFilters}>
                  Clear filters
                </button>
              )}
              {stats.completed > 0 && (
                <button
                  type="button"
                  className="text-btn text-btn--danger"
                  onClick={clearCompleted}
                  data-testid="clear-completed"
                >
                  Clear completed
                </button>
              )}
            </div>
          </div>

          {tasks.length === 0 ? (
            <EmptyState variant="empty" />
          ) : visibleTasks.length === 0 ? (
            <EmptyState variant="no-results" onReset={resetFilters} />
          ) : (
            <TaskList
              tasks={visibleTasks}
              query={filters.query}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={removeTask}
            />
          )}
        </section>
      </main>

      <footer className="footer">Your tasks are saved in this browser only.</footer>

      <UndoToast undo={undo} onUndo={undoLast} onDismiss={dismissUndo} />
    </div>
  );
}
