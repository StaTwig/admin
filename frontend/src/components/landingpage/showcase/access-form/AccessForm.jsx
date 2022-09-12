import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import GoogleIcon from "../../../../assets/files/images/social/google.png";
import TorusIcon from "../../../../assets/files/images/social/torus.png";
import "./AccessForm.css";
import { Link, useHistory } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import { COUNTRY_CODE } from "../../../../constants/countryCode";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../../actions/userActions";
import { turnOff, turnOn } from "../../../../actions/spinnerActions";

export default function AccessForm() {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  
  const [EmailPhone, setEmailPhone] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
    setPhone("");
  }

  const onPhoneChange = (value) => {
    setPhone(value);
    setEmail("");
  }

  useEffect(() => {
    setPhone("");
    setEmail("");
  }, [EmailPhone]);

  const onSendOtp = useCallback(async () => {
    console.log(email, phone);
    dispatch(turnOn());
    if(!email && !phone) {
      console.log("Please provide email or phone!");
      dispatch(turnOff());
    } else {
      const data = {
        emailId: email ? email : phone
      }
      const result = await sendOtp(data, i18n.language);
      if(result?.status === 200) {
        history.push(`/verify?emailId=${data.emailId}`);
      } else {
        console.log("Error - ", result.data.message);
      }
      dispatch(turnOff());
    }
  });

  // const onSendOtp = useCallback(async () => {
  //   dispatch(turnOn());
  //   const data = { emailId: email !== "" ? email : phone };
  //   // console.log("phone:", phone.length);
  //   console.log("email:", email);
  //   if(email==="" && phone.length < 13){
  //     setErrorMessage("Provide Valid Phone Number or EmailId");
  //     dispatch(turnOff());  
  //   }
  //   else{
  //     const result = await sendOtp(data, i18n.language);
  //     if (result?.status === 200) {
  //       props.history.push(`/verify?emailId=${email !== "" ? email : phone}`);
  //     } else if (result?.status === 500) {
  //       const err = result.data.message;
  //       setErrorMessage(err);
  //     } else if (result?.status === 404) {
  //       const err = result.data.message;
  //       setErrorMessage(err);
  //     } else if (result?.status === 401) {
  //       const err = result.data.message;
  //       setErrorMessage(err);
  //     } else {
  //       // const err = result.data.data.emailId;
  //       console.log("result ", result);
  //       setErrorMessage(result);
  //     }
  //     dispatch(turnOff());      
  //   }
  // });

  return (
    <div className="connect-popup-container">
      <div className="auto-connect-options">
        <GoogleAuth />
        {/* <div
          className="login-button-card"
          // onClick={() => {
          //   history.push("/register/account");
          // }}
        > */}
          {/* <div className="icon-space">
            <img src={GoogleIcon} alt="social" />
          </div>
          <p className="vl-subheading f-500 no-space">Sign In with Google</p> */}
        {/* </div> */}
        <div
          className="login-button-card"
          // onClick={() => {
          //   history.push("/register/organization");
          // }}
        >
          <div className="icon-space">
            <img src={TorusIcon} alt="social" />
          </div>
          <p className="vl-subheading f-500 no-space">Sign In with Wallet ID</p>
        </div>
      </div>
      <div className="option-divider">
        <div className="divider-bar"></div>
        <p className="vl-subheading vl-grey-xs">OR</p>
        <div className="divider-bar"></div>
      </div>
      {EmailPhone === "email" ? (
        <div className="manual-connect-options">
          <div className="input-space-holder">
            <TextField
              id="outlined-basic"
              label={t("email_id")}
              variant="outlined"
              fullWidth
              autoCapitalize="none"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div className="change-input-option">
            <div
              className="vl-flex vl-align-center vl-gap-xs vl-blue vl-link"
              onClick={() => setEmailPhone("phone")}
            >
              <i className="fa-solid fa-phone vl-icon-xs"></i>
              <p className="vl-note">Use Phone Number</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="manual-connect-options">
          <div className="input-space-holder">
            <PhoneInput 
              international
              countryCallingCodeEditable={false}
              defaultCountry={COUNTRY_CODE}
              className="vl-custom-phone-input"
              placeholder={t("enter_phone_number")}
              inputProps={{
                name: "phone",
                required: true,
                // enableSearch: true,
              }}
              value={phone}
              onChange={onPhoneChange}
              maxLength={15}
            />
            {/* <TextField
              id="outlined-basic"
              label="Phone Numer"
              variant="outlined"
              fullWidth
            /> */}
          </div>
          <div className="change-input-option">
            <div
              className="vl-flex vl-align-center vl-gap-xs vl-blue  vl-link"
              onClick={() => setEmailPhone("email")}
            >
              <i className="fa-solid fa-envelope vl-icon-xs"></i>
              <p className="vl-note vl-link">Use Email Address</p>
            </div>
          </div>
        </div>
      )}

      <div className="popup-actions">
        <button
          className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
          onClick={onSendOtp}
        >
          Sign In
        </button>
      </div>
      <section className="further-links vl-justify-auto">
        <p className="vl-note vl-grey-xs f-400">
          Don't have Account?{" "}
          <Link to="/signup" className="vl-blue vl-link">
            Create Account
          </Link>
        </p>
      </section>
    </div>
  );
}
