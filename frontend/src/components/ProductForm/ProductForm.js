import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/fontawesome-free-solid";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";

import "./ProductForm.css";

const creationSchema = yup.object().shape({
  name: yup.string().required("*"),
  description: yup.string().required("*"),
  category: yup.string().required("*"),
  price: yup.number().required("*"),
  numberInStock: yup.number().required("*"),
  picturePath: yup.string().required("*"),
});

const ProductForm = ({ token }) => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    //this allows us to send form info with image
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    if (values.picturePath) {
      formData.append("picturePath", values.picturePath.name);
    }

    const response = await fetch(`http://localhost:5000/products/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    actions.resetForm();
    navigate("/");
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      numberInStock: 1,
      picturePath: "",
    },
    validationSchema: creationSchema,
    onSubmit,
  });

  return (
    <div className="productFormContainer">
      <button className="banner-btn create" onClick={() => setForm(!form)}>
        <FontAwesomeIcon icon={faAdd} /> Add a product
      </button>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={form ? "active" : ""}
      >
        <section>
          <div className="field">
            <label htmlFor="name">Name of the product</label>
            <input
              value={values.name}
              onChange={handleChange}
              id="name"
              type="text"
              placeholder="Name of the product"
              onBlur={handleBlur}
              className={errors.name && touched.name ? "input-error" : "input"}
            />
            {errors.name && touched.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={values.category}
              onChange={handleChange}
              className={
                errors.category && touched.category ? "input-error" : "input"
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

        <div className="field">
          <label htmlFor="description">Description</label>
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
          <div className="field">
            <label htmlFor="price">price</label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.price && touched.price ? "input-error" : "input"
              }
            />
            {errors.price && touched.price && (
              <p className="error">{errors.price}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="numberInStock">Quantity</label>
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

        <div className="dropzone">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setFieldValue("picturePath", acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                {!values.picturePath ? (
                  <p>
                    <FontAwesomeIcon icon={faUpload} /> Upload a Pic
                  </p>
                ) : (
                  <p>{values.picturePath.name}</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>

        <button disabled={isSubmitting} type="submit" className="banner-btn">
          Submit
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
