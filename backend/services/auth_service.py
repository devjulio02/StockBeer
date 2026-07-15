from repositories.auth_repository import AuthRepository


class AuthService:

    @staticmethod
    def autenticar(email, senha):

        if not email or not senha:
            return None

        usuario = AuthRepository.buscar_por_email(email)

        if not usuario:
            return None

        if usuario["senha"] != senha:
            return None

        return {
            "id": usuario["id"],
            "nome": usuario["nome"],
            "email": usuario["email"]
        }