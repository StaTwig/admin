import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import MobileHeader from "../../shared/header/mobileHeader";
import logo from "../../assets/brands/VACCINELEDGER.png";
import { Link } from "react-router-dom";
import Login from "../../components/login";
import { sendOtp } from "../../actions/userActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
const LoginContainer = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFieldDisable, setemailFieldDisable] = useState(false);
  const [phoneFieldDisable, setphoneFieldDisable] = useState(false);
  const dispatch = useDispatch();
  const [innerWidth, setInnerwidth] = useState(window.innerWidth);

  window.onresize = () => {
    setInnerwidth(window.innerWidth);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSendOtp = useCallback(async () => {
    dispatch(turnOn());

    const data = { emailId: email != "" ? email : phone };
    console.log("3", data);
    const result = await sendOtp(data);
    if (result.status === 200) {
      props.history.push(`/verify?emailId=${email !== "" ? email : phone}`);
    } else if (result.status === 500) {
      const err = result.data.message;
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
  const onkeydown = (event) => {
    if (event.keyCode === 13) {
      onSendOtp();
    }
  };
  return (
    <>
      <div className='container-fluid p-0' tabIndex='-1' onKeyDown={onkeydown}>
        <MobileHeader {...props} />
        {innerWidth > 1024 && (
          <nav className='navbar sticky-top navbar-expand-lg'>
            <Link className='navbar-brand' to='/'>
              <img src={logo} width='230' height='30' alt='logo' />
            </Link>
          </nav>
        )}
        <Login
          errorMessage={errorMessage}
          onSendOtp={onSendOtp}
          onEmailChange={(e) => {
            setEmail(e.target.value.toLowerCase());
            let temp_email = e.target.value.toLowerCase();
            if (temp_email !== "") setphoneFieldDisable(true);
            else setphoneFieldDisable(false);
          }}
          onPhoneChange={(value) => {
            setPhone(value);
            let temp_phone = value.slice(2, value.length);
            if (temp_phone !== "") setemailFieldDisable(true);
            else setemailFieldDisable(false);
          }}
          email={email}
          phone={phone}
          emailFieldDisable={emailFieldDisable}
          phoneFieldDisable={phoneFieldDisable}
        />
      </div>
    </>
  );
};

export default LoginContainer;
