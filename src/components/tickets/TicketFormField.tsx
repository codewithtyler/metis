import React from 'react';
import { Upload } from 'lucide-react';
import { TemplateField } from '../../types';

const ALLOWED_FILE_TYPES = ['.pdf', '.jpg', '.png'];

interface TicketFormFieldProps {
  field: TemplateField;
  value: any;
  onChange: (value: any) => void;
}

export default function TicketFormField({ field, value, onChange }: TicketFormFieldProps) {
  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          id={field.id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full border border-dark-600 rounded-lg shadow-sm py-2.5 px-4 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-150"
          placeholder={field.placeholder}
        />
      );

    case 'textarea':
      return (
        <textarea
          id={field.id}
          rows={4}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full border border-dark-600 rounded-lg shadow-sm py-2.5 px-4 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-150"
          placeholder={field.placeholder}
        />
      );

    case 'select':
      return (
        <select
          id={field.id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-dark-600 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="">{field.placeholder || 'Select an option'}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    case 'radio':
      return (
        <div className="mt-2 space-y-2">
          {field.options?.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={field.id}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary border-dark-600 bg-dark-700"
              />
              <span className="ml-2 text-sm text-dark-200">{option}</span>
            </label>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <div className="mt-2 space-y-2">
          {field.options?.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                checked={value?.includes(option)}
                onChange={(e) => {
                  const currentValues = value || [];
                  const newValues = e.target.checked
                    ? [...currentValues, option]
                    : currentValues.filter((v: string) => v !== option);
                  onChange(newValues);
                }}
                className="h-4 w-4 text-primary focus:ring-primary border-dark-600 rounded bg-dark-700"
              />
              <span className="ml-2 text-sm text-dark-200">{option}</span>
            </label>
          ))}
        </div>
      );

    case 'file':
      return (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dark-600 border-dashed rounded-md bg-dark-800">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-dark-400" />
            <div className="flex text-sm text-dark-300">
              <label
                htmlFor={field.id}
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
              >
                <span>Upload files</span>
                <input
                  id={field.id}
                  type="file"
                  className="sr-only"
                  multiple
                  accept={field.options?.join(',') || ALLOWED_FILE_TYPES.join(',')}
                  onChange={(e) => onChange(e.target.files)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-dark-400">
              Allowed types: {(field.options || ALLOWED_FILE_TYPES).join(', ')}
            </p>
          </div>
        </div>
      );

    case 'date':
      return (
        <input
          type="date"
          id={field.id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full border border-dark-600 rounded-lg shadow-sm py-2.5 px-4 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-150"
        />
      );

    default:
      return null;
  }
}