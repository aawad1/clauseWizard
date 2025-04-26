from .db_connect import get_connection

conn = get_connection()
cur = conn.cursor()

def insert_document(title):
    cur.execute(
        "INSERT INTO documents (title) VALUES (%s) RETURNING id",
        (title,)
    )
    return cur.fetchone()[0]

def insert_clause(document_id, clause_text, clause_vector, clause_number):
    cur.execute(
        "INSERT INTO clauses (document_id, clause_text, clause_vector, clause_number) VALUES (%s, %s, %s, %s)",
        (document_id, clause_text, clause_vector.tolist(), clause_number)
    )

def commit_and_close():
    conn.commit()
    cur.close()
    conn.close()
