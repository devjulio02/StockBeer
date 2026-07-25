import { useRef, Fragment, useCallback, useEffect, useState } from "react";
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

  const tituloRef = useRef(null);

  useEffect(() => {
      if (!carregando) {
          tituloRef.current?.focus();
      }
  }, [carregando]);

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

  function descricaoBebida(bebida) {
    const sku =
      bebida.sku || `SKU-${String(bebida.id).padStart(3, "0")}`;

    const estoqueBaixo =
      Number(bebida.quantidade_estoque || 0) <=
      Number(bebida.estoque_minimo || 0);

    return (
      `Bebida ${bebida.nome}. ` +
      `ID (código de identificação) ${sku}. ` +
      `Categoria ${bebida.categoria || "Sem categoria"}. ` +
      `Marca ${bebida.marca || "Não informada"}. ` +
      `Preço ${formatarPreco(bebida.preco)}. ` +
      `Quantidade em estoque ${bebida.quantidade_estoque || 0} unidades. ` +
      `Estoque mínimo ${bebida.estoque_minimo || 0} unidades.` +
      (estoqueBaixo
        ? " Atenção: estoque abaixo do mínimo."
        : " Estoque dentro do nível recomendado.")
    );
  }

  return (
    <>
      <div className="stock-layout" aria-hidden={modalAberto}>

        <Sidebar />

        <main className="content" >
          <header className="page-header">
            <div>
              <h1 ref={tituloRef} tabIndex={-1} aria-label="Tela de estoque de bebidas" >Bebidas Cadastradas</h1>
              <p>{bebidas.length} produtos no catálogo</p>
            </div>

            <button
              type="button"
              className="btn-nova-bebida"
              aria-label="Cadastrar nova bebida no sistema"
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
                aria-label="Campo de digitação para buscar bebidas por nome, categoria ou marca"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </form>

            <select aria-label="Filtrar bebidas por categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Categoria</option>
              <option value="Cerveja">Cerveja</option>
              <option value="Destilados">Destilados</option>
              <option value="Energético">Energético</option>
              <option value="Refrigerante">Refrigerante</option>
              <option value="Água">Água</option>
            </select>

            <select aria-label="Ordenar bebidas por:" value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
              <option value="id">Ordenar</option>
              <option value="nome">Nome</option>
              <option value="categoria">Categoria</option>
              <option value="marca">Marca</option>
              <option value="preco">Preço</option>
              <option value="quantidade">Quantidade</option>
            </select>
          </section>

        <div
              tabIndex={0}
              className="sr-only"
          >
              Lista de bebidas cadastradas.

              Esta tabela contém {bebidas.length} produto
              {bebidas.length !== 1 ? "s" : ""}.

              Após esta descrição, utilize a tecla Tab para navegar entre os botões de editar e excluir de cada bebida.
          </div>

          <section 
            className="table-card" 
          >

            <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Bebida</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Qtd. Estoque</th>
                  <th scope="col">Ações</th>
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
                    <Fragment key={bebida.id}>

                      <tr className="sr-only-row">
                        <td colSpan={7}>
                            <div
                                tabIndex={0}
                                className="sr-only"
                            >
                                {descricaoBebida(bebida)}
                            </div>
                        </td>
                      </tr>
                      <tr>
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
                              aria-label={`Editar ${bebida.nome}`} 
                              onClick={() => {
                                setBebidaSelecionada(bebida);
                                setModalAberto(true);
                              }}>
                              <FaEdit aria-hidden="true" />
                            </button>

                            <button 
                              type="button" 
                              title="Excluir" 
                              aria-label={`Excluir ${bebida.nome}`}
                              onClick={() => handleExcluir(bebida.id)}>
                              <FaTrash aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                    ))
                    )}
              </tbody>
            </table>

            <footer>Exibindo {bebidas.length} produtos</footer>
          </section>
        </main>  
      </div>
      <EditarBebidaModal

        aberto={modalAberto}

        bebida={bebidaSelecionada}

        onClose={() => {

          setModalAberto(false);

          setBebidaSelecionada(null);

        }}

        onSalvar={salvarEdicao}

      />
    </>
      
  );
}