/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { authActions } from "../../../store/authSlice";
import "./Main.css";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (token) {
          const response = await fetch(`http://localhost:5000/users/chats`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/products/products/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: value,
          }),
        }
      );

      const data = await response.json();
      dispatch(authActions.setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="headerMain">
      <form onSubmit={handleSearch} className="searchContainer">
        <input
          value={value}
          type="text"
          name="search"
          onChange={(e) => setValue(e.target.value)}
          className="searchField"
          placeholder="Enter your product name..."
        />

        <button className="searchBtn" type="submit">
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </button>
      </form>

      {token && (
        <div className="mainActions">
          <div className="action">
            <img
              src={`http://localhost:5000/assets/${user.picturePath}`}
              alt="profile-pic"
              title={`${user.firstName} ${user.lastName} profile`}
              onClick={() => navigate("/profile")}
            />
          </div>

          <div className="action" onClick={() => setChat(!chat)}>
            <button>
              <FontAwesomeIcon icon={faMessage} className="icon" />
            </button>
            <h3>{messages?.length}</h3>
          </div>

          {chat && (
            <div className="messages">
              {messages?.length > 0 &&
                messages.map((message) => (
                  <div
                    className="message"
                    key={message._id}
                    onClick={() =>
                      navigate(`/chat/${message.fromId}/${message.toId}`)
                    }
                  >
                    <img
                      src={`http://localhost:5000/assets/${message.fromPicturePath}`}
                      alt="pic"
                    />
                    <h1>{message.fromName}</h1>
                    <h1>{message.toName}</h1>
                    <img
                      src={`http://localhost:5000/assets/${message.toPicturePath}`}
                      alt="pic"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
