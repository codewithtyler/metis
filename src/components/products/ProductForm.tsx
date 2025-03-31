import React from 'react';
import { X } from 'lucide-react';

interface ProductFormProps {
  isAdd: boolean;
  name: string;
  description: string;
  accessType: 'public' | 'private';
  allowedDomains: string[];
  slug: string;
  slug: string;
  error: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAccessTypeChange: (value: 'public' | 'private') => void;
  onAllowedDomainsChange: (value: string[]) => void;
  onSlugChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ProductForm({
  isAdd,
  name,
  description,
  accessType,
  allowedDomains,
  slug,
  error,
  onNameChange,
  onDescriptionChange,
  onAccessTypeChange,
  onAllowedDomainsChange,
  onSlugChange,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  return (
    <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
      <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-dark-100">
            {isAdd ? 'Add Product' : 'Edit Product'}
          </h3>
          <button
            onClick={onCancel}
            className="text-dark-400 hover:text-dark-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label
                htmlFor="accessType"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                Access Type
              </label>
              <select
                id="accessType"
                value={accessType}
                onChange={(e) => onAccessTypeChange(e.target.value as 'public' | 'private')}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
              >
                <option value="public">Public</option>
                <option value="private">Private (Domain Restricted)</option>
              </select>
            </div>

            {accessType === 'private' && (
              <div>
                <label
                  htmlFor="domains"
                  className="block text-sm font-medium text-dark-200 mb-2"
                >
                  Restricted to Domains
                </label>
                <input
                  type="text"
                  id="domains"
                  value={allowedDomains.join(', ')}
                  onChange={(e) => onAllowedDomainsChange(e.target.value.split(',').map(d => d.trim()))}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
                  placeholder="example.com, another.com"
                />
                <p className="mt-1 text-sm text-dark-400">
                  Only users with these email domains can access this product
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                Product URL
              </label>
              <div className="flex items-center">
                <span className="text-dark-400 mr-2">/products/</span>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  className="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
                  placeholder="my-product"
                />
              </div>
              <p className="mt-1 text-sm text-dark-400">
                Separate domains with commas
              </p>
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-error">{error}</p>}

          <div className="mt-6 flex justify-end space-x-3">
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
              {isAdd ? 'Add Product' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}