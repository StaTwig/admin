import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import GoogleIcon from "../../../../assets/files/images/social/google.png";
import "./AccessForm.css";
import { googleLogin, setCurrentUser } from "../../../../actions/userActions";
import setAuthToken from "../../../../utils/setAuthToken";
import { turnOff, turnOn } from "../../../../actions/spinnerActions";
import { useHistory } from "react-router";

export default function GoogleAuth(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");

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
			console.log("On success triggered");
			dispatch(turnOn());

			// Call google log in api
			const data = {
				tokenId: googleRes.tokenId,
			};
			const result = await googleLogin(data);
			console.log(result);

			if (result.status === 200) {
				const token = result.data.data.token;
				setAuthToken(token);
				const decoded = jwt_decode(token);
				localStorage.setItem("theLedgerToken", token);
				localStorage.setItem("bkp", result.data.data.permissions.permissions);
				dispatch(setCurrentUser(decoded));
				// const intelEnabled = props.user?.type === "Third Party Logistics" ? true : false;
				// props.history.push(intelEnabled ? `/shipments` : `/overview`);
				history.push({
					pathname: "/overview",
				});
			} else if (result.status === 401) {
				if(props.register) {
					if(props.googleData?.email !== googleRes.email)
						props.setGoogleData(googleRes);
				} else if(props.signin) {
					// Redirect user to signup
					history.push({
						pathname: "/signup",
						state: googleRes,
					});
				}
			} else {
				const err = result.data.message;
				setErrorMessage(err);
			}
			dispatch(turnOff());
		} catch (err) {
			dispatch(turnOff());
			console.log(err);
		}
	};

	const onFailure = async (res) => {
		console.log("Failed - ", res);
	};

	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			render={(renderProps) => (
				<div className="login-button-card" onClick={renderProps.onClick}>
					<div className="icon-space">
						<img src={GoogleIcon} alt="social" />
					</div>
					<p className="vl-subheading f-500 no-space">Sign {props.register ? "Up" : "In"} with Google</p>
				</div>
			)}
			onSuccess={onSuccess}
			onFailure={onFailure}
		/>
	);
}
