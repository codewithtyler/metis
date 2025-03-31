import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestWrapper } from './setup';
import ProductManagement from '../pages/ProductManagement';

describe('ProductManagement', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders product list', () => {
    // Set initial products in localStorage
    localStorage.setItem('products', JSON.stringify([
      {
        id: 'product1',
        name: 'Test Product 1',
        description: 'Test Description 1',
        teamId: 'team1',
        accessType: 'public',
        slug: 'test-product-1',
      }
    ]));

    render(
      <TestWrapper>
        <ProductManagement />
      </TestWrapper>
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
  });

  it('adds a new product', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductManagement />
      </TestWrapper>
    );

    // Click add product button
    const addButton = screen.getByRole('button', { name: /add product/i });
    await user.click(addButton);

    // Fill in form
    const nameInput = screen.getByLabelText(/product name/i);
    const descInput = screen.getByLabelText(/description/i);
    await user.type(nameInput, 'New Product');
    await user.type(descInput, 'New Description');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    // Verify localStorage was updated
    await waitFor(() => {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      expect(products).toHaveLength(1);
      expect(products[0].name).toBe('New Product');
    });
  });

  it('deletes a product', async () => {
    // Set initial products
    const initialProducts = [{
      id: 'product1',
      name: 'Test Product 1',
      description: 'Test Description 1',
      teamId: 'team1',
      accessType: 'public',
      slug: 'test-product-1',
    }];
    localStorage.setItem('products', JSON.stringify(initialProducts));

    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductManagement />
      </TestWrapper>
    );

    // Click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /delete product/i });
    await user.click(confirmButton);

    // Verify localStorage was updated
    await waitFor(() => {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      expect(products).toHaveLength(0);
    });
  });

  it('updates selected product when current selection is deleted', async () => {
    // Set initial products and selected product
    const initialProducts = [{
      id: 'product1',
      name: 'Test Product 1',
      description: 'Test Description 1',
      teamId: 'team1',
      accessType: 'public',
      slug: 'test-product-1',
    }];
    localStorage.setItem('products', JSON.stringify(initialProducts));
    localStorage.setItem('selected_product', JSON.stringify(initialProducts[0]));

    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductManagement />
      </TestWrapper>
    );

    // Click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /delete product/i });
    await user.click(confirmButton);

    // Verify selected_product was cleared in localStorage
    await waitFor(() => {
      const selectedProduct = localStorage.getItem('selected_product');
      expect(selectedProduct).toBe('null');
    });
  });
});