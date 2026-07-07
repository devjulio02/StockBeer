import re

from repositories.cadastro_repository import CadastroRepository


class CadastroService:

    @staticmethod
    def cadastrar(dados):
        valido, mensagem, dados_validados = CadastroService.validar(dados)

        if not valido:
            return False, mensagem, None

        if CadastroRepository.email_existe(dados_validados["email"]):
            return False, "Já existe um usuário cadastrado com este e-mail.", None

        usuario = CadastroRepository.cadastrar(dados_validados)

        return True, "Usuário cadastrado com sucesso", usuario

    @staticmethod
    def validar(dados):
        if not isinstance(dados, dict):
            return False, "O corpo da requisição deve ser um JSON.", None

        campos_obrigatorios = ["nome", "email", "senha"]

        for campo in campos_obrigatorios:
            if campo not in dados:
                return False, f"O campo {campo} é obrigatório.", None

            if not isinstance(dados[campo], str) or not dados[campo].strip():
                return False, f"O campo {campo} não pode estar vazio.", None

        nome = dados["nome"].strip()
        email = dados["email"].strip().lower()
        senha = dados["senha"].strip()

        email_valido = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"

        if not re.match(email_valido, email):
            return False, "Digite um e-mail válido.", None

        if len(senha) < 6:
            return False, "A senha deve ter pelo menos 6 caracteres.", None

        dados_validados = {
            "nome": nome,
            "email": email,
            "senha": senha
        }

        return True, None, dados_validados