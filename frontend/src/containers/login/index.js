import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import MobileHeader from "../../shared/header/mobileHeader";
import logo from "../../assets/brands/VACCINELEDGER.png";
import { Link } from "react-router-dom";
import Login from "../../components/login";
import { sendOtp } from "../../actions/userActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../../actions/userActions";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import { config } from "../../config";

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

const LoginContainer = (props) => {
  const { i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFieldDisable, setemailFieldDisable] = useState(false);
  const [phoneFieldDisable, setphoneFieldDisable] = useState(false);
  const dispatch = useDispatch();
  const [innerWidth, setInnerwidth] = useState(window.innerWidth);
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
          props.history.push(`/overview`);
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

  window.onresize = () => {
    setInnerwidth(window.innerWidth);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSendOtp = useCallback(async () => {
    dispatch(turnOn());
    const data = { emailId: email !== "" ? email : phone };
    // console.log("phone:", phone.length);
    console.log("email:", email);
    if (email === "" && phone.length < 13) {
      setErrorMessage("Provide Valid Phone Number or EmailId");
      dispatch(turnOff());
    } else {
      const result = await sendOtp(data, i18n.language);
      if (result?.status === 200) {
        props.history.push(`/verify?emailId=${email !== "" ? email : phone}`);
      } else if (result?.status === 500) {
        const err = result.data.message;
        setErrorMessage(err);
      } else if (result?.status === 404) {
        const err = result.data.message;
        setErrorMessage(err);
      } else if (result?.status === 401) {
        const err = result.data.message;
        setErrorMessage(err);
      } else {
        // const err = result.data.data.emailId;
        console.log("result ", result);
        setErrorMessage(result);
      }
      dispatch(turnOff());
    }
  });
  const onkeydown = (event) => {
    if (event.keyCode === 13) {
      onSendOtp();
    }
  };
  return (
    <>
      <div className='container-fluid p-0' tabIndex='-1' onKeyDown={onkeydown}>
        <MobileHeader {...props} />
        {innerWidth > 1024 && (
          <nav className='navbar sticky-top navbar-expand-lg'>
            <Link className='navbar-brand' to='/'>
              <img src={logo} width='230' height='30' alt='logo' />
            </Link>
          </nav>
        )}
        <Login
          errorMessage={errorMessage}
          onSendOtp={onSendOtp}
          onEmailChange={(e) => {
            setEmail(e.target.value.toLowerCase());
            let temp_email = e.target.value.toLowerCase();
            if (temp_email !== "") setphoneFieldDisable(true);
            else setphoneFieldDisable(false);
          }}
          onPhoneChange={(value) => {
            setPhone(value);
            if (value) {
              let temp_phone = value.slice(2, value.length);
              if (temp_phone !== "") setemailFieldDisable(true);
              else setemailFieldDisable(false);
            } else setemailFieldDisable(false);
          }}
          email={email}
          torusLogin={torusLogin}
          phone={phone}
          emailFieldDisable={emailFieldDisable}
          phoneFieldDisable={phoneFieldDisable}
        />
      </div>
    </>
  );
};

export default LoginContainer;
