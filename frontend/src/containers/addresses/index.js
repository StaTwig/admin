import React, { useState } from "react";
import Address from "../../components/addresses";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";

const AddressContainer = (props) => {
  const [DashVisible, setDashVisible] = useState(false);
  const [content, setContent] = useState(true);
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Address
            {...props}
            DashVisible={DashVisible}
            setDashVisible={setDashVisible}
            content={content}
            setContent={setContent}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressContainer;
