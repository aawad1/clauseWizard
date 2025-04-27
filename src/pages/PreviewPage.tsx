import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useFormContext } from '../context/FormContext';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import ContractPreview from '../components/ContractPreview';

const PreviewPageContent: React.FC = () => {
  const { formData } = useFormContext();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Simuliraj generisanje ugovora
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isGenerating) {
    return (
      <div className="h-80 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Generisanje ugovora u toku...</h2>
        <p className="text-gray-600">
          Naš AI analizira vaše podatke i kreira prilagođen ugovor. Ovo može potrajati nekoliko trenutaka.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{formData.details.title}</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/create')}
            className="flex items-center px-4 py-2 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Izmijeni
          </button>
          <button 
            className="flex items-center px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Preuzmi PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-3 bg-gray-50 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-gray-700 text-sm ml-2">preview-ugovor.pdf</span>
        </div>
        
        <div className="p-6 bg-white max-h-[800px] overflow-y-auto">
          <ContractPreview contractText={''} />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link 
          to="/create" 
          className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Nazad na formu
        </Link>
      </div>
    </div>
  );
};

const PreviewPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <FormProvider>
        <PreviewPageContent />
      </FormProvider>
    </div>
  );
};

export default PreviewPage;