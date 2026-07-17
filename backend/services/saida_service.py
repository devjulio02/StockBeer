from repositories.saida_repository import SaidaRepository
from services.notificacao_service import NotificacaoService
from repositories.notificacao_repository import NotificacaoRepository

class SaidaService:

    @staticmethod
    def registrar(dados):
        valido, mensagem, dados_validados = SaidaService.validar(dados)

        if not valido:
            return False, mensagem, None

        resultado = SaidaRepository.registrar(dados_validados)

        if resultado.get("erro") == "bebida_nao_encontrada":
            return False, "Bebida não encontrada.", None

        if resultado.get("erro") == "estoque_insuficiente":
            return False, f"Estoque insuficiente. Estoque atual: {resultado['estoque_atual']}.", None

        NotificacaoService.criar(
            mensagem=(
                f'Saída de {resultado["movimentacao"]["quantidade"]} '
                f'unidades da bebida "{resultado["bebida"]["nome"]}".'
            ),
            tipo="saida",
            origem_id=resultado["movimentacao"]["id"],
            bebida_id=resultado["bebida"]["id"]
        )

        if (
            resultado["bebida"]["quantidade_estoque"]
            <=
            resultado["bebida"]["estoque_minimo"]
        ):

            if not NotificacaoRepository.existe_alerta_estoque_baixo(
                resultado["bebida"]["id"]
            ):

                NotificacaoService.criar(
                    mensagem=(
                        f'Estoque da bebida "{resultado["bebida"]["nome"]}" '
                        f'ficou abaixo do mínimo.'
                    ),
                    tipo="estoque_baixo",
                    bebida_id=resultado["bebida"]["id"]
                )


        return True, "Saída de estoque registrada com sucesso", resultado

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