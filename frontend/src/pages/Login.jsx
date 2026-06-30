import { useState } from "react";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { api } from "../services/api";

import "../styles/login.css";


export default function Login() {
    const [email, setEmail] =useState("");
    const [senha, setSenha] =useState("");
    const [erro, setErro] =useState("");
    const [sucesso, setSucesso] =useState("");

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
            setSucesso(response.data.message);
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
                <a href="#" className="forgot-password">
                    Esqueceu a senha?
                </a>
            </div>
            

            <Button text="Entrar no Sistema" />

            <p className="copyright">
                © 2026 StockBeer — Todos os direitos reservados
            </p>

        </form>

      </div>

    </div>
  );
}