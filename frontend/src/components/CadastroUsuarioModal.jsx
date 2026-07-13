import { useState } from "react";
import { cadastrarUsuario } from "../services/cadastroService";
import "../styles/CadastroUsuarioModal.css";
import Input from "./Input";

export default function CadastroUsuarioModal({
    aberto,
    onClose
}) {

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const [carregando, setCarregando] = useState(false);

    if (!aberto) return null;

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function fecharModal() {

        setForm({
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: ""
        });

        onClose();

    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (form.senha !== form.confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        if (
            !form.nome.trim() ||
            !form.email.trim() ||
            !form.senha.trim()
        ) {
            alert("Preencha todos os campos.");
            return;
        }

        if (form.senha.length < 6) {
            alert("A senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        try {

            setCarregando(true);

            await cadastrarUsuario({
                nome: form.nome.trim(),
                email: form.email.trim(),
                senha: form.senha
            });

            alert("Usuário cadastrado com sucesso!");

            setForm({
                nome: "",
                email: "",
                senha: "",
                confirmarSenha: ""
            });

            fecharModal();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao cadastrar usuário."
            );

        } finally {

            setCarregando(false);

        }
    }

    return (

        <div
            className="modal-overlay"
            onClick={fecharModal}
        >

            <div
                className="cadastro-usuario-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <h2>Cadastrar Usuário</h2>

                <form onSubmit={handleSubmit}>

                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Nome completo"
                        value={form.nome}
                        onChange={(e) =>
                            handleChange({
                                target: {
                                    name: "nome",
                                    value: e.target.value
                                }
                            })
                        }
                    />

                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="E-mail"
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

                   <Input
                        label="Senha"
                        type="password"
                        placeholder="Senha"
                        value={form.senha}
                        onChange={(e) =>
                            handleChange({
                                target: {
                                    name: "senha",
                                    value: e.target.value
                                }
                            })
                        }
                    />

                  <Input
                        label="Confirmar senha"
                        type="password"
                        placeholder="Confirme a senha"
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
                                ? "Cadastrando..."
                                : "Cadastrar"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}