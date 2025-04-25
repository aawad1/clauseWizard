import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { ContractType } from '../../types';
import FormInput from '../ui/FormInput';
import FormSelect from '../ui/FormSelect';
import FormTextArea from '../ui/FormTextArea';
import FormCheckbox from '../ui/FormCheckbox';

interface ContractDetailsFormProps {
  errors: Record<string, string>;
}

const ContractDetailsForm: React.FC<ContractDetailsFormProps> = ({ errors }) => {
  const { formData, updateDetails } = useFormContext();
  const { details } = formData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateDetails({ [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateDetails({ [name]: checked });
  };

  const contractTypeOptions = [
    { value: ContractType.KUPOPRODAJA, label: 'Ugovor o kupoprodaji' },
    { value: ContractType.USLUGE, label: 'Ugovor o pružanju usluga' },
    { value: ContractType.ZAKUP, label: 'Ugovor o zakupu' },
    { value: ContractType.DJELO, label: 'Ugovor o djelu' },
    { value: ContractType.POSLOVNA_SARADNJA, label: 'Ugovor o poslovnoj saradnji' },
    { value: ContractType.ZAPOSLENJE, label: 'Ugovor o zaposlenju' },
    { value: ContractType.OSTALO, label: 'Ostalo' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Detalji ugovora</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <FormInput
            id="title"
            label="Naslov ugovora"
            value={details.title}
            onChange={handleChange}
            required
            name="title"
            error={errors.title}
            placeholder="npr. UGOVOR O KUPOPRODAJI ROBE"
          />
        </div>

        <FormSelect
          id="type"
          label="Tip ugovora"
          value={details.type}
          onChange={handleChange}
          options={contractTypeOptions}
          required
          name="type"
          error={errors.type}
        />

        <div className="grid grid-cols-2 gap-x-3">
          <FormInput
            id="date"
            label="Datum ugovora"
            type="date"
            value={details.date}
            onChange={handleChange}
            required
            name="date"
            error={errors.date}
          />

          <FormInput
            id="location"
            label="Mjesto"
            value={details.location}
            onChange={handleChange}
            required
            name="location"
            error={errors.location}
            placeholder="npr. Sarajevo"
          />
        </div>

        <div className="md:col-span-2">
          <FormTextArea
            id="subject"
            label="Predmet ugovora"
            value={details.subject}
            onChange={handleChange}
            required
            name="subject"
            error={errors.subject}
            placeholder="Opišite predmet ugovora..."
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <FormInput
            id="duration"
            label="Trajanje ugovora"
            value={details.duration}
            onChange={handleChange}
            required
            name="duration"
            error={errors.duration}
            placeholder="npr. 12 mjeseci od dana potpisivanja"
          />
        </div>

        <div className="md:col-span-2">
          <FormTextArea
            id="paymentTerms"
            label="Uslovi plaćanja"
            value={details.paymentTerms}
            onChange={handleChange}
            required
            name="paymentTerms"
            error={errors.paymentTerms}
            placeholder="Opišite uslove i način plaćanja..."
            rows={3}
          />
        </div>

        {(details.type === ContractType.KUPOPRODAJA || 
          details.type === ContractType.USLUGE) && (
          <div className="md:col-span-2">
            <FormTextArea
              id="deliveryTerms"
              label="Uslovi isporuke"
              value={details.deliveryTerms || ''}
              onChange={handleChange}
              name="deliveryTerms"
              error={errors.deliveryTerms}
              placeholder="Opišite način, mjesto i rok isporuke..."
              rows={3}
            />
          </div>
        )}

        <div className="md:col-span-2">
          <FormTextArea
            id="terminationTerms"
            label="Uslovi raskida ugovora"
            value={details.terminationTerms}
            onChange={handleChange}
            required
            name="terminationTerms"
            error={errors.terminationTerms}
            placeholder="Opišite uslove pod kojima se ugovor može raskinuti..."
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <FormTextArea
            id="disputeResolution"
            label="Rješavanje sporova"
            value={details.disputeResolution}
            onChange={handleChange}
            required
            name="disputeResolution"
            error={errors.disputeResolution}
            placeholder="Opišite način rješavanja eventualnih sporova..."
            rows={2}
          />
        </div>

        <div className="md:col-span-2">
          <FormTextArea
            id="additionalClauses"
            label="Dodatne klauzule"
            value={details.additionalClauses || ''}
            onChange={handleChange}
            name="additionalClauses"
            error={errors.additionalClauses}
            placeholder="Opišite dodatne klauzule ili napomene..."
            rows={3}
          />
        </div>

        <div className="md:col-span-2 space-y-2 mt-4">
          <FormCheckbox
            id="confidentialityClause"
            label="Uključi klauzulu o povjerljivosti"
            checked={details.confidentialityClause}
            onChange={handleCheckboxChange}
            name="confidentialityClause"
            helpText="Ugovorne strane se obavezuju da će sve informacije vezane za ovaj ugovor čuvati kao povjerljive"
          />

          <FormCheckbox
            id="forceMajeureClause"
            label="Uključi klauzulu o višoj sili"
            checked={details.forceMajeureClause}
            onChange={handleCheckboxChange}
            name="forceMajeureClause"
            helpText="Oslobađa ugovorne strane od odgovornosti u slučaju događaja izvan njihove kontrole"
          />
        </div>
      </div>
    </div>
  );
};

export default ContractDetailsForm;