import "../styles/movementModal.css";
import { useEffect, useRef, useState } from "react";
import useFocusTrap from "../hooks/useFocusTrap";
import useLiveAnnouncement from "../hooks/useLiveAnnouncement";
import LiveAnnouncement from "./LiveAnnouncement";

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

    const modalRef = useFocusTrap(
        aberto,
        fecharModal
    );

    const {

        mensagem,

        anunciar

    } = useLiveAnnouncement();

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

    if (!aberto) return null;

    return (

        <div className="modal-backdrop">

            <div 
                ref={modalRef}
                className="modal-card"
                id="movement-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="movement-modal-title"
                aria-describedby="movement-modal-description"
                tabIndex={-1}
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

                            <h2 aria-label="Modal para registro de movimentações das bebidas em estoque" id="movement-modal-title" className="modal-header__title">

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

                <div aria-label="Caixa para seleção de bebidas em estoque" className="modal-body">

                    <div className="form-field">

                        <label className="form-label" htmlFor="produto">

                            Selecionar Produto

                        </label>

                        <select id="produto" className="dropdown-trigger" value={produtoSelecionado} 
                            onChange={(e) => {

                                const id = e.target.value;

                                setProdutoSelecionado(id);

                                const produto = produtos.find(

                                    produto => produto.id === Number(id)

                                );
                            }}
                            onBlur={() => {

                                const produto = produtos.find(
                                    p => p.id === Number(produtoSelecionado)
                                );

                                if (produto) {

                                    anunciar(
                                        `Produto ${produto.nome} selecionado.`
                                    );

                                }

                            }}>

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

                    <div aria-label="Área para escolha do tipo de movimentação" className="form-field">

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
                                onClick={() => {

                                    setTipo("entrada");

                                    anunciar(

                                        "Tipo de movimentação escolhido: Entrada."

                                    );

                                }}
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
                                onClick={() => {

                                    setTipo("saida");

                                    anunciar(

                                        "Tipo de movimentação escolhido: Saída."

                                    );

                                }}
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

                    <div aria-label="Campo de escolha da quantidade a ser movimentada" className="form-field">

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
                            onKeyDown={(e) => {

                                if (e.key === "Enter" && quantidade) {

                                    anunciar(
                                        `Quantidade informada: ${quantidade} unidades.`
                                    );

                                }

                            }}
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

            <LiveAnnouncement

                mensagem={mensagem}

            />
        </div>

    );

}