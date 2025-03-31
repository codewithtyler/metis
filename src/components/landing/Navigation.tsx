import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Tag, Menu, X } from 'lucide-react';
import { APP_NAME } from '../../config/app';

interface NavigationProps {
  onShowOffer: () => void;
  showOfferButton: boolean;
}

export default function Navigation({ onShowOffer, showOfferButton }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-dark-900/95 backdrop-blur-sm z-50 border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <HelpCircle className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-dark-100">{APP_NAME}</span>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-200 hover:text-dark-100 transition-colors p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-dark-200 hover:text-dark-100 transition-colors">Features</a>
            <a href="#pricing" className="text-dark-200 hover:text-dark-100 transition-colors">Pricing</a>
            {showOfferButton && (
              <button
                onClick={onShowOffer}
                className="flex items-center text-primary hover:text-primary-hover transition-colors"
              >
                <Tag className="h-4 w-4 mr-1" />
                <span>Special Offer</span>
              </button>
            )}
            <Link to="/login" className="text-dark-200 hover:text-dark-100 transition-colors">Sign in</Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-800 rounded-lg mt-2 border border-dark-700">
              <a
                href="#features"
                className="block px-3 py-2 text-base font-medium text-dark-200 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-base font-medium text-dark-200 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors"
              >
                Pricing
              </a>
              {showOfferButton && (
                <button
                  onClick={onShowOffer}
                  className="w-full text-left px-3 py-2 text-base font-medium text-primary hover:text-primary-hover hover:bg-dark-700 rounded-lg transition-colors flex items-center"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Special Offer
                </button>
              )}
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-dark-200 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}