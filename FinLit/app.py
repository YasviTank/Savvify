from flask import Flask, render_template, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import os
import requests
import threading
import time

app = Flask(__name__)

# Model globals (will be lazy-loaded)
model_name = "facebook/opt-350m"
# If USE_REMOTE is set (true/1), the app will forward generation requests to the
# Hugging Face Inference API (or any compatible remote endpoint) instead of
# loading a local model. Set HF_API_TOKEN to your token and optionally HF_MODEL
# to choose a remote model.
use_remote = str(os.environ.get("USE_REMOTE", "false")).lower() in ("1", "true", "yes")
hf_model = os.environ.get("HF_MODEL", model_name)
hf_api_token = os.environ.get("HF_API_TOKEN")
tokenizer = None
model = None
model_lock = threading.Lock()
model_loading = False
model_loaded_at = None

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/status")
def status():
    return jsonify({
        "model": model_name,
        "remote": use_remote,
        "hf_model": hf_model if use_remote else None,
        "loaded": model is not None,
        "loading": model_loading,
        "loaded_at": model_loaded_at,
    })

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")
    if not question:
        return jsonify({"answer": "Please ask a question!"})
    
    # If configured for remote inference, forward the request to the remote API
    if use_remote:
        if not hf_api_token:
            return jsonify({"error": "HF_API_TOKEN not set"}), 500
        # Build same prompt as local branch
        prompt = f"""You are Finly, a friendly and knowledgeable personal finance assistant built into a financial wellness web app. 
You help users understand and manage their money smarter — like Revolut’s educational assistant.

Your job is to explain financial concepts in detail yet in a clear, simple, and trustworthy tone.
Always provide *actionable insights* and examples when possible.

You can explain topics including:
- Credit and debit cards, interest, APR, minimum payments
- Loans, mortgages, refinancing, and interest rate changes
- Savings accounts, compound interest, and inflation
- Budgeting, investing basics, and credit scores
- Taxes, insurance, and retirement planning
- Everyday money habits, financial terms, and market context

You are not a financial advisor, but you provide educational explanations so users can make informed decisions.

Style guide:
- Keep it conversational yet precise.
- Break down numbers, formulas, and examples when useful.
- Avoid jargon unless you explain it clearly.
- Write as if explaining to an intelligent but non-expert adult.
- Never hallucinate data or make investment recommendations.

Example tone:
❌ “You should refinance immediately.”
✅ “Refinancing might make sense if your new interest rate is significantly lower — say, by 1–2%.”

If the user asks something vague (e.g. “Tell me about interest”), expand it into a mini guide that includes definition, examples, and how it affects them in real life.

Question: {question}
Answer:"""
        headers = {"Authorization": f"Bearer {hf_api_token}", "Accept": "application/json"}
        payload = {"inputs": prompt, "parameters": {"max_new_tokens": 200, "temperature": 0.7}}
        try:
            resp = requests.post(f"https://api-inference.huggingface.co/models/{hf_model}", headers=headers, json=payload, timeout=60)
            resp.raise_for_status()
            data = resp.json()
            # Inference API returns either a list of dicts or a dict; handle common shapes
            if isinstance(data, list) and len(data) > 0 and "generated_text" in data[0]:
                text = data[0]["generated_text"]
            elif isinstance(data, dict) and "generated_text" in data:
                text = data["generated_text"]
            elif isinstance(data, list) and len(data) > 0 and "text" in data[0]:
                text = data[0]["text"]
            else:
                # Fallback: stringify response
                text = str(data)
            # Extract portion after the prompt marker if present
            answer = text.split("Answer:")[-1].strip()
            return jsonify({"answer": answer})
        except requests.RequestException as e:
            return jsonify({"error": "Remote inference request failed", "details": str(e)}), 500

    # Ensure local model is loaded (lazy load)
    global tokenizer, model, model_loading, model_loaded_at
    if model is None:
        # Try to acquire lock and load model in this request
        with model_lock:
            if model is None:
                model_loading = True
                try:
                    tokenizer = AutoTokenizer.from_pretrained(model_name)
                    # Force CPU mode to avoid CUDA compatibility problems on this machine
                    device = "cpu"
                    print(f"Loading model to {device} (CPU forced)...")
                    model = AutoModelForCausalLM.from_pretrained(model_name).to(device)
                    model_loaded_at = time.strftime("%Y-%m-%d %H:%M:%S")
                except Exception as e:
                    model_loading = False
                    return jsonify({"error": "Failed to load model", "details": str(e)}), 500
                model_loading = False

    try:
        # Format prompt with financial context
        prompt = f"""You are a financial literacy assistant. Answer questions about money, budgeting, saving, investing, and financial decisions.
Context: Financial literacy is about understanding how money works in the world: budgeting, saving, investing, and avoiding debt.
It helps you make informed financial decisions based on your goals and age.

Question: {question}
Answer:"""

        # Generate response (CPU forced)
        device = "cpu"
        inputs = tokenizer(prompt, return_tensors="pt").to(device)
        outputs = model.generate(**inputs, max_new_tokens=200, temperature=0.7)
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Extract just the generated answer after the prompt
        answer = answer.split("Answer:")[-1].strip()
        return jsonify({"answer": answer})
    except RuntimeError as e:
        # Commonly OOM or device-related errors
        return jsonify({"error": "Runtime error during generation", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Unexpected error during generation", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)