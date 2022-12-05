import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import GoogleIcon from "../../../../assets/files/images/social/google.png";
import "./AccessForm.css";

export default function GoogleAuth(props) {
  const { t } = props;

  useEffect(() => {
    function start() {
      try {
        gapi.client.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "email",
        });
      } catch (err) {
        console.log("Error with gapi - ", err.message);
      }
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (googleRes) => {
    try {
      // Call google log in api
      const data = {
        tokenId: googleRes?.tokenId,
        firstName: googleRes?.profileObj?.givenName,
        lastName: googleRes?.profileObj?.familyName,
        emailId: googleRes?.profileObj?.email,
      };
      props.onAuthSuccess(data, "google");
    } catch (err) {
      console.log(err);
    }
  };

  const onFailure = async (res) => {
    console.log("Failed - ", res);
    props.onFailure();
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <div className="login-button-card" onClick={renderProps.onClick}>
          <div className="icon-space">
            <img src={GoogleIcon} alt="social" />
          </div>
          <p className="vl-subheading f-500 no-space">
            {t("sign")} {props.register ? t("up") : t("in")} {t("with_google")}
            {/* Sign {props.register ? "up" : "in"} with Google */}
          </p>
        </div>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
