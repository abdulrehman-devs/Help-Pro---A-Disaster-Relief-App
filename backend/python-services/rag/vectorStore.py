from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from rag.embeddingService import model
import os

DB_PATH = "rag/faiss_index"

embedding_model = model

def save_db(db):
    db.save_local(DB_PATH)

def load_db():
    if not os.path.exists(DB_PATH):
        return None

    return FAISS.load_local(
        DB_PATH,
        embedding_model,
        allow_dangerous_deserialization=True
    )