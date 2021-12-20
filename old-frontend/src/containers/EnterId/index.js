import React from "react";
import EnterId from "../../components/enterId";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const enterId = (props) => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <EnterId {...props} />
        </div>
      </div>
    </div>
  );
};
export default enterId;
