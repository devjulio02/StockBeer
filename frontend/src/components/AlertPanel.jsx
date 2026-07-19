import "../styles/AlertPanel.css";
import { FaExclamationTriangle } from "react-icons/fa";

export default function AlertPanel({ alertas }) {

    return (

        <section className="alert-panel">

            <div className="alert-panel__header">

                <div>

                    <h2 className="alert-panel__title">
                        <FaExclamationTriangle className="alert-icon" aria-hidden="true"/>
                        Alertas de Reposição
                    </h2>

                    <p className="alert-panel__sub">
                        {alertas.length} produto{alertas.length !== 1 ? "s" : ""} abaixo do estoque mínimo
                    </p>

                </div>

                <span className="alert-panel__badge" aria-label="Produtos que precisam de reposição">

                    ATENÇÃO

                </span>

            </div>

            <div className="alert-table-wrapper">
                <table className="alert-table">

                    <caption className="sr-only">
                        Lista de produtos abaixo do estoque mínimo
                    </caption>

                    <thead>

                        <tr>

                            <th scope="col">Produto</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Qtd. Atual</th>
                            <th scope="col">Estoque Mínimo</th>
                            <th scope="col">Sugestão</th>
                            <th scope="col">Status</th>

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

                                            {item.quantidade_atual} un.

                                        </td>

                                        <td>

                                            {item.estoque_minimo} un.

                                        </td>

                                        <td>

                                            <span className="alert-suggestion">

                                                + {item.sugestao_reposicao} un.

                                            </span>

                                        </td>

                                        <td>

                                            <div className="status-progress">

                                                <div className="status-progress__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={item.percentual_estoque} aria-label={`Nível de estoque de ${item.produto}`}>

                                                    <div
                                                        className="status-progress__fill"
                                                        style={{
                                                            width: `${item.percentual_estoque}%`
                                                        }}
                                                    />

                                                </div>

                                                <span className="status-badge">

                                                    {item.percentual_estoque}%

                                                </span>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>
            
        </section>

    );

}