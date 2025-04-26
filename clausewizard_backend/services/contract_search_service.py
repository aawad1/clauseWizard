from sentence_transformers import SentenceTransformer
from database.db_connect import get_connection
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def search_contract_examples(user_query, top_k=5):
    query_embedding = model.encode([user_query])[0]

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT
            id,
            title,
            full_text,
            1 - (example_vector <=> %s) AS similarity
        FROM
            contract_examples
        ORDER BY
            similarity DESC
        LIMIT %s;
    """, (list(query_embedding), top_k))

    results = cur.fetchall()
    cur.close()
    conn.close()

    return results
