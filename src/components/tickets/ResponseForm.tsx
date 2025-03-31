import React from 'react';
import { Send } from 'lucide-react';

interface ResponseFormProps {
  newResponse: string;
  isInternal: boolean;
  userRole: string;
  onResponseChange: (value: string) => void;
  onInternalChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ResponseForm({
  newResponse,
  isInternal,
  userRole,
  onResponseChange,
  onInternalChange,
  onSubmit
}: ResponseFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-dark-800 shadow-lg rounded-lg border border-dark-700">
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-4">
          <label
            htmlFor="response"
            className="block text-sm font-medium text-dark-200"
          >
            Add Response
          </label>
          <textarea
            id="response"
            rows={4}
            className="mt-1 block w-full border border-dark-600 rounded-md shadow-sm py-2 px-3 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm"
            value={newResponse}
            onChange={(e) => onResponseChange(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          {userRole !== 'customer' && (
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-dark-600 rounded bg-dark-700"
                checked={isInternal}
                onChange={(e) => onInternalChange(e.target.checked)}
              />
              <span className="ml-2 text-sm text-dark-300">
                Internal Note
              </span>
            </label>
          )}

          <div className="flex items-center space-x-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Response
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}