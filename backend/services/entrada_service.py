from repositories.entrada_repository import EntradaRepository


class EntradaService:

    @staticmethod
    def registrar(dados):
        valido, mensagem, dados_validados = EntradaService.validar(dados)

        if not valido:
            return False, mensagem, None

        resultado = EntradaRepository.registrar(dados_validados)

        if not resultado:
            return False, "Bebida não encontrada.", None

        return True, "Entrada de estoque registrada com sucesso", resultado

    @staticmethod
    def validar(dados):
        if not isinstance(dados, dict):
            return False, "O corpo da requisição deve ser um JSON.", None

        if "bebida_id" not in dados:
            return False, "O campo bebida_id é obrigatório.", None

        if isinstance(dados["bebida_id"], bool) or not isinstance(dados["bebida_id"], int):
            return False, "O campo bebida_id deve ser um número inteiro.", None

        if dados["bebida_id"] <= 0:
            return False, "O campo bebida_id deve ser maior que zero.", None

        if "quantidade" not in dados:
            return False, "O campo quantidade é obrigatório.", None

        if isinstance(dados["quantidade"], bool) or not isinstance(dados["quantidade"], int):
            return False, "O campo quantidade deve ser um número inteiro.", None

        if dados["quantidade"] <= 0:
            return False, "A quantidade deve ser maior que zero.", None

        usuario_id = dados.get("usuario_id", 1)

        if isinstance(usuario_id, bool) or not isinstance(usuario_id, int):
            return False, "O campo usuario_id deve ser um número inteiro.", None

        if usuario_id <= 0:
            return False, "O campo usuario_id deve ser maior que zero.", None

        dados_validados = {
            "bebida_id": dados["bebida_id"],
            "quantidade": dados["quantidade"],
            "usuario_id": usuario_id
        }

        return True, None, dados_validados