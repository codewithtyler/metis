import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AlertCircle } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { useTickets } from '../hooks/useTickets';
import { TicketTemplate, Product, Category } from '../types';
import TicketHeader from '../components/tickets/TicketHeader';
import TicketForm from '../components/tickets/TicketForm';

export default function NewTicket() {
  const { user } = useAuth();
  const { createTicket } = useTickets();
  const navigate = useNavigate();
  const [selectedProduct] = useLocalStorage<Product | null>('selected_product', null);
  const [categories] = useLocalStorage<Category[]>('categories', []);
  const containerMaxWidth = 'max-w-2xl mx-auto px-4';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [templates] = useLocalStorage<TicketTemplate[]>('ticketTemplates', [
    {
        id: selectedProduct?.defaultTemplateId || 'default',
        name: 'Default Template',
        description: 'Default ticket template with basic fields',
        teamId: user.teamId,
        isDefault: true,
        fields: [
          {
            id: 'subject',
            label: 'Subject',
            type: 'text',
            required: true,
            placeholder: 'Enter a brief summary of the issue',
          },
          {
            id: 'category',
            label: 'Category',
            type: 'select',
            required: true,
            placeholder: 'Select a category',
            helpText: 'Choose the category that best matches your issue',
          },
          {
            id: 'description',
            label: 'Description',
            type: 'textarea',
            required: true,
            placeholder: 'Provide detailed information about your issue',
            helpText: 'Include any relevant details that will help us understand and resolve your issue',
          },
          {
            id: 'attachments',
            label: 'Attachments',
            type: 'file',
            required: false,
            helpText: 'Upload any relevant files (images, documents, etc.)',
          },
        ],
    }
  ]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [error, setError] = useState('');

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
  const defaultTemplate = templates.find(t => 
    t.isDefault && 
    t.teamId === user.teamId
  );

  if (!defaultTemplate) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-error mb-4" />
        <h2 className="text-xl font-semibold text-dark-100 mb-2">No Default Template</h2>
        <p className="text-dark-300 text-center max-w-md">
          A default template is required to create tickets. Please contact your administrator.
        </p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-error mb-4" />
        <h2 className="text-xl font-semibold text-dark-100 mb-2">No Product Selected</h2>
        <p className="text-dark-300 text-center max-w-md">
          Please select a product from the sidebar to create a ticket.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate required fields
    const missingFields = defaultTemplate.fields
      .filter(field => field.required && !formData[field.id])
      .map(field => field.label);

    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    // Create the ticket
    const newTicket = createTicket({
      subject: formData.subject || '',
      description: formData.description || '',
      templateId: defaultTemplate.id,
      productId: selectedProduct.id,
      customFields: formData,
      categoryId: formData.category || '',
      customerId: user.id,
      teamId: user.teamId,
    });

    setIsSubmitting(false);
    navigate(`/tickets/${newTicket.id}`);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  return (
    <div>
      <PageTitle title="New Ticket" description="Create a new support ticket" />
      <TicketHeader 
        title={`New Support Ticket - ${selectedProduct.name}`} 
        containerMaxWidth={containerMaxWidth} 
      />
      <div className={containerMaxWidth}>
        <TicketForm
          fields={defaultTemplate.fields}
          formData={formData}
          error={error}
          isSubmitting={isSubmitting}
          categories={productCategories}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/tickets')}
        />
      </div>
    </div>
  );
}