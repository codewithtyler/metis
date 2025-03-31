import { Ticket } from '../types';

export function getDashboardStats(tickets: Ticket[]) {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status !== 'resolved').length;
  
  // Calculate average response time
  const responseTimes = tickets
    .filter(t => t.firstResponseAt)
    .map(t => new Date(t.firstResponseAt).getTime() - new Date(t.createdAt).getTime());
  const avgResponseTime = responseTimes.length > 0
    ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / (1000 * 60 * 60))
    : null;
  
  // Calculate satisfaction score
  const ratedTickets = tickets.filter(t => t.satisfaction);
  const satisfaction = ratedTickets.length > 0
    ? Math.round((ratedTickets.reduce((a, b) => a + b.satisfaction!, 0) / ratedTickets.length) * 100)
    : null;

  return {
    totalTickets,
    openTickets,
    avgResponseTime: avgResponseTime ? `${avgResponseTime}h` : 'No data',
    satisfaction: satisfaction ? `${satisfaction}%` : 'Not available'
  };
}

export const analyticsStats = {
  averageResolutionTime: null,
  firstResponseTime: null,
  satisfactionScore: null,
  ticketVolume: {
    today: 0,
    yesterday: 0,
    weekAgo: 0,
  },
  ticketsByStatus: {
    new: 0,
    in_progress: 0,
    pending: 0,
    resolved: 0,
  },
  topAgents: [],
  weeklyTrends: [
    { day: 'Mon', tickets: 0 },
    { day: 'Tue', tickets: 0 },
    { day: 'Wed', tickets: 0 },
    { day: 'Thu', tickets: 0 },
    { day: 'Fri', tickets: 0 },
    { day: 'Sat', tickets: 0 },
    { day: 'Sun', tickets: 0 },
  ],
};