import { api } from "./api";

export async function solicitarRecuperacao(email) {

    const response = await api.post("/recuperacao", {
        email
    });

    return response.data;

}

export async function redefinirSenha(token, novaSenha) {

    const response = await api.post(
        "/recuperacao/redefinir",
        {
            token,
            nova_senha: novaSenha
        }
    );

    return response.data;

}