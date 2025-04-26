import React, { useState } from 'react';
import { FormProvider, useFormContext } from '../context/FormContext';
import ContractForm from '../components/ContractForm';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ContractPDF from '../components/ContractPDF';

const ContractFormContent: React.FC = () => {
    const { formData } = useFormContext();
    const [contractText, setContractText] = useState<string | null>(null);
    const generateContract = async () => {
        if (!formData.details.type) {
            alert('Molimo odaberite tip ugovora!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/generate_contract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contract_type: formData.details.type })
            });

            const data = await response.json();
            setContractText(data.contract_formatted);
        } catch (error) {
            console.error('Greška prilikom generisanja:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Kreiranje Ugovora</h1>
            <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
                Popunite obrazac sa potrebnim informacijama o ugovornim stranama i detaljima ugovora.
                Naš AI će generisati prilagođen ugovor na osnovu vaših unosa.
            </p>

            <ContractForm generateContract={generateContract} />

            {contractText && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Pregled Ugovora</h2>

                    <div className="text-center mb-6">
                        <PDFDownloadLink
                            document={<ContractPDF contractText={contractText} />}
                            fileName="generisani_ugovor.pdf"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
                        >
                            {({ loading }) => (loading ? 'Generišem PDF...' : 'Preuzmi Ugovor kao PDF')}
                        </PDFDownloadLink>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-lg shadow">
                        <pre className="whitespace-pre-wrap">{contractText}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

const ContractFormPage: React.FC = () => {
    return (
        <FormProvider>
            <ContractFormContent />
        </FormProvider>
    );
};

export default ContractFormPage;
