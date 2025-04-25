import React from 'react';
import { FormProvider } from '../context/FormContext';
import ContractForm from '../components/ContractForm';

const ContractFormPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Kreiranje Ugovora</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Popunite obrazac sa potrebnim informacijama o ugovornim stranama i detaljima ugovora.
        Naš AI će generisati prilagođen ugovor na osnovu vaših unosa.
      </p>
      <FormProvider>
        <ContractForm />
      </FormProvider>
    </div>
  );
};

export default ContractFormPage;