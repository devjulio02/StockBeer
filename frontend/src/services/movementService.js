import { api } from "./api";

export async function registrarEntrada(bebidaId, quantidade) {

    const response = await api.post("/estoque/entrada", {
        bebida_id: bebidaId,
        quantidade: Number(quantidade),
        usuario_id: 1
    });

    return response.data;
}

export async function registrarSaida(bebidaId, quantidade) {

    const response = await api.post("/estoque/saida", {
        bebida_id: bebidaId,
        quantidade: Number(quantidade),
        usuario_id: 1
    });

    return response.data;
}