import React, { useState,useRef } from "react";
import Role from "./role";
import { Formik } from "formik";
import DropdownButton from "../../shared/dropdownButtonGroup";
import LocationAddUser from "./LocationAddUser";
import { useDispatch, useSelector } from "react-redux";

const NUModal = (props) => {
  const [selectedValue, setSelectedValue] = useState(-1);
  const [buttonText, setButtonText] = useState("NEXT")
  const [wh, setWH] = useState("Select a Location");
  const [disableButton, setDisableBtn] = useState(false);
  const [disableRoleBtn, setDisanleRole] = useState(false);
  const [changeComponent, setChangeComponent] = useState('role');
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
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(event.target.value))
      setDisableBtn(false)
    else
      setDisableBtn(true)
  };

  const setWarehouse = (name, id) => {
    setWH(name);
    setData({ ...data, ...{ warehouse: id } });
  };

  const formikRef = useRef();
  const scrolling = useRef()

  console.log(disableRoleBtn);

  const unDisableNxtBtn = () => {
    if(props.data.id && disableRoleBtn) {
      return false;
    }
    else{
      if(userAlreadyExits) 
        return true
      else if(disableRoleBtn && disableButton)
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
      const valifyEmail = usersList.forEach((user, index) => {
        if (user.emailId === event.target.value) {
          setUserAlreadyExits(true)
          console.log("user already exits")
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
                  placeholder="Enter email"
                  readOnly={data?.ref != undefined ? true : false}
                  onChange={(e) => {
                    verifyEmailIds(e);
                    setEmail(e);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                  disabled={ changeComponent === "address" && disableButton ? true : false }
                />
              </div>
                {userAlreadyExits && (
                  <div  style={{position:"absolute",top:"4.8rem",left:"2rem",zIndex:"5",color:"rgb(244, 33, 46)"}}>
                     <span>{"Email has already been taken."}</span>
                  </div>
                )}
              <button 
                // disabled={errors}
                style={{visibility:buttonText === "NEXT" ? "" : "hidden"}}
                className="redirect-button" 
                onClick={() => redirectToConfigurationPage()}>
                <i className="plus-icon fa fa-plus pr-2" aria-hidden="true"></i>
                <span className="txt-btn">{"Add New User Role"}</span>
              </button>
            </div>
            <div className="p-1" ref={scrolling} style={{height:"auto", overflow:"scroll",minHeight:"5rem",overflowX:"hidden", maxHeight:"20rem"}}>
              {changeComponent === "role" ? (
                <div>
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
                      disableRoleBtn = {setDisanleRole}
                    />
                  ))}
                   {errors.role && touched.role && (
                       <span className="pl-3 error-msg text-danger">
                         {errors.role}
                      </span>
                    )}
                </div>
              ) : (
                    <div style={{display:"flex",flexDirection:"row", flexWrap:"wrap",justifyContent: `${addresses.length < 2  ? `unset` : `space-evenly`}`}}>
                      {/* {addresses.map((address,index) => ( */}
                        <LocationAddUser 
                          referance = {formikRef}
                          addresses={addresses}
                          onSelect = {(data) => {
                            setWarehouse(data.title,data.id)
                          }}
                          selectedAddress = {data}
                          name={wh}
                          getSelectedAddress = {getSelectedAddress}
                          addUserBtnDisable = {addUserBtnDisable}
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
                  <button type="button" className="ml-3 btn btn-orange" onClick={() => {setChangeComponent('address');setButtonText('ADD USER'); scrolling.current.scrollTop = 0  }} disabled = {unDisableNxtBtn()}>
                    {buttonText}
                  </button>
                ) : (
                  <button type="button" onClick={() =>{formikRef.current.submitForm()}} className="ml-3 btn btn-orange" disabled={addUserBtnDisable}>
                    {buttonText}
                  </button>
                )}
                {changeComponent === "address" && 
                  <button
                    type="button"
                    onClick={(e) => {setChangeComponent('role');setButtonText('NEXT'); scrolling.current.scrollTop = 0}}
                    className="btn btn-outline-dark"
                  >
                    Back
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
