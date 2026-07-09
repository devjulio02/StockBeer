from database.connection import get_connection


class PainelRepository:

    @staticmethod
    def buscar_resumo():
        conn = get_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        COALESCE(SUM(quantidade), 0) AS total_estoque,
                        COUNT(*) AS total_produtos
                    FROM bebidas;
                    """
                )

                estoque = cursor.fetchone()

                cursor.execute(
                    """
                    SELECT
                        COUNT(*) AS total_movimentacoes,
                        COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN quantidade ELSE 0 END), 0) AS total_entradas,
                        COALESCE(SUM(CASE WHEN tipo = 'saida' THEN quantidade ELSE 0 END), 0) AS total_saidas
                    FROM movimentacoes
                    WHERE data_movimentacao >= date_trunc('month', CURRENT_DATE);
                    """
                )

                movimentacoes = cursor.fetchone()

                cursor.execute(
                    """
                    SELECT
                        COUNT(*) AS total_alertas
                    FROM bebidas
                    WHERE quantidade <= estoque_minimo;
                    """
                )

                alertas = cursor.fetchone()

                return {
                    "total_estoque": estoque["total_estoque"],
                    "total_produtos": estoque["total_produtos"],
                    "movimentacoes_mes": movimentacoes["total_movimentacoes"],
                    "entradas_mes": movimentacoes["total_entradas"],
                    "saidas_mes": movimentacoes["total_saidas"],
                    "alertas_reposicao": alertas["total_alertas"]
                }

        finally:
            conn.close()

    @staticmethod
    def listar_alertas_reposicao():
        conn = get_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        b.id,
                        b.nome,
                        c.nome AS categoria,
                        b.quantidade,
                        b.estoque_minimo,
                        GREATEST(b.estoque_minimo - b.quantidade, 0) AS sugestao_reposicao,
                        CASE
                            WHEN b.estoque_minimo > 0 THEN
                                ROUND((b.quantidade::numeric / b.estoque_minimo) * 100)
                            ELSE 0
                        END AS percentual_estoque
                    FROM bebidas b
                    JOIN categorias c ON c.id = b.categoria_id
                    WHERE b.quantidade <= b.estoque_minimo
                    ORDER BY percentual_estoque ASC, b.nome ASC;
                    """
                )

                alertas = cursor.fetchall()

                return [
                    {
                        "id": alerta["id"],
                        "sku": f"SKU-{alerta['id']:03d}",
                        "produto": alerta["nome"],
                        "categoria": alerta["categoria"],
                        "quantidade_atual": alerta["quantidade"],
                        "estoque_minimo": alerta["estoque_minimo"],
                        "sugestao_reposicao": alerta["sugestao_reposicao"],
                        "percentual_estoque": int(alerta["percentual_estoque"]),
                        "status": "Atenção"
                    }
                    for alerta in alertas
                ]

        finally:
            conn.close()