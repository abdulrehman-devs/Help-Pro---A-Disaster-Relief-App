import pandas as pd
from rag.storeService import store_texts

df = pd.read_csv("./dataset/emdat_pakistan_natural_disasters_2000_2025.csv")

texts = (
    df[["Disaster_Subtype", "Location"]]
    .dropna()
    .apply(lambda x: f"{x['Disaster_Subtype']} in {x['Location']}", axis=1)
    .tolist()
)

texts = [t.strip() for t in texts if len(t) > 2]

store_texts(texts)

print("Embeddings + FAISS storage done")