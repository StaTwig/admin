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
import { googleLogin, sendOtp, verifyAuth } from "../../../../actions/userActions";
import { turnOff, turnOn } from "../../../../actions/spinnerActions";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../../../../actions/userActions";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import axios from "axios";
import { config } from "../../../../config";
import setAuthToken from "../../../../utils/setAuthToken";
import TorusAuth from "./TorusAuth";

const torus = new Torus();
window.torus = torus;
const getWeb3 = async (provider) => {
	const web3 = new Web3(provider);
	return web3;
};
export const fetchAccountData = async (provider) => {
	// Get a Web3 instance for the wallet
	try {
		// const provider = await getProvider();
		const web3 = await getWeb3(provider);
		// Get connected chain id from Ethereum node
		const chainId = await web3.eth.getChainId();
		// Load chain information over an HTTP API
		// const chainData = getChain(chainId);
		// dispatch(setChainData(chainData));
		// Get list of  of the connected wallet
		const accounts = await web3.eth.getAccounts();
		console.log(accounts);
		const accountsArray = [];
		// MetaMask does not give you all accounts, only the selected account
		const rowResolvers = accounts.map(async (address) => {
			const balance = await web3.eth.getBalance(address);
			const ethBalance = web3.utils.fromWei(balance, "ether");
			const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
			accountsArray.push({
				address,
				balance,
				ethBalance,
				humanFriendlyBalance,
			});
		});
		await Promise.all(rowResolvers);
		console.log(accountsArray, accounts);
		return accountsArray || accounts;
	} catch (err) {
		console.log(err);
	}
};

export const getTorusProvider = async () => {
	if (!torus.isInitialized) {
		try {
			await torus.init({
				buildEnv: "production", // default: production
				enableLogging: true, // default: false
				network: {
					host: "mumbai", // default: mainnet
					chainId: 80001, // default: 1
					networkName: "Mumbai Test Network", // default: Main Ethereum Network
				},
			});
		} catch (err) {
			console.log(err);
		}
	}
	await torus.login();
	return torus;
};

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
	};

	const onPhoneChange = (value) => {
		setPhone(value);
		setEmail("");
	};

	useEffect(() => {
		setPhone("");
		setEmail("");
	}, [EmailPhone]);

	const onSendOtp = useCallback(async () => {
		console.log(email, phone);
		dispatch(turnOn());
		if (!email && !phone) {
			console.log("Please provide email or phone!");
			dispatch(turnOff());
		} else {
			const data = {
				emailId: email ? email : phone,
			};
			const result = await sendOtp(data, i18n.language);
			if (result?.status === 200) {
				history.push(`/verify?emailId=${data.emailId}`);
			} else {
				console.log("Error - ", result.data.message);
			}
			dispatch(turnOff());
		}
	});

	const setSessionToken = (result) => {
		try {
			const token = result.data.data.token;
			setAuthToken(token);
			// Decode token and get user info and exp
			const decoded = jwt_decode(token);
			// Set user and isAuthenticated
			localStorage.setItem("theLedgerToken", token);
			localStorage.setItem("bkp", result.data.data.permissions.permissions);
			dispatch(setCurrentUser(decoded));
		} catch(err) {
			throw err;
		}
	}

	const onAuthSuccess = async (data, type) => {
		try {
			let result;
			if(type === "torus") {
				result = await verifyAuth(data);
			} else if(type === "google") {
				result = await googleLogin({tokenId: data.tokenId});
			}

			if(result) {
				if (result.status === 200) {
					// Set auth token
					setSessionToken(result);
					// const intelEnabled = props.user?.type == "Third Party Logistics" ? true : false;
					history.push(`/overview`);
				} else if(result.status === 401) {
					// Redirect to signup if user does not exist
					history.push({
						pathname: "/signup",
						state: data
					})
				} else {
					const err = result.data.message;
					console.log(err);
				}
			}
		} catch(err) {
			console.log(err);
		}
	}

	const onFailure = (data) => {
		console.log("Auth failed - ", data)
	}

	return (
		<div className="connect-popup-container">
			<div className="auto-connect-options">
				<GoogleAuth onAuthSuccess={onAuthSuccess} onFailure={onFailure} />
				<TorusAuth onAuthSuccess={onAuthSuccess} onFailure={onFailure} />
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
				<button className="vl-btn vl-btn-md vl-btn-full vl-btn-primary" onClick={onSendOtp}>
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
