import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Somos apaixonados por entregar felicidade através de pratos deliciosos.
            Nossa missão é proporcionar a melhor experiência gastronômica,
            conectando você aos melhores restaurantes da cidade.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>EMPRESA</h2>
          <ul>
            <li onClick={() => navigate("/")}>Início</li>
            <li>Sobre Nós</li>
            <li>Entregas</li>
            <li>Política de Privacidade</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTATO</h2>
          <ul>
            <li>+55 11 99999-9999</li>
            <li>contato@pedeja.com.br</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © pedeja.com.br</p>
    </footer>
  );
};

export default Footer;
