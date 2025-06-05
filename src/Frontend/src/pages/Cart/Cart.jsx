import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

export const deliveryFee = 2;

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title cart-heading">
          <p>Item</p>
          <p>Nome</p>
          <p>Preço</p>
          <p>Quantidade</p>
          <p>Total</p>
          <p>Remover</p>
        </div>
        <br />
        <hr />
        {totalQuantity === 0 ? (
          <p className="NoItems">Carrinho vazio</p>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <React.Fragment key={item._id}>
                  <div
                    className="cart-items-title cart-items-item"
                    key={item._id}
                  >
                    <img src={item.image} alt="Imagem do produto" />
                    <p>{item.name}</p>
                    <p>R$ {item.price.toFixed(2)}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>R$ {(item.price * cartItems[item._id]).toFixed(2)}</p>
                    <p
                      className="Remove"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <img
                        src={assets.remove_icon_cross}
                        alt="Remover item"
                      />
                    </p>
                  </div>
                  <hr key={`hr-${item._id}-${index}`} />
                </React.Fragment>
              );
            }
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Resumo do Pedido</h2>
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
          <button
            disabled={getTotalCartAmount() === 0}
            onClick={() => navigate("/order")}
          >
            FINALIZAR PEDIDO
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Se você tem um cupom promocional, insira aqui</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Código promocional" />
              <button>Aplicar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
