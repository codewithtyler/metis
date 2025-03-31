import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DesktopSignup from '../components/auth/DesktopSignup';
import MobileSignup from '../components/auth/MobileSignup';
import PageTitle from '../components/PageTitle';
import { APP_NAME } from '../config/app';
import { Step, StepId } from '../components/signup/types';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function SignupPage() {
  const isDesktop = useBreakpoint(1024);
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [currentStep, setCurrentStep] = useState<StepId>('info');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [error, setError] = useState('');

  const steps: Step[] = [
    { id: 'info', name: 'Info', icon: User },
    { id: 'password', name: 'Password', icon: Shield },
    { id: 'company', name: 'Company', icon: Building2 }
  ];

  // Complete the signup process
  const completeSignup = async (skipCompany: boolean) => {
    try {
      setError(''); // Clear any previous errors
      
      if (!firstName || !lastName || !email || !password) {
        setError('Please fill in all required fields');
        return;
      }
      
      const fullName = `${firstName} ${lastName}`;
      
      // Create metadata based on skipCompany flag
      const metadata: any = {
        name: fullName,
        role: 'customer',
        skipCompany: skipCompany ? 'true' : 'false'
      };
      
      // If company is provided and not skipping, add to metadata
      if (!skipCompany && companyName && companyDomain) {
        // In a real app, we would create a team here and pass the teamId
        // For now, we'll just pass the company info for demonstration
        metadata.companyName = companyName;
        metadata.companyDomain = companyDomain;
      }
      
      // Create user with Supabase
      await signup(email, password, fullName, 'customer', metadata);
      console.log("User created successfully");
      
      // Log the user in
      await login(email, password);
      console.log("User logged in successfully");
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error("Error during signup/login:", err);
      setError((err as Error).message || 'Failed to create account');
    }
  };

  // Handle standard form submissions (for info and password steps)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (currentStep === 'info') {
      if (!firstName || !lastName || !email) {
        setError('Please fill in all fields');
        return;
      }
      setCurrentStep('password');
    } else if (currentStep === 'password') {
      if (!password) {
        setError('Password is required');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      setCurrentStep('company');
    }
  };

  // Handle company step submissions with skip option
  const handleCompanySubmit = (e: React.FormEvent, skipCompany: boolean) => {
    e.preventDefault();
    completeSignup(skipCompany);
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
          onCompanySubmit={handleCompanySubmit}
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
          onCompanySubmit={handleCompanySubmit}
          onBack={handleBack}
        />
      )}
    </>
  );
}