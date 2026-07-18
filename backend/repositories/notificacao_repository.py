from database.connection import get_connection


class NotificacaoRepository:

    @staticmethod
    def criar(mensagem, tipo, origem_id=None, bebida_id=None):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO alertas (
                            mensagem,
                            tipo,
                            origem_id,
                            bebida_id
                        )
                        VALUES (%s, %s, %s, %s);
                        """,
                        (
                            mensagem,
                            tipo,
                            origem_id,
                            bebida_id
                        )
                    )

        finally:
            conn.close()

    @staticmethod
    def listar():
        conn = get_connection()

        try:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT
                        id,
                        mensagem,
                        tipo,
                        origem_id,
                        resolvido,
                        criado_em
                    FROM alertas
                    WHERE resolvido = FALSE
                    ORDER BY criado_em DESC;
                    """
                )

                return [
                    {
                        "id": notificacao["id"],
                        "mensagem": notificacao["mensagem"],
                        "tipo": notificacao["tipo"],
                        "origem_id": notificacao["origem_id"],
                        "resolvido": notificacao["resolvido"],
                        "criado_em": notificacao["criado_em"].isoformat()
                    }
                    for notificacao in cursor.fetchall()
                ]

        finally:
            conn.close()

    @staticmethod
    def buscar_por_id(notificacao_id):
        conn = get_connection()

        try:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT
                        id,
                        resolvido
                    FROM alertas
                    WHERE id = %s;
                    """,
                    (notificacao_id,)
                )

                resultado = cursor.fetchone()

                if resultado:
                    return dict(resultado)

                return None

        finally:
            conn.close()

    @staticmethod
    def marcar_como_lida(notificacao_id):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:

                    cursor.execute(
                        """
                        UPDATE alertas
                        SET resolvido = TRUE
                        WHERE id = %s;
                        """,
                        (notificacao_id,)
                    )

        finally:
            conn.close()
    
    @staticmethod
    def existe_alerta_estoque_baixo(bebida_id):
        conn = get_connection()

        try:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT 1
                    FROM alertas
                    WHERE bebida_id = %s
                      AND tipo = 'estoque_baixo'
                      AND resolvido = FALSE
                    LIMIT 1;
                    """,
                    (bebida_id,)
                )

                return cursor.fetchone() is not None

        finally:
            conn.close()