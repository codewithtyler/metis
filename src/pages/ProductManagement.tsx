import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Plus } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import ProductForm from '../components/products/ProductForm';
import { useNavigate } from 'react-router-dom';
import DeleteProductModal from '../components/products/DeleteProductModal';
import InviteLinkModal from '../components/products/InviteLinkModal';

export default function ProductManagement() {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, getTeamProducts } = useProducts();
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessType, setAccessType] = useState<'public' | 'private'>('public');
  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);
  const [slug, setSlug] = useState('');

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-dark-100">
          Access Denied
        </h2>
        <p className="mt-2 text-dark-300">
          You don't have permission to manage products.
        </p>
      </div>
    );
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }

    const newProduct: Product = {
      id: `product_${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      teamId: user.teamId,
      accessType,
      allowedDomains: accessType === 'private' ? allowedDomains : undefined,
      slug: slug.trim() || generateSlug(name.trim())
    };

    addProduct(newProduct);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !name.trim()) {
      setError('Product name is required');
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      name: name.trim(),
      description: description.trim(),
      accessType,
      allowedDomains: accessType === 'private' ? allowedDomains : undefined,
      slug: slug.trim() || generateSlug(name.trim())
    };

    updateProduct(updatedProduct);
    setShowEditModal(false);
    resetForm();
  };

  const generateSlug = (text: string): string => {
    const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789-';
    let slug = '';
    
    // Convert to lowercase and replace spaces with hyphens
    const normalized = text.toLowerCase();
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (allowedChars.includes(char)) {
        slug += char;
      } else if (char === ' ') {
        // Only add hyphen if previous char wasn't a hyphen
        if (slug[slug.length - 1] !== '-') {
          slug += '-';
        }
      }
    }
    
    // Remove leading/trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');
    
    return slug || 'untitled';
  };

  const handleDeleteProduct = () => {
    if (!editingProduct) return;
    
    deleteProduct(editingProduct.id);
    setShowDeleteModal(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setAccessType('public');
    setAllowedDomains([]);
    setSlug('');
    setEditingProduct(null);
    setError('');
  };

  const generateInviteLink = (productId: string) => {
    const code = `${user.teamId}-${productId}-${Date.now()}`;
    return `${window.location.origin}/login?invite=${code}`;
  };

  const teamProducts = products.filter(product => product.teamId === user.teamId);

  return (
    <div>
      <PageTitle title="Product Management" description="Manage support products" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-dark-100">Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          aria-label="Add Product"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {teamProducts.length === 0 ? (
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
              onClick={() => setShowAddModal(true)}
              role="button"
              aria-label="Add Product"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(product) => {
                setEditingProduct(product);
                setName(product.name);
                setDescription(product.description);
                setSlug(product.slug);
                setAccessType(product.accessType);
                setAllowedDomains(product.allowedDomains || []);
                setShowEditModal(true);
              }}
              onDelete={(product) => {
                setEditingProduct(product);
                setShowDeleteModal(true);
              }}
              onInvite={(product) => {
                setEditingProduct(product);
                setShowInviteModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddModal || showEditModal) && (
        <ProductForm
          isAdd={!editingProduct}
          name={name}
          description={description}
          accessType={accessType}
          allowedDomains={allowedDomains}
          slug={slug}
          error={error}
          onNameChange={setName}
          onDescriptionChange={setDescription}
          onAccessTypeChange={setAccessType}
          onAllowedDomainsChange={setAllowedDomains}
          onSlugChange={setSlug}
          onSubmit={showAddModal ? handleAddProduct : handleEditProduct}
          onCancel={() => {
            showAddModal ? setShowAddModal(false) : setShowEditModal(false);
            resetForm();
          }}
        />
      )}

      {/* Delete Product Modal */}
      {showDeleteModal && editingProduct && (
        <DeleteProductModal
          product={editingProduct}
          onConfirm={handleDeleteProduct}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Invite Link Modal */}
      {showInviteModal && editingProduct && (
        <InviteLinkModal
          product={editingProduct}
          inviteLink={generateInviteLink(editingProduct.id)}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
}