import React, { useState } from "react";
import Role from "./role";

const NUModal = (props) => {
  const [selectedValue, setSelectedValue] = useState(-1);
  const { permissions, onHide, onSuccess, data, setData } = props;
  const setRole = (role) => {
    setSelectedValue(role);
    setData({ ...data, ...{ role: role } });
  };

  const setEmail = (email) => {
    setData({ ...data, ...{ emailId: email } });
  };

  return (
    <div className="p-0">
      <p
        className="pl-4 pt-2 txtColor"
        style={{ marginTop: -25, fontSize: 14 }}
      >
        Enter the email address of the users you'd like to add or invite and
        choose the role they should have.
      </p>
      <div className="pl-4 pr-4 pt-3 d-flex pb-4 shadow">
        <div className="input-group">
          <input
            type="text"
            className="form-control "
            placeholder="Enter the email"
            readOnly={data?.ref != undefined ? true : false}
            defaultValue={data?.ref}
            onChange={setEmail}
          />
        </div>
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
          />
        ))}
      </div>
      <div className="d-flex w-100 divider"></div>
      <div className="d-flex flex-row-reverse p-3">
        <button
          type="button"
          onClick={onSuccess}
          className="ml-3 btn btn-orange"
        >
          {props.buttonText}
        </button>
        <button type="button" onClick={onHide} className="btn btn-outline-dark">
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default NUModal;
