from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({"error": "No files part in request"}), 400

    files = request.files.getlist('files')
    saved_files = []

    for file in files:
        if file.filename == '':
            continue
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        saved_files.append(file.filename)

    return jsonify({
        "message": f"{len(saved_files)} file(s) uploaded successfully.",
        "files": saved_files
    })

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
@app.route('/simulate', methods=['GET'])
def simulate():
    savings = float(request.args.get('savings', 1000))
    debt = float(request.args.get('debt', 1000))
    savings_rate = float(request.args.get('savings_rate', 5))
    debt_rate = float(request.args.get('debt_rate', 20))
    months = int(request.args.get('months', 24))
    min_payment_rate = float(request.args.get('min_payment_rate', 2))
    extra_debt_payment = float(request.args.get('extra_debt_payment', 0))
    extra_savings = float(request.args.get('extra_savings', 0))

    savings_monthly_rate = savings_rate / 12 / 100
    debt_monthly_rate = debt_rate / 12 / 100

    savings_history, debt_history, payments_history = [], [], []

    for month in range(1, months + 1):
        savings += savings * savings_monthly_rate + extra_savings
        savings_history.append(round(savings, 2))

        total_payment = 0
        if debt > 0:
            debt += debt * debt_monthly_rate
            min_payment = debt * (min_payment_rate / 100)
            total_payment = min_payment + extra_debt_payment

            if total_payment > debt:
                total_payment = debt
            debt -= total_payment
        debt_history.append(round(debt, 2))
        payments_history.append(round(total_payment, 2))

    return jsonify({
        "months": [f"Month {i}" for i in range(1, months + 1)],
        "savings": savings_history,
        "debt": debt_history,
        "monthly_payments": payments_history
    })

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