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
    filtros = {
        "busca": request.args.get("busca"),
        "categoria": request.args.get("categoria"),
        "ordenar": request.args.get("ordenar")
    }

    sucesso, mensagem, bebidas = BebidaService.listar(filtros)

    if not sucesso:
        return jsonify({
            "success": False,
            "message": mensagem
        }), 400

    return jsonify({
        "success": sucesso,
        "message": mensagem,
        "bebidas": bebidas
    }), 200

@bebida_bp.route("/bebidas/<int:bebida_id>", methods=["PUT"])
def editar_bebida(bebida_id):
    dados = request.get_json()

    sucesso, mensagem, bebida = BebidaService.editar(bebida_id, dados)

    if not sucesso:
        status = 404 if mensagem == "Bebida não encontrada." else 400

        return jsonify({
            "success": False,
            "message": mensagem
        }), status

    return jsonify({
        "success": True,
        "message": mensagem,
        "bebida": bebida
    }), 200


@bebida_bp.route("/bebidas/<int:bebida_id>", methods=["DELETE"])
def excluir_bebida(bebida_id):
    sucesso, mensagem = BebidaService.excluir(bebida_id)

    if not sucesso:
        status = 404 if mensagem == "Bebida não encontrada." else 400

        return jsonify({
            "success": False,
            "message": mensagem
        }), status

    return jsonify({
        "success": True,
        "message": mensagem
    }), 200