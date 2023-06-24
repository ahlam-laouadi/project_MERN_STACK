import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Grid from "../../components/Grid/Grid";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductForm from "../../components/ProductForm/ProductForm";

import "./Profile.css";

const Profile = ({ user, token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users/user/${user._id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="profile">
      <Header />

      {token && (
        <div className="profileContainer">
          <section>
            <Sidebar
              firstName={user.firstName}
              lastName={user.lastName}
              location={user.location}
              gender={user.gender}
              picturePath={user.picturePath}
              isMe={true}
            />
          </section>
          <div className="grid-container">
            <ProductForm token={token} />
            <Grid products={products} user={user} token={token} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
