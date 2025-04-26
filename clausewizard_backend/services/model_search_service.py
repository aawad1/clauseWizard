from services.contract_search_service import search_contract_examples

def get_best_matching_contract(contract_type):
    """
    Traži najbolji ugovor iz baze na osnovu naziva tipa ugovora.
    """
    search_results = search_contract_examples(contract_type, top_k=1)

    if not search_results:
        return None

    return search_results[0]
