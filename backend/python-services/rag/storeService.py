from langchain_community.vectorstores import FAISS
from rag.vectorStore import save_db, load_db, embedding_model

def store_texts(texts):
    existing_db = load_db()

    if existing_db is not None:
        print("Existing DB found, adding texts...")

        existing_db.add_texts(texts)
        db = existing_db

    else:
        print("Creating new FAISS DB...")

        db = FAISS.from_texts(texts, embedding_model)

    print("Total vectors:", db.index.ntotal)

    save_db(db)

    print("Saved successfully")

    return "Data stored successfully"