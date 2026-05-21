from flask import Blueprint, request, jsonify
from rag.retrieveService import retrieve_data
from rag.llmService import generate_answer

process_bp = Blueprint("process", __name__)


@process_bp.route("/process", methods=["POST"])
def process_request():

    try:
        data = request.get_json()

        query = data.get("query")
        city = data.get("city")

        if not query:
            return jsonify({"error": "Query is required"}), 400

        if not city:
            return jsonify({"error": "City is required"}), 400

        retrieved_docs = retrieve_data(query, city)

        if not retrieved_docs:
            return jsonify({
                "message": "Processing complete",
                "llm_response": {
                    "verification": "Fake",
                    "reason": "No relevant disaster records found."
                }
            }), 404

        llm_response = generate_answer(query, city, retrieved_docs)

        return jsonify({
            "message": "Processing complete",
            "city": city,
            "retrieved_docs": retrieved_docs,
            "llm_response": llm_response
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500