import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../hooks/useTickets';
import { getDashboardStats } from '../data/stats';
import PageTitle from '../components/PageTitle';
import KeyMetrics from '../components/analytics/KeyMetrics';
import TicketDistribution from '../components/analytics/TicketDistribution';
import TopAgents from '../components/analytics/TopAgents';
import WeeklyTrends from '../components/analytics/WeeklyTrends';

export default function Analytics() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  
  const userTickets = tickets.filter(ticket => 
    user?.teamId === ticket.teamId
  );

  // Calculate base stats
  const baseStats = getDashboardStats(userTickets);
  
  // Calculate ticket status distribution
  const ticketsByStatus = {
    new: userTickets.filter(t => t.status === 'new').length,
    in_progress: userTickets.filter(t => t.status === 'in_progress').length,
    pending: userTickets.filter(t => t.status === 'pending').length,
    resolved: userTickets.filter(t => t.status === 'resolved').length,
  };
  
  // Combine stats for analytics display
  const analyticsData = {
    averageResolutionTime: baseStats.avgResponseTime,
    firstResponseTime: baseStats.avgResponseTime,
    satisfactionScore: baseStats.satisfaction,
    ticketsByStatus,
    ticketVolume: { weekAgo: userTickets.length },
    topAgents: [],
    weeklyTrends: [
      { day: 'Mon', tickets: 0 },
      { day: 'Tue', tickets: 0 },
      { day: 'Wed', tickets: 0 },
      { day: 'Thu', tickets: 0 },
      { day: 'Fri', tickets: 0 },
      { day: 'Sat', tickets: 0 },
      { day: 'Sun', tickets: 0 },
    ]
  };

  if (user?.role === 'customer') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Access Denied
        </h2>
        <p className="mt-2 text-gray-600">
          Analytics are only available to support team members.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <PageTitle title="Analytics" description="Support team performance metrics and trends" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-dark-100">Analytics Dashboard</h1>
        <div className="flex space-x-4">
          <select className="block w-40 pl-3 pr-10 py-2 text-base border border-dark-600 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <KeyMetrics stats={analyticsData} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
        <TicketDistribution stats={analyticsData} />
        <TopAgents agents={analyticsData.topAgents} />
        <WeeklyTrends trends={analyticsData.weeklyTrends} />
      </div>
    </div>
  );
}