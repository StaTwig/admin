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
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../../../../actions/userActions";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import axios from "axios";
import { config } from "../../../../config";
import setAuthToken from "../../../../utils/setAuthToken";

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
  const torusLogin = async () => {
    console.log("TORUS LOGIN");
    const torus = await getTorusProvider();
    console.log(torus);
    const provider = torus.provider;
    const web3 = await getWeb3(provider);
    console.log("web3 is: ", web3);
    let res = await web3.eth.getAccounts();
    console.log("accounts are ", res);
    const torusInfo = await torus.getUserInfo();
    let abc = await fetchAccountData(provider);
    console.log("torusInfo is: ", torusInfo);
    let signData = await verifyAuth(abc[0]?.address, true, web3, torusInfo);
    console.log(signData);
  };

  const verifyAuth = async (address, isTorus, torus, torusInfo) => {
    try {
      const baseURL = "http://localhost:3001";
      const message = "An amazing message, for use with MetaMask!";
      let signatures;
      if (!isTorus) {
        // await window.web3.currentProvider.enable();
        console.log(address);
        const web3 = new Web3(window.ethereum);
        signatures = await web3.eth.personal.sign(message, address, "");
      } else {
        // await window.web3.currentProvider.enable();
        signatures = await torus.eth.personal.sign(message, address, "");
      }
      // if (torusInfo?.isNewUser) {
      // try {
      //   const result = await axios.post(
      //     baseURL + "/api/user_service/register",
      //     {
      //       walletAddress: address,
      //       emailId: torusInfo?.email,
      //       firstName: torusInfo?.name,
      //     }
      //   );
      //   console.log(result);
      // } catch (e) {
      //   console.log(e);
      // }
      // }
      try {
        const result = await axios.post(config().verifyAuth, {
          walletId: address,
          signature: signatures,
          message: message,
          emailId: torusInfo?.email,
        });
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
          // const intelEnabled = props.user?.type == "Third Party Logistics" ? true : false;
          history.push(`/overview`);
        } else {
          const err = result.data.message;
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
      // dispatch(setAccountData({ ...res.data.data, isTorus: isTorus }));
      return { signature: signatures, message: message };
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='connect-popup-container'>
      <div className='auto-connect-options'>
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
        <div className='login-button-card' onClick={() => torusLogin()}>
          <div className='icon-space'>
            <img src={TorusIcon} alt='social' />
          </div>
          <p className='vl-subheading f-500 no-space'>Sign In with Wallet</p>
        </div>
      </div>
      <div className='option-divider'>
        <div className='divider-bar'></div>
        <p className='vl-subheading vl-grey-xs'>OR</p>
        <div className='divider-bar'></div>
      </div>
      {EmailPhone === "email" ? (
        <div className='manual-connect-options'>
          <div className='input-space-holder'>
            <TextField
              id='outlined-basic'
              label={t("email_id")}
              variant='outlined'
              fullWidth
              autoCapitalize='none'
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div className='change-input-option'>
            <div
              className='vl-flex vl-align-center vl-gap-xs vl-blue vl-link'
              onClick={() => setEmailPhone("phone")}
            >
              <i className='fa-solid fa-phone vl-icon-xs'></i>
              <p className='vl-note'>Use Phone Number</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='manual-connect-options'>
          <div className='input-space-holder'>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry={COUNTRY_CODE}
              className='vl-custom-phone-input'
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
          <div className='change-input-option'>
            <div
              className='vl-flex vl-align-center vl-gap-xs vl-blue  vl-link'
              onClick={() => setEmailPhone("email")}
            >
              <i className='fa-solid fa-envelope vl-icon-xs'></i>
              <p className='vl-note vl-link'>Use Email Address</p>
            </div>
          </div>
        </div>
      )}

      <div className='popup-actions'>
        <button
          className='vl-btn vl-btn-md vl-btn-full vl-btn-primary'
          onClick={onSendOtp}
        >
          Sign In
        </button>
      </div>
      <section className='further-links vl-justify-auto'>
        <p className='vl-note vl-grey-xs f-400'>
          Don't have Account?{" "}
          <Link to='/signup' className='vl-blue vl-link'>
            Create Account
          </Link>
        </p>
      </section>
    </div>
  );
}
