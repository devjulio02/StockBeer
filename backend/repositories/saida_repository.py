from database.connection import get_connection


class SaidaRepository:

    @staticmethod
    def registrar(dados):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        SELECT
                            id,
                            nome,
                            marca,
                            preco,
                            quantidade,
                            estoque_minimo,
                            categoria_id
                        FROM bebidas
                        WHERE id = %s
                        FOR UPDATE;
                        """,
                        (dados["bebida_id"],)
                    )

                    bebida_atual = cursor.fetchone()

                    if not bebida_atual:
                        return {
                            "erro": "bebida_nao_encontrada"
                        }

                    if bebida_atual["quantidade"] < dados["quantidade"]:
                        return {
                            "erro": "estoque_insuficiente",
                            "estoque_atual": bebida_atual["quantidade"]
                        }

                    cursor.execute(
                        """
                        UPDATE bebidas
                        SET quantidade = quantidade - %s
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
                            "saida",
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