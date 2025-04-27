import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import EntityForm from './forms/EntityForm';
import ContractDetailsForm from './forms/ContractDetailsForm';
import FormSteps from './FormSteps';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContractPreview from './ContractPreview';
import { ArrowLeft, ArrowRight, Download, Check } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import ContractPDF from './ContractPDF';

const steps = [
  { id: 'entity2', title: 'Podaci o klijentu', description: 'Informacije o drugoj ugovornoj strani' },
  { id: 'details', title: 'Detalji ugovora', description: 'Predmet i uslovi ugovora' },
  { id: 'review', title: 'Pregled', description: 'Pregledajte informacije prije preuzimanja' },
];

interface ContractFormProps {
  generateContract: () => void;
  contractText: string | null;
  isGenerating: boolean;
}

const ContractForm: React.FC<ContractFormProps> = ({ generateContract, contractText, isGenerating }) => {
  const { formData, currentStep, nextStep, prevStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [contractBlob, setContractBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const generateBlob = async () => {
      if (contractText) {
        const blob = await pdf(<ContractPDF contractText={contractText} />).toBlob();
        setContractBlob(blob);
        setDownloadSuccess(false); // Reset downloadSuccess kad se novi ugovor generiše
      }
    };

    generateBlob();
  }, [contractText]);

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

  const handleNext = async () => {
    if (validateCurrentStep()) {
      const formDataToSave = {
        admin: JSON.parse(localStorage.getItem('adminProfile') || '{}'),
        entity2: {
          ...formData.entity2,
          tip_subjekta: formData.entity2.type || '',
        },
        details: formData.details,
      };
      localStorage.setItem('contractDraft', JSON.stringify(formDataToSave));

      if (currentStep === 1) {
        generateContract(); // Generiši novi ugovor
      }

      if (currentStep < steps.length - 1) {
        nextStep();
      }
    }
  };

  const handlePrev = () => {
    // Kada se ide nazad, resetuj stanje dugmeta
    setDownloadSuccess(false);
    setContractBlob(null);
    prevStep();
  };

  const saveContractToBackend = async (title: string, pdfBlob: Blob) => {
    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];

        const response = await fetch('http://localhost:5000/save_contract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            pdf_base64: base64,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Contract saved! ID:", data.contract_id);
        } else {
          console.error("Error saving contract:", data.error);
        }
      };

      reader.readAsDataURL(pdfBlob);

    } catch (error) {
      console.error("Error preparing contract for save:", error);
    }
  };


  const handleDownload = async () => {
    if (!contractBlob) return;

    setIsDownloading(true);

    try {
      const formDataLocal = JSON.parse(localStorage.getItem('contractDraft') || '{}');
      const adminProfile = JSON.parse(localStorage.getItem('adminProfile') || '{}');

      const title = (formDataLocal?.details?.title || 'ugovor').replace(/\s+/g, '_');
      const firstParty = (adminProfile?.naziv_firme || 'admin').replace(/\s+/g, '_');
      const secondParty = (formDataLocal?.entity2?.name || 'klijent').replace(/\s+/g, '_');

      const filename = `${title}_${firstParty}_${secondParty}.pdf`;

      await saveContractToBackend(title, contractBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(contractBlob);
      downloadLink.download = filename;
      downloadLink.click();

      toast.success('Ugovor je uspješno preuzet!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setDownloadSuccess(true);
    } catch (error) {
      toast.error('Došlo je do greške pri preuzimanju ugovora.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'entity2':
        return <EntityForm entityNumber={2} errors={errors} />;
      case 'details':
        return <ContractDetailsForm errors={errors} />;
      case 'review':
        return (
            <>
              {isGenerating ? (
                  <div className="flex flex-col items-center justify-center mt-8">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4" />
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
          <ToastContainer />
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
              {currentStep < steps.length - 1 ? (
                  <button
                      onClick={handleNext}
                      className="flex items-center px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Dalje
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
              ) : (contractText && contractBlob && !isGenerating) ? ( // <-- dodana provjera
                  <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className={`flex items-center justify-center px-6 py-2 rounded-md text-white transition-all duration-300 ${
                          downloadSuccess
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-green-700 hover:bg-green-800'
                      }`}
                  >
                    {isDownloading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : downloadSuccess ? (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          Preuzeto
                        </>
                    ) : (
                        <>
                          Preuzmi ugovor
                          <Download className="h-4 w-4 ml-2" />
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
