import React, { useEffect } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (menu_list[index]) {
          setCategory(menu_list[index].categoria);
        }
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>O que você deseja comer hoje?</h1>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="explore-menu-list-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.categoria ? "All" : item.categoria
                )
              }
            >
              <img
                src={item.menu_image}
                className={category === item.categoria ? "active" : ""}
                alt={item.categoria}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;