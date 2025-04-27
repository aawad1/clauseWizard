def build_legality_prompt(user_question: str, law_clauses: list) -> str:
    """
    Sastavlja prompt za LLM koji uključuje:
    - Pravne članke
    - Pitanje korisnika
    """
    laws_text = ""

    for idx, clause in enumerate(law_clauses, start=1):
        laws_text += (
            f"Član {idx} iz dokumenta '{clause['document_title']}' (sličnost: {round(clause['similarity'], 4)}):\n"
            f"{clause['clause_text']}\n\n"
        )

    prompt = f"""
    Ti si pravni AI asistent.

    Koristeći ove članke:

    {laws_text}

    Odgovori na sljedeće pitanje korisnika:

    Pitanje:
    "{user_question}"

    Odgovor mora biti:
    - Jasan i precizan
    - Koristi pravni, formalan stil.
    Ako nije moguće dati konačan odgovor, nemoj reći "na osnovu priloženog ne mogu dati odgovor" već reci da trenutno nisi u stanju da odgovoris pa pitanje".
    """

    return prompt.strip()
