import React from 'react';
import { Plus } from 'lucide-react';

interface EmptyProductStateProps {
  onAddClick: () => void;
}

export default function EmptyProductState({ onAddClick }: EmptyProductStateProps) {
  return (
    <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
      <div className="mx-auto h-12 w-12 text-dark-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      </div>
      <h3 className="mt-2 text-sm font-medium text-dark-100">No Products</h3>
      <p className="mt-1 text-sm text-dark-400">
        Get started by creating your first product.
      </p>
      <div className="mt-6">
        <button
          onClick={onAddClick}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>
    </div>
  );
}