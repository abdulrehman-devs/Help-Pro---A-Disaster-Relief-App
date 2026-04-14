from langchain_huggingface import HuggingFaceEmbeddings

model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def generate_embedding(text):
    return model.embed_query(text)