import React, { useState, useCallback } from "react";

import Verify from "../../components/verify";

const VerifyContainer = (props) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const verifyOTP = useCallback(async () => {
    const data = { email, otp };
  });
  return (
    <div className="container-fluid p-0">
      <Verify
        email={email}
        otp={otp}
        errorMessage={errorMessage}
        onEmailChange={(e) => setEmail(e.target.value)}
        onOtpChange={(e) => setOtp(e.target.value)}
        onVerifyOtp={verifyOTP}
      />
    </div>
  );
};

export default VerifyContainer;
