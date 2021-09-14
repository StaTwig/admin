import React from "react";
import AddNewCategory from "../../components/addNewCategory";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const AddNewCategoryContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <AddNewCategory {...props} />
        </div>
      </div>
    </div>
  );
};

export default AddNewCategoryContainer;
