import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

interface ProductSwitcherProps { 
  isCollapsed: boolean;
}

export default function ProductSwitcher({ isCollapsed }: ProductSwitcherProps) {
  const { user } = useAuth();
  const { products, selectedProduct, selectProduct, getTeamProducts } = useProducts();
  const [isOpen, setIsOpen] = React.useState(false);

  // Step 1: Log initial state
  React.useEffect(() => {
    console.log('Step 1: ProductSwitcher Mount', {
      user,
      selectedProduct,
      productsCount: products.length
    });
  }, []);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Get products the user has access to
  const accessibleProducts = products.filter(product => {
    // Admin can see all team products
    if (user?.role === 'admin') {
      return product.teamId === user.teamId;
    }
    
    // Other users can only see products they have access to
    return user?.productIds?.includes(product.id);
  });

  // Step 2: Log accessible products
  React.useEffect(() => {
    console.log('Step 2: Accessible Products', {
      accessibleProducts,
      userRole: user?.role,
      teamId: user?.teamId
    });
  }, [accessibleProducts, user]);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderDropdownContent = () => {
    // Step 3: Log dropdown render
    console.log('Step 3: Rendering Dropdown', {
      accessibleProducts,
      selectedProduct
    });
    // Add "Select Product" option
    const options = [
      <button
        key="select-product"
        onClick={() => {
          selectProduct(null);
          setIsOpen(false);
        }}
        className={`w-full text-left px-4 py-2 text-sm text-dark-400 hover:bg-dark-600 transition-colors duration-150 ${
          !selectedProduct?.id ? 'font-medium bg-dark-700' : ''
        }`}
      >
        Select Product
      </button>
    ];

    if (accessibleProducts.length === 0) {
      options.push(
        <div key="no-products" className="px-4 py-2 text-sm text-dark-400">No products available</div>
      );
      return options;
    }

    return [...options, ...accessibleProducts.map((product) => (
      <button 
        key={product.id}
        onClick={() => {
          // Step 4: Log product selection
          console.log('Step 4: Product Selected', {
            product,
            previousSelection: selectedProduct
          });
          selectProduct(product);
          setIsOpen(false);
        }}
        className={`w-full text-left px-4 py-2 text-sm text-dark-100 hover:bg-dark-600 transition-colors duration-150
          ${selectedProduct?.id === product.id ? 'font-medium bg-dark-700' : ''}`}
      >
        {product.name}
      </button>
    ))];
  };

  if (isCollapsed) {
    return (
      <div className="px-2 mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-150"
          title={selectedProduct?.name || 'Select Product'}
        >
          <span className="text-lg font-medium text-dark-100">
            {selectedProduct?.name.charAt(0) || '?'}
          </span>
        </button>
        
        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute left-14 mt-2 w-56 rounded-lg bg-dark-700 shadow-lg border border-dark-600 py-1 z-50"
          >
            {renderDropdownContent()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-2 mb-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${
          selectedProduct?.id ? 'bg-dark-700' : 'bg-dark-800 border border-dark-600'
        } text-dark-100 transition-colors duration-150`}
      >
        <span className="text-sm font-medium text-dark-100">
          {selectedProduct?.id ? selectedProduct.name : (
            <span className="text-dark-400">Select Product</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 mx-3 rounded-lg bg-dark-700 shadow-lg border border-dark-600 py-1">
          {renderDropdownContent()}
        </div>
      )}
    </div>
  );
}