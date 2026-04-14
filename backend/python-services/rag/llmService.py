import requests
import json
import re

OLLAMA_URL = "http://localhost:11434/api/generate"

session = requests.Session()

def generate_answer(query, user_location, retrieved_docs):

    unique_docs = list(set(retrieved_docs))

    context = "\n".join([
        f"- {doc}"
        for doc in unique_docs[:3]
    ])

    prompt = f"""
You are a disaster analysis system.
You have to verify the victim request posts.

STRICT RULES:
- Use ONLY the provided context
- Do NOT use outside knowledge
- Do NOT merge unrelated locations
- If location is outside Pakistan or it is missing, return "Unknown"

TASK RULES:
- Determine location ONLY from context
- Verify ONLY if context supports query

Context:
{context}

Query:
{query}

User Location:
{user_location}

Return ONLY valid JSON:
{{
  "location": "Given Location of user",
  "verification": "Verified | Fake",
}}
"""

    payload = {
        "model": "phi",
        "prompt": prompt,
        "stream": False,
        "format": "json",
        "options": {
            "num_predict": 80,
            "temperature": 0.1
        }
    }

    response = session.post(OLLAMA_URL, json=payload, timeout=20)
    response.raise_for_status()

    result = response.json()
    raw_output = result.get("response", "")

    try:
        data = json.loads(raw_output)
    except:
        match = re.search(r"\{.*\}", raw_output, re.DOTALL)
        if match:
            data = json.loads(match.group())
        else:
            return {
                "error": "Failed to parse JSON",
                "raw_output": raw_output
            }

    return data