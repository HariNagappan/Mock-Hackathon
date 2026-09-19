import { useId, useRef, useState } from 'react';
import { DEFAULT_PRIORITY, MAX_TITLE_LENGTH, PRIORITY_OPTIONS } from '../constants';
import { AlertIcon, PlusIcon } from './icons';
import SegmentedControl from './SegmentedControl';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(DEFAULT_PRIORITY);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const errorId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Enter a task title to add it.');
      inputRef.current?.focus();
      return;
    }

    onAdd(trimmed, priority);
    setTitle('');
    setError('');
    inputRef.current?.focus(); // ready for the next task
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
    if (error) setError('');
  };

  return (
    <section className="compose" aria-labelledby="compose-title">
      <h2 className="compose__title" id="compose-title">
        What needs doing today?
      </h2>

      <form className="compose__form" onSubmit={handleSubmit} noValidate>
        <div className="compose__row">
          <div className="compose__field">
            <label htmlFor="new-task" className="sr-only">
              Task title
            </label>
            <input
              id="new-task"
              ref={inputRef}
              className="input"
              type="text"
              value={title}
              onChange={handleChange}
              placeholder="Add a new task"
              maxLength={MAX_TITLE_LENGTH}
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              data-testid="task-input"
            />
            {error && (
              <p className="field-error" id={errorId} role="alert">
                <AlertIcon width={16} height={16} />
                {error}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn--primary" data-testid="add-task-button">
            <PlusIcon />
            Add task
          </button>
        </div>

        <div className="compose__priority">
          <span className="compose__label" aria-hidden="true">
            Priority
          </span>
          <SegmentedControl
            legend="Task priority"
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={setPriority}
          />
          {title.length >= MAX_TITLE_LENGTH - 20 && (
            <span className="compose__count" aria-hidden="true">
              {title.length}/{MAX_TITLE_LENGTH}
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
