import React from 'react';
import { Plus, X } from 'lucide-react';
import { TemplateField, FieldType } from '../../types';
import TemplateFieldForm from './TemplateFieldForm';

interface TemplateFormProps {
  isAdd: boolean;
  templateName: string;
  templateDescription: string;
  fields: TemplateField[];
  error: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onFieldsChange: (fields: TemplateField[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function TemplateForm({
  isAdd,
  templateName,
  templateDescription,
  fields,
  error,
  onNameChange,
  onDescriptionChange,
  onFieldsChange,
  onSubmit,
  onCancel,
}: TemplateFormProps) {
  const handleAddField = () => {
    const newField: TemplateField = {
      id: `field_${Date.now()}`,
      label: '',
      type: 'text',
      required: false,
    };
    onFieldsChange([...fields, newField]);
  };

  const handleFieldChange = (index: number, field: Partial<TemplateField>) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], ...field };
    onFieldsChange(updatedFields);
  };

  const handleRemoveField = (index: number) => {
    onFieldsChange(fields.filter((_, i) => i !== index));
  };

  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    onFieldsChange(newFields);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="templateName"
            className="block text-sm font-medium text-dark-200 mb-2"
          >
            Template Name
          </label>
          <input
            type="text"
            id="templateName"
            value={templateName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
            placeholder="Enter template name"
          />
        </div>

        <div>
          <label
            htmlFor="templateDescription"
            className="block text-sm font-medium text-dark-200 mb-2"
          >
            Description
          </label>
          <textarea
            id="templateDescription"
            value={templateDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
            placeholder="Enter template description"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-dark-200">Fields</h4>
            <button
              type="button"
              onClick={handleAddField}
              className="inline-flex items-center px-3 py-1.5 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Field
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <TemplateFieldForm
                key={field.id}
                field={field}
                index={index}
                totalFields={fields.length}
                onChange={(changes) => handleFieldChange(index, changes)}
                onRemove={() => handleRemoveField(index)}
                onMove={handleMoveField}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-error">{error}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary border border-transparent rounded-lg text-sm font-medium text-white hover:bg-primary-hover"
          >
            {isAdd ? 'Create Template' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}