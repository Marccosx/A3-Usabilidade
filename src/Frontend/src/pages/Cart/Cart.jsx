import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import axios from "axios";

const Cart = ({ setShowLogin }) => {
  const {
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  } = useContext(StoreContext);


  
  const [products, setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();
  const [orderValues, setOrderValues] = useState({
    subtotal: 0,
    taxaEntrega: 0,
    total: 0
  });



  const calculateOrderValues = () => {
    const subtotal = calculateSubtotal();
   const taxaEntrega = restaurant?.taxaFrete || 0;
    const total = calculateTotal();
    setOrderValues({
      subtotal,
      taxaEntrega,
      total
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/produtos/");
        setProducts(response.data);
        
        const firstProductId = Object.keys(cartItems)[0];
        if (firstProductId) {
          const firstProduct = response.data.find(p => p.id === parseInt(firstProductId));
          if (firstProduct) {
            try {
              const restaurantResponse = await axios.get(`http://localhost:3000/restaurantes/${firstProduct.id_restaurante}`);
              setRestaurant(restaurantResponse.data);
              setError(null);
            } catch (error) {
              console.error("Erro ao buscar restaurante:", error);
              setError("Não foi possível carregar as informações do restaurante");
              setRestaurant(null);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
        setError("Não foi possível carregar os produtos");
      }
    };
    fetchProducts();
  }, [cartItems]);

  const calculateSubtotal = () => {
    return products.reduce((total, item) => {
      if (cartItems[item.id] > 0) {
        return total + (item.preco * cartItems[item.id]);
      }
      return total;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = restaurant?.taxaFrete || 0;
    return subtotal + deliveryFee;
  };

  return (
    <div className="cart">
      {error && <div className="error-message">{error}</div>}
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
          products.map((item) => {
            if (cartItems[item.id] > 0) {
              return (
                <React.Fragment key={item.id}>
                  <div
                    className="cart-items-title cart-items-item"
                    key={item.id}
                  >
                    <img 
                      src={item.foto_produto} 
                      alt="Imagem do produto"
                      onError={(e) => {
                        e.target.src = assets.default_food;
                      }}
                    />
                    <p>{item.nome}</p>
                    <p>R$ {item.preco.toFixed(2)}</p>
                    <p>{cartItems[item.id]}</p>
                    <p>R$ {(item.preco * cartItems[item.id]).toFixed(2)}</p>
                    <p
                      className="Remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <img
                        src={assets.remove_icon_cross}
                        alt="Remover item"
                      />
                    </p>
                  </div>
                  <hr key={`hr-${item.id}`} />
                </React.Fragment>
              );
            }
            return null;
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Resumo do Pedido</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R$ {calculateSubtotal().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Taxa de Entrega</p>
              <p>R$ {totalQuantity === 0 ? "0,00" : (restaurant?.taxaFrete || 0).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R$ {calculateTotal().toFixed(2)}</b>
            </div>
          </div>
          <button
            disabled={totalQuantity === 0 || !restaurant}
            onClick={() => {
              const userName = localStorage.getItem("userName");
              const idGrupo = localStorage.getItem("idGrupo");
              if (userName && idGrupo ) {
                navigate("/order", {
                  state: {
                    orderValues: {
                      subtotal: calculateSubtotal(),
                      taxaFrete: restaurant?.taxaFrete || 0,
                      total: calculateTotal()
                    }
                  }
                });
              } else {
                alert("Você precisa estar logado como cliente para finalizar o pedido!");
                setShowLogin(true);
              }
            }}
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
