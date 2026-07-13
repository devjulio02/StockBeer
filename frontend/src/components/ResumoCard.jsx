import "../styles/ResumoCard.css";

export default function ResumoCard({
    titulo,
    valor,
    descricao,
    icone,
    cor
}) {
    return (

        <div className="metric-card">

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
                >
                    {icone}
                </div>

            </div>

            <div className="metric-card__sub">
                {descricao}
            </div>

        </div>

    );
}