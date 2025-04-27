from sentence_transformers import SentenceTransformer
from database.db_connect import get_connection
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

model = SentenceTransformer('nlpaueb/legal-bert-base-uncased')

def search_law_clauses(user_query, min_similarity=0.7, fallback_top_k=5):
    """
    Pretražuje zakonite članke iz baze podataka:
    - Vraća sve sa similarity > min_similarity
    - Ako ih nema bar 5, vraća top fallback_top_k najboljih
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
        LIMIT 20;
    """, (list(query_embedding),))

    results = cur.fetchall()
    cur.close()
    conn.close()

    # Filtriraj sve koji imaju similarity >= min_similarity
    filtered_results = [r for r in results if r['similarity'] >= min_similarity]

    # Ako nema dovoljno (manje od 5), uzmi top 5 najboljih
    if len(filtered_results) < fallback_top_k:
        return results[:fallback_top_k]
    else:
        return filtered_results
