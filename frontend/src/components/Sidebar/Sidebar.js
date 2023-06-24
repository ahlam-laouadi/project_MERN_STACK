import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  faMapLocationDot,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  firstName,
  lastName,
  location,
  gender,
  picturePath,
  isMe,
  user,
  userId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <img src={`http://localhost:5000/assets/${picturePath}`} alt="pic" />
      <h1>{`${firstName} ${lastName}`}</h1>
      <div className="line"></div>
      <div className="info">
        <FontAwesomeIcon icon={faMapLocationDot} className="icon" />
        <h3> {location}</h3>
      </div>

      <div className="info">
        <FontAwesomeIcon icon={faVenusMars} className="icon" />
        <h3> {gender}</h3>
      </div>

      {!isMe && (
        <button
          onClick={() => navigate(`/chat/${user._id}/${userId}`)}
          className="banner-btn"
        >
          chat
        </button>
      )}
    </div>
  );
};

export default Sidebar;
