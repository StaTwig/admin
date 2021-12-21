import React from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "./style.scss";
import User from "../../assets/icons/mail.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
import Phone from "../../assets/icons/phone.png";
import TextField from "@material-ui/core/TextField";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';

const FormLoginPage = (props) => {
  const { t, i18n } = useTranslation();
  const {
    email,
    onEmailChange,
    errorMessage,
    onSendOtp,
    phone,
    onPhoneChange,
    emailFieldDisable,
    phoneFieldDisable,
  } = props;
  // const onkeydown = (event) => {
  //   if (event.keyCode  === 13) {
  //       onSendOtp();
  //   }
  //  }
  return (
    <div className='login-wrapper'>
      <div className='container'>
        {/* <div className="mobile-header">
            <div className="branding">
                <img src={logo} alt="vaccineledger" />
            </div>
</div> */}
        <div className='row'>
          <div className='col-m-6 col-lg-6'>
            <div className='form-content'>
              <img className='logo' src={logo} alt='' />
              <h1>{t('welcome_back')},</h1>
              <p>{t('login_to_continue')}</p>
            </div>
          </div>
          <div className='col-m-6 col-lg-5'>
            <div className='card'>
              <div className='card-body'>
                <div className='login-form mt-2'>
                  <div className='card-title mb-4 mr-2'>{t('login')}</div>
                  <div
                    className='form-group mb-3 mt-1 ml-5 mr-5 p-1'
                    style={
                      emailFieldDisable
                        ? { pointerEvents: "none", opacity: "0.5" }
                        : {}
                    }
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "-14px",
                        top: "23px",
                      }}
                    >
                      <img
                        alt='Mail Icon'
                        src={User}
                        height='15px'
                        width='19px'
                      />
                    </div>
                    <TextField
                      label={t('email_id')}
                      // placeholder={"Email ID"}
                      className='form-controlll ml-3'
                      name='email'
                      autoCapitalize='none'
                      value={email}
                      onChange={onEmailChange}
                    />
                  </div>
                  <div className='card-title mr-2 mb-0 mt-3'>
                    <h6 style={{ color: "#0093E9", fontWeight: "600" }}>{t('or')}</h6>
                  </div>
                  <div
                    className='form-group mt-0 ml-5 mr-3 p-1'
                    style={
                      ({ position: "relative", left: "-15px" },
                      phoneFieldDisable
                        ? { pointerEvents: "none", opacity: "0.5" }
                        : {})
                    }
                  >
                    <div
                      className='form-group mt-0 ml-3 p-1'
                      style={{ position: "relative", left: "-38px" }}
                    >
                      <img
                        alt='Phone icon'
                        src={Phone}
                        height='20px'
                        width='20px'
                      />
                    </div>
                    <div style={{ position: "absolute", left: "-20px" }}>
                      <PhoneInput
                        country={"in"}
                        preferredCountries={["in"]}
                        placeholder={t('enter_phone_number')}
                        inputProps={{
                          name: "phone",
                          required: true,
                          // enableSearch: true,
                        }}
                        value={phone}
                        onChange={onPhoneChange}
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className='mb-3 ml-5 mr-4'>
                      {" "}
                      <Alert variant='filled' severity='error'>
                        <AlertTitle>{t('error')}</AlertTitle>
                        {errorMessage}
                      </Alert>
                    </div>
                  )}
                  <div className='text-center'>
                    <button
                      type='button'
                      className=' buttonS btn btn-primary'
                      onClick={onSendOtp}
                    >
                      {t('continue')}
                    </button>
                  </div>
                  <div className='signup-link text-center mt-4 ml-1'>
                   {t('dont_have_an_account')} {" "}
                    <Link to='/signup'>
                      <b>{t('signup')}</b>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLoginPage;

/* <Link to="/forgotPassword" className="forgot-link">Forgot Password?</Link>
                  <div className="checkbox-group mb-2">
                    <input type="checkbox" className="mr-1" /> <span>Remember me</span>
                  </div> */
