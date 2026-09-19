import { describe, expect, it } from 'vitest';
import { createInitialState, tasksReducer } from './tasksReducer';

const make = (id, overrides = {}) => ({
  id,
  title: `Task ${id}`,
  priority: 'medium',
  completed: false,
  createdAt: Number(id.charCodeAt(0)),
  ...overrides,
});

const run = (state, ...actions) => actions.reduce(tasksReducer, state);

describe('tasksReducer', () => {
  it('adds a task', () => {
    const state = run(createInitialState(), { type: 'add', task: make('a') });
    expect(state.tasks).toHaveLength(1);
  });

  it('toggles completion both ways', () => {
    const start = createInitialState([make('a')]);
    const done = run(start, { type: 'toggle', id: 'a' });
    expect(done.tasks[0].completed).toBe(true);
    expect(run(done, { type: 'toggle', id: 'a' }).tasks[0].completed).toBe(false);
  });

  it('edits title and priority, trimming the title', () => {
    const state = run(createInitialState([make('a')]), {
      type: 'edit',
      id: 'a',
      title: '  New title  ',
      priority: 'high',
    });
    expect(state.tasks[0]).toMatchObject({ title: 'New title', priority: 'high' });
  });

  it('ignores an edit that would leave the title empty', () => {
    const start = createInitialState([make('a')]);
    expect(run(start, { type: 'edit', id: 'a', title: '   ', priority: 'low' })).toBe(start);
  });

  it('deletes a task and can undo it', () => {
    const start = createInitialState([make('a'), make('b')]);
    const deleted = run(start, { type: 'remove', id: 'a' });
    expect(deleted.tasks.map((t) => t.id)).toEqual(['b']);
    expect(deleted.undo.message).toBe('Task deleted');

    const restored = run(deleted, { type: 'undo' });
    expect(restored.tasks.map((t) => t.id).sort()).toEqual(['a', 'b']);
    expect(restored.undo).toBeNull();
  });

  it('undo keeps tasks that were added after the delete', () => {
    const state = run(
      createInitialState([make('a')]),
      { type: 'remove', id: 'a' },
      { type: 'add', task: make('b') },
      { type: 'undo' },
    );
    expect(state.tasks.map((t) => t.id).sort()).toEqual(['a', 'b']);
  });

  it('clears completed tasks, reports how many, and can undo', () => {
    const start = createInitialState([
      make('a', { completed: true }),
      make('b'),
      make('c', { completed: true }),
    ]);
    const cleared = run(start, { type: 'clearCompleted' });
    expect(cleared.tasks.map((t) => t.id)).toEqual(['b']);
    expect(cleared.undo.message).toBe('2 completed tasks cleared');
    expect(run(cleared, { type: 'undo' }).tasks).toHaveLength(3);
  });

  it('does nothing when there is nothing to clear', () => {
    const start = createInitialState([make('a')]);
    expect(run(start, { type: 'clearCompleted' })).toBe(start);
  });

  it('dismisses the undo notice', () => {
    const state = run(createInitialState([make('a')]), { type: 'remove', id: 'a' }, { type: 'dismissUndo' });
    expect(state.undo).toBeNull();
    expect(state.tasks).toHaveLength(0);
  });
});
