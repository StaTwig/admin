import React from 'react'
import './style.scss'
import logo from '../../../assets/icons/GMRLogo.png'

const Login = (props) => {
  const { onSendOtp } = props
  const onSendOtpClick = async () => {
    const result = await onSendOtp()
  }
  return (
    <div className="loginScreen">
      <div className="align-center pb-5 pt-5">
        <h2 className="titleSubHeading">Welcome Back!</h2>
        <span className="titleSubHeading">
          <span className="titleHeading">Login</span> to continue.
        </span>
      </div>
      <div className="loginUserBlock justify-content-center">
        <div className="form-group">
          <label htmlFor="username" className="userNameLabel">
            Username
          </label>
          <input name="username" className="form-control username" />

          <label htmlFor="password" className="userNameLabel">
            Password
          </label>
          <input name="password" type="password" className="form-control username" />
          <button
            onClick={() => {
              onSendOtpClick()
            }}
            className="width100 btn mt-4"
            type="button"
          >
            Login
          </button>
          <div className="col text-center footer-logo">
            <img src={logo} width={150} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
