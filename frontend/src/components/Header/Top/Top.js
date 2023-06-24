/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../../store/authSlice";
import "./Top.css";

const Top = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const logout = () => {
    // when the user click, the item "user" is deleted
    localStorage.removeItem("user");
    dispatch(authActions.setLogout());
    navigate("/");
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="headerTop">
      <ul className="socialContainer">
        <li>
          <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
          </a>
        </li>

        <li>
          <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
          </a>
        </li>

        <li>
          <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>
        </li>

        <li>
          <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
          </a>
        </li>
      </ul>

      {!user && (
        <button className="banner-btn" onClick={handleClick}>
          login / signup
        </button>
      )}

      {user && (
        <button className="banner-btn" onClick={logout}>
          log out
        </button>
      )}
    </div>
  );
};

export default Top;
