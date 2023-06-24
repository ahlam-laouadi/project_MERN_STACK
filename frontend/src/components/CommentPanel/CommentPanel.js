import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/fontawesome-free-regular";

import "./CommentPanel.css";
import { useState } from "react";

const CommentPanel = ({ product, user, token, setRefetch, refetch }) => {
  const handleDelete = async (commentId) => {
    await fetch(
      `http://localhost:5000/products/${product._id}/comment/${commentId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRefetch(!refetch);
  };

  const [show, setShow] = useState(false);

  return (
    <div className="commentsPanel">
      <button className="banner-btn" onClick={() => setShow(!show)}>
        {show ? "Hide Comments" : "Show Comments"}
      </button>
      <div className={show ? "commentsContainer active" : "commentsContainer"}>
        {product?.comments?.length > 0 ? (
          product.comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <img
                src={`http://localhost:5000/assets/${comment.picturePath}`}
                alt="img"
              />
              <div className="info">
                <div className="top">
                  <h2>{comment.name}</h2>
                  {comment.user === user?._id && (
                    <FontAwesomeIcon
                      className="icon"
                      icon={faTrashAlt}
                      onClick={() => handleDelete(comment._id)}
                    />
                  )}
                </div>

                <p>{comment.body}</p>
                <p className="date">
                  {new Date(Number(comment.date)).toDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="noComments">No comments</p>
        )}
      </div>
    </div>
  );
};

export default CommentPanel;
