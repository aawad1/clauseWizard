import base64
import fitz  # PyMuPDF
from database.db_connect import get_connection
from processing.chunker import chunk_by_clan
from processing.embedder import embed_texts
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

    # Chunk PDF
    chunks = chunk_by_clan(full_text)

    # Save contract
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO generated_contracts (title, contract_text)
        VALUES (%s, %s)
        RETURNING id;
    """, (title, full_text))

    contract_id = cur.fetchone()[0]

    # Embedding and save chunks
    for idx, chunk in enumerate(chunks):
        embedding = embed_texts([chunk])[0]

        cur.execute("""
            INSERT INTO generated_contract_clauses (contract_id, clause_text, clause_vector, clause_number)
            VALUES (%s, %s, %s, %s);
        """, (contract_id, chunk, list(embedding), idx + 1))

    conn.commit()
    cur.close()
    conn.close()

    return contract_id
