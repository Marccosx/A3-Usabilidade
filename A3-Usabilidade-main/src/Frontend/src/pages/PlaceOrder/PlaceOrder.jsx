import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { deliveryFee } from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      <button className="GoBack" onClick={() => navigate("/cart")}>
        ⬅️ Voltar ao Carrinho
      </button>

      <form className="place-order">
        <div className="place-order-left">
          <h2 className="title">Informações de Entrega</h2>
          <div className="multi-fields">
            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="Sobrenome" />
          </div>
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="Endereço" />
          <div className="multi-fields">
            <input type="text" placeholder="Cidade" />
            <input type="text" placeholder="Estado" />
          </div>
          <div className="multi-fields">
            <input type="number" placeholder="CEP" />
            <input type="text" placeholder="País" />
          </div>
          <input type="number" placeholder="Telefone" />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Resumo do Pedido</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>R$ {getTotalCartAmount().toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Taxa de Entrega</p>
                <p>R$ {getTotalCartAmount() === 0 ? "0,00" : deliveryFee.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  R$ {
                    getTotalCartAmount() === 0
                      ? "0,00"
                      : (getTotalCartAmount() + deliveryFee).toFixed(2)
                  }
                </b>
              </div>
            </div>
            <button disabled={getTotalCartAmount() === 0}>
              PROSSEGUIR PARA PAGAMENTO
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
