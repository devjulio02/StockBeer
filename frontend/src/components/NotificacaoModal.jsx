import { resolverNotificacao } from "../services/notificacaoService";
import "../styles/notificacaoModal.css";

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
    
    if (!aberto) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>Notificações</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ✖
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

                                        🕒 {formatarData(notificacao.criado_em)}

                                    </small>

                                    <button className="resolver-button" onClick={() => resolver(notificacao.id)}>

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