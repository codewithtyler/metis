import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestWrapper } from './setup';
import { vi } from 'vitest';
import ProductSwitcher from '../components/layout/ProductSwitcher';

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
] as const;

describe('ProductSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders product list when clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductSwitcher isCollapsed={false} />
      </TestWrapper>
    );

    // Click dropdown button
    await user.click(screen.getByText('Test Product 1'));

    // Verify dropdown items are visible
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('selects a different product when clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductSwitcher isCollapsed={false} />
      </TestWrapper>
    );

    // Open dropdown
    await user.click(screen.getByText('Test Product 1'));

    // Select second product
    await user.click(screen.getByText('Test Product 2'));

    // Verify selected product was updated in localStorage
    await waitFor(() => {
      const selectedProduct = JSON.parse(localStorage.getItem('selected_product') || 'null');
      expect(selectedProduct).toEqual(mockProducts[1]);
    });
  });

  it('shows "No products available" when products list is empty', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductSwitcher isCollapsed={false} />
      </TestWrapper>
    );

    // Click dropdown button
    await user.click(screen.getByText('Select Product'));

    // Verify empty state message
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  it('updates selected product when products change', async () => {
    const { rerender } = render(
      <TestWrapper>
        <ProductSwitcher isCollapsed={false} />
      </TestWrapper>
    );

    // Remove the selected product
    const updatedProducts = mockProducts.slice(1);
    rerender(
      <ProductSwitcher isCollapsed={false} />, 
      {
        initialProducts: updatedProducts,
        selectedProduct: mockProducts[0],
      }
    );

    // Verify selected product was updated to the first available product
    await waitFor(() => {
      const selectedProduct = JSON.parse(localStorage.getItem('selected_product') || 'null');
      expect(selectedProduct).toEqual(mockProducts[1]);
    });
  });
});