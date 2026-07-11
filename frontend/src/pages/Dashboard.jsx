import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { buscarPainel } from "../services/painelService";
import ResumoCard from "../components/ResumoCard";
import AlertPanel from "../components/AlertPanel";
import {
    FaBoxes,
    FaExchangeAlt,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";

export default function Dashboard() {

    const [painel, setPainel] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        async function carregarPainel() {

            try {

                const dados = await buscarPainel();

                console.log(dados);

                setPainel(dados);

            } catch (error) {

                console.error(error);

                alert("Erro ao carregar Dashboard.");

            } finally {

                setCarregando(false);

            }

        }

        carregarPainel();

    }, []);

    if (carregando) {
        return <h2>Carregando Dashboard...</h2>
    }

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <main className="dashboard">

                <header className="dashboard__header">

                    <div>

                        <h1>Dashboard</h1>

                        <p>

                            Visão geral do estoque

                        </p>

                    </div>

                    <button className="dashboard-bell-btn">

                        🔔

                    </button>

                </header>

                <section className="dashboard__body">
                    <section className="metrics-grid">

                        <ResumoCard
                            titulo="Total de Itens"
                            valor={painel.resumo.total_produtos}
                            descricao="produtos cadastrados"
                            icone={<FaBoxes />}
                            cor="#eef2f7"
                        />

                        <ResumoCard
                            titulo="Movimentações"
                            valor={painel.resumo.movimentacoes_mes}
                            descricao="este mês"
                            icone={<FaExchangeAlt />}
                            cor="#efe7ff"
                        />

                        <ResumoCard
                            titulo="Entradas"
                            valor={painel.resumo.entradas_mes}
                            descricao="unidades recebidas"
                            icone={<FaArrowUp />}
                            cor="#e8fff4"
                        />

                        <ResumoCard
                            titulo="Saídas"
                            valor={painel.resumo.saidas_mes}
                            descricao="unidades expedidas"
                            icone={<FaArrowDown />}
                            cor="#fff0f0"
                        />

                    </section>
                    <AlertPanel alertas={painel.alertas_reposicao}/>
                        
                </section>

            </main>

        </div>

    );

}