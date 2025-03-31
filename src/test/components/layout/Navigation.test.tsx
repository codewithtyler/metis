import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { LayoutDashboard, Users } from 'lucide-react';
import Navigation from '../../../components/layout/Navigation';
import { TestWrapper } from '../../setup';

const mockItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Team',
    href: '/team',
    icon: Users
  }
];

function renderNavigation(props: { items: typeof mockItems; isCollapsed: boolean }) {
  return render(
    <TestWrapper>
      <Navigation {...props} />
    </TestWrapper>
  );
}

describe('Navigation Component', () => {
  it('renders navigation items correctly', () => {
    renderNavigation({ items: mockItems, isCollapsed: false });

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Team' })).toBeInTheDocument();
  });

  it('shows only icons when collapsed', () => {
    renderNavigation({ items: mockItems, isCollapsed: true });

    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' });
    const teamLink = screen.getByRole('link', { name: 'Team' });

    expect(dashboardLink).toHaveAttribute('title', 'Dashboard');
    expect(teamLink).toHaveAttribute('title', 'Team');
  });

  it('applies correct styles based on collapsed state', () => {
    const { rerender } = renderNavigation({ items: mockItems, isCollapsed: false });
    
    let dashboardLink = screen.getByRole('link', { name: 'Dashboard' });
    expect(dashboardLink).toHaveClass('px-2.5');
    
    rerender(
      <TestWrapper>
        <Navigation items={mockItems} isCollapsed={true} />
      </TestWrapper>
    );
    
    dashboardLink = screen.getByRole('link', { name: 'Dashboard' });
    expect(dashboardLink).toHaveClass('px-1', 'justify-center');
  });
});