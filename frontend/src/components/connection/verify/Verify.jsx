import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { turnOff, turnOn } from "../../../actions/spinnerActions";
import { setCurrentUser, verifyOtp } from "../../../actions/userActions";
import { useTranslation } from "react-i18next";
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export default function Verify() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const { i18n } = useTranslation();

  const [otp, setOtp] = useState("");
	const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");

  const firstInputRef = useRef(null);
	const secondInputRef = useRef(null);
	const thirdInputRef = useRef(null);
	const fourthInputRef = useRef(null);

	const otpRefs = [firstInputRef, secondInputRef, thirdInputRef, fourthInputRef];

	const otpChange = (index) => {
		return (event) => {
			let value = event.target.value;
			if (isNaN(Number(value))) {
				return;
			}
			const otpArrayCopy = otpArray.concat();
			otpArrayCopy[index] = value;
			setOtpArray(otpArrayCopy);
      let entireOtp = otpArrayCopy.join("");
      setOtp(entireOtp);
			console.log(entireOtp);
			if (value !== "") {
				if (index === 0) secondInputRef.current.focus();
				else if (index === 1) thirdInputRef.current.focus();
				else if (index === 2) fourthInputRef.current.focus();
			}
		};
	};

	const onOtpKeyPress = (index) => {
		return ({ nativeEvent: { key: value } }) => {
			if (value === "Backspace" && otpArray[index] === "") {
				if (index === 1) firstInputRef.current.focus();
				else if (index === 2) secondInputRef.current.focus();
				else if (index === 3) thirdInputRef.current.focus();
			}
		};
	};

	const handleVerifyOtp = async (event) => {
    event.preventDefault();
    const params = location.search.split("emailId=");
		if (params.length > 1) {
      const emailId = params[1];
			const data = { emailId, otp };
			const result = await verifyOtp(data, i18n.language);
			dispatch(turnOn());
			if (result.status === 200) {
				// Set auth token auth
				const token = result.data.data.token;
				setAuthToken(token);
				// Decode token and get user info and exp
				const decoded = jwt_decode(token);
				// Set user and isAuthenticated
				localStorage.setItem("theLedgerToken", token);
				localStorage.setItem("bkp", result.data.data.permissions.permissions);
				dispatch(setCurrentUser(decoded));
				// const intelEnabled =
				//   props.user?.type === "Third Party Logistics" ? true : false;
				// props.history.push(intelEnabled ? `/shipments` : `/overview`);
				history.push("/overview");
			} else {
				const err = result.data.message;
				setErrorMessage(err);
			}
		} else {
			setErrorMessage("Invalid Url");
		}
		dispatch(turnOff());
	};

	return (
		<section className="account-section">
			<div className="vl-verify-container">
				<form onSubmit={handleVerifyOtp} className="account-form-container">
					<hgroup className="form-headers">
						<h1 className="vl-heading f-700 vl-black">Verify your Account</h1>
						<h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm f-500-sm">
							We have sent the access code to your Email/ Phone Number, please check and verify
						</h2>
					</hgroup>
					<section className="vl-input-group form-auto-fill-section">
						<div className="input-otp-column">
							{otpRefs.map((otpRef, index) => (
								<TextField
									key={index}
									inputRef={otpRef}
									name={`otp${index}`}
									id={`otp${index}`}
									className="vl-custom-textfield"
									fullWidth
									value={otpArray[index]}
									onChange={otpChange(index)}
									onKeyUp={onOtpKeyPress(index)}
									onKeyDown={onkeydown}
									variant="outlined"
									placeholder="*"
									inputProps={{ maxLength: 1 }}
                  autoFocus={index === 0 ? true : undefined}
                  required
								/>
							))}
						</div>
					</section>
					<section className="call-by-action">
						<button type="submit" className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">Verify</button>
					</section>
					{/* <section className="further-links vl-justify-auto">
            <p className="vl-note vl-grey-xs f-400">
              Didn’t recieve the access code ?{" "}
              <Link to="/" className="vl-blue vl-link">
                Resend
              </Link>
            </p>
          </section> */}
				</form>
			</div>
		</section>
	);
}
