import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { APP_NAME } from '../../config/app';

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <HelpCircle className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-dark-100">{APP_NAME}</span>
            </div>
            <p className="text-dark-300 text-base">
              Transform your customer support experience with an intuitive ticketing system.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-200 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-base text-dark-300 hover:text-dark-200 transition-colors duration-150"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-200 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-base text-dark-300 hover:text-dark-200 transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-dark-700">
          <p className="text-base text-dark-400 text-center">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}