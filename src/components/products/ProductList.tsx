import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import EmptyProductState from './EmptyProductState';

interface ProductListProps {
  products: Product[];
  onAddClick: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onInviteProduct: (product: Product) => void;
}

export default function ProductList({
  products,
  onAddClick,
  onEditProduct,
  onDeleteProduct,
  onInviteProduct,
}: ProductListProps) {
  if (products.length === 0) {
    return <EmptyProductState onAddClick={onAddClick} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
          onInvite={onInviteProduct}
        />
      ))}
    </div>
  );
}