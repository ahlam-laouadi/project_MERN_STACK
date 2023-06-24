import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/authSlice";
import Header from "./Header/Header";
import Grid from "./Grid/Grid";
import Footer from "./Footer/Footer";

const Layout = ({ user, token }) => {
  const products = useSelector((state) => state.auth.products);
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const getProducts = async () => {
    const response = await fetch(`http://localhost:5000/products/`, {
      method: "GET",
    });
    const data = await response.json();

    dispatch(authActions.setProducts(data));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(authActions.setLogin({ user: user.user, token: user.token }));
    }

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  return (
    <div>
      <Header />
      {products && <Grid products={products} user={user} token={token} />}
      <Footer />
    </div>
  );
};

export default Layout;
