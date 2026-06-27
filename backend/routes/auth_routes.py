# routes/auth_routes.py

from flask import Blueprint, request, jsonify
from services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():

    dados = request.get_json()

    email = dados.get("email")
    senha = dados.get("senha")

    autenticado = AuthService.autenticar(email, senha)

    if autenticado:
        return jsonify({
            "success": True,
            "message": "Login realizado com sucesso"
        }), 200

    return jsonify({
        "success": False,
        "message": "E-mail ou senha inválidos"
    }), 401