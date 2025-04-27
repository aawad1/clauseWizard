import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ContractPDF from './ContractPDF';

interface ContractPreviewProps {
  contractText: string;
}

const ContractPreview: React.FC<ContractPreviewProps> = ({ contractText }) => {
    console.log(contractText);
  return (
      <div className="contract-preview mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pregled generisanog ugovora</h2>

        <div className="border rounded-lg overflow-hidden shadow-lg" style={{ height: '80vh' }}>
          <PDFViewer width="100%" height="100%">
            <ContractPDF contractText={contractText} />
          </PDFViewer>
        </div>
      </div>
  );
};

export default ContractPreview;
