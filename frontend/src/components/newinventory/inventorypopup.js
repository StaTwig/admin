import React, { useState } from "react";
import './style.scss';
import Checked from "../../assets/icons/checked.svg";


const InventoryPopUp = () => {
  return (
    <div className="inventorypopup">
      <div className="d-flex justify-content-between flex-column align-items-center">
        <img src={Checked} width='80' height='80' className="mb-2" />
        <div className="alert font-weight-bold" >
          Success!
        </div>
        <div className="data">
          Your Inventory has been added Successfully!
        </div>
        <button className="btn-primary btn">OK</button>
      </div>

    </div>
  );
};

export default InventoryPopUp;


