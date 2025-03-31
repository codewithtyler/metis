import React from 'react';
import { X } from 'lucide-react';

interface ExitPopupProps {
  show: boolean;
  onClose: () => void;
}

export default function ExitPopup({ show, onClose }: ExitPopupProps) {
  const [email, setEmail] = React.useState('');

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full mx-4 relative border border-dark-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dark-400 hover:text-dark-300"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="text-2xl font-bold text-dark-100 mb-4">
          Wait! Don't miss out
        </h3>
        <p className="text-dark-300 mb-6">
          Sign up now and get 30% off your first 3 months!
        </p>
        
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg text-dark-100 bg-dark-700 border border-dark-600 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Claim Your Discount
          </button>
        </form>
        
        <p className="mt-4 text-sm text-dark-400 text-center">
          Limited time offer. Terms apply.
        </p>
      </div>
    </div>
  );
}