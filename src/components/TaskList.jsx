import TaskItem from './TaskItem';

export default function TaskList({ tasks, query, onToggle, onEdit, onDelete }) {
  return (
    <ul className="task-list" data-testid="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          query={query}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
