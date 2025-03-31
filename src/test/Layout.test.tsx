import { describe, it, expect, vi } from 'vitest';
import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from '../components/Layout';
import { TestWrapper } from './setup';

// Mock data
const mockProducts = [
  {
    id: 'product1',
    name: 'Test Product 1',
    description: 'Test Description 1',
    teamId: 'team1',
    accessType: 'public',
    slug: 'test-product-1',
  },
  {
    id: 'product2',
    name: 'Test Product 2',
    description: 'Test Description 2',
    teamId: 'team1',
    accessType: 'public',
    slug: 'test-product-2',
  },
];

function renderWithProviders(
  ui: React.ReactElement,
  {
    initialProducts = mockProducts,
    selectedProduct = null,
    mockUser = {
      id: 'admin1',
      email: 'admin@team.com',
      name: 'John Admin',
      role: 'admin',
      teamId: 'team1',
      productIds: ['product1', 'product2']
    }
  } = {}
) {
  // Mock localStorage
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

  return render(ui, { wrapper: TestWrapper });
}

describe('Layout Component', () => {
  it('shows admin navigation for admin users', () => {
    renderWithProviders(<Layout>Test Content</Layout>, {
      mockUser: {
        id: 'admin1',
        email: 'admin@team.com',
        name: 'John Admin',
        role: 'admin'
        teamId: 'team1',
        productIds: ['product1', 'product2']
      }
    });

    // Admin navigation items should be visible
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
  });

  it('hides admin navigation for non-admin users', () => {
    renderWithProviders(<Layout>Test Content</Layout>, {
      mockUser: {
        id: 'agent1',
        email: 'agent@team.com',
        name: 'Sarah Agent',
        role: 'agent',
        teamId: 'team1',
        productIds: ['product1']
      }
    });

    // Should only see Dashboard
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Products')).not.toBeInTheDocument();
  });

  it('shows product navigation only when product is selected', () => {
    const selectedProduct = mockProducts[0];
    
    const { container } = renderWithProviders(<Layout>Test Content</Layout>, {
      selectedProduct: selectedProduct,
      mockUser: {
        id: 'admin1',
        email: 'admin@team.com',
        name: 'John Admin',
        role: 'admin',
        teamId: 'team1',
        productIds: ['product1']
      }
    });
    
    // Product navigation items should be visible
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    
    expect(screen.getByRole('link', { name: 'Tickets' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Team' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Categories' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Templates' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeInTheDocument();
  });

  it('hides product navigation when no product is selected', () => {
    renderWithProviders(<Layout>Test Content</Layout>, {
      selectedProduct: null,
      mockUser: {
        id: 'admin1',
        email: 'admin@team.com',
        name: 'John Admin',
        role: 'admin',
        teamId: 'team1',
        productIds: ['product1']
      }
    });

    // Product navigation items should not be visible
    expect(screen.queryByRole('link', { name: 'Tickets' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Team' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Categories' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Templates' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Analytics' })).not.toBeInTheDocument();
  });

  it('shows correct product navigation items based on user role', () => {
    const selectedProduct = mockProducts[0];
    
    renderWithProviders(<Layout>Test Content</Layout>, {
      selectedProduct,
      mockUser: {
        id: 'agent1',
        email: 'agent@team.com',
        name: 'Sarah Agent',
        role: 'agent',
        teamId: 'team1',
        productIds: ['product1']
      }
    });

    // Agent should see Tickets and Analytics, but not Team/Categories/Templates 
    expect(screen.getByRole('link', { name: 'Tickets' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeInTheDocument();
    
    expect(screen.queryByRole('link', { name: 'Team' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Categories' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Templates' })).not.toBeInTheDocument();
  });

  it('shows product section divider only for admin with selected product', () => {
    const selectedProduct = mockProducts[0];
    
    const { container } = renderWithProviders(<Layout>Test Content</Layout>, {
      selectedProduct,
      mockUser: {
        id: 'admin1',
        email: 'admin@team.com',
        name: 'John Admin',
        role: 'admin',
        teamId: 'team1',
        productIds: ['product1']
      }
    });

    // Divider should be visible for admin 
    expect(screen.getByTestId('product-divider')).toBeInTheDocument();
    expect(screen.getByTestId('product-divider')).toHaveTextContent('Product');

    // Cleanup and test with agent
    vi.clearAllMocks();
    renderWithProviders(<Layout>Test Content</Layout>, {
      selectedProduct,
      mockUser: {
        id: 'agent1',
        email: 'agent@team.com',
        name: 'Sarah Agent',
        role: 'agent',
        teamId: 'team1',
        productIds: ['product1']
      }
    });

    // Divider should not be visible for agent
    expect(screen.queryByTestId('product-divider')).not.toBeInTheDocument();
  });

  it('shows product navigation when product is selected', () => {
    renderWithProviders(<Layout>Test Content</Layout>, {
      selectedProduct: mockProducts[0],
      mockUser: {
        id: 'admin1',
        email: 'admin@team.com',
        name: 'John Admin',
        role: 'admin',
        teamId: 'team1',
        productIds: ['product1']
      }
    });

    // Wait for navigation to be rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tickets' })).toBeInTheDocument();
  });
});