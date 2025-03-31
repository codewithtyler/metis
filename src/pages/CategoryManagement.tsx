import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Category, Product } from '../types';
import CategoryTable from '../components/categories/CategoryTable';
import { AddEditModal, DeleteModal, ProductsModal } from '../components/categories/CategoryModals';

const getDefaultCategories = (teamId: string) => ([
  {
    id: 'billing',
    name: 'Billing Issue',
    teamId,
    productIds: [] as string[],
    isDefault: true,
    isEnabled: true
  },
  {
    id: 'general',
    name: 'General Question',
    teamId,
    productIds: [] as string[],
    isDefault: true,
    isEnabled: true
  },
  {
    id: 'technical',
    name: 'Technical Question',
    teamId,
    productIds: [] as string[],
    isDefault: true,
    isEnabled: true
  }
]);

export default function CategoryManagement() {
  const { user } = useAuth();
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', []);
  const [products] = useLocalStorage<Product[]>('products', []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryProducts, setNewCategoryProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [error, setError] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Initialize default categories if none exist
  React.useEffect(() => {
    if (categories.length === 0) {
      setCategories(getDefaultCategories(user.teamId));
    }
  }, [user.teamId]);

  // Get products the user has access to
  const accessibleProducts = products.filter(product => {
    // Admin can see all team products
    if (user.role === 'admin') {
      return product.teamId === user.teamId;
    }
    
    // Other users can only see products they have access to
    return user.productIds?.includes(product.id);
  });

  const teamCategories = categories.filter(cat => cat.teamId === user?.teamId);

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-dark-100">
          Access Denied
        </h2>
        <p className="mt-2 text-dark-300">
          You don't have permission to manage categories.
        </p>
      </div>
    );
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      name: newCategoryName.trim(),
      teamId: user.teamId,
      productIds: newCategoryProducts,
      isEnabled: true
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryProducts([]);
    setShowAddModal(false);
    setError('');
  };

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    const updatedCategories = categories.map(cat =>
      cat.id === selectedCategory.id
        ? { ...cat, name: newCategoryName.trim(), productIds: newCategoryProducts }
        : cat
    );

    setCategories(updatedCategories);
    setNewCategoryName('');
    setNewCategoryProducts([]);
    setSelectedCategory(null);
    setShowEditModal(false);
    setError('');
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.filter(
      cat => cat.id !== selectedCategory.id
    );

    setCategories(updatedCategories);
    setSelectedCategory(null);
    setShowDeleteModal(false);
  };

  const handleDuplicate = (category: Category) => {
    const newCategory: Category = {
      ...category,
      id: `cat_${Date.now()}`,
      name: `${category.name} (Copy)`,
      isDefault: false
    };
    setCategories([...categories, newCategory]);
  };

  const handleToggleEnabled = (categoryId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, isEnabled: !cat.isEnabled } : cat
    );
    setCategories(updatedCategories);
  };

  const handleProductsSubmit = () => {
    if (!selectedCategory) return;

    // Ensure selectedProducts is initialized
    const updatedProducts = selectedProducts || [];

    const updatedCategories = categories.map(cat =>
      cat.id === selectedCategory.id
        ? { ...cat, productIds: updatedProducts }
        : cat
    );

    setCategories(updatedCategories);
    setShowProductsModal(false);
    setSelectedProducts([]);
    setSelectedCategory(null);
  };

  return (
    <div>
      <PageTitle title="Category Management" description="Manage support ticket categories" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-dark-100">Categories</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors duration-150"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      <CategoryTable
        categories={teamCategories}
        onEdit={(category) => {
          setSelectedCategory(category);
          setNewCategoryName(category.name);
          setNewCategoryProducts(category.productIds || []);
          setShowEditModal(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setShowDeleteModal(true);
        }}
        onDuplicate={handleDuplicate}
        onToggleEnabled={handleToggleEnabled}
        onManageProducts={(category) => {
          setSelectedCategory(category);
          setSelectedProducts(category.productIds);
          setShowProductsModal(true);
        }}
      />

      {/* Add Category Modal */}
      {showAddModal && (
        <AddEditModal
          isEdit={false}
          categoryName={newCategoryName}
          products={accessibleProducts}
          selectedProducts={newCategoryProducts}
          onNameChange={setNewCategoryName}
          onProductsChange={setNewCategoryProducts}
          onSubmit={handleAddCategory}
          onClose={() => setShowAddModal(false)}
          error={error}
        />
      )}

      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <AddEditModal
          isEdit={true}
          categoryName={newCategoryName}
          products={accessibleProducts}
          selectedProducts={newCategoryProducts}
          onNameChange={setNewCategoryName}
          onProductsChange={setNewCategoryProducts}
          onSubmit={handleEditCategory}
          onClose={() => setShowEditModal(false)}
          error={error}
        />
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && selectedCategory && (
        <DeleteModal
          category={selectedCategory}
          onConfirm={handleDeleteCategory}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {/* Product Assignment Modal */}
      {showProductsModal && selectedCategory && (
        <ProductsModal
          category={selectedCategory}
          products={accessibleProducts}
          selectedProducts={selectedProducts}
          onProductsChange={setSelectedProducts}
          onSubmit={handleProductsSubmit}
          onClose={() => {
            setShowProductsModal(false);
            setSelectedProducts([]);
          }}
        />
      )}
    </div>
  );
}