import { api } from "./api";

export async function buscarPainel() {
    const { data } = await api.get("/painel");

    return data.painel;
}