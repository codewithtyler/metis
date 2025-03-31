import React from 'react';
import config from '../../../config.json';

export default function SocialProof() {
  if (!config.showTestimonials) {
    return null;
  }

  return (
    <div className="bg-dark-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase text-dark-300 tracking-wide">
          Trusted by innovative companies worldwide
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          {[
            { name: 'Tuple', logo: 'tuple-logo-gray-400.svg' },
            { name: 'Mirage', logo: 'mirage-logo-gray-400.svg' },
            { name: 'StaticKit', logo: 'statickit-logo-gray-400.svg' },
            { name: 'Transistor', logo: 'transistor-logo-gray-400.svg' },
            { name: 'Workcation', logo: 'workcation-logo-gray-400.svg' },
          ].map((company) => (
            <div key={company.name} className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-12 opacity-50 hover:opacity-75 transition-opacity"
                src={`https://tailwindui.com/img/logos/${company.logo}`}
                alt={company.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}