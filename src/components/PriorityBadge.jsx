import { PRIORITY_BY_VALUE } from '../constants';
import { PriorityBars } from './icons';

export default function PriorityBadge({ priority }) {
  const { label, level } = PRIORITY_BY_VALUE[priority];

  return (
    <span className="badge" data-tone={priority} data-testid="task-priority">
      <PriorityBars level={level} />
      <span className="sr-only">Priority: </span>
      {label}
    </span>
  );
}
