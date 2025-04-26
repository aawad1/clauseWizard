from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import psycopg2
from psycopg2.extras import RealDictCursor
from database.db_connect import get_connection

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("API_KEY")

if API_KEY is None:
    raise ValueError("API_KEY not found")

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

def format_contract_text(raw_text: str) -> str:
    import re

    text = raw_text.replace("\\n", "\n")
    text = text.replace("**", "")

    keywords = [
        "UVODNE ODREDBE", "PREDMET UGOVORA", "PRAVA I OBVEZE STRANA",
        "TRAJANJE I RASKID UGOVORA", "POSEBNE ODREDBE", "ZAVRŠNE ODREDBE", "Napomene:"
    ]
    for kw in keywords:
        text = text.replace(kw, f"\n{kw}\n")

    text = re.sub(r"(Članak\s+\d+\.)", r"\n\1\n", text)
    text = re.sub(r"(\n\s*){3,}", "\n\n", text)

    return text

@app.route('/ask_gemini', methods=['POST'])
def ask_gemini():
    user_input = request.json.get('text')

    if not user_input:
        return jsonify({"error": "Missing 'text' field"}), 400

    search_results = search_contract_examples(user_input, top_k=3)

    if not search_results:
        return jsonify({"response": "Nema pronađenih ugovora."})

    sources = [
        {"title": c['title'], "similarity": round(c['similarity'], 4)}
        for c in search_results
    ]

    return jsonify({
        "response": "Pronađeni najbliži ugovori:",
        "sources": sources
    })

@app.route('/generate_contract', methods=['POST'])
def generate_contract():
    user_input = request.json.get('contract_type')

    if not user_input:
        return jsonify({"error": "Missing 'contract_type' field"}), 400

    generation_prompt = f"""Ti si AI pravni savjetnik. Napiši pun tekst primjera {user_input}.
    
Ugovor treba biti jasan, profesionalan, sa standardnim odredbama:
- Uvodne odredbe
- Predmet ugovora
- Prava i obaveze strana
- Trajanje i raskid ugovora
- Posebne odredbe
- Završne odredbe

Koristi pravnu terminologiju kao da ga sastavlja pravnik."""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

    payload = {
        "contents": [{
            "parts": [{"text": generation_prompt}]
        }]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Gemini API failed", "details": response.json()}), 500

    gemini_reply = response.json()

    try:
        generated_contract = gemini_reply['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return jsonify({"error": "Unexpected Gemini response format", "details": str(e)}), 500

    formatted_contract = format_contract_text(generated_contract)

    return jsonify({
        "contract_raw": generated_contract,
        "contract_formatted": formatted_contract
    })

# === Run Flask app ===
if __name__ == "__main__":
    app.run(debug=True)
