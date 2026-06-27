# services/auth_service.py

class AuthService:

    @staticmethod
    def autenticar(email, senha):

        # Simulação inicial
        if email == "admin@stockbeer.com" and senha == "123456":
            return True

        return False