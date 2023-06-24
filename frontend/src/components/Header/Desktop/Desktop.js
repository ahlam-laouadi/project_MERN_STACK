/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";

import "./Desktop.css";

const Desktop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <nav className="desktopNav">
      <ul className="desktopMenu">
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
  );
};

export default Desktop;
