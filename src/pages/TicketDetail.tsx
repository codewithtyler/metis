import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTickets } from '../hooks/useTickets';
import { customers } from '../data/customers';
import { Category, Product, User } from '../types';
import { AlertCircle } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import TicketHeader from '../components/tickets/TicketHeader';
import TicketDescription from '../components/tickets/TicketDescription';
import TicketActions from '../components/tickets/TicketActions';
import ResponseList from '../components/tickets/ResponseList';
import ResponseForm from '../components/tickets/ResponseForm';
import RatingModal from '../components/tickets/RatingModal';
import EscalationModal from '../components/tickets/EscalationModal';

export default function TicketDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct] = useLocalStorage<Product | null>('selected_product', null);
  const [categories] = useLocalStorage<Category[]>('categories', []);
  const [users] = useLocalStorage<User[]>('users', []);
  
  // Form state
  const [newResponse, setNewResponse] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  
  // Modal state
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');
  
  // Status state
  const [pendingStatus, setPendingStatus] = useState('');

  const { tickets, getTicketResponses, updateTicket, addResponse, assignTicket, escalateTicket } = useTickets();
  const ticket = tickets.find((t) => t.id === id);
  const responses = ticket ? getTicketResponses(ticket.id) : [];

  // Redirect if no product is selected
  React.useEffect(() => {
    if (!selectedProduct) {
      navigate('/dashboard');
    }
  }, [selectedProduct, navigate]);

  // Get categories for the selected product
  const productCategories = categories.filter(category => 
    category.isEnabled && 
    category.productIds?.includes(selectedProduct?.id || '')
  );

  const getResponseUser = (userId: string) => {
    const responseUser = users.find(u => u.id === userId);
    return responseUser?.name || 'Unknown User';
  };

  const getAvailableAgents = () => {
    return users.filter(u => 
      (u.role === 'agent' || u.role === 'admin') && 
      u.teamId === ticket?.teamId
    );
  };

  const customer = customers.find(c => c.id === ticket?.customerId);
  const category = productCategories.find(c => c.id === ticket?.categoryId);

  // Handle no product selected
  if (!selectedProduct) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-error mb-4" />
        <h2 className="text-xl font-semibold text-dark-100 mb-2">No Product Selected</h2>
        <p className="text-dark-300 text-center max-w-md">
          Please select a product from the sidebar to view tickets.
        </p>
      </div>
    );
  }

  // Handle ticket not found
  if (!ticket || ticket.productId !== selectedProduct.id) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-error mb-4" />
        <h2 className="text-xl font-semibold text-dark-100 mb-2">Ticket Not Found</h2>
        <p className="text-dark-300 text-center max-w-md">
          The ticket you're looking for doesn't exist or you don't have access to it.
        </p>
      </div>
    );
  }

  // Event handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResponse.trim()) return;

    addResponse({
      ticketId: ticket.id,
      userId: user.id,
      content: newResponse.trim(),
      isInternal
    });

    setNewResponse('');
    setIsInternal(false);
  };

  const handleStatusChange = (status: string) => {
    setPendingStatus(status);
  };

  const handleStatusSave = () => {
    if (!pendingStatus) return;
    updateTicket(ticket.id, { status: pendingStatus });
    setPendingStatus('');

    if (pendingStatus === 'resolved' && user.role === 'agent') {
      setShowRating(true);
    }
  };

  const handleRatingSubmit = () => {
    if (rating > 0) {
      updateTicket(ticket.id, { satisfaction: rating });
    }
    setShowRating(false);
  };

  const handleEscalate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!escalationReason.trim()) return;

    escalateTicket(ticket.id, escalationReason.trim());
    setShowEscalateModal(false);
    setEscalationReason('');
  };

  // Render ticket detail page
  return (
    <div className="max-w-7xl mx-auto">
      <PageTitle 
        title={`${selectedProduct.name} - Ticket: ${ticket.subject}`}
        description={`${selectedProduct.name} support ticket - ${ticket.subject}`}
      />

      <TicketHeader
        ticket={ticket}
        product={selectedProduct}
        category={category}
        customerName={customer?.name || 'Unknown Customer'}
      />

      <TicketActions
        status={ticket.status}
        pendingStatus={pendingStatus}
        userRole={user.role}
        assignedToId={ticket.assignedToId}
        availableAgents={getAvailableAgents()}
        onStatusChange={handleStatusChange}
        onStatusSave={handleStatusSave}
        onAssign={(userId) => assignTicket(ticket.id, userId)}
        onEscalate={() => setShowEscalateModal(true)}
        currentUserId={user.id}
      />

      <TicketDescription description={ticket.description} />
      
      <ResponseList
        responses={responses}
        getResponseUser={getResponseUser}
      />

      <ResponseForm
        newResponse={newResponse}
        isInternal={isInternal}
        userRole={user.role}
        onResponseChange={setNewResponse}
        onInternalChange={setIsInternal}
        onSubmit={handleSubmit}
      />

      {/* Modals */}
      {showRating && (
        <RatingModal
          rating={rating}
          onRatingChange={setRating}
          onSubmit={handleRatingSubmit}
          onClose={() => setShowRating(false)}
        />
      )}

      {showEscalateModal && (
        <EscalationModal
          reason={escalationReason}
          onReasonChange={setEscalationReason}
          onSubmit={handleEscalate}
          onClose={() => setShowEscalateModal(false)}
        />
      )}
    </div>
  );
}