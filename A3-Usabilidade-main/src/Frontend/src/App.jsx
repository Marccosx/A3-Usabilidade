import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Restaurantes from "./pages/Restaurantes";
import RestauranteDetalhe from "./pages/RestauranteDetalhe/RestauranteDetalhe";
import GerenciarProdutos from "./pages/GerenciarProdutos/GerenciarProdutos";
import Pedidos from "./pages/Pedidos/Pedidos";
import PedidoDetalhe from "./pages/PedidoDetalhe/PedidoDetalhe";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/restaurantes" element={<Restaurantes />} />
          <Route path="/restaurante/:id" element={<RestauranteDetalhe />} />
          <Route path="/restaurante/:id/produtos" element={<GerenciarProdutos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedido/:id" element={<PedidoDetalhe />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;