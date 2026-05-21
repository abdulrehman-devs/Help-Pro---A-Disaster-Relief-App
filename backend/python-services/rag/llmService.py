import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
session = requests.Session()


def generate_answer(query: str, user_city: str, retrieved_docs: list[str]) -> dict:

    user_city = (user_city or "").strip().lower()

    if not user_city:
        return {
            "verification": "Fake",
            "reason": "City not provided."
        }

    if not retrieved_docs or len(retrieved_docs) == 0:
        return {
            "verification": "Fake",
            "reason": f"No disaster records found for {user_city}."
        }

    context = "\n".join([f"- {doc}" for doc in retrieved_docs[:5]])

    prompt = f"""
You are a disaster verification assistant.

User City: {user_city}

Context (verified disaster reports):
{context}

User Request:
{query}

RULES:
- In query if a user enters a location outside Pakistan, return "Fake" and a short reason.
- In query if a user enters a location inside Pakistan, verify based on the context.


Return ONLY valid JSON:
{{
  "verification": "Verified",
  "reason": "one short sentence explanation"
}}
"""

    payload = {
        "model": "llama3.1:8b-instruct",
        "prompt": prompt,
        "stream": False,
        "format": "json",
        "options": {
            "temperature": 0.1,
            "num_predict": 120
        }
    }

    try:
        response = session.post(OLLAMA_URL, json=payload, timeout=25)
        response.raise_for_status()

        raw = response.json().get("response", "").strip()
        llm_result = json.loads(raw)

        return {
            "verification": "Verified",
            "reason": llm_result.get(
                "reason",
                f"Disaster records exist for {user_city}."
            )
        }

    except Exception:
        return {
            "verification": "Verified",
            "reason": f"Disaster records exist for {user_city}."
        }