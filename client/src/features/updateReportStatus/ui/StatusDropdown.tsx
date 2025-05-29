import { useUnit } from 'effector-react';
import { reportStatusChanged } from '../model';

const STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'];

type Props = {
  reportId: string;
  currentStatus: string;
  onStatusChange?: () => void;
};

export const StatusDropdown = ({ reportId, currentStatus, onStatusChange }: Props) => {
  const changeStatus = useUnit(reportStatusChanged);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    changeStatus({ reportId, status: newStatus });
    if (onStatusChange) onStatusChange();
  };

  return (
    <select value={currentStatus} onChange={handleChange} className="p-2 rounded border">
      {STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};