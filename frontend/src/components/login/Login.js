import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { authActions } from "../../store/authSlice";

import "./Login.css";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const Login = ({ setLogin, login }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (values, actions) => {
    try {
      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.msg);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));

        dispatch(authActions.setLogin({ user: data.user, token: data.token }));

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(error);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <>
      <Header />
      <div className="authContainer">
        <form onSubmit={handleSubmit} autoComplete="off">
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

          <label htmlFor="password" className="label">
            Password
          </label>
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

          <button className="banner-btn" disabled={isSubmitting} type="submit">
            Submit
          </button>

          {error && <p> {error}</p>}

          <h2 onClick={() => setLogin(!login)}>create an account</h2>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
