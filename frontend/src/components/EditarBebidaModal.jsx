import { useEffect, useState } from "react";
import "../styles/EditarBebidaModal.css";

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

            <div className="editar-bebida-modal" onClick={(e) => e.stopPropagation()}>

                <h2>Editar Bebida</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                        required
                    />

                    <input
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        placeholder="Marca"
                        required
                    />

                    <select
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Cerveja">Cerveja</option>
                        <option value="Destilados">Destilados</option>
                        <option value="Energético">Energético</option>
                        <option value="Refrigerante">Refrigerante</option>
                        <option value="Água">Água</option>
                    </select>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="preco"
                        value={form.preco}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        min="0"
                        name="quantidade_estoque"
                        value={form.quantidade_estoque}
                        onChange={handleChange}
                        required
                    />

                    <input
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

