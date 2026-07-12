import { api } from "./api";

export async function listarProdutos() {

    const resposta = await api.get("/bebidas");

    return resposta.data.bebidas;

}

export async function registrarEntrada(bebidaId, quantidade) {

    const resposta = await api.post("/estoque/entrada", {

        bebida_id: bebidaId,
        quantidade: Number(quantidade),
        usuario_id: 1

    });

    return resposta.data;

}

export async function registrarSaida(bebidaId, quantidade) {

    const resposta = await api.post("/estoque/saida", {

        bebida_id: bebidaId,
        quantidade: Number(quantidade),
        usuario_id: 1

    });

    return resposta.data;

}