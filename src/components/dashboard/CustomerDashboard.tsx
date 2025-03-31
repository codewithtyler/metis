import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, PlusCircle } from 'lucide-react';
import { Ticket } from '../../types';

interface CustomerDashboardProps {
  openTickets: Ticket[];
  resolvedTickets: Ticket[];
}

export default function CustomerDashboard({ openTickets, resolvedTickets }: CustomerDashboardProps) {
  return (
    <>
      {/* Customer Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
        <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-dark-300">Open Tickets</p>
              <p className="text-2xl font-semibold text-dark-100">
                {openTickets.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-dark-300">Resolved Tickets</p>
              <p className="text-2xl font-semibold text-dark-100">
                {resolvedTickets.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Tickets */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-dark-100 mb-4">Open Tickets</h2>
        {openTickets.length > 0 ? (
          <div className="bg-dark-800 shadow-lg overflow-hidden sm:rounded-lg border border-dark-700">
            <table className="min-w-full divide-y divide-dark-700">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-dark-800 divide-y divide-dark-700">
                {openTickets.map((ticket) => (
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
                      {ticket.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-300">
                      {new Date(ticket.updatedAt).toLocaleDateString('en-US', {
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
        ) : (
          <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
            <AlertCircle className="mx-auto h-12 w-12 text-dark-400" />
            <h3 className="mt-2 text-sm font-medium text-dark-100">No Open Tickets</h3>
            <p className="mt-1 text-sm text-dark-400">
              You don't have any open tickets at the moment.
            </p>
            <div className="mt-6">
              <Link
                to="/tickets/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New Ticket
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Recently Resolved Tickets */}
      <div>
        <h2 className="text-lg font-medium text-dark-100 mb-4">Recently Resolved</h2>
        {resolvedTickets.length > 0 ? (
          <div className="bg-dark-800 shadow-lg overflow-hidden sm:rounded-lg border border-dark-700">
            <table className="min-w-full divide-y divide-dark-700">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Resolved Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-dark-800 divide-y divide-dark-700">
                {resolvedTickets.slice(0, 5).map((ticket) => (
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
                      {new Date(ticket.updatedAt).toLocaleDateString('en-US', {
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
        ) : (
          <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
            <CheckCircle className="mx-auto h-12 w-12 text-dark-400" />
            <h3 className="mt-2 text-sm font-medium text-dark-100">No Resolved Tickets</h3>
            <p className="mt-1 text-sm text-dark-400">
              You don't have any resolved tickets yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
}