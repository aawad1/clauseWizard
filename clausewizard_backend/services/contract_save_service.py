import base64
import fitz  # PyMuPDF
from database.db_connect import get_connection
from processing.chunker import chunk_by_clan
from processing.embedder import embed_texts
from processing.text_cleaner import remove_headers
from database.insert_contract_examples import insert_contract_example
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('nlpaueb/legal-bert-base-uncased')

def process_and_save_contract(title, pdf_base64):
    # Decode PDF
    pdf_bytes = base64.b64decode(pdf_base64)

    # Read PDF text
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    full_text = ""
    for page in doc:
        full_text += page.get_text()

    clean_text = remove_headers(full_text)

    embedding = embed_texts([clean_text])

    insert_contract_example(title, clean_text, embedding)

    return title
