import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, ShieldAlert, Users } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { useTickets } from '../hooks/useTickets';
import { customers } from '../data/customers';
import DashboardStats from '../components/dashboard/DashboardStats';
import { getDashboardStats } from '../data/stats';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';
import TicketQueue from '../components/dashboard/TicketQueue';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tickets } = useTickets();

  // Redirect customers without product access to discovery
  React.useEffect(() => {
    if (user?.role === 'customer' && !user.productIds?.length) {
      navigate('/discover');
    }
  }, [user, navigate]);

  const userTickets = tickets.filter(ticket => {
    if (user?.role === 'customer') {
      return ticket.customerId === user.id;
    }
    return user?.teamId === ticket.teamId;
  });

  const stats = getDashboardStats(userTickets);

  const adminQueue = userTickets.filter(t => t.queueType === 'admin');
  const agentQueue = userTickets.filter(t => t.queueType === 'agent');
  const openTickets = userTickets.filter(t => t.status !== 'resolved');
  const resolvedTickets = userTickets.filter(t => t.status === 'resolved');

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Unknown Customer';
  };

  return (
    <div>
      <PageTitle title="Dashboard" description="Overview of support tickets and key metrics" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        {user?.role !== 'agent' && (
          <Link
            to="/tickets/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            New Ticket
          </Link>
        )}
      </div>

      {user?.role === 'customer' ? (
        <CustomerDashboard 
          openTickets={openTickets}
          resolvedTickets={resolvedTickets}
        />
      ) : (
        <>
          <DashboardStats stats={stats} />

          <div className="mt-8">
            {user?.role === 'admin' ? (
              <div className="space-y-8">
                <TicketQueue
                  title="Admin Queue"
                  icon={<ShieldAlert className="w-5 h-5 text-yellow-500" />}
                  tickets={adminQueue}
                  emptyMessage="There are currently no tickets requiring admin attention."
                  getCustomerName={getCustomerName}
                />
                <TicketQueue
                  title="Agent Queue"
                  icon={<Users className="w-5 h-5 text-blue-500" />}
                  tickets={agentQueue}
                  emptyMessage="There are currently no tickets in the agent queue."
                  getCustomerName={getCustomerName}
                />
              </div>
            ) : (
              <TicketQueue
                title="Recent Tickets"
                icon={<Users className="w-5 h-5 text-blue-500" />}
                tickets={userTickets}
                emptyMessage="There are currently no tickets assigned to you."
                getCustomerName={getCustomerName}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}