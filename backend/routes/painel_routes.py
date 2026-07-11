from flask import Blueprint, jsonify

from services.painel_service import PainelService

painel_bp = Blueprint("painel", __name__)


@painel_bp.route("/painel", methods=["GET"])
def buscar_dados_painel():
    sucesso, mensagem, painel = PainelService.buscar_dados()

    return jsonify({
        "success": sucesso,
        "message": mensagem,
        "painel": painel
    }), 200