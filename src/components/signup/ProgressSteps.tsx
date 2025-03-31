import React from 'react';
import { Step } from './types';

interface ProgressStepsProps {
  currentStep: string;
  steps: Step[];
}

export default function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <nav aria-label="Progress" className="mt-8">
      <div className="flex items-center justify-center gap-4">
        {steps.map((step, stepIdx) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isComplete = steps.findIndex(s => s.id === currentStep) > stepIdx;
          
          return (
            <div key={step.name} className="flex flex-col items-center">
              <div className="relative">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                  ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/25' : 
                    isComplete ? 'bg-primary/20 text-primary' : 
                    'bg-dark-700 text-dark-400'}
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Connection line */}
                {stepIdx < steps.length - 1 && (
                  <div className="absolute top-1/2 left-full w-8 h-[2px] -translate-y-1/2">
                    <div className={`
                      w-full h-full rounded-full transition-all duration-200
                      ${isComplete ? 'bg-primary' : 'bg-dark-700'}
                    `} />
                  </div>
                )}
              </div>
              
              <span className={`
                mt-2 text-sm font-medium transition-all duration-200
                ${isActive ? 'text-primary' : 
                  isComplete ? 'text-dark-200' : 
                  'text-dark-400'}
              `}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}