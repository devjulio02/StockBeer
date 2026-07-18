import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { buscarPainel } from "../services/painelService";
import ResumoCard from "../components/ResumoCard";
import AlertPanel from "../components/AlertPanel";
import NotificacaoModal from "../components/NotificacaoModal";
import { listarNotificacoes } from "../services/notificacaoService";
import {
    FaBoxes,
    FaExchangeAlt,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";

export default function Dashboard() {

    const [painel, setPainel] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [notificacoes, setNotificacoes] = useState([]);

    const [modalAberto, setModalAberto] = useState(false);

    const dataAtual = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const dataFormatada =
        dataAtual.charAt(0).toUpperCase() +
        dataAtual.slice(1);

    async function carregarNotificacoes() {

        try {

            const dados = await listarNotificacoes();

            setNotificacoes(dados.notificacoes);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        async function carregarPainel() {

            try {

                const dados = await buscarPainel();

                setPainel(dados);

                await carregarNotificacoes();

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

                            Visão geral do estoque — {dataFormatada}

                        </p>

                    </div>

                    <button
                        className="notification-button"
                        onClick={ async () => {setModalAberto(true); carregarNotificacoes();}}
                    >

                        🔔

                        {notificacoes.length > 0 && (

                            <span className="notification-badge">

                                {notificacoes.length > 99
                                    ? "99+"
                                    : notificacoes.length}

                            </span>

                        )}

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

                <NotificacaoModal 
                    aberto={modalAberto} 
                    onClose={() => setModalAberto(false)} 
                    notificacoes={notificacoes} 
                    atualizarNotificacoes={carregarNotificacoes}
                />

            </main>

        </div>

    );

}