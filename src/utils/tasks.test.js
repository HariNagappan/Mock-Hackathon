import { describe, expect, it } from 'vitest';
import { DEFAULT_FILTERS } from '../constants';
import { getStats, getVisibleTasks, hasActiveFilters, matchesFilters } from './tasks';

const task = (overrides) => ({
  id: crypto.randomUUID(),
  title: 'Untitled',
  priority: 'medium',
  completed: false,
  createdAt: 1,
  ...overrides,
});

const tasks = [
  task({ id: 'a', title: 'Buy groceries', priority: 'low', createdAt: 1 }),
  task({ id: 'b', title: 'Finish DBMS assignment', priority: 'high', createdAt: 2 }),
  task({ id: 'c', title: 'Gym session', priority: 'medium', completed: true, createdAt: 3 }),
  task({ id: 'd', title: 'Groceries for the weekend', priority: 'high', completed: true, createdAt: 4 }),
];

const ids = (list) => list.map((t) => t.id);

describe('getStats', () => {
  it('counts total, completed, pending and percent', () => {
    expect(getStats(tasks)).toEqual({ total: 4, completed: 2, pending: 2, percent: 50 });
  });

  it('handles an empty list without dividing by zero', () => {
    expect(getStats([])).toEqual({ total: 0, completed: 0, pending: 0, percent: 0 });
  });
});

describe('getVisibleTasks', () => {
  it('returns everything, newest first, by default', () => {
    expect(ids(getVisibleTasks(tasks, DEFAULT_FILTERS))).toEqual(['d', 'c', 'b', 'a']);
  });

  it('searches titles case-insensitively and ignores surrounding spaces', () => {
    const result = getVisibleTasks(tasks, { ...DEFAULT_FILTERS, query: '  GROCER ' });
    expect(ids(result)).toEqual(['d', 'a']);
  });

  it('filters by status', () => {
    expect(ids(getVisibleTasks(tasks, { ...DEFAULT_FILTERS, status: 'active' }))).toEqual(['b', 'a']);
    expect(ids(getVisibleTasks(tasks, { ...DEFAULT_FILTERS, status: 'completed' }))).toEqual(['d', 'c']);
  });

  it('filters by priority', () => {
    expect(ids(getVisibleTasks(tasks, { ...DEFAULT_FILTERS, priority: 'high' }))).toEqual(['d', 'b']);
  });

  it('combines search, status and priority', () => {
    const filters = { query: 'groceries', status: 'completed', priority: 'high', sort: 'newest' };
    expect(ids(getVisibleTasks(tasks, filters))).toEqual(['d']);
  });

  it('sorts by priority, then newest first', () => {
    const result = getVisibleTasks(tasks, { ...DEFAULT_FILTERS, sort: 'priority' });
    expect(ids(result)).toEqual(['d', 'b', 'c', 'a']);
  });

  it('does not mutate the original array', () => {
    const copy = [...tasks];
    getVisibleTasks(tasks, { ...DEFAULT_FILTERS, sort: 'oldest' });
    expect(tasks).toEqual(copy);
  });
});

describe('matchesFilters / hasActiveFilters', () => {
  it('matches a candidate task against the current filters', () => {
    const candidate = { title: 'Read paper', priority: 'low', completed: false };
    expect(matchesFilters(candidate, DEFAULT_FILTERS)).toBe(true);
    expect(matchesFilters(candidate, { ...DEFAULT_FILTERS, status: 'completed' })).toBe(false);
    expect(matchesFilters(candidate, { ...DEFAULT_FILTERS, priority: 'high' })).toBe(false);
  });

  it('detects when any filter is active', () => {
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, query: '  ' })).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, query: 'x' })).toBe(true);
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, priority: 'low' })).toBe(true);
  });
});
