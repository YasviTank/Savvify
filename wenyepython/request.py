import os
from google import genai #pip install google-genai
from google.genai import types

GEMINI_API_KEY = "AIzaSyCMsROF663NFThR5uNqw-aLPMEKVOEPsDk"

#Sets up the client
try:
    client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    print("Error initializing client. Please ensure the GEMINI_API_KEY environment variable is set correctly.")
    print(f"Details: {e}")
    exit()

# Set the model to use gemini-2.5-flash-lite
MODEL_NAME = 'gemini-2.5-flash-lite'

CLASSIFICATION_INSTRUCTIONS = ("You are a strict financial classifier. "
        "Classify the input company name into a single, exact category. "
        "Respond with ONLY the category name. Do not use any other words, punctuation, or explanations."
        "Allowed categories: Groceries, Shopping, Living Expenses, Transport, Loan, Taxes, Healthcare, Education, "
        "Gifts, Dining/Takeaway, Entertainment, Travel/Holiday.")

def categorize_company(company_name: str) -> str:
    """
    Uses the gemini-2.5-flash-lite model to categorize a company.
    
    Args:
        company_name: The name of the company to categorize.
        
    Returns:
        The clean, one-word industry category.
    """
    
    # 2. Craft a clear prompt that forces a minimal response
    prompt = f"Company: {company_name}"
    

    try:
        response = client.models.generate_content(
            model = MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(
                # Low temperature for deterministic, predictable output (less creativity)
                temperature=0.1,
                # Restrict the output length to ensure a single-word response
                max_output_tokens=10, 
                system_instruction = CLASSIFICATION_INSTRUCTIONS
            )
        )
        
        # 3. Clean and return the final category
        # .strip() removes whitespace, .capitalize() ensures proper casing.
        return response.text.strip().replace('.', '').capitalize()

    except Exception as e:
        # Handle API errors, such as hitting the daily/minute rate limit (RESOURCE_EXHAUSTED)
        return f"Error categorizing {company_name}: {e}"