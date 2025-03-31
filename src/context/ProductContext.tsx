import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  showProductNav: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  selectProduct: (product: Product | null) => void;
  getTeamProducts: () => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [selectedProduct, setSelectedProduct] = useLocalStorage<Product | null>('selected_product', null);
  const [showProductNav, setShowProductNav] = useState(false);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    // If selected product is not in accessible products, clear it
    const accessibleProducts = products.filter(product => {
      if (user?.role === 'admin') {
        return product.teamId === user?.teamId;
      }
      return user?.productIds?.includes(product.id);
    });

    // Step 5: Log product context effect
    console.log('Step 5: Product Context Effect', {
      accessibleProducts,
      selectedProduct,
      userRole: user?.role,
      userTeamId: user?.teamId
    });

    if (selectedProduct && !accessibleProducts.find(p => p.id === selectedProduct.id)) {
      setSelectedProduct(null);
    }
  }, [products, user, selectedProduct]);

  const getTeamProducts = () => {
    return products.filter(product => product.teamId === user?.teamId);
  };

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );

    // Update selected product if deleted
    if (selectedProduct?.id === productId) {
      const teamProducts = getTeamProducts().filter(p => p.id !== productId);
      setSelectedProduct(teamProducts[0] || null);
    }
  };

  const selectProduct = (product: Product | null) => {
    // Step 6: Log product selection attempt
    console.log('Step 6: Selecting Product', {
      product,
      userRole: user?.role,
      userTeamId: user?.teamId,
      userProductIds: user?.productIds
    });

    if (!product) {
      console.log('Step 7: Clearing selected product');
      setSelectedProduct(null);
      setShowProductNav(false);
      return;
    }

    // Verify product is accessible before selecting
    const canAccess = user?.role === 'admin' ? 
      product.teamId === user?.teamId :
      user?.productIds?.includes(product.id);

    // Step 8: Log access check
    console.log('Step 8: Access Check', {
      canAccess,
      productTeamId: product.teamId,
      userTeamId: user?.teamId,
      productId: product.id
    });

    if (canAccess) {
      setSelectedProduct(product);
      setShowProductNav(true);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        showProductNav,
        addProduct,
        updateProduct,
        deleteProduct,
        selectProduct,
        getTeamProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}