import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();

  const [menu, setMenu] = useState("home");

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
          Início
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Cardápio
        </a>
        <Link
          to="/restaurantes"
          onClick={() => setMenu("restaurantes")}
          className={menu === "restaurantes" ? "active" : ""}
        >
          Restaurantes
        </Link>
        <Link
          to="/pedidos"
          onClick={() => setMenu("pedidos")}
          className={menu === "pedidos" ? "active" : ""}
        >
          Pedidos
        </Link>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contato
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Buscar" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Carrinho" />
          </Link>
          <div className={totalQuantity === 0 ? "dotHidden" : "dot"}>
            <p>{totalQuantity}</p>
          </div>
        </div>
        <button onClick={() => setShowLogin(true)}>Entrar</button>
      </div>
    </div>
  );
};

export default Navbar;
