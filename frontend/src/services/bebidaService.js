import { api } from "./api";

export async function listarBebidas(filtros = {}) {
  const response = await api.get("/bebidas", {
    params: {
      busca: filtros.busca || undefined,
      categoria: filtros.categoria || undefined,
      ordenar: filtros.ordenar || undefined,
    },
  });

  return response.data.bebidas || [];
}

export async function cadastrarBebida(dados) {
  const response = await api.post("/bebidas", dados);
  return response.data;
}

export async function editarBebida(id, dados) {
  const response = await api.put(`/bebidas/${id}`, dados);
  return response.data;
}

export async function excluirBebida(id) {
  const response = await api.delete(`/bebidas/${id}`);
  return response.data;
}