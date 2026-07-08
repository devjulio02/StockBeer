from flask import Blueprint, request, jsonify

from services.entrada_service import EntradaService

entrada_bp = Blueprint("entrada", __name__)


@entrada_bp.route("/estoque/entrada", methods=["POST"])
def registrar_entrada():
    dados = request.get_json()

    sucesso, mensagem, resultado = EntradaService.registrar(dados)

    if not sucesso:
        status = 404 if mensagem == "Bebida não encontrada." else 400

        return jsonify({
            "success": False,
            "message": mensagem
        }), status

    return jsonify({
        "success": True,
        "message": mensagem,
        "resultado": resultado
    }), 201