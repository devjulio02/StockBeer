from flask import Blueprint, request, jsonify

from services.bebida_service import BebidaService

bebida_bp = Blueprint("bebidas", __name__)


@bebida_bp.route("/bebidas", methods=["POST"])
def cadastrar_bebida():
    dados = request.get_json()

    sucesso, mensagem, bebida = BebidaService.cadastrar(dados)

    if not sucesso:
        return jsonify({
            "success": False,
            "message": mensagem
        }), 400

    return jsonify({
        "success": True,
        "message": mensagem,
        "bebida": bebida
    }), 201

@bebida_bp.route("/bebidas", methods=["GET"])
def listar_bebidas():
    sucesso, mensagem, bebidas = BebidaService.listar()

    return jsonify({
        "success": sucesso,
        "message": mensagem,
        "bebidas": bebidas
    }), 200