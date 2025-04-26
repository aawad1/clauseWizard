import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { EntityType } from '../../types';
import FormInput from '../ui/FormInput';
import FormSelect from '../ui/FormSelect';

interface EntityFormProps {
  entityNumber: 1 | 2;
  errors: Record<string, string>;
}

const EntityForm: React.FC<EntityFormProps> = ({ entityNumber, errors }) => {
  const { formData, updateEntity1, updateEntity2 } = useFormContext();
  const entity = entityNumber === 1 ? formData.entity1 : formData.entity2;
  const updateEntity = entityNumber === 1 ? updateEntity1 : updateEntity2;
  const entityPrefix = `entity${entityNumber}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateEntity({ [name]: value });
  };

  const entityTypeOptions = [
    { value: EntityType.PRAVNO_LICE, label: 'Pravno lice' },
    { value: EntityType.FIZICKO_LICE, label: 'Fizičko lice' },
  ];

  return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {entityNumber === 1 ? 'Prva ugovorna strana' : 'Druga ugovorna strana'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <FormSelect
              id={`${entityPrefix}-type`}
              label="Tip subjekta"
              value={entity.type}
              onChange={handleChange}
              options={entityTypeOptions}
              required
              name="type"
              error={errors.type}
          />

          <FormInput
              id={`${entityPrefix}-name`}
              label={entity.type === EntityType.PRAVNO_LICE ? 'Naziv pravnog lica' : 'Ime i prezime'}
              value={entity.name}
              onChange={handleChange}
              required
              name="name"
              error={errors.name}
              placeholder={entity.type === EntityType.PRAVNO_LICE ? 'npr. Firma d.o.o.' : 'npr. Ime Prezime'}
          />

          <FormInput
              id={`${entityPrefix}-address`}
              label="Adresa"
              value={entity.address}
              onChange={handleChange}
              required
              name="address"
              error={errors.address}
              placeholder="npr. Ulica i broj"
          />

          <div className="grid grid-cols-2 gap-x-3">
            <FormInput
                id={`${entityPrefix}-city`}
                label="Grad"
                value={entity.city}
                onChange={handleChange}
                required
                name="city"
                error={errors.city}
            />

            <FormInput
                id={`${entityPrefix}-postalCode`}
                label="Poštanski broj"
                value={entity.postalCode}
                onChange={handleChange}
                required
                name="postalCode"
                error={errors.postalCode}
            />
          </div>

          <FormInput
              id={`${entityPrefix}-country`}
              label="Država"
              value={entity.country}
              onChange={handleChange}
              required
              name="country"
              error={errors.country}
          />

          <FormInput
              id={`${entityPrefix}-idNumber`}
              label={entity.type === EntityType.PRAVNO_LICE ? 'JIB' : 'JMBG'}
              value={entity.idNumber}
              onChange={handleChange}
              required
              name="idNumber"
              error={errors.idNumber}
              helpText={entity.type === EntityType.PRAVNO_LICE ? 'Jedinstveni identifikacioni broj' : 'Jedinstveni matični broj građana'}
          />

          {entity.type === EntityType.PRAVNO_LICE && (
              <>
                <FormInput
                    id={`${entityPrefix}-vatNumber`}
                    label="PDV broj"
                    value={entity.vatNumber || ''}
                    onChange={handleChange}
                    name="vatNumber"
                    error={errors.vatNumber}
                    helpText="Opciono - samo ako je subjekat u sistemu PDV-a"
                />

                <FormInput
                    id={`${entityPrefix}-courtRegistry`}
                    label="Sudski registar"
                    value={entity.courtRegistry || ''}
                    onChange={handleChange}
                    name="courtRegistry"
                    error={errors.courtRegistry}
                    helpText="Broj sudskog registra"
                />

                <FormInput
                    id={`${entityPrefix}-representativeName`}
                    label="Ime i prezime zastupnika"
                    value={entity.representativeName || ''}
                    onChange={handleChange}
                    required
                    name="representativeName"
                    error={errors.representativeName}
                />

                <FormInput
                    id={`${entityPrefix}-representativePosition`}
                    label="Pozicija zastupnika"
                    value={entity.representativePosition || ''}
                    onChange={handleChange}
                    required
                    name="representativePosition"
                    error={errors.representativePosition}
                    placeholder="npr. Direktor"
                />
              </>
          )}

          <FormInput
              id={`${entityPrefix}-contactPhone`}
              label="Telefon"
              value={entity.contactPhone}
              onChange={handleChange}
              required
              name="contactPhone"
              error={errors.contactPhone}
          />

          <FormInput
              id={`${entityPrefix}-contactEmail`}
              label="Email"
              type="email"
              value={entity.contactEmail}
              onChange={handleChange}
              required
              name="contactEmail"
              error={errors.contactEmail}
          />
        </div>
      </div>
  );
};

export default EntityForm;
