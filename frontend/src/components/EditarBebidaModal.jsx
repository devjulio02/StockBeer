import { useEffect, useState } from "react";
import "../styles/EditarBebidaModal.css";
import useFocusTrap from "../hooks/useFocusTrap";

export default function EditarBebidaModal({
    aberto,
    bebida,
    onClose,
    onSalvar
}) {

    const [form, setForm] = useState({
        nome: "",
        marca: "",
        categoria: "",
        preco: "",
        quantidade_estoque: "",
        estoque_minimo: ""
    });

    const modalRef = useFocusTrap(
        aberto,
        onClose
    );

    useEffect(() => {
        if (bebida) {
            setForm({
                nome: bebida.nome || "",
                marca: bebida.marca || "",
                categoria: bebida.categoria || "",
                preco: bebida.preco || "",
                quantidade_estoque: bebida.quantidade_estoque || "",
                estoque_minimo: bebida.estoque_minimo || ""
            });
        }
    }, [bebida]);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSalvar({
            ...form,
            preco: Number(form.preco),
            quantidade_estoque: Number(form.quantidade_estoque),
            estoque_minimo: Number(form.estoque_minimo)
        });
    }

    if (!aberto) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>

            <div 
                ref={modalRef}
                className="editar-bebida-modal"
                id="editar-bebida-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="editar-bebida-modal-title"
                aria-describedby="editar-bebida-modal-description"
                tabIndex={-1} 
                onClick={(e) => e.stopPropagation()}
            >

                <h2 id="editar-bebida-modal-title">
                    Editar Bebida
                </h2>

                <p
                    id="editar-bebida-modal-description"
                    className="sr-only"
                >
                    Formulário para edição dos dados da bebida selecionada.
                    Ouça a descrição automática ou utilize a tecla Tab ou Shift+Tab para navegar entre os campos.
                </p>

                <form onSubmit={handleSubmit}>

                     <label className="form-label" htmlFor="nome">

                        Nome da Bebida

                    </label>

                    <input
                        id="nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                        required
                    />

                     <label className="form-label" htmlFor="marca">

                        Marca

                    </label>

                    <input
                        id="marca"
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        placeholder="Marca"
                        required
                    />

                     <label className="form-label" htmlFor="categoria">

                        Categoria

                    </label>

                    <select
                        id="categoria"
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="Cerveja">Cerveja</option>
                        <option value="Destilados">Destilados</option>
                        <option value="Energético">Energético</option>
                        <option value="Refrigerante">Refrigerante</option>
                        <option value="Água">Água</option>
                    </select>

                     <label className="form-label" htmlFor="preco">

                        Preço

                    </label>

                    <input
                        id="preco"
                        type="number"
                        min="0"
                        step="0.01"
                        name="preco"
                        value={form.preco}
                        onChange={handleChange}
                        required
                    />

                     <label className="form-label" htmlFor="quantidade">

                        Quantidade em estoque

                    </label>

                    <input
                        id="quantidade"
                        type="number"
                        min="0"
                        name="quantidade_estoque"
                        value={form.quantidade_estoque}
                        onChange={handleChange}
                        required
                    />

                     <label className="form-label" htmlFor="estoque">

                        Estoque mínimo

                    </label>

                    <input
                        id="estoque"
                        type="number"
                        min="0"
                        name="estoque_minimo"
                        value={form.estoque_minimo}
                        onChange={handleChange}
                        required
                    />
                    <div className="modal-actions">

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button type="submit">
                            Salvar Alterações
                        </button>

                    </div>
                </form>

            </div>

        </div>
    );
}

