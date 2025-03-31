import { describe, it, expect, vi } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { User } from '../../../types';
import { TestWrapper } from '../../setup';
import UserMenu from '../../../components/layout/UserMenu';

const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  teamId: 'team1'
};

const mockProps = {
  user: mockUser,
  isCollapsed: false,
  showMenu: false,
  onLogout: vi.fn(),
  onToggleMenu: vi.fn(),
  menuRef: { current: null }
};

describe('UserMenu Component', () => {
  it('renders user avatar and name', () => {
    render(
      <TestWrapper>
        <UserMenu {...mockProps} />
      </TestWrapper>
    );
    
    expect(screen.getByText('J')).toBeInTheDocument(); // First letter avatar
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('shows only avatar when collapsed', () => {
    render(
      <TestWrapper>
        <UserMenu {...mockProps} isCollapsed />
      </TestWrapper>
    );
    
    expect(screen.getByText('J')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('toggles menu on click', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <UserMenu {...mockProps} />
      </TestWrapper>
    );
    
    await user.click(screen.getByRole('button'));
    expect(mockProps.onToggleMenu).toHaveBeenCalled();
  });

  it('shows dropdown menu when showMenu is true', () => {
    render(
      <TestWrapper>
        <UserMenu {...mockProps} showMenu={true} />
      </TestWrapper>
    );
    
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('calls logout when sign out is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <UserMenu {...mockProps} showMenu={true} />
      </TestWrapper>
    );
    
    await user.click(screen.getByText('Sign out'));
    expect(mockProps.onLogout).toHaveBeenCalled();
    expect(mockProps.onToggleMenu).toHaveBeenCalled();
  });
});