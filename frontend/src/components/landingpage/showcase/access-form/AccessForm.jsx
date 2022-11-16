import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import "./AccessForm.css";
import { Link, useHistory } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import { COUNTRY_CODE } from "../../../../constants/countryCode";
import { useDispatch } from "react-redux";
import {
  googleLogin,
  sendOtp,
  verifyAuth,
} from "../../../../actions/userActions";
import { turnOff, turnOn } from "../../../../actions/spinnerActions";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../../../../actions/userActions";
import setAuthToken from "../../../../utils/setAuthToken";
import TorusAuth from "./TorusAuth";
import { Dialog, DialogContent } from "@mui/material";
import FailedPopUp from "../../../../shared/PopUp/failedPopUp";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function AccessForm() {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [EmailPhone, setEmailPhone] = useState("email");

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    watch,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const watchEmail = watch("email");
  const watchPhone = watch("phone");

  useEffect(() => {
    setValue("email", "");
    setValue("phone", "");
  }, [EmailPhone]);

  useEffect(() => {
    if (errors.email) setErrorMessage("Email ID is required!");
    else if (errors.phone) setErrorMessage("Phone Number is requried!");
  }, [errors]);

  useEffect(() => {
    if (watchEmail || watchPhone) setErrorMessage("");
  }, [watchEmail, watchPhone]);

  const validateEmailPhone = () => {
    try {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (watchEmail && watchEmail.match(emailRegex) === null) {
        throw new Error("Email ID is invalid!");
      }
      if (watchPhone && isValidPhoneNumber(watchPhone) === false) {
        throw new Error("Phone number is invalid!");
      }
    } catch (err) {
      throw err;
    }
  };

  const onSendOtp = useCallback(async (formData) => {
    try {
      dispatch(turnOn());
      if (!formData.email && !formData.phone) {
        console.log("Please provide email or phone!");
        dispatch(turnOff());
      } else {
        validateEmailPhone();
        const data = {
          emailId: formData.email ? formData.email : formData.phone,
        };
        const result = await sendOtp(data, i18n.language);
        if (result?.status === 200) {
          history.push(`/verify?emailId=${data.emailId}`);
        } else {
          console.log("Error - ", result.data.message);
          throw new Error(result?.data?.message);
        }
        dispatch(turnOff());
      }
    } catch (err) {
      console.log(err);
      dispatch(turnOff());
      setErrorMessage(err.message);
      // setErrorModal(true);
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
    } catch (err) {
      throw err;
    }
  };

  const onAuthSuccess = async (data, type) => {
    try {
      let result;
      if (type === "torus") {
        result = await verifyAuth(data);
      } else if (type === "google") {
        result = await googleLogin({ tokenId: data.tokenId });
      }

      if (result) {
        if (result.status === 200) {
          // Set auth token
          setSessionToken(result);
          // const intelEnabled = props.user?.type == "Third Party Logistics" ? true : false;
          history.push(`/overview`);
        } else if (result.status === 401) {
          // Redirect to signup if user does not exist
          history.push({
            pathname: "/signup",
            state: data,
          });
        } else {
          const err = result.data.message;
          console.log(err);
          setErrorMessage(err);
          // setErrorModal(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFailure = (data) => {
    console.log("Auth failed - ", data);
  };

  return (
    <div className="connect-popup-container">
      <div className="auto-connect-options">
        <GoogleAuth t={t} onAuthSuccess={onAuthSuccess} onFailure={onFailure} />
        <TorusAuth t={t} onAuthSuccess={onAuthSuccess} onFailure={onFailure} />
      </div>
      <div className="option-divider">
        <div className="divider-bar"></div>
        <p className="vl-subheading vl-grey-xs">{t("or")}</p>
        <div className="divider-bar"></div>
      </div>
      <form onSubmit={handleSubmit(onSendOtp)}>
        {EmailPhone === "email" ? (
          <div className="manual-connect-options">
            <div className="input-space-holder">
              <Controller
                name="email"
                control={control}
                rules={{ required: watchPhone === "" }}
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label={t("email_id")}
                    variant="outlined"
                    fullWidth
                    autoCapitalize="none"
                    error={errorMessage !== ""}
                    {...field}
                  />
                )}
              />
              {errorMessage !== "" && (
                <span className="error-msg text-dangerS">{errorMessage}</span>
              )}
            </div>
            <div className="change-input-option">
              <div
                className="vl-flex vl-align-center vl-gap-xs vl-blue vl-link"
                onClick={() => setEmailPhone("phone")}
              >
                <i className="fa-solid fa-phone vl-icon-xs"></i>
                <p className="vl-note">{t("use_phone")}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="manual-connect-options">
            <div className="input-space-holder">
              <Controller
                name="phone"
                control={control}
                rules={{ required: watchEmail === "" }}
                render={({ field }) => (
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={COUNTRY_CODE}
                    className="vl-custom-phone-input"
                    placeholder={t("enter_phone_number")}
                    maxLength={15}
                    style={{
                      borderColor: errorMessage !== "" ? "#da323c" : "",
                    }}
                    {...field}
                  />
                )}
              />
              {errorMessage !== "" && (
                <span className="error-msg text-dangerS">{errorMessage}</span>
              )}
            </div>
            <div className="change-input-option">
              <div
                className="vl-flex vl-align-center vl-gap-xs vl-blue  vl-link"
                onClick={() => setEmailPhone("email")}
              >
                <i className="fa-solid fa-envelope vl-icon-xs"></i>
                <p className="vl-note vl-link">{t("use_email")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="popup-actions">
          <button
            type="submit"
            className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
          >
            {/* {t("sign")} {t("in")} */}
            Sign In
          </button>
        </div>
      </form>
      <section className="further-links vl-justify-auto">
        <p className="vl-note vl-grey-xs f-400">
          {t("dont_have_an_account")}{" "}
          <Link to="/signup" className="vl-blue vl-link">
            {t("create_account")}
          </Link>
        </p>
      </section>
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
    </div>
  );
}
