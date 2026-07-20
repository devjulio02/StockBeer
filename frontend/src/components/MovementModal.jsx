import "../styles/movementModal.css";
import { useEffect, useState } from "react";

import { 
    listarProdutos, 
    registrarEntrada,
    registrarSaida 
} from "../services/movementacaoService";

import {
    FaTimes,
    FaArrowUp,
    FaArrowDown,
    FaExchangeAlt
} from "react-icons/fa";

export default function MovementModal({ aberto, onClose }) {

    const [produtos, setProdutos] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState("");

    const [tipo, setTipo] = useState("");

    const [quantidade, setQuantidade] = useState("");

    const formularioValido =
    produtoSelecionado !== "" &&
    tipo !== "" &&
    Number(quantidade) > 0;

    const fecharModal = () => {

        setProdutoSelecionado("");

        setTipo("");

        setQuantidade("");

        onClose();

    };

    const handleSubmit = async () => {

        if (!formularioValido) return;

        try {

            if (tipo === "entrada") {

                const resposta = await registrarEntrada(
                    Number(produtoSelecionado),
                    Number(quantidade)
                );

                alert(resposta.message);

            } else {

                const resposta = await registrarSaida(
                    Number(produtoSelecionado),
                    Number(quantidade)
                );

                alert(resposta.message);

            }

            fecharModal();

            // Atualiza toda a aplicação
            window.location.reload();

        } catch (erro) {

            console.error(erro);

            alert(

                erro.response?.data?.message ||

                "Erro ao registrar movimentação."

            );

        }

    };

    useEffect(() => {

        if (!aberto) return;

        async function carregarProdutos() {

            try {

                const lista = await listarProdutos();

                setProdutos(lista);

            } catch (erro) {

                console.error(erro);

            }

        }

        carregarProdutos();

    }, [aberto]);

    useEffect(() => {

        if (!aberto) return;

        function handleEscape(event) {

            if (event.key === "Escape") {

                fecharModal();

            }

        }

        window.addEventListener("keydown", handleEscape);

        return () => {

            window.removeEventListener("keydown", handleEscape);

        };

    }, [aberto]);

    if (!aberto) return null;

    return (

        <div className="modal-backdrop">

            <div 
                className="modal-card"
                id="movement-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="movement-modal-title"
                aria-describedby="movement-modal-description"
            >

                <header className="modal-header">

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px"
                        }}
                    >

                        <div className="modal-header__icon-wrap">

                            <FaExchangeAlt aria-hidden="true" />

                        </div>

                        <div>

                            <h2 id="movement-modal-title" className="modal-header__title">

                                Nova Movimentação

                            </h2>

                            <p id="movement-modal-description"  className="modal-header__sub">

                                Registrar entrada ou saída de produto

                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="modal-close-btn"
                        aria-label="Fechar janela"
                        onClick={fecharModal}
                    >

                        <FaTimes aria-hidden="true" />

                    </button>

                </header>

                <div className="modal-body">

                    <div className="form-field">

                        <label className="form-label" htmlFor="produto">

                            Selecionar Produto

                        </label>

                        <select id="produto" className="dropdown-trigger" value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)}>

                            <option value="">

                                Escolha um produto...

                            </option>

                            {produtos.map((produto) => (
                                <option key={produto.id} value={produto.id}>
                                    {produto.nome}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div className="form-field">

                        <label className="form-label">

                            Tipo de Movimentação

                        </label>

                        <div className="type-selector">

                            <button
                                className={`type-btn ${
                                    tipo === "entrada"
                                        ? "type-btn--entrada-active"
                                        : ""
                                }`}
                                onClick={() => setTipo("entrada")}
                                type="button"
                            >

                                <FaArrowUp aria-hidden="true" />

                                <div>

                                    <span className="type-btn__label">

                                        Entrada

                                    </span>

                                    <span className="type-btn__sub">

                                        Recebimento

                                    </span>

                                </div>

                            </button>

                            <button
                                className={`type-btn ${
                                    tipo === "saida"
                                        ? "type-btn--saida-active"
                                        : ""
                                }`}
                                onClick={() => setTipo("saida")}
                                type="button"
                            >

                                <FaArrowDown aria-hidden="true" />

                                <div>

                                    <span className="type-btn__label">

                                        Saída

                                    </span>

                                    <span className="type-btn__sub">

                                        Expedição

                                    </span>

                                </div>

                            </button>

                        </div>

                    </div>

                    <div className="form-field">

                        <label className="form-label" htmlFor="quantidade">

                            Quantidade

                        </label>

                        <input
                            id="quantidade"
                            className="qty-input"
                            type="number"
                            min="1"
                            placeholder="0"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />

                        <small className="form-hint">

                            Informe o número de unidades.

                        </small>

                    </div>

                </div>

                <footer className="modal-footer">

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={fecharModal}
                    >

                        Cancelar

                    </button>

                    <button
                        className="btn-primary"
                        disabled={!formularioValido}
                        onClick={handleSubmit}
                    >

                        Confirmar Registro

                    </button>

                </footer>

            </div>

        </div>

    );

}