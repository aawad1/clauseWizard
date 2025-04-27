# format_contract.py

def format_contract_text(raw_text: str) -> str:
    """
    Prima raw tekst ugovora sa \n separatorima i vraca formatiran HTML string.
    """
    # Podijeli tekst na paragrafe (svaki blok odvojen sa barem 2 nova reda)
    paragraphs = raw_text.strip().split('\n\n')

    # Za svaki paragraf, zamijeni pojedinacne \n sa <br /> i stavi u <p>
    formatted_paragraphs = []
    for p in paragraphs:
        p = p.strip().replace('\n', '')
        if p:
            formatted_paragraphs.append(f'{p}')

    return '\n'.join(formatted_paragraphs)


if __name__ == "__main__":
    # Test primjer
    raw_contract = """Priprema: Legalist.ba\n\nUGOVOR O PRUŽANJU USLUGA\n\nNa osnovu odredbi Zakona o obligacionim odnosima, zaključuju sljedeći:\n\n1.  GreenEnergy d.o.o., OIB: 55512312345, sa sjedištem u Ekološkoj ulici 77, Zenica, zastupano po direktoru Ani Eko, OIB: 22334455667 (u daljem tekstu: Pružalac usluga)\n\ni\n\n2.  SolarTech d.o.o., OIB: 66698765432, sa sjedištem u Suncanoj Ulici 88, Tuzla, zastupano po direktoru Ivanu Solariću, OIB: 33445566778 (u daljem tekstu: Naručilac usluga)\n\nzajednički nazvani ugovorne strane, u Zenici dana 26.04.2025. godine, zaključuju sljedeći:\n\nUGOVOR O PRUŽANJU USLUGA\n\n1. \nUVODNE ODREDBE\n\nČlan 1.\n\nOvim ugovorom, Pružalac usluga se obavezuje pružati Naručiocu usluga usluge tehničke podrške i razvoja Wordpress platforme, a Naručilac usluga se obavezuje platiti Pružaocu usluga naknadu za pružene usluge, pod uslovima utvrđenim ovim ugovorom.\n\n2. \nPREDMET UGOVORA\n\nČlan 2.\n\nPredmet ovog ugovora je pružanje usluga tehničke podrške i razvoja Wordpress platforme, koje obuhvataju:\n\n*   Održavanje Wordpress sajtova\n*   Razvoj dodataka\n*   Korisnička podrška\n*   Analiza izvještaja\n\nČlan 3.\n\nPružalac usluga će usluge iz člana 2. ovog ugovora pružati na daljinu (rad od kuće), koristeći vlastitu opremu.\n\nČlan 4.\n\nMjesto obavljanja usluga je Blatuša 34A, Zenica, i druga mjesta po potrebi, u skladu sa zahtjevima projekta.\n\n3. \nPRAVA I OBAVEZE STRANA\n\nČlan 5.\n\nPružalac usluga se obavezuje:\n\n*   Pružati usluge profesionalno i u skladu sa najboljim standardima struke.\n*   Ispunjavati obaveze u skladu sa dogovorenim rokovima.\n*   Pridržavati se uputa Naručioca usluga, u skladu sa specifikacijama projekta.\n*   Čuvati tajnost svih podataka i informacija Naručioca usluga do kojih dođe u toku pružanja usluga, a koji se smatraju poslovnom tajnom.\n*   Poštovati zabranu konkurencije, u skladu sa članom 13. ovog ugovora.\n\nČlan 6.\n\nNaručilac usluga se obavezuje:\n\n*   Osigurati Pružaocu usluga sve potrebne informacije i resurse za obavljanje usluga.\n*   Redovno i blagovremeno plaćati naknadu za pružene usluge, u skladu sa članom 7. ovog ugovora.\n*   Vršiti nadzor i praćenje rada Pružaoca usluga.\n\nČlan 7.\n\nZa pružene usluge iz člana 2. ovog ugovora, Naručilac usluga se obavezuje platiti Pružaocu usluga fiksnu mjesečnu naknadu u iznosu od 750 USD (sedam stotina pedeset američkih dolara).\n\nČlan 8.\n\nPlaćanje će se vršiti putem Paypal-a, na e-mail adresu: hananbajramovic075@gmail.com.\n\nČlan 9.\n\nPružalac usluga može ostvariti pravo na bonus na osnovu učinka, o čemu će se strane dogovoriti posebnim aneksom ovog ugovora.\n\n4. \nTRAJANJE I RASKID UGOVORA\n\nČlan 10.\n\nOvaj ugovor stupa na snagu 28.02.2024. godine i zaključuje se na period do 28.02.2025. godine.\n\nČlan 11.\n\nOvaj ugovor se može raskinuti:\n\n*   Sporazumom ugovornih strana.\n*   Jednostranim otkazom bilo koje ugovorne strane, uz poštivanje otkaznog roka od 30 (trideset) dana.\n*   U drugim slučajevima predviđenim zakonom.\n\n5. \nPOSEBNE ODREDBE\n\nČlan 12.\n\nPružalac usluga se obavezuje čuvati tajnu svih informacija i podataka Naručioca usluga, koji su mu dostupni u toku trajanja ovog ugovora, te ih ne smije koristiti za vlastite potrebe ili ih otkriti trećim licima. Ova obaveza ostaje na snazi i nakon prestanka važenja ovog ugovora.\n\nČlan 13.\n\nPružalac usluga se obavezuje da, za vrijeme trajanja ovog ugovora i u periodu od 2 (dvije) godine nakon njegovog isteka, neće direktno ili indirektno obavljati djelatnost koja je konkurentna djelatnosti Naručioca usluga.\n\n6. \nZAVRŠNE ODREDBE\n\nČlan 14.\n\nZa sve što nije regulisano ovim ugovorom, primenjivaće se odredbe Zakona o obligacionim odnosima.\n\nČlan 15.\n\nEventualne sporove koji nastanu u vezi sa tumačenjem ili izvršenjem ovog ugovora, ugovorne strane će nastojati riješiti sporazumno. Ukoliko sporazum ne bude moguć, nadležan je sud u Zenici.\n\nČlan 16.\n\nOvaj ugovor je sačinjen u 2 (dva) istovjetna primjerka, od kojih svaka ugovorna strana zadržava po 1 (jedan) primjerak.\n\nU Zenici, 26.04.2025. godine\n\nPružalac usluga:\n\nGreenEnergy d.o.o.\n\n_________________________\n\nAna Eko\n\nDirektor\n\nNaručilac usluga:\n\nSolarTech d.o.o.\n\n_________________________\n\nIvan Solarić\n\nDirektor"""

    html_output = format_contract_text(raw_contract)
    print(html_output)
