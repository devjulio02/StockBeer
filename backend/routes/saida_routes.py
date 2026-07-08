from flask import Blueprint, request, jsonify

from services.saida_service import SaidaService

saida_bp = Blueprint("saida", __name__)


@saida_bp.route("/estoque/saida", methods=["POST"])
def registrar_saida():
    dados = request.get_json()

    sucesso, mensagem, resultado = SaidaService.registrar(dados)

    if not sucesso:
        if mensagem == "Bebida não encontrada.":
            status = 404
        elif mensagem.startswith("Estoque insuficiente"):
            status = 409
        else:
            status = 400

        return jsonify({
            "success": False,
            "message": mensagem
        }), status

    return jsonify({
        "success": True,
        "message": mensagem,
        "resultado": resultado
    }), 201