import React from 'react';
import { X } from 'lucide-react';
import { Category, Product } from '../../types';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Modal({ onClose, children, title }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
      <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-dark-100">{title}</h3>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-dark-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface AddEditModalProps {
  isEdit: boolean;
  categoryName: string;
  products: Product[];
  selectedProducts: string[];
  onNameChange: (name: string) => void;
  onProductsChange: (products: string[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  error?: string;
}

export function AddEditModal({
  isEdit,
  categoryName,
  products,
  selectedProducts,
  onNameChange,
  onProductsChange,
  onSubmit,
  onClose,
  error,
}: AddEditModalProps) {
  return (
    <Modal title={`${isEdit ? 'Edit' : 'Add'} Category`} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-dark-200 mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-100 focus:ring-primary focus:border-primary"
            placeholder="Enter category name"
          />
          {error && <p className="mt-2 text-sm text-error">{error}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark-200 mb-2">
            Assign Products
          </label>
          <div className="border border-dark-600 rounded-lg">
            {products.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-sm text-dark-400">
                  No products available. Create a product first to assign it to this category.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto p-2">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center p-2 hover:bg-dark-700 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onProductsChange([...selectedProducts, product.id]);
                        } else {
                          onProductsChange(selectedProducts.filter(id => id !== product.id));
                        }
                      }}
                      className="h-4 w-4 text-primary focus:ring-primary border-dark-600 rounded bg-dark-700"
                    />
                    <div className="ml-3">
                      <span className="text-sm font-medium text-dark-100">{product.name}</span>
                      <p className="text-xs text-dark-400">{product.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary border border-transparent rounded-lg text-sm font-medium text-white hover:bg-primary-hover"
          >
            {isEdit ? 'Save Changes' : 'Add Category'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

interface DeleteModalProps {
  category: Category;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteModal({ category, onConfirm, onClose }: DeleteModalProps) {
  return (
    <Modal title="Delete Category" onClose={onClose}>
      <p className="text-dark-300 mb-6">
        Are you sure you want to delete the category "{category.name}"? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-error border border-transparent rounded-lg text-sm font-medium text-white hover:bg-error/90"
        >
          Delete Category
        </button>
      </div>
    </Modal>
  );
}

interface ProductsModalProps {
  category: Category;
  products: Product[];
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function ProductsModal({
  category,
  products,
  selectedProducts,
  onProductsChange,
  onSubmit,
  onClose,
}: ProductsModalProps) {
  return (
    <Modal title={`Assign Products to ${category.name}`} onClose={onClose}>
      <div className="mb-6">
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {products.map((product) => (
            <label key={product.id} className="flex items-center p-2 hover:bg-dark-700 rounded-lg">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onProductsChange([...selectedProducts, product.id]);
                  } else {
                    onProductsChange(selectedProducts.filter(id => id !== product.id));
                  }
                }}
                className="h-4 w-4 text-primary focus:ring-primary border-dark-600 rounded bg-dark-700"
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-dark-100">{product.name}</span>
                <p className="text-xs text-dark-400">{product.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-primary border border-transparent rounded-lg text-sm font-medium text-white hover:bg-primary-hover"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
}