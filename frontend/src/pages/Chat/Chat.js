import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Chat.css";

const Chat = ({ user, token }) => {
  const { userId, user_id } = useParams();

  const [chat, setChat] = useState([]);
  const [otherUser, setOtherUser] = useState([]);
  const [value, setValue] = useState("");
  const [refetch, setRefetch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/users/user/${otherUser._id}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fromName: user.firstName,
          fromPicturePath: user.picturePath,
          toName: otherUser.firstName,
          toPicturePath: otherUser.picturePath,
          body: value,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setValue("");
    setRefetch(!refetch);
  };

  useEffect(() => {
    const fetchChat = async () => {
      const isMe = user?._id === userId;

      try {
        if (isMe) {
          const response = await fetch(
            `http://localhost:5000/users/user/${user_id}/chat`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setChat(data);

          const userResponse = await fetch(
            `http://localhost:5000/users/user/${user_id}`,
            {
              method: "GET",
            }
          );
          const userData = await userResponse.json();
          setOtherUser(userData);
        } else {
          const response = await fetch(
            `http://localhost:5000/users/user/${userId}/chat`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setChat(data);

          const userResponse = await fetch(
            `http://localhost:5000/users/user/${userId}`,
            {
              method: "GET",
            }
          );
          const userData = await userResponse.json();
          setOtherUser(userData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userId, user_id, refetch]);

  return (
    <>
      <Header />

      <div className="chat-page">
        <div className="chat-container">
          <div className="messages-container">
            {chat &&
              chat.messages &&
              chat.messages.map((message) => (
                <div
                  className={
                    message.fromName === user.firstName
                      ? "myMessage"
                      : "otherMessage"
                  }
                  key={message._id}
                >
                  <img
                    src={`http://localhost:5000/assets/${message.fromPicturePath}`}
                    alt="profile-pic"
                    title={`${message.fromName}`}
                  />

                  <p>{message.body}</p>
                  <h6>{new Date(Number(message.date)).toDateString()}</h6>
                </div>
              ))}
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="message"
            />
            <button className="banner-btn button" type="submit">
              send message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
