import React from "react";
import "./menu.scss";
import { Link } from "react-router-dom";
import { menu } from "../../data";

export const Menu = () => {
  const base = window.location.origin;
  return (
    
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title.toUpperCase()}</span>
          {item.listItems.map((listItem) => (
            <Link className="listItem" to={listItem.url} key={listItem.id}>
              <img src={`${base}/${listItem.icon}`} alt="" />
              <span className="listItemTitle">{listItem.title} </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Menu;
