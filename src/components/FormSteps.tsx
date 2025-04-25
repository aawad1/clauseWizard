import React from 'react';
import { FormStep } from '../types';
import { Check } from 'lucide-react';

interface FormStepsProps {
  steps: FormStep[];
  currentStep: number;
}

const FormSteps: React.FC<FormStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="py-6 px-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-2xl">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-600 text-white'
                    : index === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-lg font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="text-sm font-medium mt-3 text-center max-w-[120px]">
                <p className={index === currentStep ? 'text-blue-600' : 'text-gray-600'}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                  index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormSteps;