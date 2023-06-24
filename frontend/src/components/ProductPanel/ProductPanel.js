import { Link } from "react-router-dom";

import "./ProductPanel.css";

const ProductPanel = ({ user, product, productOwner }) => {
  const isMine = user?._id === product?.userId;

  return (
    <div className="productPanel">
      <div className="image">
        <img
          src={`http://localhost:5000/assets/${product.picturePath}`}
          alt="img"
        />
      </div>

      <div className="panelRight">
        <h1>{product.name}</h1>

        <div className="productNumbers">
          <h3 className="productPrice">{product.price} $</h3>
          <h3 className="productQuantity">Quantity: {product.numberInStock}</h3>
        </div>

        {isMine ? (
          <Link
            className="ownerLink"
            title={`go to ${productOwner.firstName}'s page`}
            to={`/profile`}
          >
            Owner: {`${productOwner.firstName} ${productOwner.lastName}`}
          </Link>
        ) : (
          <Link
            title={`go to ${productOwner.firstName}'s page`}
            className="ownerLink"
            to={`/user/${productOwner._id}`}
          >
            Owner: {`${productOwner.firstName} ${productOwner.lastName}`}
          </Link>
        )}

        <p>
          Description: <br /> {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductPanel;
