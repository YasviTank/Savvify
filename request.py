import os
from google import genai #pip install google-genai
from google.genai import types

# 1. Ensure the API key is set in your environment
# The client automatically uses the GEMINI_API_KEY environment variable.
# Before running this, set the environment variable: 
# export GEMINI_API_KEY="My_API_KEY"

GEMINI_API_KEY = "AIzaSyCMsROF663NFThR5uNqw-aLPMEKVOEPsDk"

try:
    client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    print("Error initializing client. Please ensure the GEMINI_API_KEY environment variable is set correctly.")
    print(f"Details: {e}")
    exit()

# Set the model to gemini-2.5-flash-lite
MODEL_NAME = 'gemini-2.5-flash-lite'

def categorize_company(company_name: str) -> str:
    """
    Uses the gemini-2.5-flash-lite model to categorize a company.
    
    Args:
        company_name: The name of the company to categorize.
        
    Returns:
        The clean, one-word industry category.
    """
    
    # 2. Craft a clear prompt that forces a minimal response
    prompt = (
        f"Categorize the company '{company_name}' into a single, brief industry sector or product type. "
        "Respond with ONLY the category name. Do not include any other words or punctuation."
    )

    try:
        response = client.models.generate_content(
            model = MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(
                # Low temperature for deterministic, predictable output (less creativity)
                temperature=0.1,
                # Restrict the output length to ensure a single-word response
                max_output_tokens=10 
            )
        )
        
        # 3. Clean and return the final category
        # .strip() removes whitespace, .capitalize() ensures proper casing.
        return response.text.strip().replace('.', '').capitalize()

    except Exception as e:
        # Handle API errors, such as hitting the daily/minute rate limit (RESOURCE_EXHAUSTED)
        return f"Error categorizing {company_name}: {e}"

# --- Example Usage ---


companies_to_process = ["Tesco", "SpaceX", "Snapchat", "Toyota"]

print(f"--- Categorizing using {MODEL_NAME} ---")

for company in companies_to_process:
    category = categorize_company(company)
    print(f"Company: {company:<10} | Category: {category}")



# Example Output (actual category may vary slightly):
# --- Categorizing using gemini-2.5-flash-lite ---
# Company: Tesco      | Category: Groceries
# Company: SpaceX     | Category: Aerospace
# Company: Snapchat   | Category: Social media
# Company: Toyota     | Category: Automotive