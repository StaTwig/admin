import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { turnOff, turnOn } from "../../../actions/spinnerActions";
import {
  sendOtp,
  setCurrentUser,
  verifyOtp,
} from "../../../actions/userActions";
import { useTranslation } from "react-i18next";
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { Controller, useForm } from "react-hook-form";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Verify({ t }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { i18n } = useTranslation();

  const [otp, setOtp] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertDetails, setAlertDetails] = React.useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const {
    watch,
    control,
    setFocus,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
  });

  useEffect(() => {
    Object.keys(errors).length
      ? setErrorMessage("OTP is required!")
      : setErrorMessage("");
  }, [errors]);

  const handleAlertClose = (event, reason) => {
    setAlertDetails({});
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const resendOtp = async () => {
    console.log("triggered!");
    try {
      const params = location.search.split("emailId=");
      if (params.length > 1) {
        dispatch(turnOn());
        const emailId = params[1];
        const result = await sendOtp({ emailId: emailId }, i18n.language);
        if (result?.status === 200) {
          console.log("Otp resent successfully!");
          setAlertDetails({
            type: "success",
            message: "Otp resent successfully!",
          });
          setOpenAlert(true);
        } else {
          console.log("Error in resending otp!");
          setAlertDetails({ type: "error", message: result?.data?.message });
          setOpenAlert(true);
        }
        dispatch(turnOff());
      }
    } catch (err) {
      console.log(err);
      dispatch(turnOff());
    }
  };

  const otpChange = (index) => {
    return (event) => {
      setErrorMessage("");
      let value = event.target.value;
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setValue(`otp${index}`, value);
      setOtpArray(otpArrayCopy);
      let entireOtp = otpArrayCopy.join("");
      setOtp(entireOtp);
      if (value !== "") {
        if (index < 3) setFocus(`otp${index + 1}`);
        else setFocus("otp3");
      }
    };
  };

  const onOtpKeyPress = (index) => {
    return ({ nativeEvent: { key: value } }) => {
      if (value === "Backspace" && otpArray[index] === "") {
        if (index > 0) setFocus(`otp${index - 1}`);
        else setFocus("otp0");
      }
    };
  };

  const handleVerifyOtp = async (values) => {
    const params = location.search.split("emailId=");
    if (params.length > 1) {
      dispatch(turnOn());
      const emailId = params[1];
      const data = { emailId, otp };
      const result = await verifyOtp(data, i18n.language);
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
        <form
          onSubmit={handleSubmit(handleVerifyOtp)}
          className="account-form-container"
        >
          <hgroup className="form-headers">
            <h1 className="vl-heading f-700 vl-black">{t("verify_head")}</h1>
            <h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm f-500-sm">
              {t("verify_msg")}
            </h2>
          </hgroup>
          <section className="vl-input-group form-auto-fill-section">
            <div className="input-otp-column">
              {otpArray.map((val, index) => (
                <Controller
                  key={index}
                  name={`otp${index}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id={`otp${index}`}
                      className="vl-custom-textfield"
                      fullWidth
                      onChange={otpChange(index)}
                      onKeyUp={onOtpKeyPress(index)}
                      onKeyDown={onkeydown}
                      variant="outlined"
                      placeholder="*"
                      inputProps={{ maxLength: 1 }}
                      autoFocus={index === 0 ? true : undefined}
                      error={Boolean(errors[`otp${index}`])}
                    />
                  )}
                />
              ))}
            </div>
            <p
              className={`vl-body f-400 error-text ${
                errorMessage ? "visible" : "hide"
              }`}
            >
              {errorMessage ? errorMessage : "No Errors"}
            </p>
          </section>
          <section className="call-by-action">
            <button
              type="submit"
              className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
            >
              {t("verify")}
            </button>
          </section>
          <section className="further-links vl-justify-auto">
            <p className="vl-note vl-grey-xs f-400">
              {t("no_access_code")}{" "}
              <span onClick={resendOtp} className="vl-blue vl-link">
                {t("resend")}
              </span>
            </p>
          </section>
        </form>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertDetails?.type}
          sx={{ width: "100%" }}
        >
          {alertDetails?.message}
        </Alert>
      </Snackbar>
    </section>
  );
}
