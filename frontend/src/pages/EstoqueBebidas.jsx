import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import canecaBeer2 from "../assets/canecaBeer2.png";
import {
  FaBoxOpen,
  FaChartBar,
  FaExchangeAlt,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { listarBebidas } from "../services/bebidaService";
import "../styles/estoqueBebidas.css";

export default function EstoqueBebidas() {
  const navigate = useNavigate();

  const [bebidas, setBebidas] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ordenar, setOrdenar] = useState("id");
  const [carregando, setCarregando] = useState(false);

  const carregarBebidas = useCallback(async () => {
    try {
      setCarregando(true);

      const dados = await listarBebidas({
        busca,
        categoria,
        ordenar,
      });

      setBebidas(dados || []);
    } catch (error) {
      console.error("Erro completo:", error);
      console.log("Resposta:", error.response);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Erro ao carregar bebidas."
      );
    } finally {
      setCarregando(false);
    }
  }, [busca, categoria, ordenar]);

  useEffect(() => {
    const timer = setTimeout(() => {
      carregarBebidas();
    }, 0);

    return () => clearTimeout(timer);
  }, [carregarBebidas]);

  function buscarSubmit(e) {
    e.preventDefault();
    carregarBebidas();
  }

  function formatarPreco(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function gerarClasseCategoria(categoria) {
    return categoria
      ? categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      : "";
  }

  return (
    <div className="stock-layout">
      <aside className="sidebar">
          <div className="brand">
            <img src={canecaBeer2} alt="StockBeer" className="logo-sidebar" />
            <div className="brand-text">
              <h2>Stock<span>Beer</span></h2>
              <p>Gestão de Bebidas</p>
            </div>
          </div>

        <nav>
          <a>
            <FaChartBar /> Dashboard
          </a>
          <a className="active">
            <FaBoxOpen /> Estoque
          </a>
          <a>
            <FaExchangeAlt /> Entradas/Saídas
          </a>
        </nav>

        <div className="admin-box">
          <div className="avatar">A</div>
          <div>
            <strong>Admin</strong>
            <p>admin@stockbeer.com</p>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="page-header">
          <div>
            <h1>Bebidas Cadastradas</h1>
            <p>{bebidas.length} produtos no catálogo</p>
          </div>

          <button
            type="button"
            className="btn-nova-bebida"
            onClick={() => navigate("/cadastro-bebidas")}
          >
            <FaPlus />
            Nova Bebida
          </button>
        </header>

        <section className="filters">
          <form className="search-box" onSubmit={buscarSubmit}>
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar produto, categoria ou marca..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </form>

          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Categoria</option>
            <option value="Cerveja">Cerveja</option>
            <option value="Destilados">Destilados</option>
            <option value="Energético">Energético</option>
            <option value="Refrigerante">Refrigerante</option>
            <option value="Água">Água</option>
          </select>

          <select value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
            <option value="id">Ordenar</option>
            <option value="nome">Nome</option>
            <option value="categoria">Categoria</option>
            <option value="marca">Marca</option>
            <option value="preco">Preço</option>
            <option value="quantidade">Quantidade</option>
          </select>
        </section>

        <section className="table-card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Bebida</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Preço</th>
                <th>Qtd. Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="7" className="empty">
                    Carregando...
                  </td>
                </tr>
              ) : bebidas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty">
                    Nenhuma bebida encontrada.
                  </td>
                </tr>
              ) : (
                bebidas.map((bebida) => (
                  <tr key={bebida.id}>
                    <td>
                      <span className="sku">
                        {bebida.sku || `SKU-${String(bebida.id).padStart(3, "0")}`}
                      </span>
                    </td>

                    <td className="name">{bebida.nome}</td>

                    <td>
                      <span className={`category ${gerarClasseCategoria(bebida.categoria)}`}>
                        {bebida.categoria || "Sem categoria"}
                      </span>
                    </td>

                    <td>{bebida.marca || "-"}</td>

                    <td className="price">{formatarPreco(bebida.preco)}</td>

                    <td>
                      <span
                        className={
                          Number(bebida.quantidade_estoque || 0) <=
                          Number(bebida.estoque_minimo || 0)
                            ? "qty low"
                            : "qty"
                        }
                      >
                        {bebida.quantidade_estoque || 0} un.
                      </span>
                    </td>

                    <td>
                      <div className="actions">
                        <button type="button" title="Editar">
                          <FaEdit />
                        </button>
                        <button type="button" title="Excluir">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <footer>Exibindo {bebidas.length} produtos</footer>
        </section>
      </main>
    </div>
  );
}