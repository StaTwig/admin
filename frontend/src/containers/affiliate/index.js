import React, { useState } from "react";
import Affiliate from "../../components/affiliate";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";

const AffiliateContainer = (props) => {
  const [DashVisible, setDashVisible] = useState(false);
  const [content, setContent] = useState(true);
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Affiliate
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

export default AffiliateContainer;
