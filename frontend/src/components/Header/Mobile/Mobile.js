/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";

import "./Mobile.css";

const Mobile = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const dispatch = useDispatch();

  const handleClick = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/products/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: category,
          }),
        }
      );

      const data = await response.json();
      dispatch(authActions.setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    const response = await fetch(`http://localhost:5000/products/`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(authActions.setProducts(data));
  };

  return (
    <div className="mobileView">
      <div className="bottomNav">
        <FontAwesomeIcon icon={faBars} className="icon" onClick={handleMenu} />
      </div>

      <nav
        className={
          toggleMenu
            ? "navMenu  has-scrollbar active"
            : "navMenu  has-scrollbar "
        }
      >
        <div className="menuTop">
          <h2>Menu</h2>

          <FontAwesomeIcon
            icon={faTimes}
            className="icon"
            onClick={handleMenu}
          />
        </div>

        <ul className="menuList">
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>

          <li>
            <button onClick={getProducts}>All Catagories</button>
          </li>

          <li>
            <button onClick={() => handleClick("men's")}>Men's</button>
          </li>

          <li>
            <button onClick={() => handleClick("women's")}>Women's</button>
          </li>

          <li>
            <button onClick={() => handleClick("electronics")}>
              Electronics's
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Mobile;
