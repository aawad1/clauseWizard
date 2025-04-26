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

export interface AdminProfile {
  naziv_firme: string;
  oib_firme: string;
  adresa_firme: string;
  ime_prezime_zastupnika: string;
  oib_zastupnika: string;
  broj_ziro_racuna: string;
  naziv_banke: string;
}

export interface Entity {
  type: EntityType;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  idNumber: string;
  vatNumber?: string;
  courtRegistry?: string;
  representativeName?: string;
  representativePosition?: string;
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
  attachmentUrl?: string;
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