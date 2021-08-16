import React, { useState } from "react";
import Role from "./role";
import { Formik } from "formik";
import DropdownButton from "../../shared/dropdownButtonGroup";

const NUModal = (props) => {
  const [selectedValue, setSelectedValue] = useState(-1);
  const [wh, setWH] = useState("Select a Location");
  const { permissions, onHide, onSuccess, data, setData, addresses, redirectToConfigurationPage } = props;
  const setRole = (role) => {
    setSelectedValue(role);
    setData({ ...data, ...{ role: role } });
  };

  const setEmail = (event) => {
    setData({ ...data, ...{ emailId: event.target.value } });
  };

  const setWarehouse = (name, id) => {
    setWH(name);
    setData({ ...data, ...{ warehouse: id } });
  };

  return (
    <div className="p-0">
      <Formik
        initialValues={{ email: data?.ref, role: "", warehouse: "" }}
        validate={(values) => {
          const errors = {};
          // console.log(values);

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.role) {
            errors.role = "Required";
          }
          if (!values.warehouse) {
            errors.warehouse = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSuccess();
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
            <p
              className="pl-4 pt-2 txtColor"
              style={{ marginTop: -25, fontSize: 14 }}
            >
              Enter the email address of the users you'd like to add or invite
              and choose the role they should have.
            </p>
            <div className="pl-4 pr-4 pt-3 d-flex pb-4 shadow" 
              style={{ justifyContent: 'space-between'}}>
              <div className="input-group" 
                style={{ width: '65%', alignItems: 'center' }}>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`form-control ${
                    errors.email ? "border-danger" : ""
                  }`}
                  placeholder="Enter the email"
                  readOnly={data?.ref != undefined ? true : false}
                  onChange={(e) => {
                    setEmail(e);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <button 
                // disabled={errors}
                className="redirect-button" 
                onClick={() => redirectToConfigurationPage()}>
                <i className="plus-icon fa fa-plus pr-2" aria-hidden="true"></i>
                <span className="txt-btn">{"Add New User Role"}</span>
              </button>
            </div>
            <div className="p-1">
              {permissions.map((permission, index) => (
                <Role
                  key={index}
                  title={permission.role}
                  description={permission.role + " Description"}
                  selectedValue={selectedValue}
                  setSelectedValue={setRole}
                  i={index}
                  value={permission.role}
                  listPermission={permission.permissions}
                  name="role"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              ))}
              {errors.role && touched.role && (
                <span className="pl-3 error-msg text-danger">
                  {errors.role}
                </span>
              )}
            </div>
            <div className="p-4 d-flex flex-column">
              <div className="input-group">
                <DropdownButton
                  groups={addresses}
                  onSelect={(data) => {
                    setWarehouse(data.title, data.id);
                    setFieldValue("warehouse", data.id);
                  }}
                  name={wh}
                />
              </div>
              {errors.warehouse && touched.warehouse && (
                <span className="pl-3 error-msg text-danger">
                  {errors.warehouse}
                </span>
              )}
            </div>
            <div className="d-flex w-100 divider"></div>
            <div className="d-flex flex-row-reverse p-3">
              <button type="submit" className="ml-3 btn btn-orange">
                {props.buttonText}
              </button>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-outline-dark"
              >
                CANCEL
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NUModal;
