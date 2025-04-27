import os
import base64
import tempfile
from processing.pdf_reader import extract_text_from_pdf
from processing.text_cleaner import remove_headers
from processing.embedder import embed_texts
from database.insert_contract_examples import insert_contract_example, commit_and_close
from sentence_transformers import SentenceTransformer

def process_and_save_contract(title, pdf_base64):
    # 1. Decodeaj PDF iz base64
    decoded_pdf = base64.b64decode(pdf_base64)

    # 2. Kreiraj privremeni fajl
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
        temp_pdf.write(decoded_pdf)
        temp_pdf_path = temp_pdf.name

    try:
        # 3. Izvuci tekst iz PDF-a
        text = extract_text_from_pdf(temp_pdf_path)

        # 4. Očisti tekst od header/footer smeća
        clean_text = remove_headers(text)

        if not clean_text.strip():
            raise ValueError("Ekstrahovani tekst je prazan.")

        # 5. Napravi embedding
        model = SentenceTransformer('nlpaueb/legal-bert-base-uncased')
        embedding = model.encode([clean_text])[0]

        # 6. Insertuj u bazu
        insert_contract_example(title.replace('_', ' '), clean_text, embedding)
        commit_and_close()

        return title

    finally:
        # 7. Obriši privremeni fajl
        os.remove(temp_pdf_path)
