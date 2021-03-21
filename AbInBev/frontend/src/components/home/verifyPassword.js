import React from "react";
import logo from "../../assets/ABInBev.png";

const VerifyPassword = (props) => {
    const {
      buttonActive,
      setSteps,
      setContinueClick
    } = props;
  return (
    <div className="verifyPasswordScreen">
        <div className="align-center pb-5 pt-5">
            <h2 className="verifyTitle">Verification Code</h2>
            <span className="verifyTitleSubHeading">Please enter the Verification Code <br/> Sent to +91 9********9</span>
        </div>

        <div className="login-form">
            <div className="card-title mb-2">Enter OTP</div>
                <div className="form-groupverify pl-5 pr-5 mb-2">
                    <input 
                    id="1"
                    type='text'
                    className="otpInput mr-3" 
                    maxlength="1"
                    value=''
                    />

                    <input 
                    id="2"
                    type='text' 
                    className="otpInput mr-3" 
                    maxlength="1"
                    value=''
                    />

                    <input 
                    id="3"
                    type='text' 
                    className="otpInput mr-3" 
                    maxlength="1"
                    value=''
                    />

                    <input 
                    id="4"
                    type='text' 
                    className="otpInput mr-3" 
                    maxlength="1"
                    value=''
                    />
                </div>
            <div>
            <p className="signUpDesc mt-1 mb-3 ">Didn’t get the code? <b>Resend OTP</b></p>
        </div>

        <div className="text-center mt-5">
            <button type="button" className="btn btn-primary width100"
            onClick={() => {
                setContinueClick(true);
                setSteps(4);
              }}
            className={`btn ${buttonActive > 0 ? `btn-red` : ``}`}
            type="button">
            NEXT
            </button>
            <p className="signUpDesc mt-3 mb-3 ">Already have an account? <b>Log In</b></p>
        </div>
    </div>
    <div className="col text-center footer-logo">
    <img src={logo} width={60} />
    </div>
    </div>
  );
};

export default VerifyPassword;
