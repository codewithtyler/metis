import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; 
import { ProductProvider } from '../context/ProductContext';
import { Product, User } from '../types';

// Custom render function that includes providers
export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialProducts = [],
    selectedProduct = null,
    mockUser = {
      id: 'admin1',
      email: 'admin@team.com',
      name: 'John Admin',
      role: 'admin',
      teamId: 'team1',
      productIds: ['product1', 'product2']
    },
    ...renderOptions
  }: {
    initialProducts?: Product[];
    selectedProduct?: Product | null;
    mockUser?: User;
  } = {}
) {
  const storage: Record<string, string> = {
    products: JSON.stringify(initialProducts),
    selected_product: JSON.stringify(selectedProduct),
    auth_user: JSON.stringify(mockUser)
  };

  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
    (key: string) => storage[key] || null
  );
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(
    (key: string, value: string) => {
      storage[key] = value;
    }
  );

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
          {children}
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}