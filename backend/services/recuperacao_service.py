import uuid

from datetime import datetime, timedelta

from repositories.recuperacao_repository import RecuperacaoRepository


class RecuperacaoService:

    @staticmethod
    def solicitar_recuperacao(email):

        if not email:
            return False, "O e-mail é obrigatório.", None

        usuario = RecuperacaoRepository.buscar_usuario_por_email(email)

        if not usuario:
            return False, "E-mail não encontrado.", None

        token = uuid.uuid4().hex

        expira_em = datetime.now() + timedelta(minutes=30)

        RecuperacaoRepository.salvar_token(
            usuario["id"],
            token,
            expira_em
        )

        return True, "Solicitação de recuperação criada com sucesso.", {
            "email": usuario["email"],
            "token": token,
            "expira_em": expira_em.strftime("%Y-%m-%d %H:%M:%S")
        }

    @staticmethod
    def redefinir_senha(token, nova_senha):

        if not token or not nova_senha:
            return False, "Token e nova senha são obrigatórios."

        registro = RecuperacaoRepository.buscar_token(token)

        if not registro:
            return False, "Token inválido."

        if registro["utilizado"]:
            return False, "Este token já foi utilizado."

        if datetime.now() > registro["expira_em"]:
            return False, "Token expirado."

        RecuperacaoRepository.atualizar_senha(
            registro["usuario_id"],
            nova_senha
        )

        RecuperacaoRepository.marcar_token_utilizado(token)

        return True, "Senha redefinida com sucesso."