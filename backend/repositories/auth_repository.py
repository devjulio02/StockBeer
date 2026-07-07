from database.connection import get_connection


class AuthRepository:

    @staticmethod
    def buscar_por_email(email):
        conn = get_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        nome,
                        email,
                        senha
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