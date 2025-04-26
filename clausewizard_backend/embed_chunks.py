# embed_chunks.py
from sentence_transformers import SentenceTransformer
import re
import numpy as np  # NEW: to save embeddings
import os  # optional: to create a directory if needed

# === 1. Read contract_chunks.txt ===
def load_chunks(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into sections
    raw_chunks = re.split(r'\[Član \d+\]', content)
    raw_chunks = [chunk.strip() for chunk in raw_chunks if chunk.strip() and not chunk.startswith("[TITLE]")]
    return raw_chunks

# === 2. Embed chunks using SentenceTransformer ===
def embed_chunks(chunks):
    model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    embeddings = model.encode(chunks)
    return embeddings

# === 3. Save embeddings to .npy ===
def save_embeddings(embeddings, filename):
    np.save(filename, embeddings)
    print(f"✅ Saved embeddings to {filename}")

# === 4. Main ===
if __name__ == "__main__":
    chunks = load_chunks("contract_chunks.txt")
    print(f"✅ Loaded {len(chunks)} Član chunks to embed.")

    embeddings = embed_chunks(chunks)
    print(f"\n✅ Generated {len(embeddings)} embeddings.")

    print(f"Type of first embedding: {type(embeddings[0])}")
    print(f"Length of first embedding: {len(embeddings[0])}")

    # Save embeddings
    save_embeddings(embeddings, "embeddings/contract_embeddings.npy")
