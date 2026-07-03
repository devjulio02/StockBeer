from database.connection import get_connection


class BebidaRepository:

    @staticmethod
    def cadastrar(dados):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO categorias (nome)
                        VALUES (%s)
                        ON CONFLICT (nome) DO UPDATE SET nome = EXCLUDED.nome
                        RETURNING id;
                        """,
                        (dados["categoria"],)
                    )

                    categoria_id = cursor.fetchone()["id"]

                    cursor.execute(
                        """
                        INSERT INTO bebidas (
                            nome,
                            marca,
                            preco,
                            quantidade,
                            estoque_minimo,
                            categoria_id
                        )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING
                            id,
                            nome,
                            marca,
                            preco,
                            quantidade,
                            estoque_minimo;
                        """,
                        (
                            dados["nome"],
                            dados["marca"],
                            dados["preco"],
                            dados["quantidade_estoque"],
                            dados["estoque_minimo"],
                            categoria_id,
                        )
                    )

                    bebida = dict(cursor.fetchone())

                    return {
                        "id": bebida["id"],
                        "sku": f"SKU-{bebida['id']:03d}",
                        "nome": bebida["nome"],
                        "categoria": dados["categoria"],
                        "marca": bebida["marca"],
                        "preco": float(bebida["preco"]),
                        "quantidade_estoque": bebida["quantidade"],
                        "estoque_minimo": bebida["estoque_minimo"],
                    }

        finally:
            conn.close()