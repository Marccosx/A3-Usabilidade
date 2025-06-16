import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin, userName, handleLogout, idGrupo }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();

  const [menu, setMenu] = useState("home");

  // Verifica se o usuário está logado e tem permissão
  const podeVerRestaurantes = userName && idGrupo !== "3";

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          <svg className="navbar-menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Início</span>
        </Link>
        {podeVerRestaurantes && (
          <Link
            to="/restaurantes"
            onClick={() => setMenu("restaurantes")}
            className={menu === "restaurantes" ? "active" : ""}
          >
            <svg className="navbar-menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Restaurantes</span>
          </Link>
        )}
        <Link
          to="/pedidos"
          onClick={() => setMenu("pedidos")}
          className={menu === "pedidos" ? "active" : ""}
        >
          <svg className="navbar-menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Pedidos</span>
        </Link>
        
        <Link to="/cart"
         onClick={() => setMenu("cart-link")} 
         className={menu === "cart-link" ? "active" : ""}>
          <div className="navbar-basket-icon">
            <svg className="navbar-menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 20a1 1 0 100-2 1 1 0 000 2zM20 20a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className={totalQuantity === 0 ? "dotHidden" : "dot"}>
              <p>{totalQuantity}</p>
            </div>
            <span style={{marginLeft: '10px'}}>Carrinho</span> 
          </div>
        </Link>
      </ul>
      <div className="navbar-right">
        {userName ? (
          <>
            <span>Olá, {userName}!</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Entrar</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
