import re


def format_contract_text(raw_text: str) -> str:
    """
    Formatira tekst ugovora:
    - Dodaje prazne linije ispred važnih sekcija i članaka
    - Uklanja nepotrebne karaktere
    - Smanjuje višestruke prazne linije
    - Uređuje završne potpise
    """

    if not raw_text:
        return ""

    text = str(raw_text)

    # 1. Ukloni nepotrebne karaktere
    text = text.replace("\\n", "\n")
    text = text.replace("**", "")
    text = text.strip()

    # 2. Dodaj dodatne prazne linije prije važnih sekcija
    important_keywords = [
        "UVODNE ODREDBE", "PREDMET UGOVORA", "PRAVA I OBAVEZE STRANA",
        "TRAJANJE I RASKID UGOVORA", "POSEBNE ODREDBE", "ZAVRŠNE ODREDBE", "NAPOMENE"
    ]
    for keyword in important_keywords:
        # Dodaj 2 prazne linije prije ključnih naslova
        text = re.sub(fr"(?<!\n\n)({keyword})", r"\n\n\1", text)

    # 3. Dodaj prazne linije prije svake "Član" sekcije
    text = re.sub(r"(?<!\n)(Član\s*\d+\.|Članak\s*\d+\.)", r"\n\n\1", text, flags=re.IGNORECASE)

    # 4. Dodaj prazne linije prije potpisa
    text = re.sub(r"(Pružalac usluga:)", r"\n\n\1", text)
    text = re.sub(r"(Korisnik usluga:)", r"\n\n\1", text)

    # 5. Zamijeni 3+ praznih linija sa samo 2
    text = re.sub(r"(\n\s*){3,}", "\n\n", text)

    # 6. Trim krajnji višak praznih linija
    text = text.strip()

    return text