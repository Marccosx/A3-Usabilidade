import React, { useState, useEffect} from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";

const FoodDisplay = ({ category }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/produtos/");
      setList(response.data);
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Pratos Populares Perto de Você</h2>
      <div className="food-display-list">
        {list.map((item, index) => {
          if (category === "All" || category === item.categoria) {
            return (
              <FoodItem
                key={index}
                id={item.id}
                name={item.nome}
                description={item.descricao}
                price={item.preco}
                image={item.foto_produto}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;