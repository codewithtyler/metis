import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PlusCircle, Search, Filter, Inbox } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { useTickets } from '../hooks/useTickets';
import { customers } from '../data/customers';
import { Category, Product } from '../types';

const getStatusDisplay = (status: string) => {
  const statusMap: Record<string, string> = {
    'new': 'New',
    'in_progress': 'In Progress',
    'pending': 'Pending',
    'resolved': 'Resolved'
  };
  return statusMap[status] || status;
};

export default function TicketList() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  const [selectedProduct] = useLocalStorage<Product | null>('selected_product', null);
  const [categories] = useLocalStorage<Category[]>('categories', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('open');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredTickets = tickets.filter(ticket => {
    // Filter by product
    if (!selectedProduct || ticket.productId !== selectedProduct.id) {
      return false;
    }

    // Filter by status
    const matchesStatus = 
      statusFilter === 'open' ? ['new', 'in_progress', 'pending'].includes(ticket.status) :
      ticket.status === statusFilter;

    // Filter by category
    const matchesCategory = 
      categoryFilter === 'all' || ticket.categoryId === categoryFilter;

    // Filter by search term
    const matchesSearch = !searchTerm || 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Get categories for the selected product
  const productCategories = categories.filter(
    category => category.isEnabled && category.productIds?.includes(selectedProduct?.id || '')
  );

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Unknown Customer';
  };

  const getAssignedAgent = (assignedToId: string | undefined) => {
    if (!assignedToId) return 'Unassigned';
    const agent = users.find(u => u.id === assignedToId);
    return agent?.name || 'Unknown Agent';
  };

  if (!selectedProduct) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Inbox className="h-12 w-12 text-dark-400 mb-4" />
        <h2 className="text-xl font-semibold text-dark-100 mb-2">No Product Selected</h2>
        <p className="text-dark-300 text-center max-w-md">
          Please select a product from the sidebar to view tickets.
        </p>
      </div>
    );
  }
  return (
    <div>
      <PageTitle title="Tickets" description="View and manage support tickets" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-dark-100">
          {selectedProduct.name} - Support Tickets
        </h1>
        {user?.role !== 'agent' && (
          <div className="flex items-center space-x-4">
            <Link
              to="/tickets/new"
              className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors duration-150"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Ticket
            </Link>
          </div>
        )}
      </div>

      <div className="bg-dark-800 shadow-lg rounded-lg border border-dark-700">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 border border-dark-600 rounded-lg leading-5 bg-dark-700 placeholder-dark-400 focus:outline-none focus:placeholder-dark-300 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-dark-100 transition-colors duration-150"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-dark-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-4 py-2.5 border border-dark-600 rounded-lg leading-5 bg-dark-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-dark-100 transition-colors duration-150"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="open">Open Tickets</option>
                  <option value="new">New Tickets</option>
                  <option value="in_progress">In Progress Tickets</option>
                  <option value="pending">Pending Tickets</option>
                  <option value="resolved">Resolved Tickets</option>
                </select>
              </div>
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-dark-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-4 py-2.5 border border-dark-600 rounded-lg leading-5 bg-dark-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-dark-100 transition-colors duration-150"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {productCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <Inbox className="mx-auto h-12 w-12 text-dark-400" />
                <h3 className="mt-2 text-sm font-medium text-dark-100">No Tickets Found</h3>
                <p className="mt-1 text-sm text-dark-400">
                  {searchTerm 
                    ? "No tickets match your search criteria." 
                    : "There are no tickets in this category."}
                </p>
                {user?.role !== 'agent' && (
                  <div className="mt-6">
                    <Link
                      to="/tickets/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
                    >
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Create New Ticket
                    </Link>
                  </div>
                )}
              </div>
            ) : (
            <div className="align-middle inline-block min-w-full">
              <table className="min-w-full">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="px-6 py-3 border-b border-dark-600 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th className="px-6 py-3 border-b border-dark-600 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-dark-600 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 border-b border-dark-600 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                      Status
                    </th>
                    {user?.role !== 'customer' && (
                      <th className="px-6 py-3 border-b border-dark-600 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                        Assigned To
                      </th>
                    )}
                    <th className="px-6 py-3 border-b border-dark-600 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-dark-800 divide-y divide-dark-700">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-dark-100">
                              <Link
                                to={`/tickets/${ticket.id}`}
                                className="hover:text-primary"
                              >
                                {ticket.subject}
                              </Link>
                            </div>
                            <div className="text-sm text-dark-400">
                            <p>{getCustomerName(ticket.customerId)}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                        {getStatusDisplay(ticket.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-400">
                        {productCategories.find(c => c.id === ticket.categoryId)?.name || 'Uncategorized'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ticket.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : ticket.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : ticket.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {getStatusDisplay(ticket.status)}
                        </span>
                      </td>
                      {user?.role !== 'customer' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-400">
                          {getAssignedAgent(ticket.assignedToId)}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-400">
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
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}