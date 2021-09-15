import React from "react";
import NewOrder from "../../components/neworder";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const newOrderContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <NewOrder {...props} />
        </div>
      </div>
    </div>
  );
};

export default newOrderContainer;
