import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, ArrowLeft, X } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TicketTemplate, TemplateField } from '../types';
import TemplateCard from '../components/templates/TemplateCard';
import TemplateForm from '../components/templates/TemplateForm';
import DeleteTemplateModal from '../components/templates/DeleteTemplateModal';
import config from '../../config.json';

const DEFAULT_TEMPLATES = [{
  id: 'default',
  name: 'Default Template',
  description: 'Default ticket template with basic fields',
  teamId: 'team1',
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
}];

export default function TemplateManagement() {
  const { user } = useAuth();
  const [templates, setTemplates] = useLocalStorage<TicketTemplate[]>('ticketTemplates', []);
  
  // Initialize default templates if none exist
  React.useEffect(() => {
    if (!templates || templates.length === 0) {
      const userProduct = config.products.find(p => p.teamId === user?.teamId);
      if (userProduct) {
        setTemplates([{
          ...DEFAULT_TEMPLATES[0],
          id: userProduct.defaultTemplateId || 'default',
          teamId: user.teamId
        }]);
      } else {
        setTemplates(DEFAULT_TEMPLATES);
      }
    }
  }, [user?.teamId]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TicketTemplate | null>(null);
  const [error, setError] = useState('');
  const [showDefaultConfirmModal, setShowDefaultConfirmModal] = useState(false);
  const [templateToSetDefault, setTemplateToSetDefault] = useState<TicketTemplate | null>(null);

  // Template form state
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [fields, setFields] = useState<TemplateField[]>([]);

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-dark-100">
          Access Denied
        </h2>
        <p className="mt-2 text-dark-300">
          You don't have permission to manage ticket templates.
        </p>
      </div>
    );
  }

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim()) {
      setError('Template name is required');
      return;
    }

    if (fields.length === 0) {
      setError('At least one field is required');
      return;
    }

    const newTemplate: TicketTemplate = {
      id: `template_${Date.now()}`,
      name: templateName.trim(),
      description: templateDescription.trim(),
      teamId: user.teamId,
      isDefault: false,
      fields,
    };

    setTemplates([...templates, newTemplate]);
    setIsEditing(false);
    resetForm();
  };

  const handleEditTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate || !templateName.trim()) {
      setError('Template name is required');
      return;
    }

    if (fields.length === 0) {
      setError('At least one field is required');
      return;
    }

    const updatedTemplates = templates.map(template =>
      template.id === selectedTemplate.id
        ? {
            ...template,
            name: templateName.trim(),
            description: templateDescription.trim(),
            fields,
          }
        : template
    );

    setTemplates(updatedTemplates);
    setIsEditing(false);
    resetForm();
  };

  const handleDeleteTemplate = () => {
    if (!selectedTemplate || selectedTemplate.isDefault) return;

    const updatedTemplates = templates.filter(
      template => template.id !== selectedTemplate.id
    );

    setTemplates(updatedTemplates);
    setShowDeleteModal(false);
    resetForm();
  };

  const handleSetDefault = (template: TicketTemplate) => {
    setTemplateToSetDefault(template);
    setShowDefaultConfirmModal(true);
  };

  const confirmSetDefault = () => {
    if (!templateToSetDefault) return;

    const updatedTemplates = templates.map(t => ({
      ...t,
      isDefault: t.id === templateToSetDefault.id,
    }));

    setTemplates(updatedTemplates);
    setShowDefaultConfirmModal(false);
    setTemplateToSetDefault(null);
  };

  const resetForm = () => {
    setTemplateName('');
    setTemplateDescription('');
    setFields([]);
    setSelectedTemplate(null);
    setError('');
  };

  const teamTemplates = templates.filter(template => template.teamId === user.teamId);

  return (
    <div>
      <PageTitle title="Template Management" description="Manage ticket templates" />
      
      {isEditing ? (
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
                className="inline-flex items-center text-dark-300 hover:text-dark-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Templates
              </button>
              <h1 className="text-2xl font-semibold text-dark-100">
                {selectedTemplate ? 'Edit Template' : 'Create Template'}
              </h1>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
            <TemplateForm
              isAdd={!selectedTemplate}
              templateName={templateName}
              templateDescription={templateDescription}
              fields={fields}
              error={error}
              onNameChange={setTemplateName}
              onDescriptionChange={setTemplateDescription}
              onFieldsChange={setFields}
              onSubmit={selectedTemplate ? handleEditTemplate : handleAddTemplate}
              onCancel={() => {
                setIsEditing(false);
                resetForm();
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-dark-100">Ticket Templates</h1>
            <button
              onClick={() => {
                setIsEditing(true);
                resetForm();
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors duration-150"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Template
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onEdit={(template) => {
                  setSelectedTemplate(template);
                  setTemplateName(template.name);
                  setTemplateDescription(template.description);
                  setFields(template.fields);
                  setIsEditing(true);
                }}
                onSetDefault={handleSetDefault}
                onDelete={(template) => {
                  setSelectedTemplate(template);
                  setShowDeleteModal(true);
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Delete Template Modal */}
      {showDeleteModal && selectedTemplate && (
        <DeleteTemplateModal
          template={selectedTemplate}
          onConfirm={handleDeleteTemplate}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Set Default Template Modal */}
      {showDefaultConfirmModal && templateToSetDefault && (
        <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
          <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-dark-100">Set Default Template</h3>
              <button
                onClick={() => setShowDefaultConfirmModal(false)}
                className="text-dark-400 hover:text-dark-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-dark-300 mb-6">
              Are you sure you want to set "{templateToSetDefault.name}" as the default template?
              This will remove the default status from the current default template.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDefaultConfirmModal(false)}
                className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmSetDefault}
                className="px-4 py-2 bg-primary border border-transparent rounded-lg text-sm font-medium text-white hover:bg-primary-hover"
              >
                Set as Default
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}