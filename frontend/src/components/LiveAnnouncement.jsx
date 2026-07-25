export default function LiveAnnouncement({ mensagem, prioridade = "polite" }) {

    return (

        <div
            className="sr-only"
            aria-live={prioridade}
            aria-atomic="true"
        >
            {mensagem}
        </div>

    );

}