import React, { createContext, useContext, useState } from 'react';
import { ContractFormData, ContractType, EntityType } from '../types';

// Initial form state
const initialFormState: ContractFormData = {
  entity1: {
    type: EntityType.PRAVNO_LICE,
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bosna i Hercegovina',
    idNumber: '',
    vatNumber: '',
    courtRegistry: '',
    representativeName: '',
    representativePosition: '',
    contactPhone: '',
    contactEmail: ''
  },
  entity2: {
    type: EntityType.PRAVNO_LICE,
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bosna i Hercegovina',
    idNumber: '',
    vatNumber: '',
    courtRegistry: '',
    representativeName: '',
    representativePosition: '',
    contactPhone: '',
    contactEmail: ''
  },
  details: {
    title: '',
    type: ContractType.KUPOPRODAJA,
    date: new Date().toISOString().split('T')[0],
    location: '',
    subject: '',
    duration: '',
    paymentTerms: '',
    deliveryTerms: '',
    confidentialityClause: true,
    forceMajeureClause: true,
    disputeResolution: 'Nadležni sud u mjestu sjedišta tuženog',
    terminationTerms: '',
    additionalClauses: ''
  }
};

// Context type
interface FormContextType {
  formData: ContractFormData;
  currentStep: number;
  setFormData: React.Dispatch<React.SetStateAction<ContractFormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  updateEntity1: (data: Partial<ContractFormData['entity1']>) => void;
  updateEntity2: (data: Partial<ContractFormData['entity2']>) => void;
  updateDetails: (data: Partial<ContractFormData['details']>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ContractFormData>(initialFormState);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const updateEntity1 = (data: Partial<ContractFormData['entity1']>) => {
    setFormData(prev => ({
      ...prev,
      entity1: {
        ...prev.entity1,
        ...data
      }
    }));
  };

  const updateEntity2 = (data: Partial<ContractFormData['entity2']>) => {
    setFormData(prev => ({
      ...prev,
      entity2: {
        ...prev.entity2,
        ...data
      }
    }));
  };

  const updateDetails = (data: Partial<ContractFormData['details']>) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        ...data
      }
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setCurrentStep(0);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        setFormData,
        setCurrentStep,
        updateEntity1,
        updateEntity2,
        updateDetails,
        nextStep,
        prevStep,
        resetForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};