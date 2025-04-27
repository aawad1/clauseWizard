from sentence_transformers import SentenceTransformer
from database.db_connect import get_connection
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def search_law_clauses(user_query, top_k=5):
    """
    Pretražuje zakonite članke (clauses) iz baze podataka i vraća top_k najbližih.
    """
    query_embedding = model.encode([user_query])[0]

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT
            clauses.id,
            clauses.document_id,
            clauses.clause_text,
            1 - (clauses.clause_vector <=> %s) AS similarity,
            documents.title AS document_title
        FROM
            clauses
        JOIN
            documents ON clauses.document_id = documents.id
        ORDER BY
            similarity DESC
        LIMIT %s;
    """, (list(query_embedding), top_k))

    results = cur.fetchall()
    cur.close()
    conn.close()

    return results

def format_law_clauses(clauses: list) -> str:
    """
    Formatira listu najbližih law clauses u čitljiv tekst za prompt.
    """
    if not clauses:
        return "Nema pronađenih relevantnih zakona."

    formatted_clauses = []

    for idx, clause in enumerate(clauses, start=1):
        formatted_text = (
            f"Član {idx} iz dokumenta '{clause['document_title']}':\n"
            f"{clause['clause_text']}\n"
        )
        formatted_clauses.append(formatted_text)

    return "\n".join(formatted_clauses)

if __name__ == "__main__":
    query = "građenje na tuđem zemljištu"

    print("\n🔍 Tražim najrelevantnije zakone...\n")

    top_clauses = search_law_clauses(query)

    if not top_clauses:
        print("❗ Nije pronađeno ništa relevantno.")

    else:
        formatted_text = format_law_clauses(top_clauses)
        print("\n📜 Relevantni članci:\n")
        print(formatted_text)
