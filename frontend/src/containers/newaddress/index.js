import React, { useState } from "react";
import NewAddress from "../../components/newaddress";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";

const NewAddressContainer = (props) => {
  const [DashVisible, setDashVisible] = useState(false);
  const [content, setContent] = useState(true);
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <NewAddress
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

export default NewAddressContainer;
