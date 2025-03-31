import React from 'react';
import { Lock } from 'lucide-react';

interface PasswordStepProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function PasswordStep({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack
}: PasswordStepProps) {
  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-dark-200"
        >
          Create Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-dark-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="appearance-none block w-full pl-10 px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Create a password"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-dark-200"
        >
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-dark-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            className="appearance-none block w-full pl-10 px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-dark-600 text-dark-200 rounded-lg hover:bg-dark-700"
        >
          Back
        </button>
        <button 
          type="submit" 
          className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </form>
  );
}