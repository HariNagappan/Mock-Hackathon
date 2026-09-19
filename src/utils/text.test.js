import { describe, expect, it } from 'vitest';
import { pluralize, splitByMatch } from './text';

describe('splitByMatch', () => {
  it('returns the whole text when there is no query', () => {
    expect(splitByMatch('Buy milk', '  ')).toEqual([{ text: 'Buy milk', match: false }]);
  });

  it('flags matches and keeps the original casing', () => {
    expect(splitByMatch('Buy Milk and milk', 'milk')).toEqual([
      { text: 'Buy ', match: false },
      { text: 'Milk', match: true },
      { text: ' and ', match: false },
      { text: 'milk', match: true },
    ]);
  });

  it('treats regex characters literally', () => {
    expect(splitByMatch('Cost (est.) 5+5', '(est.)')).toEqual([
      { text: 'Cost ', match: false },
      { text: '(est.)', match: true },
      { text: ' 5+5', match: false },
    ]);
  });
});

describe('pluralize', () => {
  it('handles singular and plural', () => {
    expect(pluralize(1, 'task')).toBe('1 task');
    expect(pluralize(0, 'task')).toBe('0 tasks');
    expect(pluralize(3, 'task')).toBe('3 tasks');
  });
});
