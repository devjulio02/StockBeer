from decimal import Decimal, InvalidOperation

from repositories.bebida_repository import BebidaRepository


class BebidaService:

    @staticmethod
    def cadastrar(dados):
        valido, mensagem, dados_validados = BebidaService.validar_cadastro(dados)

        if not valido:
            return False, mensagem, None

        bebida = BebidaRepository.cadastrar(dados_validados)

        return True, "Bebida cadastrada com sucesso", bebida

    @staticmethod
    def listar(filtros=None):
        filtros = filtros or {}

        ordenar = filtros.get("ordenar")

        ordenacoes_permitidas = [
            "id",
            "nome",
            "categoria",
            "marca",
            "preco",
            "quantidade"
        ]

        if ordenar and ordenar not in ordenacoes_permitidas:
            return False, "Ordenação inválida.", None

        bebidas = BebidaRepository.listar(filtros)

        return True, "Bebidas listadas com sucesso", bebidas

    @staticmethod
    def validar_cadastro(dados):
        if not isinstance(dados, dict):
            return False, "O corpo da requisição deve ser um JSON.", None

        campos_texto = ["nome", "categoria", "marca"]

        for campo in campos_texto:
            if campo not in dados:
                return False, f"O campo {campo} é obrigatório.", None

            if not isinstance(dados[campo], str) or not dados[campo].strip():
                return False, f"O campo {campo} não pode estar vazio.", None

        if "preco" not in dados:
            return False, "O campo preco é obrigatório.", None

        try:
            preco = Decimal(str(dados["preco"]))

            if preco <= 0:
                return False, "O preço deve ser maior que zero.", None

        except (InvalidOperation, TypeError, ValueError):
            return False, "O preço deve ser um valor numérico válido.", None

        if "quantidade_estoque" not in dados:
            return False, "O campo quantidade_estoque é obrigatório.", None

        quantidade_estoque = dados["quantidade_estoque"]

        if isinstance(quantidade_estoque, bool) or not isinstance(quantidade_estoque, int):
            return False, "A quantidade em estoque deve ser um número inteiro.", None

        if quantidade_estoque < 0:
            return False, "A quantidade em estoque não pode ser negativa.", None

        estoque_minimo = dados.get("estoque_minimo", 10)

        if isinstance(estoque_minimo, bool) or not isinstance(estoque_minimo, int):
            return False, "O estoque mínimo deve ser um número inteiro.", None

        if estoque_minimo < 0:
            return False, "O estoque mínimo não pode ser negativo.", None

        dados_validados = {
            "nome": dados["nome"].strip(),
            "categoria": dados["categoria"].strip(),
            "marca": dados["marca"].strip(),
            "preco": preco,
            "quantidade_estoque": quantidade_estoque,
            "estoque_minimo": estoque_minimo,
        }

        return True, None, dados_validados