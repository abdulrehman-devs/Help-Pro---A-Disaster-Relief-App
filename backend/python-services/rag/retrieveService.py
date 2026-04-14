from rag.vectorStore import load_db

def retrieve_data(query, city):
    db = load_db()

    if not db:
        return []

    search_query = f"{query} {city}"

    results = db.similarity_search(search_query, k=5)

    docs = [r.page_content for r in results]

    if city:
        filtered = [
            d for d in docs
            if city.lower() in d.lower()
        ]

        return filtered if filtered else docs[:2]

    return docs[:3]