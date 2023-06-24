/* eslint-disable jsx-a11y/anchor-is-valid */
import ProductCard from "../ProductCard/ProductCard";

import "./Grid.css";

const Grid = ({ products, user, token }) => {
  return (
    <div className="product-main">
      <div className="product-grid">
        {products &&
          products?.map(
            ({
              _id,
              userId,
              name,
              description,
              category,
              price,
              picturePath,
              numberInStock,
              creationDate,
              comments,
            }) => (
              <div className="card" key={_id}>
                <ProductCard
                  productId={_id}
                  productOwnerId={userId}
                  name={name}
                  description={description}
                  category={category}
                  price={price}
                  picturePath={picturePath}
                  numberInStock={numberInStock}
                  comments={comments}
                  creationDate={creationDate}
                  user={user}
                  token={token}
                />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Grid;
