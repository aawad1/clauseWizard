export enum ContractType {
  KUPOPRODAJA = 'kupoprodaja',
  USLUGE = 'usluge',
  ZAKUP = 'zakup',
  DJELO = 'djelo',
  POSLOVNA_SARADNJA = 'poslovna_saradnja',
  ZAPOSLENJE = 'zaposlenje',
  OSTALO = 'ostalo'
}

export enum EntityType {
  PRAVNO_LICE = 'pravno_lice',
  FIZICKO_LICE = 'fizicko_lice'
}

export interface Entity {
  type: EntityType;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  idNumber: string; // JIB/JMBG
  vatNumber?: string; // PDV broj (opcionalno)
  courtRegistry?: string; // Sudski registar (samo za pravna lica)
  representativeName?: string; // Ime zastupnika (samo za pravna lica)
  representativePosition?: string; // Pozicija zastupnika (samo za pravna lica)
  contactPhone: string;
  contactEmail: string;
}

export interface ContractDetails {
  title: string;
  type: ContractType;
  date: string;
  location: string;
  subject: string;
  duration: string;
  paymentTerms: string;
  deliveryTerms?: string;
  confidentialityClause: boolean;
  forceMajeureClause: boolean;
  disputeResolution: string;
  terminationTerms: string;
  additionalClauses: string;
}

export interface ContractFormData {
  entity1: Entity;
  entity2: Entity;
  details: ContractDetails;
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
}