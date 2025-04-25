import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import EntityForm from './forms/EntityForm';
import ContractDetailsForm from './forms/ContractDetailsForm';
import FormSteps from './FormSteps';
import { ArrowLeft, ArrowRight, Save, FileCheck } from 'lucide-react';

const steps = [
  { id: 'entity1', title: 'Prva ugovorna strana', description: 'Informacije o prvoj ugovornoj strani' },
  { id: 'entity2', title: 'Druga ugovorna strana', description: 'Informacije o drugoj ugovornoj strani' },
  { id: 'details', title: 'Detalji ugovora', description: 'Predmet i uslovi ugovora' },
  { id: 'review', title: 'Pregled', description: 'Pregledajte informacije prije generisanja' },
];

const ContractForm: React.FC = () => {
  const { formData, currentStep, nextStep, prevStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateCurrentStep = () => {
    const currentStepId = steps[currentStep].id;
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStepId === 'entity1') {
      // Validacija prve ugovorne strane
      if (!formData.entity1.name) {
        newErrors.entity1Name = 'Naziv/ime je obavezno';
        isValid = false;
      }
      if (!formData.entity1.address) {
        newErrors.entity1Address = 'Adresa je obavezna';
        isValid = false;
      }
      if (!formData.entity1.idNumber) {
        newErrors.entity1IdNumber = 'JIB/JMBG je obavezan';
        isValid = false;
      }
    } else if (currentStepId === 'entity2') {
      // Validacija druge ugovorne strane
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
      // Validacija detalja ugovora
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
      if (currentStep < steps.length - 1) {
        nextStep();
      } else {
        // Posljednji korak - generiranje ugovora
        navigate('/preview');
      }
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleSaveDraft = () => {
    // Logika za spremanje nacrta
    localStorage.setItem('contractDraft', JSON.stringify(formData));
    alert('Nacrt ugovora je uspješno sačuvan!');
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'entity1':
        return <EntityForm entityNumber={1} errors={errors} />;
      case 'entity2':
        return <EntityForm entityNumber={2} errors={errors} />;
      case 'details':
        return <ContractDetailsForm errors={errors} />;
      case 'review':
        return <ContractReview />;
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
          <div className="flex space-x-3">
            <button
              onClick={handleSaveDraft}
              className="flex items-center px-4 py-2 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Sačuvaj nacrt
            </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponenta za pregled ugovora prije generisanja
const ContractReview: React.FC = () => {
  const { formData } = useFormContext();

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Pregled informacija</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-800">Prva ugovorna strana</h3>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Naziv/Ime:</p>
            <p className="font-medium">{formData.entity1.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Adresa:</p>
            <p className="font-medium">{formData.entity1.address}, {formData.entity1.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">JIB/JMBG:</p>
            <p className="font-medium">{formData.entity1.idNumber}</p>
          </div>
          {formData.entity1.type === 'pravno_lice' && (
            <div>
              <p className="text-sm text-gray-500">Zastupnik:</p>
              <p className="font-medium">{formData.entity1.representativeName}, {formData.entity1.representativePosition}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-800">Druga ugovorna strana</h3>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Naziv/Ime:</p>
            <p className="font-medium">{formData.entity2.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Adresa:</p>
            <p className="font-medium">{formData.entity2.address}, {formData.entity2.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">JIB/JMBG:</p>
            <p className="font-medium">{formData.entity2.idNumber}</p>
          </div>
          {formData.entity2.type === 'pravno_lice' && (
            <div>
              <p className="text-sm text-gray-500">Zastupnik:</p>
              <p className="font-medium">{formData.entity2.representativeName}, {formData.entity2.representativePosition}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-800">Detalji ugovora</h3>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Naslov ugovora:</p>
            <p className="font-medium">{formData.details.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tip ugovora:</p>
            <p className="font-medium">{formData.details.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Datum:</p>
            <p className="font-medium">{formData.details.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mjesto:</p>
            <p className="font-medium">{formData.details.location}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Predmet ugovora:</p>
            <p className="font-medium">{formData.details.subject}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Uslovi plaćanja:</p>
            <p className="font-medium">{formData.details.paymentTerms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractForm;