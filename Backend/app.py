from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"answer": "Please ask a question!"})

    if not GEMINI_API_KEY:
        return jsonify({"answer": "API key not configured."})

    url = "https://api.openai.com/v1/responses"  # Gemini endpoint
    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4.1-mini",
        "input": question
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()

        # Extract the actual text from Gemini response
        # It may be in: data["output"][0]["content"][0]["text"] or similar
        answer = ""
        if "output" in data and len(data["output"]) > 0:
            content = data["output"][0].get("content", [])
            if len(content) > 0:
                answer = content[0].get("text", "")
        if not answer:
            answer = "No response from AI."

        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"answer": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
