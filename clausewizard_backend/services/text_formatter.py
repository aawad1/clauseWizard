import re

def format_contract_text(raw_text: str) -> str:
    """
    Formatira tekst ugovora:
    - Dodaje prazne linije ispred važnih sekcija
    - Dodaje prazne linije ispred članaka
    - Briše nepotrebne karaktere
    - Smanjuje duple nove linije
    """

    if not raw_text:
        return ""

    text = raw_text

    # 1. Ukloni nepotrebne karaktere
    text = text.replace("\\n", "\n")
    text = text.replace("**", "")
    text = text.strip()

    # 2. Dodaj prazne linije ispred sekcija
    important_keywords = [
        "UVODNE ODREDBE", "PREDMET UGOVORA", "PRAVA I OBAVEZE STRANA",
        "TRAJANJE I RASKID UGOVORA", "POSEBNE ODREDBE", "ZAVRŠNE ODREDBE", "NAPOMENE"
    ]
    for keyword in important_keywords:
        text = re.sub(fr"(?<!\n)({keyword})", r"\n\1", text)

    # 3. Dodaj prazne linije prije "Članak X."
    text = re.sub(r"(?<!\n)(Članak\s+\d+\.)", r"\n\1", text, flags=re.IGNORECASE)

    # 4. Zamijeni 3+ praznih linija sa samo 2
    text = re.sub(r"(\n\s*){3,}", "\n\n", text)

    # 5. Trim na kraju
    text = text.strip()

    return text
