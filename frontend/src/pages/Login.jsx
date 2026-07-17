import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";

import CadastroUsuarioModal from "../components/CadastroUsuarioModal";

import { api } from "../services/api";

import "../styles/login.css";

import RecuperacaoSenhaModal from "../components/RecuperacaoSenhaModal";


export default function Login() {
    const [email, setEmail] =useState("");
    const [senha, setSenha] =useState("");
    const navigate = useNavigate();
    const [erro, setErro] =useState("");
    const [sucesso, setSucesso] =useState("");
    const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [modalRecuperacaoAberto, setModalRecuperacaoAberto] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErro("");
        setSucesso("");

        if (!email || !senha) {
            setErro("Preencha todos os campos!");
            return;
        }
        
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            setErro("Digite um e-mail válido.");
            return;
        }

        try{
            const response = await api.post("/login", {email, senha});
            
            localStorage.setItem(
                "usuario",
                JSON.stringify(response.data.usuario)
            );
            
            setSucesso(response.data.message);
            setTimeout(() => {
                navigate("/estoque");
            }, 1000);
        }catch(error){
            setErro(error.response?.data?.message || "Erro ao realizar login.");
        }
    };
    
  return (
    <div className="login-page">

      <div className="login-card">

        <Logo />

        <form onSubmit={handleSubmit} noValidate>

            <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input
            label="Senha"
            type="password"
            placeholder="********"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            />

            {erro && (
                <p className="mensagem-erro">{erro}</p>
            )}

            {sucesso && (
                <p className="mensagem-sucesso">{sucesso}</p>
            )}

            <div className="forgot-container">
                <button type="button" className="forgot-password" onClick={() => setModalRecuperacaoAberto(true)}>
                    Esqueceu a senha?
                </button>
            </div>
            

            <Button text="Entrar no Sistema" />

            <button
                type="button"
                className="btn-cadastrar"
                onClick={() => setModalCadastroAberto(true)}
            >
                Criar conta
            </button>

            <p className="copyright">
                © 2026 StockBeer — Todos os direitos reservados
            </p>

        </form>

      </div>

      <CadastroUsuarioModal

            aberto={modalCadastroAberto}

            onClose={() => setModalCadastroAberto(false)}

        />

        <RecuperacaoSenhaModal

            aberto={modalRecuperacaoAberto}
            
            onClose={() => setModalRecuperacaoAberto(false)}
        />
    </div>
  );
}