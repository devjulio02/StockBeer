from database.connection import get_connection


class RecuperacaoRepository:

    @staticmethod
    def buscar_usuario_por_email(email):
        conn = get_connection()

        try:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT
                        id,
                        nome,
                        email
                    FROM usuarios
                    WHERE email = %s;
                    """,
                    (email,)
                )

                usuario = cursor.fetchone()

                if usuario:
                    return dict(usuario)

                return None

        finally:
            conn.close()

    @staticmethod
    def salvar_token(usuario_id, token, expira_em):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:

                    cursor.execute(
                        """
                        INSERT INTO recuperacao_senha (
                            usuario_id,
                            token,
                            expira_em
                        )
                        VALUES (%s, %s, %s);
                        """,
                        (
                            usuario_id,
                            token,
                            expira_em
                        )
                    )

        finally:
            conn.close()

    @staticmethod
    def buscar_token(token):
        conn = get_connection()

        try:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT
                        rs.id,
                        rs.usuario_id,
                        rs.token,
                        rs.expira_em,
                        rs.utilizado,
                        u.email
                    FROM recuperacao_senha rs
                    JOIN usuarios u
                        ON u.id = rs.usuario_id
                    WHERE rs.token = %s;
                    """,
                    (token,)
                )

                registro = cursor.fetchone()

                if registro:
                    return dict(registro)

                return None

        finally:
            conn.close()

    @staticmethod
    def atualizar_senha(usuario_id, nova_senha):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:

                    cursor.execute(
                        """
                        UPDATE usuarios
                        SET senha = %s
                        WHERE id = %s;
                        """,
                        (
                            nova_senha,
                            usuario_id
                        )
                    )

        finally:
            conn.close()

    @staticmethod
    def marcar_token_utilizado(token):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:

                    cursor.execute(
                        """
                        UPDATE recuperacao_senha
                        SET utilizado = TRUE
                        WHERE token = %s;
                        """,
                        (token,)
                    )

        finally:
            conn.close()