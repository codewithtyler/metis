import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { LayoutDashboard, Ticket, Users, BarChart, Box, Tag, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './layout/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { selectedProduct } = useProducts();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Only show admin navigation for admin users
  const adminNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Products',
      href: '/products',
      icon: Box,
      show: user?.role === 'admin'
    },
  ].filter(item => item.show !== false);

  // Product-specific navigation items
  const productNavigation = [
    {
      name: 'Tickets',
      href: '/tickets',
      icon: Ticket
    },
    {
      name: 'Team',
      href: '/team',
      icon: Users,
      show: user?.role === 'admin'
    },
    {
      name: 'Categories',
      href: '/categories',
      icon: Tag,
      show: user?.role === 'admin'
    },
    {
      name: 'Templates',
      href: '/templates',
      icon: FileText,
      show: user?.role === 'admin'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart,
      show: user?.role !== 'customer'
    },
  ].filter(item => item.show !== false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-dark-100">
      <div className="flex h-screen">
        <Sidebar
          user={user}
          isCollapsed={isCollapsed}
          showUserMenu={showUserMenu}
          adminNavigation={adminNavigation}
          productNavigation={productNavigation}
          selectedProduct={selectedProduct}
          menuRef={menuRef}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          onLogout={logout}
          onToggleUserMenu={() => setShowUserMenu(!showUserMenu)}
        />

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-dark-100">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}