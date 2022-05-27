import React, { useState, useCallback } from "react";
import ForgotPassword from "../../components/forgotPassword";

const forgotPasswordContainer = (props) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onForgot = useCallback(async () => {
    const data = { email };
  });
  return (
    <div className="container-fluid p-0">
      <ForgotPassword
        email={email}
        onForgot={onForgot}
        errorMessage={errorMessage}
        onEmailChange={onEmailChange}
      />
    </div>
  );
};

export default forgotPasswordContainer;
