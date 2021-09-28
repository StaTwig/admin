import { useDispatch} from 'react-redux';
import React, { useState, useEffect, useSelector } from 'react';
import AddProduct from '../../components/addproduct';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';



const AddProductContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <AddProduct {...props}/>
        </div>
      </div>
    </div>
  );
};

export default AddProductContainer;

