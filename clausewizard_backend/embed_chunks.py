# embed_chunks.py
from sentence_transformers import SentenceTransformer
import re

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

# === 3. Main ===
if __name__ == "__main__":
    chunks = load_chunks("contract_chunks.txt")
    print(f"✅ Loaded {len(chunks)} Član chunks to embed.")

    embeddings = embed_chunks(chunks)

    # # Print out a few embeddings
    # for idx, emb in enumerate(embeddings[:]):
    #     print(f"Embedding for Član {idx + 1}: Length = {len(emb)}")

    print(f"\n✅ Generated {len(embeddings)} embeddings.")
