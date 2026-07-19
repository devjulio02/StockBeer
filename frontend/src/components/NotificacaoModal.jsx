import { resolverNotificacao } from "../services/notificacaoService";
import "../styles/notificacaoModal.css";
import { useEffect } from "react"

export default function NotificacaoModal({ aberto, onClose, notificacoes, atualizarNotificacoes }) {

    async function resolver(id) {

        try {

            await resolverNotificacao(id);

            await atualizarNotificacoes();

        } catch (error) {

            console.error(error);

            alert("Erro ao resolver notificação.");

        }

    }

    function formatarData(data) {

        const date = new Date(data);

        const dia = date.toLocaleDateString("pt-BR");

        const hora = date.toLocaleTimeString("pt-BR");

        return `${dia} às ${hora}`;

    }

    useEffect(() => {

        if (!aberto) return;

        function handleEscape(event) {

            if (event.key === "Escape") {

                onClose();

            }

        }

        window.addEventListener("keydown", handleEscape);

        return () => {

            window.removeEventListener("keydown", handleEscape);

        };

    }, [aberto, onClose]);
    
    if (!aberto) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div 
                className="modal" 
                id="notification-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="notification-modal-title" 
            >

                <div className="modal-header">

                    <h2 id="notification-modal-title">
                        Notificações
                    </h2>

                    <button
                        type="button"
                        className="modal-close"
                        aria-label="Fechar janela"
                        onClick={onClose}
                    >
                        <span aria-hidden="true">
                            ✖
                        </span>
                        
                    </button>

                </div>

                <div className="modal-body">
                    
                    {notificacoes.length === 0 ? (

                        <p>Nenhuma notificação pendente.</p>

                    ) : (    
                        <div className="notificacoes-lista">

                            {notificacoes.map((notificacao) => (

                                <div
                                    key={notificacao.id}
                                    className="notificacao-card"
                                >

                                    <p className="notificacao-mensagem">

                                        {notificacao.mensagem}

                                    </p>

                                    <small className="notificacao-data">

                                        <span aria-hidden="true">
                                            🕒 
                                        </span>
                                        {" "}
                                        {formatarData(notificacao.criado_em)}

                                    </small>

                                    <button type="button" className="resolver-button" onClick={() => resolver(notificacao.id)}>

                                        Marcar como resolvida

                                    </button>

                                </div>

                            ))}

                        </div>
                    )}
                    

                </div>

            </div>

        </div>

    );

}