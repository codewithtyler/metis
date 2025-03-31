import React from 'react';
import { LogOut } from 'lucide-react';
import { User } from '../../types';

interface UserMenuProps {
  user: User;
  isCollapsed: boolean;
  showMenu: boolean;
  onLogout: () => void;
  onToggleMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

export default function UserMenu({
  user,
  isCollapsed,
  showMenu,
  onLogout,
  onToggleMenu,
  menuRef,
}: UserMenuProps) {
  return (
    <div className="relative p-3" ref={menuRef}>
      <button
        onClick={onToggleMenu}
        className="flex items-start w-full group focus:outline-none"
      >
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-dark-700 border border-dark-600 flex items-center justify-center overflow-hidden">
            <span className="text-primary font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        {!isCollapsed && (
          <div className="ml-3 flex-1 text-left">
            <div className="text-sm font-medium text-dark-100">{user?.name}</div>
            <div className="text-xs text-dark-400">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </div>
          </div>
        )}
      </button>
      
      {/* Dropup Menu */}
      {showMenu && !isCollapsed && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-dark-700 rounded-lg shadow-lg border border-dark-600 overflow-hidden">
          <button
            onClick={() => {
              onToggleMenu();
              onLogout();
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-dark-300 hover:bg-dark-600 hover:text-dark-100 transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
      
      {/* Collapsed State Menu */}
      {showMenu && isCollapsed && (
        <div className="absolute bottom-full left-0 mb-1 bg-dark-700 rounded-lg shadow-lg border border-dark-600 overflow-hidden whitespace-nowrap">
          <div className="px-3 py-2 border-b border-dark-600">
            <div className="text-sm font-medium text-dark-100">{user?.name}</div>
            <div className="text-xs text-dark-400">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </div>
          </div>
          <button
            onClick={() => {
              onToggleMenu();
              onLogout();
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-dark-300 hover:bg-dark-600 hover:text-dark-100 transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}