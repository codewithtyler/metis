import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Link as LinkIcon } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onInvite: (product: Product) => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  onInvite,
}: ProductCardProps) {
  return (
    <div className="bg-dark-800 rounded-lg border border-dark-700 shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-dark-100">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-dark-300">
              {product.description}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onInvite(product)}
              className="text-dark-300 hover:text-dark-100"
              title="Get invite link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(product)}
              className="text-dark-300 hover:text-dark-100"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="text-dark-300 hover:text-error"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-dark-400">
            Access Type: {product.accessType}
            {product.accessType === 'private' && (
              <div className="mt-1">
                Allowed Domains: {product.allowedDomains?.join(', ')}
              </div>
            )}
            <div className="mt-1">
              Product URL: <Link to={`/products/${product.slug}`} className="text-primary hover:text-primary-hover">{product.slug}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}