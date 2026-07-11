import "../styles/AlertPanel.css";

export default function AlertPanel({ alertas }) {

    return (

        <section className="alert-panel">

            <div className="alert-panel__header">

                <div>

                    <h2 className="alert-panel__title">
                        ⚠ Alertas de Reposição
                    </h2>

                    <p className="alert-panel__sub">
                        {alertas.length} produto{alertas.length !== 1 ? "s" : ""} abaixo do estoque mínimo
                    </p>

                </div>

                <span className="alert-panel__badge">

                    ATENÇÃO

                </span>

            </div>

            <table className="alert-table">

                <thead>

                    <tr>

                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Qtd. Atual</th>
                        <th>Estoque Mínimo</th>
                        <th>Sugestão</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        alertas.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="alert-empty"
                                >

                                    Nenhum alerta de reposição.

                                </td>

                            </tr>

                        ) : (

                            alertas.map((item) => (

                                <tr key={item.id}>

                                    <td className="alert-product">

                                        {item.produto}

                                    </td>

                                    <td>

                                        {item.categoria}

                                    </td>

                                    <td className="alert-critical">

                                        {item.quantidade_atual}

                                    </td>

                                    <td>

                                        {item.estoque_minimo}

                                    </td>

                                    <td>

                                        <span className="alert-suggestion">

                                            +{item.sugestao_reposicao}

                                        </span>

                                    </td>

                                    <td>

                                        {item.percentual_estoque}%

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </section>

    );

}