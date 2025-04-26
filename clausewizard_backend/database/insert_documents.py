from .db_connect import get_connection

conn = get_connection()
cur = conn.cursor()

def get_document_id_by_title(title):
    cur.execute(
        "SELECT id FROM documents WHERE title = %s",
        (title,)
    )
    result = cur.fetchone()
    if result:
        return result[0]
    return None

def insert_document(title):
    # Provjeri da li dokument već postoji
    existing_id = get_document_id_by_title(title)
    if existing_id:
        print(f"Document '{title}' already exists with ID {existing_id}. Skipping insert.")
        return existing_id

    # Ako ne postoji, upiši novi
    cur.execute(
        "INSERT INTO documents (title) VALUES (%s) RETURNING id",
        (title,)
    )
    document_id = cur.fetchone()[0]
    print(f"Inserted new document '{title}' with ID {document_id}.")
    return document_id

def insert_clause(document_id, clause_text, clause_vector, clause_number):
    cur.execute(
        "INSERT INTO clauses (document_id, clause_text, clause_vector, clause_number) VALUES (%s, %s, %s, %s)",
        (document_id, clause_text, clause_vector.tolist(), clause_number)
    )

def commit_and_close():
    conn.commit()
    cur.close()
    conn.close()
