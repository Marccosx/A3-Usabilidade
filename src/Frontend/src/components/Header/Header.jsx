import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <header>
      <div className="header-contents">
        <img src={assets.logo} alt="logo" style={{width: "150px"}}/>
        <h2>Com fome?</h2>
        <h3>A gente resolve para você!</h3>
       
        <a href="#explore-menu">
          <button>Escolha agora!</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
