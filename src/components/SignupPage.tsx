import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Building2 } from 'lucide-react';
import PageTitle from './PageTitle';
import { APP_NAME } from '../config/app';
import { Step, StepId } from './signup/types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useAuth } from '../context/AuthContext';
import DesktopSignup from './auth/DesktopSignup';
import MobileSignup from './auth/MobileSignup';

export default function SignupPage() {
  const isDesktop = useBreakpoint(1024);
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState<StepId>('info');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const steps: Step[] = [
    { id: 'info', name: 'Info', icon: User },
    { id: 'password', name: 'Password', icon: Shield },
    { id: 'company', name: 'Company', icon: Building2 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (currentStep === 'info') {
      if (!firstName || !lastName || !email) {
        setError('Please fill in all fields');
        return;
      }
      setCurrentStep('password');
    } else if (currentStep === 'password') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setCurrentStep('company');
    } else if (currentStep === 'company') {
      try {
        // For now, using mock data - this will be replaced with Supabase
        const mockUser = {
          email,
          password,
          name: `${firstName} ${lastName}`,
          role: 'customer',
          teamId: 'team1'
        };

        // Log the user in after successful signup
        await login(email, password);
        navigate('/dashboard');
      } catch (err) {
        setError('Failed to create account');
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'password') {
      setCurrentStep('info');
    } else if (currentStep === 'company') {
      setCurrentStep('password');
    }
  };

  return (
    <>
      <PageTitle title="Sign Up" description={`Create your ${APP_NAME} account`} />
      {isDesktop ? (
        <DesktopSignup
          currentStep={currentStep}
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          companyName={companyName}
          companyDomain={companyDomain}
          error={error}
          steps={steps}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onCompanyNameChange={setCompanyName}
          onCompanyDomainChange={setCompanyDomain}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      ) : (
        <MobileSignup
          currentStep={currentStep}
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          companyName={companyName}
          companyDomain={companyDomain}
          error={error}
          steps={steps}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onCompanyNameChange={setCompanyName}
          onCompanyDomainChange={setCompanyDomain}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}
    </>
  );
}