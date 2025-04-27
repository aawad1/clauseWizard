from flask import Blueprint, request, jsonify
from services.law_docs_search_service import search_law_clauses
from services.generate_legality_response_service import build_legality_prompt
from services.gemini_generation_service import send_prompt_to_gemini

law_clauses_bp = Blueprint('law_clauses', __name__)

@law_clauses_bp.route('/check_legality', methods=['POST'])
def check_legality():
    data = request.json
    user_query = data.get('text')

    if not user_query:
        return jsonify({"error": "Missing 'text' field"}), 400

    # 1. Nađi relevantne zakonske članke
    relevant_clauses = search_law_clauses(user_query)

    if not relevant_clauses:
        return jsonify({"response": "Nije pronađeno dovoljno relevantnih članova za odgovor."})

    # 2. Sastavi prompt
    prompt = build_legality_prompt(user_query, relevant_clauses)

    # 3. Pošalji prompt ka LLM
    llm_response = send_prompt_to_gemini(prompt)

    return jsonify({
        "response": llm_response
    })
