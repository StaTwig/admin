import React from "react";

import StatusBar from './statusBar';
import Filter from '../../assets/icons/Filter.svg';
import updownarrow from "../../assets/icons/up-and-down-white.svg";
import searchingIcon from "../../assets/icons/searching@2x.png";
import Table from '../../shared/table';
import './style.scss';


const trackAndTrace = (props) => {
  const tableHeaders = {
    coloumn1 : "Transaction Id",
    coloumn2:  "From",
    coloumn3:  "To",
    coloumn4:  "date",
    coloumn5:  "Vaccine",
   
}
  return (
    <div className="trackTrace">
      <div className="d-flex justify-content-between mb-3">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <button className="btn btn-main-blue fontSize20 font-bold floated">
            <div className="allfilterbtn">
              <img src={Filter} />
              <span> All Filter</span>
              <img src={updownarrow} />
            </div>
          </button>
          <img src={searchingIcon} alt="searching" className="search-icon" />
        </div>
      </div>
      <StatusBar />
      <div className="ribben-space ">
        <h1>Latest Transactions</h1>
        <Table data={tableHeaders}{...props} />
      </div>
    </div >
  );
};

export default trackAndTrace;

