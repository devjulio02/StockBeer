from flask import Blueprint, request, jsonify

from services.recuperacao_service import RecuperacaoService


recuperacao_bp = Blueprint("recuperacao", __name__)


@recuperacao_bp.route("/recuperacao", methods=["POST"])
def solicitar_recuperacao():

    dados = request.get_json()

    email = dados.get("email")

    sucesso, mensagem, resultado = RecuperacaoService.solicitar_recuperacao(email)

    if not sucesso:
        return jsonify({
            "success": False,
            "message": mensagem
        }), 400

    return jsonify({
        "success": True,
        "message": mensagem,
        "recuperacao": resultado
    }), 200


@recuperacao_bp.route("/recuperacao/redefinir", methods=["POST"])
def redefinir_senha():

    dados = request.get_json()

    token = dados.get("token")
    nova_senha = dados.get("nova_senha")

    sucesso, mensagem = RecuperacaoService.redefinir_senha(
        token,
        nova_senha
    )

    if not sucesso:
        return jsonify({
            "success": False,
            "message": mensagem
        }), 400

    return jsonify({
        "success": True,
        "message": mensagem
    }), 200