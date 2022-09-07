import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import GoogleIcon from "../../../../assets/files/images/social/google.png";
import "./AccessForm.css";

export default function GoogleAuth() {
	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: process.env.GOOGLE_CLIENT_ID,
				scope: "email",
			});
		}

		gapi.load("client:auth2", start);
	}, []);

	const onSuccess = async (res) => {
		console.log(res);
		// Call google log in api
		// If account exists, log in
		// If not, return error, and the user will be redirected to signup
	};

	const onFailure = async (res) => {
		console.log("Failed - ", res);
	};

	return (
		<GoogleLogin
			clientId={process.env.GOOGLE_CLIENT_ID}
			render={(renderProps) => (
				<div className="login-button-card" onClick={renderProps.onClick}>
					<div className="icon-space">
						<img src={GoogleIcon} alt="social" />
					</div>
					<p className="vl-subheading f-500 no-space">Sign In with Google</p>
				</div>
			)}
			onSuccess={onSuccess}
			onFailure={onFailure}
			isSignedIn={true}
		/>
	);
}
