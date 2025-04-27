from flask import Blueprint, request, jsonify
from services.contract_save_service import process_and_save_contract

save_contract_bp = Blueprint('save_contract', __name__)

@save_contract_bp.route('/save_contract', methods=['POST'])
def save_contract():
    try:
        data = request.get_json()

        title = data.get('title')
        pdf_base64 = data.get('pdf_base64')

        if not title or not pdf_base64:
            return jsonify({"error": "Missing title or pdf_base64."}), 400

        saved_contract_id = process_and_save_contract(title, pdf_base64)

        return jsonify({"message": "Contract successfully saved.", "contract_id": saved_contract_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
