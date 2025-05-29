import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  return (
    <div className="login-popup">
      {/* Ícone de fechar */}
      <img
        src={assets.cross_icon}
        alt="Fechar"
        className="login-popup-close"
        onClick={() => setShowLogin(false)}
      />

      <form className="login-popup-container">
        {/* Título e mensagem */}
        <div className="login-popup-header">
          <h1>Bem-vindo</h1>
          <p>Faça seu login </p>
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
            <input type="text" placeholder="Seu nome" required />
          )}
          <input type="email" placeholder="Seu e-mail" required />
          <input type="password" placeholder="Senha" required />
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
