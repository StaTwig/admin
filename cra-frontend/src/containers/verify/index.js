import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import MobileHeader from "../../shared/header/mobileHeader";
import logo from "../../assets/brands/VACCINELEDGER.png";
import { Link } from "react-router-dom";
import Verify from "../../components/verify";
import { sendOtp, setCurrentUser, verifyOtp } from "../../actions/userActions";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import setAuthToken from "../../utils/setAuthToken";

const VerifyContainer = (props) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verifyOTP = useCallback(async () => {
    dispatch(turnOn());
    const params = props.location.search.split("emailId=");
    if (params.length > 1) {
      const emailId = params[1];
      const data = { emailId, otp };
      const result = await verifyOtp(data);
      if (result.status === 200) {
        // Set auth token auth
        const token = result.data.data.token;
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        localStorage.setItem("theLedgerToken", token);
        dispatch(setCurrentUser(decoded));
        props.history.push(`/overview`);
      } else {
        const err = result.data.message;
        setErrorMessage(err);
      }
    } else {
      setErrorMessage("Invalid Url");
    }
    dispatch(turnOff());
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resendOtp = useCallback(async () => {
    dispatch(turnOn());
    const params = props.location.search.split("emailId=");
    const data = { emailId: params[1] };
    const result = await sendOtp(data);

    if (result.status === 200) {
      const err = result.data.message;
      setErrorMessage(err);
    } else if (result.status === 500) {
      const err = result.data.message.response;
      setErrorMessage(err);
    } else if (result.status === 401) {
      const err = result.data.message;
      setErrorMessage(err);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
    dispatch(turnOff());
  });
  return (
    <div className='container-fluid p-0'>
      <MobileHeader {...props} />
      <nav className='navbar sticky-top navbar-expand-lg'>
        <Link className='navbar-brand' href='/'>
          <img src={logo} width='230' height='30' alt='logo' />
        </Link>
      </nav>
      <Verify
        email={email}
        otp={otp}
        errorMessage={errorMessage}
        onEmailChange={(e) => setEmail(e.target.value.toLowerCase())}
        onOtpChange={(e) => setOtp(e)}
        onVerifyOtp={verifyOTP}
        onResendOtp={resendOtp}
      />
    </div>
  );
};

//   return (
//     <div className="container-fluid p-0" tabIndex="-1" onKeyDown={onkeydown}>
//       <Verify
//         email={email}
//         otp1={otp1}
//         otp2={otp2}
//         otp3={otp3}
//         otp4={otp4}
//         errorMessage={errorMessage}
//         onEmailChange={e => setEmail(e.target.value)}
//         onOtpChange1={e => setOtp1(e.target.value)}
//         onOtpChange2={e => setOtp2(e.target.value)}
//         onOtpChange3={e => setOtp3(e.target.value)}
//         onOtpChange4={e => setOtp4(e.target.value)}
//         onVerifyOtp={verifyOTP}
//         onResendOtp={resendOtp}
//       />
//     </div>
//   );
// };

export default VerifyContainer;
