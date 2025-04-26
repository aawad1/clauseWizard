import React, { useState } from 'react';
import { FormProvider } from '../context/FormContext';
import ContractForm from '../components/ContractForm';

const ContractFormPage: React.FC = () => {
    const [contractText, setContractText] = useState<string | null>(null);
    const generateContract = async () => {
        try {
            const formData = JSON.parse(localStorage.getItem('contractDraft') || '{}');
            const contractType = formData?.details?.type || 'Ugovor';

            const response = await fetch('http://127.0.0.1:5000/generate_contract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contract_type: contractType }),
            });

            const data = await response.json();
            setContractText(data.contract_formatted);
        } catch (error) {
            console.error('Greška pri generisanju ugovora:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Kreiranje Ugovora</h1>
            <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
                Popunite obrazac sa potrebnim informacijama o ugovornim stranama i detaljima ugovora.
                Naš AI će generisati prilagođen ugovor na osnovu vaših unosa.
            </p>
            <FormProvider>
                <ContractForm generateContract={generateContract} contractText={contractText} />
            </FormProvider>
        </div>
    );
};

export default ContractFormPage;
