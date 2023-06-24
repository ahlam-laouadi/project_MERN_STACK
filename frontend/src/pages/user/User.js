/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Grid from "../../components/Grid/Grid";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./User.css";

const User = ({ user, token }) => {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/user/${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    setProfile(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="user-page">
      <Header />

      {profile && (
        <div className="user-container">
          <section>
            <Sidebar
              firstName={profile.firstName}
              lastName={profile.lastName}
              location={profile.location}
              gender={profile.gender}
              picturePath={profile.picturePath}
              user={user}
              userId={profile._id}
            />
          </section>

          <Grid products={profile.products} user={user} token={token} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default User;
