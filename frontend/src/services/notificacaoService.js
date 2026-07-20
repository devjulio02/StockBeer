import { api } from "./api";

export async function listarNotificacoes() {

    const response = await api.get("/notificacoes");

    return response.data;

}

export async function resolverNotificacao(id) {

    const response = await api.put(
        `/notificacoes/${id}/resolver`
    );

    return response.data;

}