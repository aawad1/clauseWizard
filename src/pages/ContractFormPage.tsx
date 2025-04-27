import React, { useState } from 'react';
import { FormProvider } from '../context/FormContext';
import ContractForm from '../components/ContractForm';

const ContractFormPage: React.FC = () => {
    const [contractText, setContractText] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false); // ➡️ dodano

    const generateContract = async () => {
        try {
            setIsGenerating(true);

            const formData = JSON.parse(localStorage.getItem('contractDraft') || '{}');
            const adminProfile = JSON.parse(localStorage.getItem('adminProfile') || '{}');

            const payload = {
                admin_input: {
                    naziv_firme: adminProfile.naziv_firme || '',
                    oib_firme: adminProfile.oib_firme || '',
                    adresa_firme: adminProfile.adresa_firme || '',
                    ime_prezime_zastupnika: adminProfile.ime_prezime_zastupnika || '',
                    oib_zastupnika: adminProfile.oib_zastupnika || '',
                },
                client_input: {
                    naziv_firme: formData?.entity2?.name || '',
                    tip_subjekta: formData?.entity2.tip_subjekta,
                    oib_firme: formData?.entity2?.idNumber || '',
                    adresa_firme: `${formData?.entity2?.address}, ${formData?.entity2?.city}` || '',
                    ime_prezime_zastupnika: formData?.entity2?.representativeName || '',
                    oib_zastupnika: '', // (ako dodate polje kasnije)
                },
                contract_details: {
                    contract_type: formData?.details?.type || '',
                    naziv_projekta: formData?.details?.subject || '',
                    opis_usluga: formData?.details?.subject || '',
                    nacin_obavljanja_posla: 'Rad od kuće, vlastita oprema',
                    trajanje_ugovora_od: formData?.details?.startDate || '',  // Trebaš dodati inpute ako želiš da ovo radi
                    trajanje_ugovora_do: formData?.details?.endDate || '',
                    fiksna_naknada: formData?.details?.paymentTerms || '',
                    nacin_placanja: 'Paypal',
                    email_za_placanje: '', // možeš dodati input ako želiš
                    bonus_mogucnost: 'Da',
                    otkazni_rok: formData?.details?.terminationTerms || '',
                    nadzor_i_pracenje: 'Da',
                    mjesto_obavljanja_usluga: formData?.details?.location || '',
                    obaveza_cuvanja_tajne: 'Da',
                    zabrana_konkurencije: 'Da',
                    vrijeme_trajanja_zabrane_konkurencije: '2 godine',
                    datum: formData?.details?.date || '',
                }
            };
            console.log(payload)
            const response = await fetch('http://127.0.0.1:5000/generate_contract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            setContractText(data.text);
        } catch (error) {
            console.error('Greška pri generisanju ugovora:', error);
        } finally {
            setIsGenerating(false);
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
                <ContractForm
                    generateContract={generateContract}
                    contractText={contractText}
                    isGenerating={isGenerating}
                />
            </FormProvider>
        </div>
    );
};

export default ContractFormPage;
