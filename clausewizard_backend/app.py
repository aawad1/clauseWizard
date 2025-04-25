from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
# === Set your Gemini API Key ===
API_KEY=os.getenv("API_KEY")

if API_KEY is None:
    raise ValueError("API_KEY not found")

# === Endpoint to send text to Gemini and get a response ===
@app.route('/ask_gemini', methods=['POST'])
def ask_gemini():
    user_input = request.json.get('text')

    if not user_input:
        return jsonify({"error": "Missing 'text' field"}), 400

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
    
    payload = {
        "contents": [{
            "parts": [{"text": user_input}]
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
        text_reply = gemini_reply['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return jsonify({"error": "Unexpected Gemini response format", "details": str(e)}), 500

    return jsonify({"response": text_reply})

# === Run Flask app ===
if __name__ == "__main__":
    app.run(debug=True)
