import { useEffect, useId, useRef, useState } from 'react';
import { MAX_TITLE_LENGTH, PRIORITY_OPTIONS } from '../constants';
import { AlertIcon } from './icons';
import SegmentedControl from './SegmentedControl';

/** Inline editor shown in place of a task row. Enter saves, Escape cancels. */
export default function EditTaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const errorId = useId();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('A task needs a title.');
      inputRef.current?.focus();
      return;
    }
    onSave(trimmed, priority);
  };

  return (
    <form
      className="edit"
      onSubmit={handleSubmit}
      onKeyDown={(event) => event.key === 'Escape' && onCancel()}
      noValidate
    >
      <label htmlFor={`edit-${task.id}`} className="sr-only">
        Edit task title
      </label>
      <input
        id={`edit-${task.id}`}
        ref={inputRef}
        className="input"
        type="text"
        value={title}
        maxLength={MAX_TITLE_LENGTH}
        onChange={(event) => {
          setTitle(event.target.value);
          if (error) setError('');
        }}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        data-testid="edit-input"
      />
      {error && (
        <p className="field-error" id={errorId} role="alert">
          <AlertIcon width={16} height={16} />
          {error}
        </p>
      )}
      <div className="edit__footer">
        <SegmentedControl
          legend="Task priority"
          options={PRIORITY_OPTIONS}
          value={priority}
          onChange={setPriority}
          size="sm"
        />
        <div className="edit__actions">
          <button type="button" className="btn btn--secondary btn--sm" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary btn--sm" data-testid="save-edit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
