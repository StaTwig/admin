import React from "react";
import TorusIcon from "../../../../assets/files/images/social/torus.png";
import "./AccessForm.css";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

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

export default function TorusAuth(props) {
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
			try {
        const reqData = {
					walletId: address,
					signature: signatures,
					message: message,
          emailId: torusInfo?.email,
          firstName: torusInfo?.name?.split(" ")[0],
          lastName: torusInfo?.name?.split(" ")[1],
        };
        props.onAuthSuccess(reqData, "torus");

			} catch (err) {
				console.log(err);
			}
			return { signature: signatures, message: message };
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="login-button-card" onClick={() => torusLogin()}>
			<div className="icon-space">
				<img src={TorusIcon} alt="social" />
			</div>
			<p className="vl-subheading f-500 no-space">Sign {props.register ? "Up" : "In"} with Wallet</p>
		</div>
	);
}
