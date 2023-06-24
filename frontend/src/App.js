import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./App.css";

import AuthLayout from "./pages/auth/AuthLayout";
import Layout from "./components/Layout";
import Product from "./pages/product/Product";
import User from "./pages/user/User";
import Chat from "./pages/Chat/Chat";
import Profile from "./pages/profile/Profile";
import EditProduct from "./pages/editProduct/EditProduct";
import { authActions } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const getProducts = async () => {
    const response = await fetch(`http://localhost:5000/products/`, {
      method: "GET",
    });
    const data = await response.json();

    // I dispatch to the store instead of just using a useState and prop the data to Layout
    // because in the Layout component i get the products from the store and send it as props
    // to the Grid component
    // now incase the user searches for a product by name or category i also dispatch the
    // response of fetch to the store
    // so in the Layout component it displays only the searched results
    dispatch(authActions.setProducts(data));
  };

  useEffect(() => {
    // when the user logs in an item is set in the local storage called "user"
    // the item "user" contains the user's data and token

    // here i get the item "user" if it exists and dispatch it's content to the store
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(authActions.setLogin({ user: user.user, token: user.token }));
    }

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} token={token} />} />

          {/* ///////////////////////////////////////////////////////////////// */}
          <Route path="/login" element={<AuthLayout />} />

          {/* ///////////////////////////////////////////////////////////////// */}
          <Route
            path="/profile"
            element={<Profile user={user} token={token} />}
          />

          {/* ///////////////////////////////////////////////////////////////// */}
          <Route
            path="/product/:productId"
            element={<Product user={user} token={token} />}
          />

          {/* ///////////////////////////////////////////////////////////////// */}
          <Route
            path="/editProduct/:productId"
            element={<EditProduct user={user} token={token} />}
          />

          {/* ///////////////////////////////////////////////////////////////// */}
          <Route
            path="/user/:userId"
            element={<User user={user} token={token} />}
          />

          {/* ///////////////////////////////////////////////////////////////// */}
          <Route
            path="/chat/:userId/:user_id"
            element={<Chat user={user} token={token} />}
          />
          {/* ///////////////////////////////////////////////////////////////// */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
