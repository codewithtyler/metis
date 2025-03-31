import React from 'react';
import { TemplateField, Category } from '../../types';
import TicketFormField from './TicketFormField';

interface TicketFormProps {
  fields: TemplateField[];
  formData: Record<string, any>;
  categories: Category[];
  error: string;
  isSubmitting: boolean;
  onFieldChange: (fieldId: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function TicketForm({
  fields,
  formData,
  categories,
  error,
  isSubmitting,
  onFieldChange,
  onSubmit,
  onCancel,
}: TicketFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-dark-200 mb-1"
          >
            {field.label}
            {field.required && <span className="text-error ml-1">*</span>}
          </label>
          {field.helpText && (
            <p className="mt-1 text-sm text-dark-400">{field.helpText}</p>
          )}
          {field.id === 'category' ? (
            <select
              id={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => onFieldChange(field.id, e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-dark-600 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option value="">{field.placeholder || 'Select a category'}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : (
            <TicketFormField
              field={field}
              value={formData[field.id]}
              onChange={(value) => onFieldChange(field.id, value)}
            />
          )}
        </div>
      ))}

      {error && (
        <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-dark-600 rounded-md text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
}