import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-contents">
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
