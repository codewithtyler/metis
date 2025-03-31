import { useLocalStorage } from './useLocalStorage';
import { Ticket, TicketResponse } from '../types';
import { useAuth } from '../context/AuthContext';

export function useTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useLocalStorage<Ticket[]>('tickets', []);
  const [responses, setResponses] = useLocalStorage<TicketResponse[]>('ticket_responses', []);

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'queueType'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket_${Date.now()}`,
      status: 'new',
      queueType: 'agent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTickets([...tickets, newTicket]);
    return newTicket;
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
  };

  const addResponse = (response: Omit<TicketResponse, 'id' | 'createdAt'>) => {
    const newResponse: TicketResponse = {
      ...response,
      id: `response_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setResponses([...responses, newResponse]);
    return newResponse;
  };

  const assignTicket = (ticketId: string, userId: string) => {
    updateTicket(ticketId, {
      assignedToId: userId,
      status: 'in_progress',
    });
  };

  const escalateTicket = (ticketId: string, reason: string) => {
    updateTicket(ticketId, {
      queueType: 'admin',
      escalationReason: reason,
      assignedToId: undefined, // Remove current assignment
    });
  };

  const closeTicket = (ticketId: string) => {
    updateTicket(ticketId, {
      status: 'resolved',
    });
  };

  const getTicketResponses = (ticketId: string) => {
    return responses.filter(response => response.ticketId === ticketId);
  };

  const getUserTickets = () => {
    return tickets.filter(ticket => {
      if (user?.role === 'customer') {
        return ticket.customerId === user.id;
      }
      return user?.teamId === ticket.teamId;
    });
  };

  return {
    tickets: getUserTickets(),
    createTicket,
    updateTicket,
    addResponse,
    assignTicket,
    escalateTicket,
    closeTicket,
    getTicketResponses,
  };
}