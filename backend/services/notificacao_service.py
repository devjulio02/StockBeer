from repositories.notificacao_repository import NotificacaoRepository


class NotificacaoService:

    @staticmethod
    def listar():

        notificacoes = NotificacaoRepository.listar()

        return (
            True,
            "Notificações carregadas com sucesso.",
            notificacoes
        )

    @staticmethod
    def resolver(notificacao_id):

        notificacao = NotificacaoRepository.buscar_por_id(
            notificacao_id
        )

        if not notificacao:
            return False, "Notificação não encontrada."

        if notificacao["resolvido"]:
            return False, "A notificação já foi resolvida."

        NotificacaoRepository.marcar_como_lida(
            notificacao_id
        )

        return True, "Notificação marcada como resolvida."

    @staticmethod
    def criar(mensagem, tipo, origem_id=None, bebida_id=None):

        NotificacaoRepository.criar(
            mensagem=mensagem,
            tipo=tipo,
            origem_id=origem_id,
            bebida_id=bebida_id
        )

        return True