import React, { useState, useRef, useEffect } from "react";
import Role from "./role";
import { Formik } from "formik";
import DropdownButton from "../../shared/dropdownButtonGroup";
import LocationAddUser from "./LocationAddUser";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";

import { t } from "i18next";

const NUModal = (props) => {
  const [selectedValue, setSelectedValue] = useState(-1);
  const [buttonText, setButtonText] = useState("NEXT")
  const [wh, setWH] = useState("Select a Location");
  const [disableButton, setDisableBtn] = useState(true);
  const [disableRoleBtn, setDisanleRole] = useState(false);
  const [changeComponent, setChangeComponent] = useState('role');
  const [phoneNumber, setPhoneNumber] = useState(props.data?.phoneNumber);
  const [userAlreadyExits, setUserAlreadyExits] = useState(false);
  const [addUserBtnDisable, setAddUserBtnDisable] = useState(true);
  const { permissions, onHide, onSuccess, data, setData, addresses, redirectToConfigurationPage } = props;

  const usersList = useSelector((state) => {
    // setUsersData(state.organisation.users);
    return state.organisation.users;
  });

  const setRole = (role) => {
    setSelectedValue(role);
    setData({ ...data, ...{ role: role } });
  };

  const setEmail = (event) => {
    setData({ ...data, ...{ emailId: event.target.value } });
  };

  const setFirstName = (event) => {
    setData({ ...data, ...{ firstName: event.target.value } });
  };

  const setLastName = (event) => {
    setData({ ...data, ...{ lastName: event.target.value } });
  };

  const setWarehouse = (name, id) => {
    setWH(name);
    setData({ ...data, ...{ warehouse: id } });
  };

  // Enabling next button on validation
  useEffect(() => {
    var flag = false;
    // Email or Phone should exist
    if (data?.emailId) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data?.emailId)) {
        flag = true;
      }
    } else {
      if (!data?.phoneNumber) {
        flag = true;
      } else {
        flag = false;
      }
    }
    // Role should exist
    if (!data?.role) {
      flag = true;
    }
    
    setDisableBtn(flag);
  })

  const formikRef = useRef();
  const scrolling = useRef()

  const unDisableNxtBtn = () => {
    if (phoneNumber?.length > 3)
      return true;
    if (props.data.id && disableRoleBtn) {
      return false;
    }
    else {
      if (userAlreadyExits)
        return true
      else if (disableRoleBtn && disableButton)
        return false;
      else
        return true
    }
  }

  const verifyEmailIds = (event) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(event.target.value)) {
      setUserAlreadyExits(false)
    }
    else {
      setUserAlreadyExits(false)
      usersList.forEach((user, index) => {
        if (user.emailId === event.target.value) {
          setUserAlreadyExits(true)
        }
      })
    }
  }

  const getSelectedAddress = (value) => {
    // debugger
    setAddUserBtnDisable(value)
  }

  return (
    <div className="p-0">
      <Formik
        innerRef={formikRef}
        initialValues={{ email: data?.ref, role: "", warehouse: "", first_name: "", last_name: "" }}
        validate={(values) => {
          const errors = {};
          // console.log(values);

          // if (!values.email && !phoneNumber) {
          //   errors.email = t('Required');
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) && !phoneNumber
          // ) {
          //   errors.email = "Invalid email address";
          // }
          if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (props.isAddNewUser && !values.first_name) {
            errors.first_name = "Enter first name";
          }

          if (props.isAddNewUser && !values.last_name) {
            errors.last_name = "Enter last name";
          }

          if (!values.role) {
            errors.role = t('Required');
          }
          if (!values.warehouse) {
            errors.warehouse = t('Required');
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
              {t('Enter the email address of the users you\'d like to add or invite and choose the role they should have.')}
            </p>

            {props.isAddNewUser &&
              <div className="pl-4 pr-4 pt-3 d-flex pb-4"
                style={{ justifyContent: 'space-between' }}>
                <div className="input-group" style={{ width: '49.5%', alignItems: 'center' }}>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className={`form-control ${errors.first_name && touched.first_name ? "border-danger" : ""
                      }`}
                    placeholder={t('enter_first_name')}
                    onChange={(e) => {
                      setFirstName(e);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                </div>
                <div className="input-group" style={{ width: '49.5%', alignItems: 'center' }}>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className={`form-control ${errors.last_name && touched.last_name ? "border-danger" : ""
                      }`}
                    placeholder={t('enter_last_name')}
                    onChange={(e) => {
                      setLastName(e);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                </div>
              </div>
            }
            <div className="pl-4 pr-4 pt-3 d-flex pb-4 shadow"
              style={{ justifyContent: 'space-between' }}>
              <div className="input-group" style={{ width: '45%', alignItems: 'center' }}>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`form-control ${errors.email && touched.email ? "border-danger" : ""
                    }`}
                  placeholder={t('enter_email')}
                  readOnly={data?.ref != undefined ? true : false}
                  onChange={(e) => {
                    verifyEmailIds(e);
                    setEmail(e);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                  disabled={changeComponent === "address" && disableButton ? true : false}
                />
                {userAlreadyExits && (
                  <div style={{ position: "absolute", top: "4.8rem", left: "2rem", zIndex: "5", color: "rgb(244, 33, 46)" }}>
                    <span>{t('Email_ID_Already_registered')}</span>
                  </div>
                )}
              </div>
              <div className="input-group" style={{ width: '45%', alignItems: 'center' }}>
                <PhoneInput
                  className={`form-group mobile-number ${errors.email ? "border-danger" : ""
                    }`}
                  country={"cr"}
                  preferredCountries={["cr"]}
                  placeholder={t("enter_phone_number")}
                  style={{ position: "absolute", marginLeft: "2%", marginBottom: "0.5%" }}
                  value={phoneNumber}
                  disabled={props.isAddNewUser ? false : true}
                  onChange={(phone) => {
                    setPhoneNumber(phone);
                    setData({ ...data, ...{ emailId: undefined }, ...{ phoneNumber: phone } });
                    setUserAlreadyExits(false);
                  }}
                />
              </div>

              {userAlreadyExits && (
                <div style={{ position: "absolute", top: "4.8rem", left: "2rem", zIndex: "5", color: "rgb(244, 33, 46)" }}>
                  <span>{t('email_has_already_been_taken')}</span>
                </div>
              )}
              <button
                // disabled={errors}
                style={{ visibility: buttonText === "NEXT" ? "" : "hidden" }}
                className="redirect-button"
                onClick={() => redirectToConfigurationPage()}>
                <i className="plus-icon fa fa-plus pr-2" aria-hidden="true"></i>
                <span className="txt-btn" style={{ fontSize: '12px' }}>{t('add_new_user_role')}</span>
              </button>
            </div>
            <div className="p-1" ref={scrolling} style={{ height: "auto", overflow: "scroll", minHeight: "5rem", overflowX: "hidden", maxHeight: "20rem" }}>
              {changeComponent === "role" ? (
                <div>
                  {permissions.map((permission, index) => (
                    <Role
                      key={index}
                      title={permission.role}
                      description={permission.role + " " + t("Description")}
                      selectedValue={selectedValue}
                      setSelectedValue={setRole}
                      i={index}
                      value={permission.role}
                      listPermission={permission.permissions}
                      name="role"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      disableRoleBtn={setDisanleRole}
                    />
                  ))}
                  {errors.role && touched.role && (
                    <span className="pl-3 error-msg text-danger">
                      {errors.role}
                    </span>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: `${addresses.length < 2 ? `unset` : `space-evenly`}` }}>
                  {/* {addresses.map((address,index) => ( */}
                  <LocationAddUser
                    referance={formikRef}
                    addresses={addresses}
                    onSelect={(data) => {
                      setWarehouse(data.title, data.id)
                    }}
                    selectedAddress={data}
                    name={wh}
                    getSelectedAddress={getSelectedAddress}
                    addUserBtnDisable={addUserBtnDisable}
                  ></LocationAddUser>
                  {/* ))} */}
                </div>
              )}

            </div>


            {/* <div className="p-4 d-flex flex-column">
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
            </div> */}
            <div className="d-flex w-100 divider"></div>
            <div className="d-flex flex-row-reverse p-3">
              {changeComponent === "role" ?
                (
                  <button type="button" className="ml-3 btn btn-orange" onClick={() => { setChangeComponent('address'); setButtonText('ADD USER'); scrolling.current.scrollTop = 0 }}
                    disabled={disableButton || userAlreadyExits}>
                    {t(buttonText)}
                    </button>
                  ) : (
                    <button type="button" onClick={() => { formikRef.current.submitForm() }} className="ml-3 btn btn-orange" disabled={addUserBtnDisable || userAlreadyExits}>
                      {t(buttonText)}
                    </button>
                  )}
              {changeComponent === "address" &&
                <button
                  type="button"
                  onClick={(e) => { setChangeComponent('role'); setButtonText('NEXT'); scrolling.current.scrollTop = 0 }}
                  className="btn btn-outline-dark"
                >
                  {t('back')}
                </button>
              }
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NUModal;
