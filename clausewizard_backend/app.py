from flask import Flask
from flask_cors import CORS
from api.generate_routes import generate_bp
from api.law_clauses_routes import law_clauses_bp
from api.save_contract import save_contract_bp

app = Flask(__name__)
CORS(app)

# Registruj Blueprint-ove
app.register_blueprint(generate_bp)
app.register_blueprint(law_clauses_bp)
app.register_blueprint(save_contract_bp)

if __name__ == "__main__":
    app.run(debug=True)
