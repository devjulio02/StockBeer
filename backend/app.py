from flask import Flask
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.bebida_routes import bebida_bp
from routes.cadastro_routes import cadastro_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(bebida_bp)
app.register_blueprint(cadastro_bp)

if __name__ == "__main__":
    app.run(debug=True)