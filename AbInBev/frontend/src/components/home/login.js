import React from "react";

const Login = (props) => {
  const { setSteps, steps } = props;
  return (
    <div className="alignCenter">
      <div className="row justify-content-center">
        <h2 className="bold">Welcome Back!</h2>
      </div>
      <div className="pb-4 row justify-content-center">
        <h6>Login to continue</h6>
      </div>
      <div className="row justify-content-center">
        <div className="form-group">
          <label htmlFor="username">Username/ Mobile No.</label>
          <input name="username" className="form-control rounded" />
        </div>
      </div>
      <div className=" pt-5 justify-content-center">
        <button
          onClick={() => setContinueClick(true)}
          className={`btn `}
          type="button"
        >
          Send OTP
        </button>
        <p className="mb-0 pt-1">Don't have an account? Sign Up</p>
      </div>
    </div>
  );
};

export default Login;
