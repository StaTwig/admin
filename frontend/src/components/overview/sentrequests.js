import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import DropdownButton from "../../shared/dropdownButtonGroup";
import { Formik } from "formik";

const SentRequests = (props) => {
  const [employeeTxt, setEmployeeTxt] = useState("Select an employee");
  const [orgTxt, setOrgTxt] = useState("Select a organisation");
  const { organisationsList, disableShadow, sendAffiliate, users } = props;
  return (
    <Formik
      initialValues={{
        employee: "",
        org: "",
      }}
      enableReinitialize
      validate={(values) => {
        console.log(values);

        const errors = {};
        if (!values.employee) {
          errors.employee = "Required";
        }
        if (!values.org) {
          errors.org = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        setEmployeeTxt("Select an employee");
        setOrgTxt("Select a organisation");
        sendAffiliate(values);
        resetForm({
          values: {
            employee: "",
            org: "",
          },
          isSubmitting: true,
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div
            className={`card rounded ${
              disableShadow ? "" : "shadow"
            } bg-white border border-white mt-3 ml-2 p-3`}
          >
            <div className="card-body pb-3">
              <div className="form-group w-100 justify-content-between d-flex flex-row">
                <span className="dropdownLabel align-self-center txtColor ">
                  Employee
                </span>
                <div className="w-50 ">
                  <DropdownButton
                    groups={users}
                    onSelect={(data) => {
                      setEmployeeTxt(data.firstName + " " + data.lastName);
                      setFieldValue("employee", data.id);
                    }}
                    name={employeeTxt}
                    namer="employee"
                    error={errors.employee}
                  />
                  {errors.employee && touched.employee && (
                    <span className="pl-1 error-msg text-danger">
                      {errors.employee}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group w-100 justify-content-between d-flex flex-row">
                <span className="dropdownLabel align-self-center txtColor ">
                  Organisation Name
                </span>
                <div className="w-50 ">
                  <DropdownButton
                    groups={organisationsList}
                    onSelect={(data) => {
                      setOrgTxt(data.name);
                      setFieldValue("org", data.id);
                    }}
                    name={orgTxt}
                    namer="org"
                    error={errors.org}
                  />
                  {errors.org && touched.org && (
                    <span className="pl-1 error-msg text-danger">
                      {errors.org}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-default orangeBtn">
                Send request
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SentRequests;
