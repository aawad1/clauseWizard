from processing.pipeline_law_docs import process_all_law_documents
from config import LAW_DOCUMENTS_FOLDER
from config import CONTRACT_EXAMPLES_FOLDER
from processing.pipeline_contract_examples import process_all_contract_examples
if __name__ == "__main__":
    # process_all_law_documents(LAW_DOCUMENTS_FOLDER)
    process_all_contract_examples()
