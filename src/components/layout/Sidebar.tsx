import React from 'react';
import { HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { User, Product } from '../../types';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import ProductSwitcher from './ProductSwitcher';
import { useProducts } from '../../context/ProductContext';
import { APP_NAME } from '../../config/app';

interface SidebarProps {
  user: User;
  isCollapsed: boolean;
  showUserMenu: boolean;
  adminNavigation: any[];
  productNavigation: any[];
  menuRef: React.RefObject<HTMLDivElement>;
  onCollapse: () => void;
  onLogout: () => void;
  onToggleUserMenu: () => void;
}

function Sidebar({
  user,
  isCollapsed,
  showUserMenu,
  adminNavigation,
  productNavigation,
  menuRef,
  onCollapse,
  onLogout,
  onToggleUserMenu
}: SidebarProps) {
  const { selectedProduct, showProductNav } = useProducts();

  return (
    <div className="hidden md:block relative h-full">
      <div className={`${isCollapsed ? 'w-14' : 'w-56'} h-full transition-all duration-300 ease-in-out flex flex-col bg-dark-800 border-r border-dark-700`}>
        <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
          {/* Logo */}
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
            <nav className="flex-1 px-1 pb-4" role="navigation">
              {/* Step 9: Log sidebar render state */}
              {console.log('Step 9: Sidebar Render', {
                selectedProduct,
                hasProductNav: productNavigation.length > 0,
                userRole: user?.role
              })}

              {/* Admin Navigation */}
              <Navigation items={adminNavigation} isCollapsed={isCollapsed} />

              {/* Product Switcher */}
              <ProductSwitcher isCollapsed={isCollapsed} />
              
              {showProductNav && selectedProduct?.id && (
                <>
                  {/* Product Section Divider */}
                  {adminNavigation.length > 0 && user?.role === 'admin' && (
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dark-700"></div>
                      </div>
                      {!isCollapsed && (
                        <div className="relative flex justify-center">
                          <span className="px-2 bg-dark-800 text-xs text-dark-400" data-testid="product-divider">
                            Product
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Product Navigation */}
                  <div className="space-y-1">
                    <Navigation items={productNavigation} isCollapsed={isCollapsed} />
                  </div>
                </>
              )}
            </nav>
          </div>

          {/* User Menu */}
          <div className="mt-auto border-t border-dark-700">
            <UserMenu
              user={user}
              isCollapsed={isCollapsed}
              showMenu={showUserMenu}
              onLogout={onLogout}
              onToggleMenu={onToggleUserMenu}
              menuRef={menuRef}
            />
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={onCollapse}
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
  );
}

export default Sidebar;