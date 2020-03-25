import React from "react";
import EditTable from '../../shared/table/editTabel';
import updownArrow from "../../assets/icons/up-and-down-dark.svg";
import calenderDark from "../../assets/icons/calendar-grey.svg";
import Add from '../../assets/icons/add.svg';
import './style.scss';

const AddInventory = () => {
  return (
    <div className="addinventory">
      <h1 className="breadcrumb">ADD INVENTORY</h1>
      <EditTable />
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>
      <button className="btn-primary btn"> Add Inventory</button>
    </div>
  );
};

export default AddInventory;

