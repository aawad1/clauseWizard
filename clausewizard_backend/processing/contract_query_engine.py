# contract_query_engine.py

import os
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex

# 1. Globalno kreiramo index samo jednom
index = None

def load_contracts_and_build_index(folder_path="data/contract_examples"):
    global index
    print("🔄 Loading contract examples and building index...")

    # Load all PDFs from folder
    documents = SimpleDirectoryReader(folder_path).load_data()

    # Build vector index
    index = VectorStoreIndex.from_documents(documents)

    print(f"✅ Loaded {len(documents)} documents and built the index.")

# 2. Funkcija koju zoveš kad želiš pronaći najbolji ugovor
def query_contract(user_query):
    global index
    if index is None:
        raise ValueError("Index is not loaded. Call load_contracts_and_build_index() first.")

    query_engine = index.as_query_engine()
    response = query_engine.query(user_query)
    return response

# 3. Ako želiš testirati direktno ovaj file
if __name__ == "__main__":
    load_contracts_and_build_index()

    query = "Trebam ugovor o freelance saradnji za IT usluge"
    response = query_contract(query)

    print("\n📄 Najbolji pronađeni ugovor:")
    print(response.response)
