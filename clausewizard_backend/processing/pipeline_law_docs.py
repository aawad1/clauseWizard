import os
from processing.pdf_reader import extract_text_from_pdf
from processing.text_cleaner import remove_headers
from processing.chunker import chunk_by_clan
from processing.embedder import embed_texts
from database.insert_documents import insert_document, insert_clause, commit_and_close

def process_single_law_document(path):
    print(f"Processing {path}")
    text = extract_text_from_pdf(path)
    clean_text = remove_headers(text)
    title, chunks = chunk_by_clan(clean_text)

    if not chunks:
        print(f"No clauses found in {path}. Skipping.")
        return

    embeddings = embed_texts(chunks)

    document_id = insert_document(title)

    for idx, (clause, emb) in enumerate(zip(chunks, embeddings), start=1):
        insert_clause(document_id, clause, emb, idx)

    print(f"Processed '{title}' with {len(chunks)} clauses.")

def process_all_law_documents(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            process_single_law_document(os.path.join(folder_path, filename))

    commit_and_close()
