import React from 'react';
import { useFormContext } from '../context/FormContext';
import { EntityType, ContractType } from '../types';

// Helper za formatiranje datuma
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('bs', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const ContractPreview: React.FC = () => {
  const { formData } = useFormContext();
  const { entity1, entity2, details } = formData;

  // Helper za prikaz podataka o pravnom/fizičkom licu
  const renderEntityInfo = (entity: typeof entity1, number: number) => {
    const isLegalEntity = entity.type === EntityType.PRAVNO_LICE;
    
    return (
      <div className="mb-6">
        <p className="font-bold mb-2">{number === 1 ? 'PRVA UGOVORNA STRANA:' : 'DRUGA UGOVORNA STRANA:'}</p>
        <p>
          {isLegalEntity ? entity.name : entity.name}, sa sjedištem u {entity.address}, {entity.city}, {entity.postalCode}, 
          {isLegalEntity ? ` JIB: ${entity.idNumber}` : ` JMBG: ${entity.idNumber}`}
          {isLegalEntity && entity.vatNumber ? `, PDV broj: ${entity.vatNumber}` : ''}
          {isLegalEntity && entity.courtRegistry ? `, upisan u sudski registar pod brojem: ${entity.courtRegistry}` : ''}
          {isLegalEntity ? `, kojeg zastupa ${entity.representativeName}, ${entity.representativePosition}` : ''}
          {' '}(u daljem tekstu: {number === 1 ? 'PRVA UGOVORNA STRANA' : 'DRUGA UGOVORNA STRANA'})
        </p>
      </div>
    );
  };

  // Funkcija za generisanje teksta ugovora na osnovu tipa
  const generateContractText = () => {
    let specificClauses = '';
    
    switch (details.type) {
      case ContractType.KUPOPRODAJA:
        specificClauses = `
          <p class="font-bold mt-4">Član 4. - ISPORUKA</p>
          <p class="mb-2">${details.deliveryTerms || 'Prodavac se obavezuje da će robu isporučiti Kupcu u roku od 7 dana od dana potpisivanja ovog Ugovora.'}</p>
          
          <p class="font-bold mt-4">Član 5. - GARANCIJA</p>
          <p class="mb-2">Prodavac garantuje da roba nema materijalnih i pravnih nedostataka i da odgovara svim tehničkim standardima i specifikacijama navedenim u ponudi.</p>
        `;
        break;
        
      case ContractType.USLUGE:
        specificClauses = `
          <p class="font-bold mt-4">Član 4. - IZVRŠENJE USLUGA</p>
          <p class="mb-2">Davalac usluga se obavezuje da će usluge izvršiti stručno i kvalitetno, u skladu sa pravilima struke i u dogovorenim rokovima.</p>
          
          <p class="font-bold mt-4">Član 5. - NADZOR</p>
          <p class="mb-2">Korisnik usluga ima pravo nadzora nad izvršenjem usluga i može davati upute i smjernice Davaocu usluga, koje su u skladu sa predmetom ovog Ugovora.</p>
        `;
        break;
        
      case ContractType.ZAKUP:
        specificClauses = `
          <p class="font-bold mt-4">Član 4. - PREDAJA I ODRŽAVANJE</p>
          <p class="mb-2">Zakupodavac je dužan predati Zakupcu zakupljenu nekretninu u ispravnom stanju za ugovorenu upotrebu. Zakupac je dužan održavati nekretninu i snositi troškove redovnog održavanja.</p>
          
          <p class="font-bold mt-4">Član 5. - ZABRANA PODZAKUPA</p>
          <p class="mb-2">Zakupac ne može zakupljenu nekretninu ili njen dio dati u podzakup bez prethodne pisane saglasnosti Zakupodavca.</p>
        `;
        break;
        
      case ContractType.DJELO:
        specificClauses = `
          <p class="font-bold mt-4">Član 4. - IZVRŠENJE DJELA</p>
          <p class="mb-2">Izvođač se obavezuje da će djelo izvršiti prema pravilima struke i sa pažnjom dobrog stručnjaka, koristeći materijale i opremu dogovorenog ili uobičajenog kvaliteta.</p>
          
          <p class="font-bold mt-4">Član 5. - NEDOSTACI</p>
          <p class="mb-2">Naručilac je dužan pregledati djelo čim je to po redovnom toku stvari moguće i o vidljivim nedostacima obavijestiti Izvođača bez odlaganja.</p>
        `;
        break;
        
      default:
        specificClauses = '';
        break;
    }
    
    return specificClauses;
  };

  return (
    <div className="contract-preview font-serif text-gray-900 leading-relaxed">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase mb-1">{details.title}</h1>
        <p>Zaključen dana {formatDate(details.date)} godine u {details.location}</p>
        <p className="mt-2">između:</p>
      </div>

      {renderEntityInfo(entity1, 1)}
      
      <p className="text-center my-2">i</p>
      
      {renderEntityInfo(entity2, 2)}
      
      <div className="mt-6">
        <p className="font-bold text-center mb-4">PREDMET UGOVORA</p>
        
        <p className="font-bold">Član 1. - PREDMET UGOVORA</p>
        <p className="mb-2">{details.subject}</p>
        
        <p className="font-bold mt-4">Član 2. - CIJENA I NAČIN PLAĆANJA</p>
        <p className="mb-2">{details.paymentTerms}</p>
        
        <p className="font-bold mt-4">Član 3. - TRAJANJE UGOVORA</p>
        <p className="mb-2">{details.duration}</p>
        
        <div dangerouslySetInnerHTML={{ __html: generateContractText() }} />
        
        {details.forceMajeureClause && (
          <>
            <p className="font-bold mt-4">Član 6. - VIŠA SILA</p>
            <p className="mb-2">Ugovorne strane se oslobađaju odgovornosti za djelimično ili potpuno neizvršenje obaveza iz ovog Ugovora, ako je ono posljedica više sile. Pod višom silom podrazumijevaju se događaji i okolnosti koje ugovorne strane nisu mogle predvidjeti, spriječiti, otkloniti ili izbjeći.</p>
          </>
        )}
        
        {details.confidentialityClause && (
          <>
            <p className="font-bold mt-4">Član 7. - POVJERLJIVOST</p>
            <p className="mb-2">Ugovorne strane se obavezuju da će sve podatke i informacije koje su saznale prilikom realizacije ovog Ugovora čuvati kao poslovnu tajnu, kako za vrijeme trajanja Ugovora tako i nakon prestanka njegovog važenja.</p>
          </>
        )}
        
        <p className="font-bold mt-4">Član 8. - RASKID UGOVORA</p>
        <p className="mb-2">{details.terminationTerms}</p>
        
        <p className="font-bold mt-4">Član 9. - RJEŠAVANJE SPOROVA</p>
        <p className="mb-2">{details.disputeResolution}</p>
        
        {details.additionalClauses && (
          <>
            <p className="font-bold mt-4">Član 10. - DODATNE ODREDBE</p>
            <p className="mb-2">{details.additionalClauses}</p>
          </>
        )}
        
        <p className="font-bold mt-4">Član 11. - ZAVRŠNE ODREDBE</p>
        <p className="mb-2">Ugovor stupa na snagu danom potpisivanja od strane ovlaštenih predstavnika ugovornih strana. Ugovor je sačinjen u 4 (četiri) istovjetna primjerka, od kojih svaka ugovorna strana zadržava po 2 (dva) primjerka.</p>
        
        <div className="mt-8 grid grid-cols-2 gap-12">
          <div>
            <p className="font-bold mb-2">PRVA UGOVORNA STRANA:</p>
            <p className="mb-4">{entity1.name}</p>
            <p className="mt-8">________________________</p>
            {entity1.type === EntityType.PRAVNO_LICE && (
              <p className="text-sm mt-1">{entity1.representativeName}, {entity1.representativePosition}</p>
            )}
          </div>
          
          <div>
            <p className="font-bold mb-2">DRUGA UGOVORNA STRANA:</p>
            <p className="mb-4">{entity2.name}</p>
            <p className="mt-8">________________________</p>
            {entity2.type === EntityType.PRAVNO_LICE && (
              <p className="text-sm mt-1">{entity2.representativeName}, {entity2.representativePosition}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPreview;