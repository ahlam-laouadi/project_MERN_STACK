import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const editSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  category: yup.string().required("required"),
  price: yup.number().required("required"),
  numberInStock: yup.number().required("required"),
});

const EditProduct = ({ user, token }) => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setProduct(data);
      setFetched(true);
    };

    getProduct();
  }, [productId]);

  const onSubmit = async (values, actions) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    const response = await fetch(
      `http://localhost:5000/products/${productId}/edit`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.error);
    }

    navigate(`/product/${productId}`);
  };

  return (
    <div className="editProduct">
      <Header />
      {token && (
        <div className="user-container">
          {/* ///////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////// */}
          <div className="productFormContainer">
            {fetched && (
              <Formik
                initialValues={{
                  name: product.name,
                  description: product.description,
                  category: product.category,
                  price: product.price,
                  numberInStock: product.numberInStock,
                }}
                validationSchema={editSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="active"
                  >
                    <section>
                      {/* ///////////////////////////////////////////// */}
                      {/* ///////////////////////////////////////////// */}
                      <div className="field">
                        <label htmlFor="name" className="label">
                          Name of the product
                        </label>
                        <input
                          value={values.name}
                          onChange={handleChange}
                          id="name"
                          type="text"
                          placeholder="Enter your first name"
                          onBlur={handleBlur}
                          className={
                            errors.name && touched.name
                              ? "input-error"
                              : "input"
                          }
                        />
                        {errors.name && touched.name && (
                          <p className="error">{errors.name}</p>
                        )}
                      </div>

                      {/* ///////////////////////////////////////////// */}
                      {/* ///////////////////////////////////////////// */}

                      <div className="field">
                        <label htmlFor="category" className="label">
                          Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          value={values.category}
                          onChange={handleChange}
                          className={
                            errors.category && touched.category
                              ? "input-error"
                              : "input"
                          }
                        >
                          <option value="">Choose a category</option>
                          <option value="men's">Men's</option>
                          <option value="women's">Women's</option>
                          <option value="electronics">Electronics</option>
                        </select>

                        {errors.category && touched.category && (
                          <p className="error">{errors.category}</p>
                        )}
                      </div>
                    </section>

                    {/* ///////////////////////////////////////////// */}
                    {/* ///////////////////////////////////////////// */}
                    <div className="field">
                      <label htmlFor="email" className="label">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="description"
                        cols="45"
                        rows="10"
                        className={
                          errors.description && touched.description
                            ? "input-error"
                            : "input"
                        }
                      />

                      {errors.description && touched.description && (
                        <p className="error">{errors.description}</p>
                      )}
                    </div>

                    <section>
                      {/* ///////////////////////////////////////////// */}
                      {/* ///////////////////////////////////////////// */}
                      <div className="field">
                        <label htmlFor="price" className="label">
                          price
                        </label>
                        <input
                          id="price"
                          type="number"
                          placeholder="Price"
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.price && touched.price
                              ? "input-error"
                              : "input"
                          }
                        />
                        {errors.price && touched.price && (
                          <p className="error">{errors.price}</p>
                        )}
                      </div>

                      {/* ///////////////////////////////////////////// */}
                      {/* ///////////////////////////////////////////// */}

                      <div className="field">
                        <label htmlFor="numberInStock" className="label">
                          Quantity
                        </label>
                        <input
                          value={values.numberInStock}
                          onChange={handleChange}
                          id="numberInStock"
                          type="number"
                          placeholder="Quantity"
                          onBlur={handleBlur}
                          className={
                            errors.numberInStock && touched.numberInStock
                              ? "input-error"
                              : "input"
                          }
                        />
                        {errors.numberInStock && touched.numberInStock && (
                          <p className="error">{errors.numberInStock}</p>
                        )}
                      </div>
                    </section>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="banner-btn"
                    >
                      Submit
                    </button>

                    {error && <p>{error}</p>}
                  </form>
                )}
              </Formik>
            )}
          </div>
          {/* ///////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////// */}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EditProduct;
