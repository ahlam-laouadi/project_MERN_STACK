/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faTrashAlt,
  faEdit,
} from "@fortawesome/fontawesome-free-regular";

import "./ProductCard.css";

const Product = ({
  productId,
  productOwnerId,
  name,
  description,
  category,
  price,
  picturePath,
  numberInStock,
  comments,
  creationDate,
  user,
  token,
}) => {
  const isMine = user?._id === productOwnerId;

  const deleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/products/${productId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="showcase">
      <div className="banner">
        <img
          src={`http://localhost:5000/assets/${picturePath}`}
          alt="product"
        />

        <div className="actions">
          {isMine ? (
            <Link className="btn-action" to={`/profile`}>
              <FontAwesomeIcon
                icon={faUser}
                className="icon"
                title="User profile"
              />
            </Link>
          ) : (
            <Link className="btn-action" to={`/user/${productOwnerId}`}>
              <FontAwesomeIcon
                icon={faUser}
                className="icon"
                title="User profile"
              />
            </Link>
          )}

          <Link className="btn-action" to={`/product/${productId}`}>
            <FontAwesomeIcon
              icon={faEye}
              className="icon"
              title="Product page"
            />
          </Link>
          {isMine && (
            <>
              <Link to={`/editProduct/${productId}`} className="btn-action">
                <FontAwesomeIcon icon={faEdit} className="icon" title="Edit" />
              </Link>

              <button className="btn-action">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="icon"
                  title="Delete"
                  onClick={() => deleteProduct(productId)}
                />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="content">
        <div className="row">
          <p className="name">{name}</p>

          <h3 className="category">{category}</h3>
        </div>

        <div className="row">
          <div className="price">
            <p>{price} $</p>
          </div>

          <div className="price">
            <p>Quantity: {numberInStock} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
