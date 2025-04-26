import os
from processing.pdf_reader import extract_text_from_pdf
from processing.text_cleaner import remove_headers
from processing.embedder import embed_texts
from database.insert_contract_examples import insert_contract_example,commit_and_close
from config import CONTRACT_EXAMPLES_FOLDER
from sentence_transformers import SentenceTransformer

def process_single_contract_example(path):
    print(f"Processing {path}")
    text = extract_text_from_pdf(path)
    clean_text = remove_headers(text)

    if not clean_text.strip():
        print(f"No text found in {path}. Skipping.")
        return

    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    embedding = model.encode([clean_text])[0]  # samo jedan embedding za cijeli tekst

    title = os.path.basename(path).replace('.pdf', '').replace('_', ' ').strip()

    insert_contract_example(title, clean_text, embedding)

    print(f"Inserted contract '{title}'.")

def process_all_contract_examples():
    for filename in os.listdir(CONTRACT_EXAMPLES_FOLDER):
        if filename.endswith(".pdf"):
            process_single_contract_example(os.path.join(CONTRACT_EXAMPLES_FOLDER, filename))

    commit_and_close()

if __name__ == "__main__":
    process_all_contract_examples()
