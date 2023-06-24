//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/fontawesome-free-solid";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  gender: yup.string().required("required"),
  picturePath: yup.string(),
});

const Signup = ({ setLogin, login }) => {
  const [error, setError] = useState(null);

  const onSubmit = async (values, actions) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    if (values.picturePath) {
      formData.append("picturePath", values.picturePath.name);
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg);
      }

      if (response.ok) {
        console.log(data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      location: "",
      gender: "",
      picturePath: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <>
      <Header />
      <div className="authContainer">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="name">
            <section>
              <label htmlFor="firstName">First Name</label>
              <input
                value={values.firstName}
                onChange={handleChange}
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                onBlur={handleBlur}
                className={
                  errors.firstName && touched.firstName
                    ? "input-error"
                    : "input"
                }
              />
              {errors.firstName && touched.firstName && (
                <p className="error">{errors.firstName}</p>
              )}
            </section>

            <section>
              <label htmlFor="lastName">Last Name</label>
              <input
                value={values.lastName}
                onChange={handleChange}
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                onBlur={handleBlur}
                className={
                  errors.lastName && touched.lastName ? "input-error" : "input"
                }
              />
              {errors.lastName && touched.lastName && (
                <p className="error">{errors.lastName}</p>
              )}
            </section>
          </div>

          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Enter your email"
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : "input"}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.password && touched.password ? "input-error" : "input"
            }
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          <div className="info">
            <section>
              <label htmlFor="location">Location</label>
              <input
                value={values.location}
                onChange={handleChange}
                id="location"
                type="text"
                placeholder="Enter your Location"
                onBlur={handleBlur}
                className={
                  errors.location && touched.location ? "input-error" : "input"
                }
              />
              {errors.location && touched.location && (
                <p className="error">{errors.location}</p>
              )}
            </section>

            <section>
              <label htmlFor="gender">Gender</label>
              <input
                value={values.gender}
                onChange={handleChange}
                id="gender"
                type="text"
                placeholder="Enter your gender"
                onBlur={handleBlur}
                className={
                  errors.gender && touched.gender ? "input-error" : "input"
                }
              />
              {errors.gender && touched.gender && (
                <p className="error">{errors.gender}</p>
              )}
            </section>
          </div>

          <div className="dropzone" title="upload a picture">
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
                    <div className="banner-btn">
                      <FontAwesomeIcon icon={faUpload} className="icon" />{" "}
                      Profile pic
                    </div>
                  ) : (
                    <h6 className="banner-btn">{values.picturePath.name}</h6>
                  )}
                </div>
              )}
            </Dropzone>
          </div>

          <button disabled={isSubmitting} type="submit" className="banner-btn">
            Submit
          </button>

          {error && <p>{error}</p>}

          <h2 onClick={() => setLogin(!login)}>Already have an account?</h2>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
