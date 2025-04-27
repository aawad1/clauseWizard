import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import EntityForm from './forms/EntityForm';
import ContractDetailsForm from './forms/ContractDetailsForm';
import FormSteps from './FormSteps';
import ContractPreview from './ContractPreview';
import { ArrowLeft, ArrowRight, Save, FileCheck, Upload } from 'lucide-react';

const steps = [
  { id: 'entity2', title: 'Podaci o klijentu', description: 'Informacije o drugoj ugovornoj strani' },
  { id: 'details', title: 'Detalji ugovora', description: 'Predmet i uslovi ugovora' },
  { id: 'review', title: 'Pregled', description: 'Pregledajte informacije prije generisanja' },
];

interface ContractFormProps {
  generateContract: () => void;
  contractText: string | null;
  isGenerating: boolean;
}

const ContractForm: React.FC<ContractFormProps> = ({ generateContract, contractText, isGenerating }) => {
  const { formData, currentStep, nextStep, prevStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCurrentStep = () => {
    const currentStepId = steps[currentStep].id;
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStepId === 'entity2') {
      if (!formData.entity2.name) {
        newErrors.entity2Name = 'Naziv/ime je obavezno';
        isValid = false;
      }
      if (!formData.entity2.address) {
        newErrors.entity2Address = 'Adresa je obavezna';
        isValid = false;
      }
      if (!formData.entity2.idNumber) {
        newErrors.entity2IdNumber = 'JIB/JMBG je obavezan';
        isValid = false;
      }
    } else if (currentStepId === 'details') {
      if (!formData.details.title) {
        newErrors.title = 'Naslov ugovora je obavezan';
        isValid = false;
      }
      if (!formData.details.subject) {
        newErrors.subject = 'Predmet ugovora je obavezan';
        isValid = false;
      }
      if (!formData.details.paymentTerms) {
        newErrors.paymentTerms = 'Uslovi plaćanja su obavezni';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      const formDataToSave = {
        admin: JSON.parse(localStorage.getItem('adminProfile') || '{}'),
        ...formData
      };
      localStorage.setItem('contractDraft', JSON.stringify(formDataToSave));

      if (currentStep < steps.length - 1) {
        nextStep();
      } else {
        generateContract();
      }
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleSaveDraft = () => {
    localStorage.setItem('contractDraft', JSON.stringify(formData));
    alert('Nacrt ugovora je uspješno sačuvan!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log('File selected:', file.name);
      alert('Dokument je uspješno priložen!');
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'entity2':
        return <EntityForm entityNumber={2} errors={errors} />;
      case 'details':
        return (
            <div className="space-y-6">
              <ContractDetailsForm errors={errors} />
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priložite ponudu ili dodatnu dokumentaciju
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Učitajte fajl</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">ili prevucite ovdje</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, Word ili TXT do 10MB</p>
                  </div>
                </div>
              </div>
            </div>
        );
      case 'review':
        return (
            <>
              {isGenerating ? (
                  <div className="flex flex-col items-center justify-center mt-8">
                    <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <p className="text-blue-600 font-semibold text-lg">Ugovor se trenutno generiše...</p>
                  </div>
              ) : contractText ? (
                  <ContractPreview contractText={contractText} />
              ) : (
                  <div className="text-center text-gray-500">Ugovor nije generisan.</div>
              )}
            </>
        );
      default:
        return <div>Nepoznat korak</div>;
    }
  };

  return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <FormSteps steps={steps} currentStep={currentStep} />
        <div className="p-6">
          {renderStepContent()}

          <div className="mt-8 flex justify-between">
            <div>
              {currentStep > 0 && (
                  <button
                      onClick={handlePrev}
                      className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Nazad
                  </button>
              )}
            </div>

            {/* Dugmad desno */}
            <div className="flex space-x-3">
              {currentStep < steps.length - 1 && (
                  <button
                      onClick={handleSaveDraft}
                      className="flex items-center px-4 py-2 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Sačuvaj nacrt
                  </button>
              )}
              {currentStep < steps.length - 1 || (currentStep === steps.length - 1 && !contractText) ? (
                  <button
                      onClick={handleNext}
                      className="flex items-center px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    {currentStep < steps.length - 1 ? (
                        <>
                          Dalje
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                    ) : (
                        <>
                          Generiši ugovor
                          <FileCheck className="h-4 w-4 ml-2" />
                        </>
                    )}
                  </button>
              ) : null}
            </div>

          </div>
        </div>
      </div>
  );
};

export default ContractForm;
