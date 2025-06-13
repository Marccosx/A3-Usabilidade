import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const handleRemove = () => {
    if (window.confirm('Deseja remover este item do carrinho?')) {
        removeFromCart(id);
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image}  className="food-item-img" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt="add_icon_white"
            className="add"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove_icon_red"
              onClick={handleRemove}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add_icon_green"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" 
                                                 viewBox="0 0 24 24">
                                                    <path fill="#fbed02" 
                                                    d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775
                                                     10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 
                                                     4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675
                                                      3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" />
                                                      </svg>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">R$ {price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
