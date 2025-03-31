import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  show?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  isCollapsed: boolean;
}

export default function Navigation({ items, isCollapsed }: NavigationProps) {
  const location = useLocation();

  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            role="link"
            className={`group flex ${isCollapsed ? 'justify-center' : ''} items-center ${isCollapsed ? 'px-1' : 'px-2.5'} py-2 text-sm font-medium rounded-lg transition-colors duration-150 no-underline ${
              location.pathname === item.href
                ? 'bg-dark-700 text-dark-100'
                : 'text-dark-300 hover:bg-dark-700 hover:text-dark-100'
            }`}
            title={isCollapsed ? item.name : undefined}
            aria-label={item.name}
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
    </>
  );
}