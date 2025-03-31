import React from 'react';
import { Building2 } from 'lucide-react';

interface CompanyStepProps {
  companyName: string;
  companyDomain: string;
  onCompanyNameChange: (value: string) => void;
  onCompanyDomainChange: (value: string) => void;
  onSubmit: (e: React.FormEvent, skipCompany: boolean) => void;
  onBack: () => void;
}

export default function CompanyStep({
  companyName,
  companyDomain,
  onCompanyNameChange,
  onCompanyDomainChange,
  onSubmit,
  onBack
}: CompanyStepProps) {
  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit(e as unknown as React.FormEvent, true);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={(e) => onSubmit(e, false)}>
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-dark-200">
          Company Name
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building2 className="h-5 w-5 text-dark-400" />
          </div>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            className="appearance-none block w-full pl-10 px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter company name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="companyDomain" className="block text-sm font-medium text-dark-200">
          Company Domain
        </label>
        <div className="mt-1 relative">
          <input
            id="companyDomain"
            type="text"
            value={companyDomain}
            onChange={(e) => onCompanyDomainChange(e.target.value)}
            className="appearance-none block w-full px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="example.com"
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
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSkip}
            className="px-6 py-2 border border-dark-600 text-dark-200 rounded-lg hover:bg-dark-700"
          >
            Skip
          </button>
          <button type="submit" className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}