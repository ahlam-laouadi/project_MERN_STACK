import React, { useState } from "react";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";

const AuthLayout = () => {
  const [login, setLogin] = useState(true);

  return (
    <div>
      {login && <Login setLogin={setLogin} login={login} />}
      {!login && <Signup setLogin={setLogin} login={login} />}
    </div>
  );
};

export default AuthLayout;
