import "../styles/ResumoCard.css";

export default function ResumoCard({
    titulo,
    valor,
    descricao,
    icone,
    cor
}) {

    function descricaoResumo() {

        switch (titulo) {

            case "Total de Itens":
                return `Resumo do estoque. Existem atualmente ${valor} produtos cadastrados.`;

            case "Movimentações":
                return `Resumo de movimentações. Foram registradas ${valor} movimentações ${descricao}.`;

            case "Entradas":
                return `Resumo de entradas. Foram recebidas ${valor} ${descricao}.`;

            case "Saídas":
                return `Resumo de saídas. Foram expedidas ${valor} ${descricao}.`;

            default:
                return `${titulo}. ${valor}. ${descricao}.`;

        }

    }

    return (

        <article className="metric-card" tabIndex={0} aria-label={descricaoResumo()}>

            <div className="metric-card__top">

                <div>

                    <div className="metric-card__label">
                        {titulo}
                    </div>

                    <div className="metric-card__value">
                        {valor}
                    </div>

                </div>

                <div
                    className="metric-card__icon-wrap"
                    style={{ background: cor }}
                    aria-hidden="true"
                >
                    {icone}
                </div>

            </div>

            <div className="metric-card__sub">
                {descricao}
            </div>

        </article>

    );
}