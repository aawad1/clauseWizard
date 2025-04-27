from services.law_docs_search_service import search_law_clauses

def find_relevant_clauses(user_query: str):
    return search_law_clauses(user_query)
