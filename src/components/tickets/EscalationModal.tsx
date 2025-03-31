import React from 'react';

interface EscalationModalProps {
  reason: string;
  onReasonChange: (reason: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function EscalationModal({
  reason,
  onReasonChange,
  onSubmit,
  onClose
}: EscalationModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
      <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
        <h3 className="text-lg font-medium text-dark-100 mb-4">Escalate Ticket</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="escalationReason"
              className="block text-sm font-medium text-dark-200 mb-2"
            >
              Reason for Escalation
            </label>
            <textarea
              id="escalationReason"
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
              placeholder="Please explain why this ticket needs admin attention..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-yellow-700"
            >
              Escalate Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}