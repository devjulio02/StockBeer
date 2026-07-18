from flask import Blueprint, jsonify

from services.notificacao_service import NotificacaoService

notificacao_bp = Blueprint("notificacoes", __name__)


@notificacao_bp.route("/notificacoes", methods=["GET"])
def listar_notificacoes():

    sucesso, mensagem, notificacoes = NotificacaoService.listar()

    return jsonify({
        "success": sucesso,
        "message": mensagem,
        "notificacoes": notificacoes
    }), 200


@notificacao_bp.route("/notificacoes/<int:notificacao_id>/resolver", methods=["PUT"])
def resolver_notificacao(notificacao_id):

    sucesso, mensagem = NotificacaoService.resolver(
        notificacao_id
    )

    if not sucesso:

        status = (
            404
            if mensagem == "Notificação não encontrada."
            else 400
        )

        return jsonify({
            "success": False,
            "message": mensagem
        }), status

    return jsonify({
        "success": True,
        "message": mensagem
    }), 200