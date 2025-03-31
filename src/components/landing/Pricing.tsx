import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { plans } from '../../config/plans';
import config from '../../../config.json';

export default function Pricing() {
  return (
    <div id="pricing" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary">Pricing</h2>
          <p className="mt-1 text-4xl font-extrabold text-dark-100 sm:text-5xl sm:tracking-tight">
            Simple, transparent pricing
          </p>
          {config.launchPriceAvailable && (
            <p className="max-w-2xl mt-5 mx-auto text-xl text-dark-300">
              Launch pricing available now. Lock in lifetime discounts before prices increase.
            </p>
          )}
        </div>

        <div className="mt-12 flex justify-center gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.type} 
              className={`bg-dark-800 border ${plan.type === 'team' ? 'border-primary' : 'border-dark-700'} rounded-lg shadow-sm divide-y divide-dark-700 w-full max-w-sm`}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark-100">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-dark-100">${plan.price}</span>
                  <span className="text-base font-medium text-dark-400">/month</span>
                </p>
                <p className="mt-6 text-dark-300">{plan.features[0]}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-primary" />
                      <span className="ml-3 text-dark-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`mt-8 block w-full py-3 px-6 border ${
                    plan.type === 'team'
                      ? 'border-transparent bg-primary hover:bg-primary-hover text-white'
                      : 'border-dark-600 hover:border-dark-500 text-dark-200 hover:bg-dark-700'
                  } rounded-md text-center font-medium transition-colors duration-150`}
                >
                  Get started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}