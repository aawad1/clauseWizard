from flask import Blueprint, request, jsonify
from services.model_search_service import get_best_matching_contract
from services.generate_contract_service import build_and_send_prompt
from services.text_formatter import format_contract_text  # SAMO ovo ti treba

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/generate_contract', methods=['POST'])
def generate_contract():
    data = request.json

    admin_input = data.get('admin_input')
    client_input = data.get('client_input')
    contract_details = data.get('contract_details')

    if not admin_input or not client_input or not contract_details:
        return jsonify({"error": "Missing required fields"}), 400

    contract_type = contract_details.get('contract_type')
    if not contract_type:
        return jsonify({"error": "Missing 'contract_type'"}), 400

    model_contract = get_best_matching_contract(contract_type)
    if model_contract is None:
        return jsonify({"error": "No matching contract found."}), 404

    model_contract_text = model_contract['full_text']

    generated_contract = build_and_send_prompt(admin_input, client_input, contract_details, model_contract_text)

    if isinstance(generated_contract, dict) and "error" in generated_contract:
        return jsonify(generated_contract), 500

    formatted_contract = format_contract_text(generated_contract)

    return jsonify({
        "text": formatted_contract
    })
