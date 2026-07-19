import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { listarBebidas, editarBebida, excluirBebida } from "../services/bebidaService";
import "../styles/estoqueBebidas.css";
import EditarBebidaModal from "../components/EditarBebidaModal";
import Sidebar from "../components/Sidebar";

export default function EstoqueBebidas() {
  const navigate = useNavigate();

  const [bebidas, setBebidas] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ordenar, setOrdenar] = useState("id");
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [bebidaSelecionada, setBebidaSelecionada] = useState(null);

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

  async function salvarEdicao(dados) {
    try {

        await editarBebida(
            bebidaSelecionada.id,
            dados
        );

        await carregarBebidas();

        setModalAberto(false);

        setBebidaSelecionada(null);

        alert("Bebida atualizada com sucesso!");

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Erro ao atualizar bebida."
        );

    }
  }

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

  async function handleExcluir(id) {

    const confirmar = window.confirm(
        "Deseja realmente excluir esta bebida?"
    );

    if (!confirmar) return;

    try {

        await excluirBebida(id);

        alert("Bebida excluída com sucesso!");

        carregarBebidas();

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Erro ao excluir bebida."
        );

    }

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

      <Sidebar />

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
            <FaPlus aria-hidden="true" />
            Nova Bebida
          </button>
        </header>

        <section className="filters">
          <form className="search-box" onSubmit={buscarSubmit}>
            <FaSearch aria-hidden="true"/>
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
                  <td colSpan="7" className="empty" role="status" aria-live="polite">
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
                        <button 
                          type="button" 
                          title="Editar"
                          aria-label="Editar bebida" 
                          onClick={() => {
                            setBebidaSelecionada(bebida);
                            setModalAberto(true);
                          }}>
                          <FaEdit aria-hidden="true" />
                        </button>

                        <button 
                          type="button" 
                          title="Excluir" 
                          aria-label="Excluir bebida"
                          onClick={() => handleExcluir(bebida.id)}>
                          <FaTrash aria-hidden="true" />
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
        <EditarBebidaModal

          aberto={modalAberto}

          bebida={bebidaSelecionada}

          onClose={() => {

              setModalAberto(false);

              setBebidaSelecionada(null);

          }}

          onSalvar={salvarEdicao}

        />
      </main>
    </div>
  );
}