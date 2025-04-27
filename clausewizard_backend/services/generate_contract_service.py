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
Ti si pravni AI asistent specijalizovan za kreiranje pravno valjanih i detaljno strukturiranih ugovora.

Tvoj zadatak je da, koristeći dostavljeni model ugovora kao osnovu, sastaviš novi pravno valjan ugovor, precizno prilagođen prema dostavljenim informacijama.

MODEL UGOVORA:
{model_contract_text}

PODACI O PONUĐAČU (ADMIN):
{admin_text}

PODACI O KLIJENTU:
{client_text}

DETALJI PROJEKTA:
{contract_details_text}

Specijalne upute:
- Ako u polju PODACI O KLIJENTU postoji "tip_subjekta: fizicko_lice", koristi izraz "JMBG" kada navodiš identifikacioni broj klijenta.
- Ako u polju PODACI O KLIJENTU postoji "tip_subjekta: pravno_lice", koristi izraz "OIB" kada navodiš identifikacioni broj klijenta.
- Ne koristi oba izraza istovremeno. Samo jedan, u zavisnosti od tipa subjekta.
- Ne dodaj tekstove poput "Priprema", "Legalist", "Napomena", niti bilo kakve dodatne bilješke izvan ugovora.
- Početak ugovora MORA sadržavati lokaciju i datum sklapanja u formatu (npr. "U Sarajevu, dana 27.04.2025. godine.").

Struktura ugovora:
- UVODNE ODREDBE
- PREDMET UGOVORA
- PRAVA I OBAVEZE STRANA
- TRAJANJE I RASKID UGOVORA
- POSEBNE ODREDBE
- ZAVRŠNE ODREDBE

Dodatne smjernice:
- Ne koristi numeraciju ispred sekcija (samo naziv sekcije velikim slovima).
- Svaki član označavaj kao "Član 1.", "Član 2.", "Član 3.", itd. bez podčlanova (nema 1.1, 1.2).
- Unutar svake sekcije detaljno razradi pojmove: opisati prava, obaveze, odgovornosti, posebne klauzule poput tajnosti, kontrole kvaliteta, garancije, itd.
- Koristi pravne formulacije: "strane su saglasne", "ugovorne obaveze se odnose na", "u slučaju neispunjavanja obaveza", "prava i dužnosti se utvrđuju", itd.
- Kada opisuješ obaveze i rokove, koristi jasno definisane izraze ("najkasnije u roku od 15 dana", "po završetku svakog mjeseca", "na pismeni zahtjev jedne od strana").
- U POSEBNIM ODREDBAMA obavezno spomeni zaštitu podataka, čuvanje poslovne tajne, zabranu konkurencije, i klauzule o višoj sili.
- Na kraju UGOVORA stavi sekciju potpisa ovako:
    - Lijeva strana: "Za prvu ugovornu stranu: [naziv firme, novi red]"
    - Desna strana: "Za drugu ugovornu stranu: [naziv firme (SAMO UKOLIKO JE TIP SUBJEKTA PRAVNO LICE), novi red"
    - Ispod ne moras dodavati liniju za potpis, biti ce naknadno dodata

Stilske smjernice:
- Ne koristi boldiranje, italic niti simbole poput **, *, #, -, itd.
- Piši čistim, profesionalnim, preciznim pravnim jezikom, prikladnim za pravno važeće dokumente.
- Cijeli ugovor mora biti napisan bez suvišnih ukrasa, jasno i ozbiljno.

Počni pisanjem kompletnog ugovora odmah bez dodatnih komentara ili napomena.
"""
    return send_prompt_to_gemini(generation_prompt)
