import React from 'react';
import { User, Mail } from 'lucide-react';

interface InfoStepProps {
  firstName: string;
  lastName: string;
  email: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function InfoStep({
  firstName,
  lastName,
  email,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onSubmit
}: InfoStepProps) {
  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-dark-200"
            >
              First Name
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-dark-400" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => onFirstNameChange(e.target.value)}
                className="appearance-none block w-full pl-10 px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="First name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-dark-200"
            >
              Last Name
            </label>
            <div className="mt-1 relative">
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => onLastNameChange(e.target.value)}
                className="appearance-none block w-full px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Last name"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-dark-200"
        >
          Email Address
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-dark-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="appearance-none block w-full pl-10 px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
          Next
        </button>
      </div>
    </form>
  );
}