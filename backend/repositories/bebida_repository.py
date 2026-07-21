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

    @staticmethod
    def listar(filtros=None):
        filtros = filtros or {}

        conn = get_connection()

        try:
            with conn.cursor() as cursor:
                condicoes = []
                parametros = []

                busca = filtros.get("busca")
                categoria = filtros.get("categoria")
                ordenar = filtros.get("ordenar")

                if busca:
                    termo_busca = f"%{busca}%"

                    condicoes.append(
                        """
                        (
                            b.nome ILIKE %s OR
                            b.marca ILIKE %s OR
                            c.nome ILIKE %s
                        )
                        """
                    )

                    parametros.extend([
                        termo_busca,
                        termo_busca,
                        termo_busca
                    ])

                if categoria:
                    condicoes.append("c.nome ILIKE %s")
                    parametros.append(categoria)

                condicoes.insert(0, "b.ativo = TRUE")

                where_sql = "WHERE " + " AND ".join(condicoes)

                ordenacoes_permitidas = {
                    "id": "b.id",
                    "nome": "b.nome",
                    "categoria": "c.nome",
                    "marca": "b.marca",
                    "preco": "b.preco",
                    "quantidade": "b.quantidade"
                }

                coluna_ordenacao = ordenacoes_permitidas.get(
                    ordenar,
                    "b.id"
                )

                cursor.execute(
                    f"""
                    SELECT
                        b.id,
                        b.nome,
                        c.nome AS categoria,
                        b.marca,
                        b.preco,
                        b.quantidade,
                        b.estoque_minimo
                    FROM bebidas b
                    JOIN categorias c ON c.id = b.categoria_id
                    {where_sql}
                    ORDER BY {coluna_ordenacao} ASC;
                    """,
                    parametros
                )

                bebidas = cursor.fetchall()

                return [
                    {
                        "id": bebida["id"],
                        "sku": f"SKU-{bebida['id']:03d}",
                        "nome": bebida["nome"],
                        "categoria": bebida["categoria"],
                        "marca": bebida["marca"],
                        "preco": float(bebida["preco"]),
                        "quantidade_estoque": bebida["quantidade"],
                        "estoque_minimo": bebida["estoque_minimo"],
                    }
                    for bebida in bebidas
                ]

        finally:
            conn.close()

    @staticmethod
    def editar(bebida_id, dados):
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
                        UPDATE bebidas
                        SET
                            nome = %s,
                            marca = %s,
                            preco = %s,
                            quantidade = %s,
                            estoque_minimo = %s,
                            categoria_id = %s
                        WHERE id = %s
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
                            bebida_id
                        )
                    )

                    bebida = cursor.fetchone()

                    if not bebida:
                        return None

                    bebida = dict(bebida)

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

    @staticmethod
    def excluir(bebida_id):
        conn = get_connection()

        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        UPDATE bebidas
                        SET ativo = FALSE
                        WHERE id = %s
                        AND ativo = TRUE
                        RETURNING id;
                        """,
                        (bebida_id,)
                    )

                    bebida = cursor.fetchone()

                    return bebida is not None

        finally:
            conn.close()