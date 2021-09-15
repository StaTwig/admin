import React from "react";
import Addlocation from "../../components/Addlocation";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const AddLocationContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <Addlocation {...props} />
        </div>
      </div>
    </div>
  );
};

export default AddLocationContainer;
