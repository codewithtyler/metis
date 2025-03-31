import React from 'react';
import { AlertCircle, Clock, CheckCircle, HourglassIcon } from 'lucide-react';

interface TicketDistributionProps {
  stats: {
    ticketsByStatus: {
      new: number;
      in_progress: number;
      pending: number;
      resolved: number;
    };
  };
}

export default function TicketDistribution({ stats }: TicketDistributionProps) {
  const statuses = [
    {
      key: 'new',
      label: 'New',
      icon: AlertCircle,
      color: 'yellow-500',
      value: stats.ticketsByStatus.new,
    },
    {
      key: 'in_progress',
      label: 'In Progress',
      icon: HourglassIcon,
      color: 'blue-500',
      value: stats.ticketsByStatus.in_progress,
    },
    {
      key: 'pending',
      label: 'Pending',
      icon: Clock,
      color: 'orange-500',
      value: stats.ticketsByStatus.pending,
    },
    {
      key: 'resolved',
      label: 'Resolved',
      icon: CheckCircle,
      color: 'green-500',
      value: stats.ticketsByStatus.resolved,
    },
  ];

  const total = Object.values(stats.ticketsByStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700">
      <div className="p-5">
        <h3 className="text-lg font-medium text-dark-100 mb-4">
          Ticket Status Distribution
        </h3>
        <div className="space-y-4">
          {statuses.map((status) => (
            <div key={status.key} className="flex items-center">
              <status.icon className={`h-5 w-5 text-${status.color} mr-2`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-dark-300">{status.label}</span>
                  <span className="text-sm font-medium text-dark-100">
                    {status.value}
                  </span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div
                    className={`bg-${status.color} h-2 rounded-full`}
                    style={{
                      width: `${(status.value / (total || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}