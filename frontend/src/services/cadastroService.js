import { api } from "./api";

export async function cadastrarUsuario(dados) {
    const response = await api.post("/usuarios", dados);
    return response.data;
}