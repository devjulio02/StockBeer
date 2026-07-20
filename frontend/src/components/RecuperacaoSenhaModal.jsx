import { useEffect, useState } from "react";

import Input from "./Input";

import "../styles/RecuperacaoSenhaModal.css";

import { solicitarRecuperacao, redefinirSenha } from "../services/recuperacaoService"

export default function RecuperacaoSenhaModal({
    aberto,
    onClose
}) {

    const [modo, setModo] = useState("solicitar");

    const [form, setForm] = useState({
        email: "",
        novaSenha: "",
        confirmarSenha: ""
    });

    const [token, setToken] = useState("");

    const [erro, setErro] = useState("");

    const [sucesso, setSucesso] = useState("");

    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setErro("");
        setSucesso("");

        if (modo === "solicitar") {
            
            if (!form.email.trim()) {
                setErro("Informe seu e-mail.");
                return;
            }

            try {

                setCarregando(true);

                const resposta = await solicitarRecuperacao(
                    form.email.trim()
                );

                setToken(
                    resposta.recuperacao.token
                );

                setSucesso(
                    resposta.message
                );

                setModo("redefinir");
                

            } catch (error) {

                setErro(
                    error.response?.data?.message ||
                    "Erro ao solicitar recuperação."
                );

            } finally {

                setCarregando(false);

            }
        } else {

            if (!form.novaSenha.trim()) {
                setErro("Informe a nova senha.");
                return;
            }

            if (!form.confirmarSenha.trim()) {
                setErro("Confirme a nova senha.");
                return;
            }

            if (form.novaSenha !== form.confirmarSenha) {
                setErro("As senhas não coincidem.");
                return;
            }

            try {

                setCarregando(true);

                const resposta = await redefinirSenha(
                    token,
                    form.novaSenha.trim()
                );

                fecharModal();

                alert(resposta.message);  

            } catch (error) {

                setErro(
                    error.response?.data?.message ||
                    "Erro ao redefinir senha."
                );

            } finally {

                setCarregando(false);

            }
        }

    }    

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    function fecharModal() {

        setModo("solicitar");

        setForm({
            email: "",
            novaSenha: "",
            confirmarSenha: ""
        });

        setToken("");

        setErro("");

        setSucesso("");

        onClose();

    }

    useEffect(() => {

        if (!aberto) return;

        function handleEscape(event) {

            if (event.key === "Escape") {

                fecharModal();

            }

        }

        window.addEventListener("keydown", handleEscape);

        return () => {

            window.removeEventListener("keydown", handleEscape);

        };

    }, [aberto]);

    if (!aberto) return null;

    return (

        <div
            className="modal-overlay"
            onClick={fecharModal}
        >

            <div
                className="recuperacao-senha-modal"
                id="recuperacao-senha-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="recuperacao-senha-modal-title"
                onClick={(e) => e.stopPropagation()}
            >

                <h2 id="recuperacao-senha-modal-title">
                    Recuperação de Senha
                </h2>

                <form onSubmit={handleSubmit}>
                    {modo === "solicitar" ? (
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={form.email}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "email",
                                        value: e.target.value
                                    }
                                })
                            }
                        />

                    ) : (

                        <>

                            <p 
                                className="mensagem-sucesso"
                                aria-live="polite"
                            >
                                Solicitação criada com sucesso.
                                Agora informe sua nova senha.
                            </p>

                            <Input
                                label="Nova senha"
                                type="password"
                                placeholder="Digite a nova senha"
                                value={form.novaSenha}
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: "novaSenha",
                                            value: e.target.value
                                        }
                                    })
                                }
                            />

                            <Input
                                label="Confirmar nova senha"
                                type="password"
                                placeholder="Confirme a nova senha"
                                value={form.confirmarSenha}
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: "confirmarSenha",
                                            value: e.target.value
                                        }
                                    })
                                }
                            />

                        </>
                    )}

                    {erro && (
                        <p 
                            className="mensagem-erro"
                            role="alert"
                        >
                            {erro}
                        </p>
                    )}

                    {modo === "solicitar" && sucesso && (
                        <p 
                            className="mensagem-sucesso"
                            aria-live="polite"    
                        >
                            {sucesso}
                        </p>
                    )}

                    <div className="modal-actions">

                        <button
                            type="button"
                            onClick={fecharModal}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={carregando}
                        >   
                            {carregando
                                ? "Enviando..."
                                : modo === "solicitar"
                                    ? "Solicitar recuperação"
                                    : "Redefinir senha"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}