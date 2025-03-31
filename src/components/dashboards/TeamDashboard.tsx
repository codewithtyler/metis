import React from 'react';
import { LayoutDashboard, Ticket, Users, BarChart, LogOut, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { useTickets } from '../../hooks/useTickets';
import { getDashboardStats } from '../../data/stats';
import { customers } from '../../data/customers';
import DashboardStats from '../dashboard/DashboardStats';
import TicketQueue from '../dashboard/TicketQueue';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '../../config/app';
import { useAuth } from '../../context/AuthContext';
import ProductSwitcher from '../layout/ProductSwitcher';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types';

// Team-specific navigation
const teamNavigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  }
];

// Product-specific navigation
const productNavigation = [
  {
    name: 'Tickets',
    href: '/tickets',
    icon: Ticket
  },
  {
    name: 'Team',
    href: '/team',
    icon: Users
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart
  }
];

export default function TeamDashboard({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { tickets } = useTickets();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [products] = useLocalStorage<Product[]>('products', []);
  const [selectedProduct, setSelectedProduct] = useLocalStorage<Product | null>('selected_product', null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Get tickets assigned to this agent
  const userTickets = tickets.filter(ticket => 
    ticket.assignedToId === user.id || 
    (!ticket.assignedToId && ticket.teamId === user.teamId)
  );
  
  const stats = getDashboardStats(userTickets);

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Unknown Customer';
  };

  // Get products the team member has access to
  const accessibleProducts = products.filter(product => 
    user.productIds?.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-dark-900 text-dark-100">
      <div className="flex h-screen">
        {/* Team Sidebar */}
        <div className="hidden md:block relative h-full">
          <div className={`${isCollapsed ? 'w-14' : 'w-56'} h-full transition-all duration-300 ease-in-out flex flex-col bg-dark-800 border-r border-dark-700`}>
            <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
              <div className={`px-2 mb-6 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-dark-100" />
                  </div>
                  {!isCollapsed && (
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-dark-100">{APP_NAME}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <nav className="flex-1 px-1 pb-4 space-y-1">
                  {teamNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex ${isCollapsed ? 'justify-center' : ''} items-center ${isCollapsed ? 'px-1' : 'px-2.5'} py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                          location.pathname === item.href
                            ? 'bg-dark-700 text-dark-100'
                            : 'text-dark-300 hover:bg-dark-700 hover:text-dark-100'
                        }`}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <Icon
                          className={`${
                            location.pathname === item.href
                              ? 'text-dark-100'
                              : 'text-dark-400 group-hover:text-dark-100'
                          } ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 h-5 w-5`}
                        />
                        {!isCollapsed && item.name}
                      </Link>
                    );
                  })}

                  {/* Product Section */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-dark-700"></div>
                    </div>
                    {!isCollapsed && (
                      <div className="relative flex justify-center">
                        <span className="px-2 bg-dark-800 text-xs text-dark-400">
                          Product
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <ProductSwitcher
                      products={accessibleProducts}
                      selectedProduct={selectedProduct}
                      onProductSelect={setSelectedProduct}
                      isCollapsed={isCollapsed}
                    />
                  </div>

                  {selectedProduct && (
                    <div className="space-y-1">
                      {productNavigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`group flex ${isCollapsed ? 'justify-center' : ''} items-center ${isCollapsed ? 'px-1' : 'px-2.5'} py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                              location.pathname === item.href
                                ? 'bg-dark-700 text-dark-100'
                                : 'text-dark-300 hover:bg-dark-700 hover:text-dark-100'
                            }`}
                            title={isCollapsed ? item.name : undefined}
                          >
                            <Icon
                              className={`${location.pathname === item.href ? 'text-dark-100' : 'text-dark-400 group-hover:text-dark-100'} ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 h-5 w-5`}
                            />
                            {!isCollapsed && item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </nav>
              </div>

              {/* User Menu */}
              <div className="mt-auto border-t border-dark-700">
                <div className="relative p-3" ref={menuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-start w-full group focus:outline-none"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-dark-700 border border-dark-600 flex items-center justify-center overflow-hidden">
                        <span className="text-primary font-medium">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {!isCollapsed && <div className="ml-3 flex-1 text-left">
                      <div className="text-sm font-medium text-dark-100">{user?.name}</div>
                      <div className="text-xs text-dark-400">Support Agent</div>
                    </div>}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-dark-700 rounded-lg shadow-lg border border-dark-600 overflow-hidden">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="w-full flex items-center px-3 py-2 text-sm text-dark-300 hover:bg-dark-600 hover:text-dark-100 transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-300 hover:text-dark-100 transition-colors duration-150 hover:bg-dark-700/30 z-10"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-dark-100">
                <div>
                  {location.pathname === '/dashboard' && (
                    <>
                      <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-semibold text-dark-100">Dashboard</h1>
                      </div>
                      <DashboardStats stats={stats} />
                      <div className="mt-8">
                        <TicketQueue
                          title="Recent Tickets"
                          icon={<Users className="w-5 h-5 text-blue-500" />}
                          tickets={userTickets}
                          emptyMessage="There are currently no tickets assigned to you."
                          getCustomerName={getCustomerName}
                        />
                      </div>
                    </>
                  )}
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}