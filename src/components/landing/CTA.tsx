import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import config from '../../../config.json';

export default function CTA() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-lg shadow-xl overflow-hidden">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to get started?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-200 max-w-2xl">
                {config.launchPriceAvailable
                  ? 'Join now to lock in our special launch pricing. Get lifetime discounts before prices increase.'
                  : 'Join thousands of teams who trust us with their customer support.'}
              </p>
              <Link
                to="/signup"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-primary hover:bg-indigo-50 transition-colors duration-150"
              >
                Get started
                <ChevronRight className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}