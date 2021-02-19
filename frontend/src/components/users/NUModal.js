import React, { useState } from "react";
import Role from "./role";

const NUModal = (props) => {
  const [selectedValue, setSelectedValue] = useState(-1);
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
          />
        </div>
      </div>
      <div className="p-1">
        <Role
          title="Power Users"
          description="Power Users Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="0"
          value="1"
        />
        <Role
          title="Admin"
          description="Admin Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="1"
          value="2"
        />
        <Role
          title="Affiliate"
          description="Affiliate Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="2"
          value="3"
        />
        <Role
          title="Sales Employee (Sr)"
          description="Sales Employee Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="3"
          value="4"
        />
        <Role
          title="Sales Employee (Jr)"
          description="Sales Employee Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="4"
          value="5"
        />
        <Role
          title="Warehouse Employee (Jr)"
          description="Warehouse Employee Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="5"
          value="6"
        />
        <Role
          title="Warehouse Employee (Jr)"
          description="Warehouse Employee Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="6"
          value="7"
        />
        <Role
          title="Warehouse Viewer"
          description="Warehouse Viewer Description"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          i="7"
          value="8"
        />
      </div>
      <div className="d-flex w-100 divider"></div>
      <div className="d-flex flex-row-reverse p-3">
        <button type="button" className="ml-3 btn btn-orange">
          {props.buttonText}
        </button>
        <button type="button" className="btn btn-outline-dark">
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default NUModal;
