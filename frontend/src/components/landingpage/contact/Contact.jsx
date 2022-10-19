import React from "react";
import TextField from "@mui/material/TextField";
import "./Contact.css";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { COUNTRY_CODE } from "../../../constants/countryCode";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  newDemoRequest,
  validateRequest,
  verifyEmailAndPhoneNo,
} from "../../../actions/userActions";
import { turnOff, turnOn } from "../../../actions/spinnerActions";

export default function Contact({ handleClose, handleAlertClick, setAlertDetails }) {
  const dispatch = useDispatch();

  const {
    watch,
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    designation: "",
    softwareApplication: "",
    numberOfEmployees: "",
  });

  const watchEmail = watch("email");
  const watchPhone = watch("phone");

  const validateEmailPhone = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return new Promise((resolve, reject) => {
      try {
        let data;
        let type;

        if (watchEmail) {
          if (watchEmail.match(emailRegex) === null) {
            setError("email", {
              type: "custom",
              message: "Email ID is invalid!",
            });
            reject("Invalid email!");
          }
        }

        if (watchPhone) {
          if (isValidPhoneNumber(watchPhone) === false) {
            setError("phone", {
              type: "custom",
              message: "Phone Number is invalid!",
            });
            reject("Invalid phone!");
          }
        }

        validateRequest({ emailId: watchEmail }).then((res) => {
          if (res.status === 200) {
            resolve("Valid email/phone!");
          } else {
            setError("email", {
              type: "custom",
              message: "Duplicate Email ID!",
            });
            reject("Duplicate EmailId/Phone!");
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const requestDemo = async (values) => {
    try {
      console.log("Form values - ", values);
      validateEmailPhone().then(async (res) => {
        // Update the validate api to check duplicate requests
        // Call api to store request details!
        dispatch(turnOn());
        const data = {
          name: values.name,
          emailId: values.email,
          phoneNumber: values.phone,
          companyName: values.companyName,
          designation: values.designation,
          softwareApplication: values.softwareApplication,
          numberOfEmployees: values.numberOfEmployees,
        };

        const result = await newDemoRequest(data);
        if (result.status === 200) {
          setAlertDetails({type: "success", message: "Your request is received!"});
          handleAlertClick();
          dispatch(turnOff());
          handleClose();
        } else {
          throw new Error(result.data.message);
        }
      });
    } catch (err) {
      setAlertDetails({type: "error", message: err.message});
      handleAlertClick();
      dispatch(turnOff());
      console.log(err);
    }
  };

  return (
    <section className="contact-form">
      <div className="popup-close-icon" onClick={handleClose}>
        <i className="fa-solid fa-times vl-body"></i>
      </div>
      <hgroup className="form-headers-popup ">
        <h1 className="vl-subtitle f-700 vl-black">Let's Connect</h1>
        <h2 className="vl-body f-400 vl-grey-xs vl-line-sm">
          Our team will contact you very soon, Thankyou
        </h2>
      </hgroup>
      <form onSubmit={handleSubmit(requestDemo)}>
        <article className="vl-input-group">
          <div className="input-full-space">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  {...field}
                  error={Boolean(errors.name)}
                  helperText={Boolean(errors.name) && "Name is required!"}
                />
              )}
            />
          </div>
          <div className="input-full-space">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Business Email"
                  {...field}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email?.type === "required"
                      ? "Email is required!"
                      : errors.email?.message
                  }
                />
              )}
            />
          </div>
          <div className="input-full-space">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry={COUNTRY_CODE}
                  className="vl-custom-phone-input"
                  {...field}
                  maxLength={15}
                  style={{
                    borderColor: Boolean(errors.phone) ? "#da323c" : "",
                  }}
                />
              )}
            />
            {errors.phone && errors.phone && (
              <span
                className="error-msg text-dangerS"
                style={{ fontSize: "12px" }}
              >
                {errors.phone?.message}
              </span>
            )}
          </div>
          <div className="input-full-space">
            <Controller
              name="companyName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Company Name"
                  {...field}
                  error={Boolean(errors.companyName)}
                  helperText={
                    Boolean(errors.companyName) && "Company Name is required!"
                  }
                />
              )}
            />
          </div>
          <div className="input-full-space">
            <Controller
              name="designation"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Designation"
                  {...field}
                  error={Boolean(errors.designation)}
                  helperText={
                    Boolean(errors.designation) && "Designation is required!"
                  }
                />
              )}
            />
          </div>
          <div className="input-full-space">
            <Controller
              name="softwareApplication"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Software Application (Optional)"
                  {...field}
                  error={Boolean(errors.softwareApplication)}
                  helperText={
                    Boolean(errors.softwareApplication) &&
                    "Software Application is required!"
                  }
                />
              )}
            />
          </div>
          <div className="input-full-space">
            <Controller
              name="numberOfEmployees"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Number of employees (Optional)"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  {...field}
                  error={Boolean(errors.numberOfEmployees)}
                  helperText={
                    Boolean(errors.numberOfEmployees) &&
                    "Number of employees is required!"
                  }
                />
              )}
            />
          </div>
          <section className="call-by-action">
            <button
              className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
            >
              Submit
            </button>
          </section>
        </article>
      </form>
    </section>
  );
}
