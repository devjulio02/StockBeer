from repositories.painel_repository import PainelRepository


class PainelService:

    @staticmethod
    def buscar_dados():
        resumo = PainelRepository.buscar_resumo()
        alertas = PainelRepository.listar_alertas_reposicao()

        dados_painel = {
            "resumo": {
                "total_estoque": resumo["total_estoque"],
                "total_produtos": resumo["total_produtos"],
                "movimentacoes_mes": resumo["movimentacoes_mes"],
                "entradas_mes": resumo["entradas_mes"],
                "saidas_mes": resumo["saidas_mes"],
                "alertas_reposicao": resumo["alertas_reposicao"]
            },
            "alertas_reposicao": alertas
        }

        return True, "Dados do painel carregados com sucesso", dados_painel