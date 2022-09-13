import React, { useState } from "react";
import "./Connection.css";
import Vaccineledgerlight from "../../assets/files/logos/vaccineledger-light.svg";
import VaccineLedgerLogo from "../../assets/files/logos/vaccineledger.svg";
import statwig from "../../assets/files/logos/statwig-logo.png";
import check from "../../assets/files/icons/check.svg";
import Illustration from "../../assets/files/images/illustration/illustration.png";
import Account from "./account/Account";
import Organization from "./organization/Organization";
import Verify from "./verify/Verify";
import { useDispatch } from "react-redux";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import { registerUser } from "../../actions/userActions";
import { useTranslation } from "react-i18next";
import Success from "./success/Success";
import { useHistory } from "react-router";

export default function Connection(props) {
	const { connection } = props;
	
	const history = useHistory();
	const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organizationType: "",
    organization: "",
    organizationName: "",
    region: "",
    country: "",
    city: "",
    pincode: "",
    address: "",
  });

  const onUserDataSubmit = (data, isFinal = false) => {
    let values = { ...registerData, ...data };
    setRegisterData(values);
    if (isFinal) {
      // API call to backend
      let reqData = {
        firstName: values.firstName,
        lastName: values.lastName,
        emailId: values.email,
        phoneNumber: values.phone,
        organisationId: values.organization.id,
      };
      if (values.organizationExists === "new") {
        reqData.organizationName = values.organizationName;
        reqData.address = {
          line1: values.address,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          country: values.country,
          region: values.region,
        };
        reqData.type = values.organizationType;
        reqData.organisationId = 0;
      }

      console.log("Request Data - ", reqData);

      dispatch(turnOn());
      const result = registerUser(reqData, i18n.language);
      if (result.status === 200) {
        // Redirect to pending page
        console.log("Req pending!");
      } else {
        console.log("Error - ", result.data);
      }
      dispatch(turnOff());
    }
  };

	const handleBack = (event) => {
		if(connection === "organization") {
			history.push('/signup');
		} else {
			history.push('/');
		}
	}

	return (
		<section className="connect-layout-container">
			<div className="connection-two-column-grid-layout">
				<div className="banner-section banner-grid-name">
					<div className="banner-inner-container">
						<div className="banner-top">
							<figure className="connection-brand-logo">
								<img src={Vaccineledgerlight} alt="Vaccineledger" />
							</figure>
							<section className="our-benefits-container">
								<article className="benefit-card">
									<img src={check} alt="check" className="check-icon" />
									<p className="vl-subheading f-500 vl-white">Maintain your Orders</p>
									<div className="straight-line"></div>
								</article>
								<article className="benefit-card">
									<img src={check} alt="check" className="check-icon" />
									<p className="vl-subheading f-500 vl-white">Real Time shipment details</p>
									<div className="straight-line"></div>
								</article>
								<article className="benefit-card">
									<img src={check} alt="check" className="check-icon" />
									<p className="vl-subheading f-500 vl-white">Track & Trace</p>
									<div className="straight-line"></div>
								</article>
								<article className="benefit-card">
									<img src={check} alt="check" className="check-icon" />
									<p className="vl-subheading f-500 vl-white">View your Partner Locations</p>
									<div className="straight-line"></div>
								</article>
								<article className="benefit-card">
									<img src={check} alt="check" className="check-icon" />
									<p className="vl-subheading f-500 vl-white">Alerts and Notifications</p>
									<div className="straight-line"></div>
								</article>
								<article className="benefit-card">
									<img src={check} alt="check" className="check-icon" />
									<p className="vl-subheading f-500 vl-white">Monitor Cold chain conditions</p>
									<div className="straight-line"></div>
								</article>
								<article className="benefit-card">
									<img src={check} alt="check" className="check-icon" />
									<p className="vl-subheading f-500 vl-white">Efficiently manage your inventory</p>
								</article>
							</section>
						</div>
						<div className="powerby">
							<p className="vl-small f-700 vl-white">Powered by</p>
							<img src={statwig} alt="statwig" className="statwig-power-logo" />
						</div>
						<img src={Illustration} alt="Illustration" className="connect-Illustration" />
					</div>
				</div>
				<div className="main-context-section form-grid-name">
					<div className="connection-mobile-header">
						<figure className="brand-logo">
							<img src={VaccineLedgerLogo} alt="vaccineledger" className="brand-logo-image" />
						</figure>
					</div>
					<div className="connection-body-container">
						<section className="back-navigation vl-link vl-grey-xs" onClick={handleBack}>
							<i className="fa-solid fa-arrow-left"></i>
							<p className="vl-subheading f-400">Back</p>
						</section>
						<div className="login-system-layout">
							{connection === "account" && <Account onUserDataSubmit={onUserDataSubmit} />}
							{connection === "organization" && (
								<Organization onUserDataSubmit={onUserDataSubmit} />
							)}
							{connection === "verify" && <Verify />}
              {connection === "success" && <Success />}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
