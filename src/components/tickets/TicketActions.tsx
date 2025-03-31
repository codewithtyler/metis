import React from 'react';
import { User } from '../../types';

interface TicketActionsProps {
  status: string;
  pendingStatus: string;
  userRole: string;
  assignedToId?: string;
  availableAgents: User[];
  onStatusChange: (status: string) => void;
  onStatusSave: () => void;
  onAssign: (userId: string) => void;
  onEscalate: () => void;
  currentUserId: string;
}

export default function TicketActions({
  status,
  pendingStatus,
  userRole,
  assignedToId,
  availableAgents,
  onStatusChange,
  onStatusSave,
  onAssign,
  onEscalate,
  currentUserId
}: TicketActionsProps) {
  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, string> = {
      'new': 'New',
      'in_progress': 'In Progress',
      'pending': 'Pending',
      'resolved': 'Resolved'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="flex items-center gap-3">
      {/* Status Selection */}
      <div className="flex items-center mr-4">
        <span className="text-dark-400 text-sm mr-2">Status:</span>
        <div className="flex items-center">
          <select
            className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-l-lg text-sm text-dark-100 hover:bg-dark-600 transition-colors duration-150"
            value={pendingStatus || status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="new">{getStatusDisplay('new')}</option>
            <option value="in_progress">{getStatusDisplay('in_progress')}</option>
            <option value="pending">{getStatusDisplay('pending')}</option>
            <option value="resolved">{getStatusDisplay('resolved')}</option>
          </select>
          {pendingStatus && pendingStatus !== status && (
            <button
              onClick={onStatusSave}
              className="px-3 py-2 bg-primary border border-transparent rounded-r-lg text-sm text-white hover:bg-primary-hover transition-colors duration-150"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Assignment/Escalation Controls */}
      {userRole === 'admin' ? (
        <div className="flex items-center mr-4">
          <span className="text-dark-400 text-sm mr-2">Assigned:</span>
          <select
            className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 hover:bg-dark-600 transition-colors duration-150"
            value={assignedToId || ''}
            onChange={(e) => onAssign(e.target.value)}
          >
            <option value="">Unassigned</option>
            {availableAgents.map(agent => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
      ) : userRole === 'agent' && !assignedToId && (
        <button
          onClick={() => onAssign(currentUserId)}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors duration-150"
        >
          Assign to Me
        </button>
      )}

      {/* Escalation Button */}
      {userRole === 'agent' && status !== 'resolved' && (
        <button
          onClick={onEscalate}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors duration-150"
        >
          Escalate to Admin
        </button>
      )}
    </div>
  );
}