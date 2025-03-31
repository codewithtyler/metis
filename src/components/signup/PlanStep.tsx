import React from 'react';
import { plans } from '../../config/plans';
import { Check } from 'lucide-react';

interface PlanStepProps {
  selectedPlan: string;
  onPlanSelect: (plan: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function PlanStep({
  selectedPlan,
  onPlanSelect,
  onSubmit,
  onBack,
}: PlanStepProps) {
  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.type}
              onClick={() => onPlanSelect(plan.type)}
              className={`relative px-32 sm:px-6 py-4 border rounded-lg cursor-pointer transition-all duration-150 ${
                selectedPlan === plan.type
                  ? 'border-primary bg-primary/5 ring-2 ring-primary shadow-lg'
                  : 'border-dark-600 hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-dark-100">{plan.name}</h3>
                  {selectedPlan === plan.type && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-dark-100">${plan.price}</span>
                    <span className="text-dark-400 text-sm ml-1">
                      {plan.price === 0 ? 'Forever' : '/month'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-dark-600 pt-4">
                  <ul className="grid gap-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-dark-300">
                        <Check className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-dark-600 text-dark-200 rounded-lg hover:bg-dark-700"
        >
          Back
        </button>
        <button 
          type="submit" 
          className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-150"
        >
          Complete Setup
        </button>
      </div>
    </form>
  );
}