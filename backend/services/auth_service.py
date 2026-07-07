from repositories.auth_repository import AuthRepository


class AuthService:

    @staticmethod
    def autenticar(email, senha):
        if not email or not senha:
            return False

        usuario = AuthRepository.buscar_por_email(email)

        if not usuario:
            return False

        return usuario["senha"] == senha