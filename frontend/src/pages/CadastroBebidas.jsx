import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft, FaPlus } from "react-icons/fa";
import { cadastrarBebida } from "../services/bebidaService";
import "../styles/cadastroBebidas.css";
import Sidebar from "../components/Sidebar";
import canecaBeer2 from "../assets/canecaBeer2.png";

export default function CadastroBebidas() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    marca: "",
    categoria: "",
    preco: "",
    quantidade_estoque: "",
    estoque_minimo: "10",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await cadastrarBebida({
        nome: form.nome,
        marca: form.marca,
        categoria: form.categoria,
        preco: Number(form.preco),
        quantidade_estoque: Number(form.quantidade_estoque),
        estoque_minimo: Number(form.estoque_minimo),
      });

      alert("Bebida cadastrada com sucesso!");
      navigate("/estoque");
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao cadastrar bebida.");
    }
  }

  return (
    <div className="stock-layout">
      
      <Sidebar />

      <main className="content cadastro-content">
        <header className="page-header cadastro-header">
          <div>
            <h1>Cadastrar Bebida</h1>
            <p>Adicione uma nova bebida ao catálogo do StockBeer</p>
          </div>

          <button className="back-button" onClick={() => navigate("/estoque")}>
            <FaArrowLeft /> Estoque
          </button>
        </header>

        <section className="cadastro-wrapper">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-title">
              <img src={canecaBeer2} alt="StockBeer" className="form-logo" />

              <div>
                <h2>Dados da Bebida</h2>
                <p>Preencha as informações do produto</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full">
                <label>Nome da bebida</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex: Skol Lata 350ml"
                  required
                />
              </div>

              <div className="form-group">
                <label>Marca</label>
                <input
                  name="marca"
                  value={form.marca}
                  onChange={handleChange}
                  placeholder="Ex: Skol"
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select
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
              </div>

              <div className="form-group">
                <label>Preço</label>
                <input
                  name="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.preco}
                  onChange={handleChange}
                  placeholder="Ex: 5.50"
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantidade em estoque</label>
                <input
                  name="quantidade_estoque"
                  type="number"
                  min="0"
                  value={form.quantidade_estoque}
                  onChange={handleChange}
                  placeholder="Ex: 20"
                  required
                />
              </div>

              <div className="form-group">
                <label>Estoque mínimo</label>
                <input
                  name="estoque_minimo"
                  type="number"
                  min="0"
                  value={form.estoque_minimo}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/estoque")}
              >
                Cancelar
              </button>

              <button type="submit" className="save-button">
                <FaSave /> Cadastrar Bebida
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}