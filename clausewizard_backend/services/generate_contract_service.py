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

    UPUTE:
    - Pridržavaj se strukture:
    1. UVODNE ODREDBE
    2. PREDMET UGOVORA
    3. PRAVA I OBAVEZE STRANA
    4. TRAJANJE I RASKID UGOVORA
    5. POSEBNE ODREDBE
    6. ZAVRŠNE ODREDBE
    - Koristi formalan pravni jezik.
    - Prilagodi sadržaj podacima.
    - Održavaj jasnoću, preciznost i profesionalnost.

    ---

    Počni pisanjem punog teksta novog ugovora.
    """
    return send_prompt_to_gemini(generation_prompt)
