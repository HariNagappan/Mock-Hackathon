import { PRIORITY_FILTER_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from '../constants';
import { SearchIcon } from './icons';
import SegmentedControl from './SegmentedControl';

export default function Toolbar({ filters, onChange, searchRef }) {
  return (
    <section className="toolbar" aria-label="Search and filter tasks">
      <div className="search">
        <SearchIcon className="search__icon" />
        <label htmlFor="task-search" className="sr-only">
          Search tasks by title
        </label>
        <input
          id="task-search"
          ref={searchRef}
          className="input search__input"
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          placeholder="Search tasks by title"
          autoComplete="off"
          data-testid="search-input"
        />
        {!filters.query && (
          <kbd className="search__hint" aria-hidden="true">
            /
          </kbd>
        )}
      </div>

      <div className="toolbar__row">
        <SegmentedControl
          legend="Filter by status"
          options={STATUS_OPTIONS}
          value={filters.status}
          onChange={(status) => onChange({ status })}
          size="sm"
        />

        <div className="toolbar__group">
          <span className="toolbar__label" aria-hidden="true">
            Priority
          </span>
          <SegmentedControl
            legend="Filter by priority"
            options={PRIORITY_FILTER_OPTIONS}
            value={filters.priority}
            onChange={(priority) => onChange({ priority })}
            size="sm"
          />
        </div>

        <div className="toolbar__group">
          <label className="toolbar__label" htmlFor="task-sort">
            Sort
          </label>
          <div className="select">
            <select
              id="task-sort"
              value={filters.sort}
              onChange={(event) => onChange({ sort: event.target.value })}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
