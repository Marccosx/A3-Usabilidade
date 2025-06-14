import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin, setUserName }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      currentState === "Sign up"
        ? "http://localhost:3000/usuarios/cadastro"
        : "http://localhost:3000/usuarios/login";
    const payload =
      currentState === "Sign up"
        ? { nome: form.name, email: form.email, senha: form.password, id_grupo: "3" }
        : { email: form.email, senha: form.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        const nome = data.usuario?.nome || data.usuario?.name || data.nome || data.name || "Usuário";
        const idGrupo = data.usuario?.id_grupo || data.id_grupo || 3;
        const id = data.usuario?.id || data.id;
        setUserName(nome);
        localStorage.setItem("userName", nome);
        localStorage.setItem("idGrupo", idGrupo);
        localStorage.setItem("id", id);
        alert("Sucesso!");
        setShowLogin(false);
      } else {
        alert(data.message || "Erro ao autenticar");
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className="login-popup">
      {/* Ícone de fechar */}
      <img
        src={assets.cross_icon}
        alt="Fechar"
        className="login-popup-close"
        onClick={() => setShowLogin(false)}
      />

      <form className="login-popup-container" onSubmit={handleSubmit}>
        {/* Título e mensagem */}
        <div className="login-popup-header">
          <h1>Bem-vindo</h1>
          <p>Faça seu login</p>
          {currentState === "Login" ? (
            <span>
              Ainda não tem uma conta?
              <a onClick={() => setCurrentState("Sign up")}> Cadastre-se</a>
            </span>
          ) : (
            <span>
              Já tem uma conta?
              <a onClick={() => setCurrentState("Login")}> Faça login</a>
            </span>
          )}
        </div>

        {/* Campos de entrada */}
        <div className="login-popup-inputs">
          {currentState === "Sign up" && (
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Sua senha"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botão */}
        <button type="submit">
          {currentState === "Sign up" ? "Criar conta" : "Entrar"}
        </button>

        {/* Condição de termos */}
        {currentState === "Sign up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>
              Ao continuar, concordo com os termos de uso e a política de privacidade.
            </p>
          </div>
        )}
      </form>
      
    </div>
  );
};

export default LoginPopup;
