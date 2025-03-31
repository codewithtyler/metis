import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { APP_NAME } from '../../config/app';
import InfoStep from '../signup/InfoStep';
import PasswordStep from '../signup/PasswordStep';
import CompanyStep from '../signup/CompanyStep';
import ProgressSteps from '../signup/ProgressSteps';
import { Step, StepId } from '../signup/types';

interface DesktopSignupProps {
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

export default function DesktopSignup({
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
}: DesktopSignupProps) {
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
    <div className="h-screen flex">
      {/* Left side - Signup form */}
      <div className="w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-32 bg-dark-800">
        <div className="mx-auto w-full max-w-lg">
          <Link
            to="/"
            className="inline-flex items-center text-dark-300 hover:text-dark-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>

          <div className="mb-6">
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
            <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
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

      {/* Right side - Image */}
      <div className="relative w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="Team collaboration"
        />
        <div className="absolute inset-0 bg-dark-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <blockquote className="space-y-2">
            <p className="text-lg font-semibold">
              "The best customer service is if the customer doesn't need to call you, doesn't need to talk to you. It just works."
            </p>
            <footer className="text-sm">Jeff Bezos</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}