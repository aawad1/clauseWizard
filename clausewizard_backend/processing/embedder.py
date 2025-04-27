from sentence_transformers import SentenceTransformer

model = SentenceTransformer('nlpaueb/legal-bert-base-uncased')

def embed_texts(texts):
    return model.encode(texts)
