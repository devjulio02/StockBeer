from database.connection import get_connection


class CadastroRepository:

    @staticmethod
    def email_existe(email):
        conn = get_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id
                    FROM usuarios
                    WHERE email = %s;
                    """,
                    (email,)
                )

                return cursor.fetchone() is not None

        finally:
            conn.close()

    @staticmethod
    def cadastrar(dados):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO usuarios (
                            nome,
                            email,
                            senha
                        )
                        VALUES (%s, %s, %s)
                        RETURNING
                            id,
                            nome,
                            email,
                            criado_em;
                        """,
                        (
                            dados["nome"],
                            dados["email"],
                            dados["senha"]
                        )
                    )

                    usuario = dict(cursor.fetchone())

                    return {
                        "id": usuario["id"],
                        "nome": usuario["nome"],
                        "email": usuario["email"],
                        "criado_em": usuario["criado_em"].isoformat()
                    }

        finally:
            conn.close()