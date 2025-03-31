import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product, Team } from '../types';

export default function ProductDiscovery() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useLocalStorage<Product[]>('products', []);
  const [teams] = useLocalStorage<Team[]>('teams', []);

  // Get all public products and private products where user's domain matches
  const availableProducts = products.filter(product => {
    const userDomain = user?.email.split('@')[1];
    return (
      product.accessType === 'public' ||
      (product.accessType === 'private' && 
       product.allowedDomains?.includes(userDomain || ''))
    );
  });

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageTitle title="Discover Products" description="Find support products for your company" />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-dark-100 mb-8">
          Discover Support Products
        </h1>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-dark-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 border border-dark-600 rounded-lg leading-5 bg-dark-700 placeholder-dark-400 focus:outline-none focus:placeholder-dark-300 focus:ring-1 focus:ring-primary focus:border-primary text-dark-100 transition-colors duration-150"
              placeholder="Search for company support products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredProducts.map((product) => {
            const team = teams.find(t => t.id === product.teamId);
            return (
              <div
                key={product.id}
                className="bg-dark-800 rounded-lg border border-dark-700 shadow-sm hover:shadow-md transition-all duration-150 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-dark-100">
                      {product.name}
                    </h3>
                    <p className="text-sm text-dark-400 mt-1">
                      by {team?.name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.accessType === 'public' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {product.accessType === 'public' ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-dark-300">
                  {product.description}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/login?product=${product.slug}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Access Support
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
            <h3 className="mt-2 text-sm font-medium text-dark-100">No Products Found</h3>
            <p className="mt-1 text-sm text-dark-400">
              {searchTerm 
                ? "No products match your search criteria." 
                : "There are no available products at this time."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}