import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import EntityForm from './forms/EntityForm';
import ContractDetailsForm from './forms/ContractDetailsForm';
import FormSteps from './FormSteps';
import { ArrowLeft, ArrowRight, Save, FileCheck, Upload } from 'lucide-react';

const steps = [
  { id: 'entity2', title: 'Podaci o klijentu', description: 'Informacije o drugoj ugovornoj strani' },
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
      if (currentStep < steps.length - 1) {
        nextStep();
      } else {
        navigate('/preview');
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
      // Here you would typically upload the file to your server
      // For now, we'll just store the file name
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate file upload
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

const ContractReview: React.FC = () => {
  const { formData } = useFormContext();
  const adminProfile = JSON.parse(localStorage.getItem('adminProfile') || '{}');

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Pregled informacija</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-800">Podaci o vašoj firmi</h3>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Naziv firme:</p>
            <p className="font-medium">{adminProfile.naziv_firme}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">OIB firme:</p>
            <p className="font-medium">{adminProfile.oib_firme}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Adresa:</p>
            <p className="font-medium">{adminProfile.adresa_firme}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Zastupnik:</p>
            <p className="font-medium">{adminProfile.ime_prezime_zastupnika}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-800">Podaci o klijentu</h3>
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