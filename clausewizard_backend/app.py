from flask import Flask
from flask_cors import CORS
from api.generate_routes import generate_bp

app = Flask(__name__)
CORS(app)

# Registruj Blueprint-ove
app.register_blueprint(generate_bp)

if __name__ == "__main__":
    app.run(debug=True)
