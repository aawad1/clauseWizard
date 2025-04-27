from services.gemini_generation_service import send_prompt_to_gemini

def format_dict_as_text(data: dict) -> str:
    """
    Pretvara dict u formatirani tekst za prompt.
    """
    if not data:
        return ""

    lines = []
    for key, value in data.items():
        formatted_key = key.replace("_", " ").capitalize()
        lines.append(f"- {formatted_key}: {value}")

    return "\n".join(lines)

def build_and_send_prompt(admin_input, client_input, contract_details, model_contract_text):
    # Formatiraj sve ulazne podatke u čitljiv tekst
    admin_text = format_dict_as_text(admin_input)
    client_text = format_dict_as_text(client_input)
    contract_details_text = format_dict_as_text(contract_details)

    generation_prompt = f"""
    Ti si pravni AI asistent specijalizovan za kreiranje ugovora.
    Tvoj zadatak je da, koristeći navedeni model ugovora kao osnovu, sastaviš novi pravno valjan ugovor, precizno prilagođen prema dostavljenim informacijama.
    
    MODEL UGOVORA:
    {model_contract_text}
    
    PODACI O PONUĐAČU (ADMIN):
    {admin_text}
    
    PODACI O KLIJENTU:
    {client_text}
    DETALJI PROJEKTA:
    {contract_details_text}
    
    Specijalna uputa:
    - Ako u polju PODACI O KLIJENTU postoji "tip_subjekta: fizicko_lice", obavezno koristi izraz "JMBG" u ugovoru kad spominješ identifikacioni broj klijenta.
    - Ako u polju PODACI O KLIJENTU postoji "tip_subjekta: pravno_lice", obavezno koristi izraz "OIB" u ugovoru kad spominješ identifikacioni broj klijenta.
    - Ne koristi oba termina istovremeno. Samo jedan, na osnovu tip_subjekta.
    Upute:
    - Ne smiješ dodavati tekstove poput "Priprema", "Legalist", "Napomena", niti bilo kakve druge bilješke van samog ugovora.
    - Početak ugovora mora sadržavati lokaciju i datum sklapanja (npr. "U Sarajevu, dana 27.04.2025. godine.").
    - Struktura ugovora mora biti:
      - UVODNE ODREDBE
      - PREDMET UGOVORA
      - PRAVA I OBAVEZE STRANA
      - TRAJANJE I RASKID UGOVORA
      - POSEBNE ODREDBE
      - ZAVRŠNE ODREDBE
    - Ne koristi numeraciju ispred sekcija (samo naziv sekcije).
    - Članove označavaj kao "Član 1.", "Član 2.", "Član 3.", bez podčlanova (nema 1.1, 1.2).
    - Ako je ugovorna strana fizičko lice, koristi JMBG; ako je pravno lice, koristi OIB.
    - Na kraju UGOVORA stavi sekciju potpisa ovako:
        - Lijeva strana: "Za prvu ugovornu stranu: [naziv firme, novi red]"
        - Desna strana: "Za drugu ugovornu stranu: [naziv firme (SAMO UKOLIKO JE TIP SUBJEKTA PRAVNO LICE), novi red"
        - Ispod ne moras dodavati liniju za potpis, biti ce naknadno dodata
        - 
    - Ne dupliraj sekciju potpisa!
    - Ne koristi boldiranje niti oznake.
    - Piši jasno, precizno i profesionalnim pravnim jezikom.
    
    Tvoj izlaz mora biti čist, bez dodatnih oznaka i odmah spreman za formatiranje u PDF.
    Počni pisanjem punog teksta ugovora odmah.
    """
    return send_prompt_to_gemini(generation_prompt)
