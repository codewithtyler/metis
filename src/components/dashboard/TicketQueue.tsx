import React from 'react';
import { Link } from 'react-router-dom';
import { Inbox } from 'lucide-react';
import { Ticket } from '../../types';

interface TicketQueueProps {
  title: string;
  icon: React.ReactNode;
  tickets: Ticket[];
  emptyMessage: string;
  getCustomerName: (id: string) => string;
}

export default function TicketQueue({
  title,
  icon,
  tickets,
  emptyMessage,
  getCustomerName,
}: TicketQueueProps) {
  const hasTickets = tickets.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-medium text-dark-100">{title}</h2>
      </div>
      {!hasTickets ? (
        <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
          <Inbox className="mx-auto h-12 w-12 text-dark-400" />
          <h3 className="mt-2 text-sm font-medium text-dark-100">No Tickets in {title}</h3>
          <p className="mt-1 text-sm text-dark-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="bg-dark-800 shadow-lg overflow-hidden sm:rounded-lg border border-dark-700">
          <table className="min-w-full divide-y divide-dark-700">
            <thead className="bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark-800 divide-y divide-dark-700">
              {tickets.slice(0, 5).map((ticket) => (
                <tr key={ticket.id} className="hover:bg-dark-700/50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="text-sm font-medium text-primary hover:text-primary-hover"
                    >
                      {ticket.subject}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-300">
                    {getCustomerName(ticket.customerId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-300">
                    {ticket.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-300">
                    {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}