import { resolverNotificacao } from "../services/notificacaoService";
import "../styles/notificacaoModal.css";
import { useEffect } from "react"
import useFocusTrap from "../hooks/useFocusTrap";

export default function NotificacaoModal({ aberto, onClose, notificacoes, atualizarNotificacoes }) {

    const modalRef = useFocusTrap(
        aberto,
        onClose
    );

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
    
    if (!aberto) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div 
                ref={modalRef}
                className="modal" 
                id="notification-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="notification-modal-title"
                aria-describedby="notification-modal-description"
                tabIndex={-1} 
            >

                <div className="modal-header" >

                    <h2 id="notification-modal-title" >
                        Notificações
                    </h2>

                    <p
                        id="notification-modal-description"
                        className="sr-only"
                    >
                        Lista de notificações pendentes do sistema. Após esta descrição ouça a leitura automática ou utilize as teclas seta para cima e para baixo para navegar pelas notificações.
                    </p>

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

                        <p
                            role="status"
                            aria-live="polite"
                        >
                            Nenhuma notificação pendente.
                        </p>

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

                                    <button type="button" className="resolver-button" aria-label={`Marcar a notificação: ${notificacao.mensagem} como resolvida`} onClick={() => resolver(notificacao.id)}>

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