import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { APP_NAME } from '../../config/app';
import InfoStep from '../signup/InfoStep';
import PasswordStep from '../signup/PasswordStep';
import CompanyStep from '../signup/CompanyStep';
import ProgressSteps from '../signup/ProgressSteps';
import { Step, StepId } from '../signup/types';

interface MobileSignupProps {
  currentStep: StepId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  companyDomain: string;
  error: string;
  steps: Step[];
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onCompanyNameChange: (value: string) => void;
  onCompanyDomainChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCompanySubmit: (e: React.FormEvent, skipCompany: boolean) => void;
  onBack: () => void;
}

export default function MobileSignup({
  currentStep,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  companyName,
  companyDomain,
  error,
  steps,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onCompanyNameChange,
  onCompanyDomainChange,
  onSubmit,
  onCompanySubmit,
  onBack
}: MobileSignupProps) {
  const renderStepContent = () => {
    switch (currentStep) {
      case 'info':
        return (
          <InfoStep
            firstName={firstName}
            lastName={lastName}
            email={email}
            onFirstNameChange={onFirstNameChange}
            onLastNameChange={onLastNameChange}
            onEmailChange={onEmailChange}
            onSubmit={onSubmit}
          />
        );

      case 'password':
        return (
          <PasswordStep
            password={password}
            confirmPassword={confirmPassword}
            onPasswordChange={onPasswordChange}
            onConfirmPasswordChange={onConfirmPasswordChange}
            onSubmit={onSubmit}
            onBack={onBack}
          />
        );

      case 'company':
        return (
          <CompanyStep
            companyName={companyName}
            companyDomain={companyDomain}
            onCompanyNameChange={onCompanyNameChange}
            onCompanyDomainChange={onCompanyDomainChange}
            onSubmit={onCompanySubmit}
            onBack={onBack}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-8 bg-dark-800 rounded-xl shadow-xl p-8">
        <Link
          to="/"
          className="inline-flex items-center text-dark-300 hover:text-dark-100 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-dark-100">{APP_NAME}</h1>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl text-dark-100">Create your account</h2>
            <p className="text-sm text-dark-300 flex gap-2 mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-dark-200 hover:text-dark-100 font-medium transition-colors duration-150">
                Sign in
              </Link>
            </p>
          </div>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </div>

        {error && (
          <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg p-3">
            {error}
          </div>
        )}

        <div>{renderStepContent()}</div>

        <p className="text-sm text-dark-300 text-center mt-6">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-dark-200 hover:text-dark-100 transition-colors duration-150">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-dark-200 hover:text-dark-100 transition-colors duration-150">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}