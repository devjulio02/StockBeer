from flask import Flask
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.bebida_routes import bebida_bp
from routes.cadastro_routes import cadastro_bp
from routes.entrada_routes import entrada_bp
from routes.saida_routes import saida_bp
from routes.painel_routes import painel_bp
from routes.recuperacao_routes import recuperacao_bp
from routes.notificacao_routes import notificacao_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(bebida_bp)
app.register_blueprint(cadastro_bp)
app.register_blueprint(entrada_bp)
app.register_blueprint(saida_bp)
app.register_blueprint(painel_bp)
app.register_blueprint(recuperacao_bp)
app.register_blueprint(notificacao_bp)

if __name__ == "__main__":
    app.run(debug=True)