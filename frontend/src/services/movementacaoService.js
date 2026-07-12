import axios from "axios";

const API = "http://localhost:5000";

export async function listarProdutos() {

    const resposta = await axios.get(`${API}/bebidas`);

    return resposta.data.bebidas;

}

export async function registrarMovimentacao(dados) {

    const resposta = await axios.post(`${API}/movimentacoes`, dados);

    return resposta.data;

}