import React from "react";
import Editlocation from "../../components/editLocation";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const EditlocationContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <Editlocation {...props} />
        </div>
      </div>
    </div>
  );
};

export default EditlocationContainer;
