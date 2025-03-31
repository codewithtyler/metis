import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageTitle from '../components/PageTitle';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Privacy Policy" description="Privacy Policy for Metis" />
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
            <h1 className="text-2xl font-bold text-dark-100 mb-8">Privacy Policy for Metis</h1>
            
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-dark-300 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-dark-300 mb-4">
                <li className="mb-2">Name and contact information</li>
                <li className="mb-2">Account credentials</li>
                <li className="mb-2">Support ticket content and communications</li>
                <li>Usage data and analytics</li>
              </ul>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-dark-300 mb-4">
                Eagle Sight Labs uses the collected information to:
              </p>
              <ul className="list-disc pl-6 text-dark-300 mb-4">
                <li className="mb-2">Provide and maintain our services</li>
                <li className="mb-2">Process and respond to support tickets</li>
                <li className="mb-2">Improve our services</li>
                <li>Send service-related communications</li>
              </ul>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">3. Data Security</h2>
              <p className="text-dark-300 mb-4">
                We implement industry-standard security measures to protect your personal information, including encryption and secure data storage practices.
              </p>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">4. Data Retention</h2>
              <p className="text-dark-300 mb-4">
                We retain your information for as long as necessary to provide our services and comply with legal obligations.
              </p>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">5. Your Rights</h2>
              <p className="text-dark-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-dark-300 mb-4">
                <li className="mb-2">Access your personal information</li>
                <li className="mb-2">Request correction of inaccurate data</li>
                <li className="mb-2">Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">6. Contact Information</h2>
              <p className="text-dark-300 mb-4">
                If you have any questions about this Privacy Policy, please contact Eagle Sight Labs at privacy@eaglesightlabs.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}