import React, { useState } from "react";
import "./Connection.css";
import Vaccineledgerlight from "../../assets/files/logos/vaccineledger-light.svg";
import VaccineLedgerLogo from "../../assets/files/logos/vaccineledger.svg";
import statwig from "../../assets/files/logos/statwig-logo.png";
import check from "../../assets/files/icons/check.svg";
import Vaccine from "../../assets/files/images/illustration/vaccine.png";
import Account from "./account/Account";
import Organization from "./organization/Organization";
import Verify from "./verify/Verify";
import { useDispatch } from "react-redux";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import { registerUser, setCurrentUser } from "../../actions/userActions";
import { useTranslation } from "react-i18next";
import Success from "./success/Success";
import { useHistory } from "react-router";
import { Dialog, DialogContent } from "@mui/material";
import FailedPopUp from "../../shared/PopUp/failedPopUp";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export default function Connection(props) {
  const { connection } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

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

  const setSessionToken = (result) => {
    try {
      const token = result.data.data?.token;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      localStorage.setItem("theLedgerToken", token);
      localStorage.setItem("bkp", result.data.data.permissions?.permissions);
      dispatch(setCurrentUser(decoded));
    } catch (err) {
      throw err;
    }
  };

  const onUserDataSubmit = async (data, isFinal = false) => {
    try {
      let values = { ...registerData, ...data };
      setRegisterData(values);
      if (isFinal) {
        // API call to backend
        dispatch(turnOn());
        let reqData = {
          firstName: values.firstName,
          lastName: values.lastName,
          emailId: values.email,
          phoneNumber: values.phone,
          organisationId: values.organization.id,
        };

        if (values.organizationExists === "new") {
          reqData.organisationName = values.organizationName;
          if (!values.skipOrgRegistration) {
            reqData.address = {
              line1: values.address,
              pincode: values.pincode,
              city: values.city,
              state: values.state,
              country: values.country,
              region: values.region,
            };
          } else {
            reqData.skipOrgRegistration = true;
          }
          reqData.type = values.organizationType;
          reqData.organisationId = 0;
        }

        console.log("Request Data - ", reqData);

        const result = await registerUser(reqData, i18n.language);
        if (result.status === 200) {
          if (values.skipOrgRegistration && result.data.data) {
            setSessionToken(result);
            history.push("/overview");
          } else {
            history.push("/success");
          }
        } else {
          console.log("Error - ", result.data);
          throw new Error(result.data.message);
        }
        dispatch(turnOff());
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      setErrorModal(true);
      dispatch(turnOff());
    }
  };

  const handleBack = (event) => {
    if (connection === "organization") {
      history.push("/signup");
    } else {
      history.push("/");
    }
  };

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
                  <p className="vl-subheading f-500 vl-white">
                    {t("side_point-1")}
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    {t("side_point-2")}
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    {" "}
                    {t("side_point-3")}
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    {t("side_point-4")}
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    {t("side_point-5")}
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    {t("side_point-6")}
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    {t("side_point-7")}
                  </p>
                </article>
              </section>
            </div>
            <div className="powerby">
              <p className="vl-small f-700 vl-white"> {t("power_by")}</p>
              <img src={statwig} alt="statwig" className="statwig-power-logo" />
            </div>
            <img
              src={Vaccine}
              alt="Illustration"
              className="connect-Illustration"
            />
          </div>
        </div>
        <div className="main-context-section form-grid-name">
          <div className="connection-mobile-header">
            <figure className="brand-logo">
              <img
                src={VaccineLedgerLogo}
                alt="vaccineledger"
                className="brand-logo-image"
              />
            </figure>
          </div>
          <div className="connection-body-container">
            <section
              className="back-navigation vl-link vl-grey-xs"
              onClick={handleBack}
            >
              <i className="fa-solid fa-arrow-left"></i>
              <p className="vl-subheading f-400">{t("back")}</p>
            </section>
            <div className="login-system-layout">
              {connection === "account" && (
                <Account
                  onUserDataSubmit={onUserDataSubmit}
                  setErrorMessage={setErrorMessage}
                  setErrorModal={setErrorModal}
                  t={t}
                />
              )}
              {connection === "organization" && (
                <Organization t={t} onUserDataSubmit={onUserDataSubmit} />
              )}
              {connection === "verify" && <Verify t={t} />}
              {connection === "success" && <Success t={t} />}
            </div>
          </div>
        </div>
      </div>
      {errorModal && (
        <Dialog open={errorModal} onClose={() => setErrorModal(false)}>
          <DialogContent>
            <FailedPopUp
              t={t}
              onHide={() => setErrorModal(false)}
              message={errorMessage}
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
