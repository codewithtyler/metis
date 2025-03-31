import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LayoutDashboard, Box, Ticket, Users } from 'lucide-react';
import Sidebar from '../../../components/layout/Sidebar';
import { APP_NAME } from '../../../config/app';
import { TestWrapper } from '../../setup';

const mockUser = {
  id: 'admin1',
  name: 'John Admin',
  email: 'admin@example.com',
  role: 'admin',
  teamId: 'team1',
  productIds: ['product1']
};

const mockAdminNavigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Products',
    href: '/products',
    icon: Box
  }
];

const mockProductNavigation = [
  {
    name: 'Tickets',
    href: '/tickets',
    icon: Ticket,
    show: true
  },
  {
    name: 'Team',
    href: '/team',
    icon: Users,
    show: true
  }
];

const mockProps = {
  user: mockUser,
  isCollapsed: false,
  showUserMenu: false,
  adminNavigation: mockAdminNavigation,
  productNavigation: mockProductNavigation,
  selectedProduct: { id: 'product1', name: 'Test Product' },
  menuRef: { current: null },
  onCollapse: vi.fn(),
  onLogout: vi.fn(),
  onToggleUserMenu: vi.fn()
};

function renderSidebar(props = mockProps) {
  return render(
    <TestWrapper>
      <Sidebar {...props} />
    </TestWrapper>
  );
}

describe('Sidebar Component', () => {
  it('renders app name and logo', () => {
    renderSidebar();
    expect(screen.getByText(APP_NAME)).toBeInTheDocument();
  });

  it('renders admin navigation', () => {
    renderSidebar();
    const dashboard = screen.getByRole('link', { name: 'Dashboard' });
    const products = screen.getByRole('link', { name: 'Products' });
    
    expect(dashboard).toBeInTheDocument();
    expect(products).toBeInTheDocument();
  });

  it('renders product navigation when product is selected', () => {
    renderSidebar();
    // Wait for product navigation to be rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tickets' })).toBeInTheDocument();
  });

  it('shows product divider for admin users', () => {
    renderSidebar();
    expect(screen.getByTestId('product-divider')).toBeInTheDocument();
    expect(screen.getByTestId('product-divider')).toHaveTextContent('Product');
  });

  it('hides product divider for non-admin users', () => {
    renderSidebar({
      ...mockProps,
      user: { ...mockUser, role: 'agent' }
    });
    expect(screen.queryByTestId('product-divider')).not.toBeInTheDocument();
  });

  it('collapses sidebar when collapse button is clicked', async () => {
    const user = userEvent.setup();
    renderSidebar();
    
    const collapseButton = screen.getByRole('button', { name: /chevron/i });
    await user.click(collapseButton);
    
    expect(mockProps.onCollapse).toHaveBeenCalled();
  });
});