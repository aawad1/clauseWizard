#  ClauseWizard

ClauseWizard is a full-stack AI-powered contract generation and legal assistance system.

It allows users to:
- Dynamically generate legally sound contracts using AI.
- Search and reference relevant clauses from legal documents.
- Check the legality of user-written clauses against Bosnian law.
- Save generated contracts for future AI fine-tuning and retrieval.

---

##  Project Structure

```
clauseWizard/
├── clausewizard_backend/   # Flask API backend
│   ├── api/                # All API route definitions
│   ├── data/               # Uploaded legal documents, contracts and generated embeddings
│   ├── database/           # Database connection and insert scripts
│   ├── processing/         # PDF readers, embedders, and chunking pipelines
│   ├── services/           # Business logic services (generation, search, saving)
│   ├── app.py              # Main Flask app entrypoint
│   ├── config.py           # Configuration settings
│   ├── process_documents.py# Document batch processor
│   └── requirements.txt    # Python backend dependencies
├── public/                 # Public assets (e.g. fonts)
├── src/                    # Frontend (React + TypeScript + Vite)
│   ├── components/         # Reusable React components
│   ├── context/            # Global FormContext for form data management
│   ├── pages/              # Different frontend pages (Assistant, Contract creation, Profile)
│   ├── types/              # Shared TypeScript types
│   ├── App.tsx             # Main frontend app entry
│   └── main.tsx            # Vite frontend bootstrap
├── README.md               # (this file)
├── vite.config.ts          # Vite frontend configuration
└── package.json            # Frontend dependencies
```

---

##  Backend Technologies

- **Python 3.11**
- **Flask** for API
- **Flask-CORS** for frontend/backend communication
- **Sentence Transformers** (Legal-BERT model) for document embeddings
- **SQLite / PostgreSQL** (via custom `insert_contract_example.py`) for storing contracts and embeddings
- **OpenAI Gemini** or any LLM for smart legal generation and clause checking

---

##  Frontend Technologies

- **React 18** (with TypeScript)
- **Vite** for fast frontend bundling
- **TailwindCSS** for styling
- **Lucide-react** for icons
- **React-PDF** for generating downloadable PDF contracts
- **React-Toastify** for success/error notifications

---

##  Key Features

- **Contract Generator**:  
  Smartly creates personalized contracts based on a selected template and user inputs.

- **Clause Legality Checker**:  
  Analyze whether a specific clause aligns with Bosnian legal frameworks.

- **PDF Export**:  
  Download generated contracts immediately in PDF format.

- **Contract Database Saving**:  
  Save contracts to a database for further training, retrieval, and fine-tuning the AI model.

- **Embeddings Engine**:  
  Legal contracts and law documents are processed into embeddings for fast semantic search.

---

##  Backend API Endpoints

| Endpoint | Method | Description |
|:---|:---|:---|
| `/generate_contract` | POST | Generate contract based on user inputs |
| `/check_legality` | POST | Validate clauses against law documents |
| `/save_contract` | POST | Save generated contracts into the database |

---

##  Installation Instructions

### Backend

```bash
cd clausewizard_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd src
npm install
npm run dev
```

---

##  Dataset and Embedding Explanation

- `data/contract_examples/` → real contract samples.
- `data/law_documents/` → real law documents from Bosnia and Herzegovina.
- `data/embeddings/` → generated document vectors using Legal-BERT.
- These are used for:
    - Searching clauses
    - Supporting the AI in generating accurate outputs
    - Legal analysis

---


##  Authors

- [HananB27](https://github.com/HananB27)
- [aawad1](https://github.com/aawad1)

---

#  Ready to launch ClauseWizard!