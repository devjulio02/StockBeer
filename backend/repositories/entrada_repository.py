from database.connection import get_connection


class EntradaRepository:

    @staticmethod
    def registrar(dados):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        UPDATE bebidas
                        SET quantidade = quantidade + %s
                        WHERE id = %s
                        RETURNING
                            id,
                            nome,
                            marca,
                            preco,
                            quantidade,
                            estoque_minimo,
                            categoria_id;
                        """,
                        (
                            dados["quantidade"],
                            dados["bebida_id"]
                        )
                    )

                    bebida = cursor.fetchone()

                    if not bebida:
                        return None

                    cursor.execute(
                        """
                        INSERT INTO movimentacoes (
                            tipo,
                            quantidade,
                            bebida_id,
                            usuario_id
                        )
                        VALUES (%s, %s, %s, %s)
                        RETURNING
                            id,
                            tipo,
                            quantidade,
                            data_movimentacao;
                        """,
                        (
                            "entrada",
                            dados["quantidade"],
                            dados["bebida_id"],
                            dados["usuario_id"]
                        )
                    )

                    movimentacao = dict(cursor.fetchone())

                    cursor.execute(
                        """
                        SELECT nome
                        FROM categorias
                        WHERE id = %s;
                        """,
                        (bebida["categoria_id"],)
                    )

                    categoria = cursor.fetchone()

                    return {
                        "movimentacao": {
                            "id": movimentacao["id"],
                            "tipo": movimentacao["tipo"],
                            "quantidade": movimentacao["quantidade"],
                            "data_movimentacao": movimentacao["data_movimentacao"].isoformat()
                        },
                        "bebida": {
                            "id": bebida["id"],
                            "sku": f"SKU-{bebida['id']:03d}",
                            "nome": bebida["nome"],
                            "categoria": categoria["nome"],
                            "marca": bebida["marca"],
                            "preco": float(bebida["preco"]),
                            "quantidade_estoque": bebida["quantidade"],
                            "estoque_minimo": bebida["estoque_minimo"]
                        }
                    }

        finally:
            conn.close()