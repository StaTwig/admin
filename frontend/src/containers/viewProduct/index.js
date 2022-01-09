import React, { useState } from "react";
import ViewInventory from "../../components/viewInventory";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from 'react-i18next';

const ViewProductContainer = (props) => {
const { t, i18n } = useTranslation();
  const [inventories, setInventories] = useState([props.location.state.data]);
  // console.log(props.location.state.data);
  //setInventories([]);
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <ViewInventory inventories={inventories} {...props} t={t}/>
        </div>
      </div>
    </div>
  );
};

export default ViewProductContainer;
