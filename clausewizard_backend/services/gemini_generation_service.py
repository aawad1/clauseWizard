import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")

if API_KEY is None:
    raise ValueError("API_KEY not found")

def send_prompt_to_gemini(prompt_text):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

    payload = {
        "contents": [{"parts": [{"text": prompt_text}]}]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code != 200:
        return {"error": "Gemini API failed", "details": response.json()}

    gemini_reply = response.json()

    try:
        generated_contract = gemini_reply['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return {"error": "Unexpected Gemini response format", "details": str(e)}

    return generated_contract
