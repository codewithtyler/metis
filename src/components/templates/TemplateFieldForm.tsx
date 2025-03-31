import React from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react';
import { TemplateField, FieldType } from '../../types';

const ALLOWED_FILE_TYPES = ['.pdf', '.jpg', '.png'];

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Single Line Text' },
  { value: 'textarea', label: 'Multi-line Text' },
  { value: 'file', label: 'File Attachment' },
  { value: 'select', label: 'Dropdown' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'date', label: 'Date' },
];

interface TemplateFieldFormProps {
  field: TemplateField;
  index: number;
  totalFields: number;
  onChange: (changes: Partial<TemplateField>) => void;
  onRemove: () => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

export default function TemplateFieldForm({
  field,
  index,
  totalFields,
  onChange,
  onRemove,
  onMove,
}: TemplateFieldFormProps) {
  return (
    <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => onMove(index, 'up')}
              disabled={index === 0}
              className="text-dark-400 hover:text-dark-300 disabled:opacity-50"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onMove(index, 'down')}
              disabled={index === totalFields - 1}
              className="text-dark-400 hover:text-dark-300 disabled:opacity-50"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-1">
              Field Label
            </label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => onChange({ label: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
              placeholder="Enter field label"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200 mb-1">
              Field Type
            </label>
            <select
              value={field.type}
              onChange={(e) => onChange({ type: e.target.value as FieldType })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
            >
              {FIELD_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {(field.type === 'select' ||
            field.type === 'radio' ||
            field.type === 'checkbox') && (
            <div className="md:col-span-2 relative">
              <label className="block text-sm font-medium text-dark-200 mb-1">
                Options
              </label>
              <div className="space-y-2">
                {field.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])];
                        newOptions[optionIndex] = e.target.value;
                        onChange({ options: newOptions });
                      }}
                      className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = field.options?.filter((_, i) => i !== optionIndex);
                        onChange({ options: newOptions });
                      }}
                      className="text-dark-400 hover:text-error p-2 rounded-lg hover:bg-dark-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newOptions = [...(field.options || []), ''];
                    onChange({ options: newOptions });
                  }}
                  className="inline-flex items-center px-3 py-1.5 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </button>
              </div>
            </div>
          )}

          {field.type === 'file' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-200 mb-1">
                Allowed File Types
              </label>
              <div className="flex flex-wrap gap-2">
                {ALLOWED_FILE_TYPES.map((type) => (
                  <label
                    key={type}
                    className="inline-flex items-center"
                  >
                    <input
                      type="checkbox"
                      checked={field.options?.includes(type) || false}
                      onChange={(e) => {
                        const newOptions = e.target.checked
                          ? [...(field.options || []), type]
                          : (field.options || []).filter(opt => opt !== type);
                        onChange({ options: newOptions });
                      }}
                      className="h-4 w-4 text-primary focus:ring-primary border-dark-600 rounded bg-dark-800 mr-2"
                    />
                    <span className="text-sm text-dark-200">{type}</span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-dark-400">
                Select the allowed file types for this attachment field
              </p>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-dark-200 mb-1">
              Help Text (optional)
            </label>
            <input
              type="text"
              value={field.helpText || ''}
              onChange={(e) => onChange({ helpText: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
              placeholder="Enter help text"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => onChange({ required: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-dark-600 rounded bg-dark-800"
              />
              <span className="text-sm text-dark-200">Required field</span>
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 text-dark-400 hover:text-error"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}