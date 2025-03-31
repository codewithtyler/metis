import React from 'react';
import { Pencil, Trash2, Star } from 'lucide-react';
import { TicketTemplate } from '../../types';

interface TemplateCardProps {
  template: TicketTemplate;
  onEdit: (template: TicketTemplate) => void;
  onDelete: (template: TicketTemplate) => void;
  onSetDefault: (template: TicketTemplate) => void;
}

export default function TemplateCard({ template, onEdit, onDelete, onSetDefault }: TemplateCardProps) {
  return (
    <div className="bg-dark-800 rounded-lg border border-dark-700 shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-dark-100">
                {template.name}
              </h3>
              {template.isDefault && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Default
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-dark-300">
              {template.description}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(template)}
              className="text-dark-300 hover:text-dark-100"
            >
              <Pencil className="h-4 w-4" />
            </button>
            {!template.isDefault && (
              <>
                <button
                  onClick={() => onSetDefault(template)}
                  className="text-dark-300 hover:text-primary"
                  title="Set as default template"
                >
                  <Star className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(template)}
                  className="text-dark-300 hover:text-error"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-dark-200 mb-2">Fields:</h4>
          <ul className="space-y-1">
            {template.fields.map((field) => (
              <li
                key={field.id}
                className="text-sm text-dark-300 flex items-center"
              >
                <span className="w-1/3">{field.label}</span>
                <span className="text-dark-400">({field.type})</span>
                {field.required && (
                  <span className="ml-2 text-xs text-primary">Required</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}