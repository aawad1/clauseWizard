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
    
    Upute:
    - Pridržavaj se strukture:
      1. UVODNE ODREDBE
      2. PREDMET UGOVORA
      3. PRAVA I OBAVEZE STRANA
      4. TRAJANJE I RASKID UGOVORA
      5. POSEBNE ODREDBE
      6. ZAVRŠNE ODREDBE
    - Koristi formalan, pravni jezik.
    - Svaki članak da bude ispisan kao: **Član 1.**, **Član 2.**, **Član 3.** itd. bez pod-članaka tipa 1.1 ili 1.2.
    - U strukturi izostavi brojeve (Ne treba doslovno da pise 1. UVODNE ODREDBE ... nego samo UVODNE ODREDBE).
    - Održavaj jasnoću, preciznost i profesionalnost.
    - NE dodaj suvišne informacije koje nisu relevantne za ugovor.
    - NE spominji druge institucije (npr. ministarstva, UNDP).
    - **Na kraju ugovora obavezno pripremi posebno odvojene sekcije za potpis:**
      - Lijeva strana: "Za prvu ugovornu stranu: [naziv firme Admin]"
      - Desna strana: "Za drugu ugovornu stranu: [naziv firme Klijent]"
      - Napiši linije za potpise (________________________).
    
    
    Tvoj izlaz treba biti čist i spreman za formatiranje u PDF-u jer se koristi kasnije u te svrhe.
    Počni pisanjem punog teksta ugovora.
    """
    return send_prompt_to_gemini(generation_prompt)
