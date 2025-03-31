import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageTitle from '../components/PageTitle';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Terms of Service" description="Terms of Service for Metis" />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-dark-300 hover:text-dark-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="bg-dark-800 shadow-lg rounded-lg border border-dark-700">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-dark-100 mb-8">Terms of Service for Metis</h1>
            
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-dark-300 mb-4">
                By accessing and using Metis, a product of Eagle Sight Labs, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">2. Use License</h2>
              <p className="text-dark-300 mb-4">
                Permission is granted to temporarily access Metis for personal or business use. This is the grant of a license, not a transfer of title.
              </p>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">3. Service Description</h2>
              <p className="text-dark-300 mb-4">
                Metis provides customer support and ticket management services. Eagle Sight Labs reserves the right to modify or discontinue the service at any time with appropriate notice to users.
              </p>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">4. User Obligations</h2>
              <ul className="list-disc pl-6 text-dark-300 mb-4">
                <li className="mb-2">Maintain accurate account information</li>
                <li className="mb-2">Protect account credentials</li>
                <li className="mb-2">Use the service in compliance with all applicable laws</li>
                <li>Report any unauthorized use of your account</li>
              </ul>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">5. Limitations</h2>
              <p className="text-dark-300 mb-4">
                Eagle Sight Labs and Metis shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
              </p>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">6. Contact Information</h2>
              <p className="text-dark-300 mb-4">
                For any questions regarding these terms, please contact Eagle Sight Labs at legal@eaglesightlabs.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}