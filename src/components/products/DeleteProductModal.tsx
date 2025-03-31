import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types';

interface DeleteProductModalProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProductModal({
  product,
  onConfirm,
  onCancel,
}: DeleteProductModalProps) {
  return (
    <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
      <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-dark-100">Delete Product</h3>
          <button
            onClick={onCancel}
            className="text-dark-400 hover:text-dark-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-dark-300 mb-6">
          Are you sure you want to delete "{product.name}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-dark-600 rounded-lg text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-error border border-transparent rounded-lg text-sm font-medium text-white hover:bg-error/90"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}