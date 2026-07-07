from flask import Blueprint, request, jsonify

from services.cadastro_service import CadastroService

cadastro_bp = Blueprint("cadastro", __name__)


@cadastro_bp.route("/usuarios", methods=["POST"])
def cadastrar_usuario():
    dados = request.get_json()

    sucesso, mensagem, usuario = CadastroService.cadastrar(dados)

    if not sucesso:
        status = 409 if mensagem == "Já existe um usuário cadastrado com este e-mail." else 400

        return jsonify({
            "success": False,
            "message": mensagem
        }), status

    return jsonify({
        "success": True,
        "message": mensagem,
        "usuario": usuario
    }), 201