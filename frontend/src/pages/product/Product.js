/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import ProductPanel from "../../components/ProductPanel/ProductPanel";
import CommentPanel from "../../components/CommentPanel/CommentPanel";
import Footer from "../../components/Footer/Footer";

import "./Product.css";

const Product = ({ user, token }) => {
  const { productId } = useParams();

  const [product, setProduct] = useState([]);
  const [productOwner, setProductOwner] = useState([]);
  const [value, setValue] = useState("");
  const [refetch, setRefetch] = useState(false);

  // leave a comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/products/${productId}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.firstName,
          picturePath: user.picturePath,
          body: value,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setValue("");
    // change refetch value to refetch the product with the new comment
    setRefetch(!refetch);
  };

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setProduct(data);
    };

    getProduct();
  }, [productId, refetch]);

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  /*
    ERROR show in the console because the below useEffect
    try to fetch when the product is still empty
    but then the above useEffect sets the product
    and the below useEffect is retriggered and works fine

    I don't know how to make the below useEffect work only when there
    is values in the product state :(
  */
  useEffect(() => {
    const getProductOwner = async () => {
      const response = await fetch(
        `http://localhost:5000/users/user/${product.userId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setProductOwner(data);
    };

    getProductOwner();
  }, [product]);

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  return (
    <>
      <Header />
      <div className="product-page">
        {product && (
          <ProductPanel
            user={user}
            product={product}
            productOwner={productOwner}
          />
        )}

        {user && (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="commentForm"
          >
            <textarea
              name="body"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input"
              placeholder="write a comment"
              cols="70"
              rows="10"
            />

            <button className="banner-btn" type="submit">
              leave a comment
            </button>
          </form>
        )}

        <CommentPanel
          product={product}
          refetch={refetch}
          setRefetch={setRefetch}
          user={user}
          token={token}
        />
      </div>
      <Footer />
    </>
  );
};

export default Product;
