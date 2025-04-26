from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# 1. Globalno kreiramo index samo jednom
index = None

def load_contracts_and_build_index(folder_path=r"C:\Users\DT User\projects\clauseWizard\clausewizard_backend\data\contract_examples"):
    global index
    print("🔄 Loading contract examples and building index...")

    # Initialize the local embedding model
    embed_model = HuggingFaceEmbedding(model_name="all-MiniLM-L6-v2")

    # Load all PDFs from folder
    documents = SimpleDirectoryReader(folder_path).load_data()
    print(f"Loaded {len(documents)} documents.")

    # Loop through and print basic info
    for idx, doc in enumerate(documents):
        print(f"📄 Document {idx+1}:")
        print(f"Metadata: {doc.metadata}")
        print(f"Text snippet: {doc.text[:10]}...")  # Only first 500 characters
        print("-" * 50)

    # Build vector index using local embeddings
    index = VectorStoreIndex.from_documents(
        documents,
        embed_model=embed_model
    )
    print(f"✅ Loaded {len(documents)} documents and built the index with local embeddings.")

# Call the function
load_contracts_and_build_index()
