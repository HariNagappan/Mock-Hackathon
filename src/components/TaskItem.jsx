import { memo, useEffect, useRef, useState } from 'react';
import { formatAdded } from '../utils/tasks';
import EditTaskForm from './EditTaskForm';
import HighlightedText from './HighlightedText';
import { PencilIcon, TrashIcon } from './icons';
import PriorityBadge from './PriorityBadge';

function TaskItem({ task, query, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const editButtonRef = useRef(null);
  const wasEditing = useRef(false);

  // After saving or cancelling, hand focus back to the button that opened the editor.
  useEffect(() => {
    if (wasEditing.current && !isEditing) editButtonRef.current?.focus();
    wasEditing.current = isEditing;
  }, [isEditing]);

  const checkboxId = `task-${task.id}`;

  if (isEditing) {
    return (
      <li className="task task--editing" data-tone={task.priority}>
        <EditTaskForm
          task={task}
          onSave={(title, priority) => {
            onEdit(task.id, { title, priority });
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li
      className={`task${task.completed ? ' task--done' : ''}`}
      data-tone={task.priority}
      data-completed={task.completed}
      data-testid="task-item"
    >
      <input
        id={checkboxId}
        className="task__check"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        data-testid="task-checkbox"
      />

      <div className="task__body">
        <label className="task__title" htmlFor={checkboxId} data-testid="task-title">
          <HighlightedText text={task.title} query={query} />
        </label>
        <div className="task__meta">
          <PriorityBadge priority={task.priority} />
          <span className="task__time">Added {formatAdded(task.createdAt)}</span>
          {task.completed && <span className="task__state">Completed</span>}
        </div>
      </div>

      <div className="task__actions">
        <button
          ref={editButtonRef}
          type="button"
          className="icon-btn"
          onClick={() => setIsEditing(true)}
          aria-label={`Edit "${task.title}"`}
          title="Edit"
          data-testid="edit-task"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.title}"`}
          title="Delete"
          data-testid="delete-task"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default memo(TaskItem);
