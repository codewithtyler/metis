import React from 'react';
import { Link } from 'react-router-dom';

import config from '../../../config.json';

export default function Hero() {
  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-dark-100 sm:text-5xl md:text-6xl">
              Customer Support
              <span className="block text-primary mt-2">Made Simple</span>
            </h1>
            <p className="mt-6 text-base text-dark-300 sm:text-xl lg:text-lg xl:text-xl max-w-3xl">
              Transform your customer support experience with an intuitive ticketing system that helps you resolve issues faster and keep customers happier.
            </p>
            <div className="mt-10">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center justify-center">
            <div className="relative mx-auto w-full rounded-lg shadow-xl lg:max-w-lg transform hover:scale-105 transition-transform duration-300">
              <div className="relative block w-full bg-dark-800 rounded-lg overflow-hidden ring-1 ring-dark-700">
                <img
                  className="w-full"
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="Customer support dashboard"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-900/80 via-dark-900/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/30 to-primary/10 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}