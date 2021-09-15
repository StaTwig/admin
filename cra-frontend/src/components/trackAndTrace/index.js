import React from "react";

import StatusBar from "./statusBar";
import Filter from "../../assets/icons/Filter.svg";
import updownarrow from "../../assets/icons/up-and-down-white.svg";
import searchingIcon from "../../assets/icons/searching@2x.png";
import Table from "./table";
import "./style.scss";

const trackAndTrace = (props) => {
  return (
    <div className='trackTrace'>
      <div className='d-flex justify-content-between mb-3'>
        <h1 className='breadcrumb'>Track & Trace</h1>
        <div className='search-form'>
          <input type='text' className='form-control search-field' />
          <button className='btn btn-main-blue fontSize20 font-bold floated'>
            <div className='allfilterbtn'>
              <img src={Filter} alt='Filter' />
              <span> All Filter</span>
              <img src={updownarrow} alt='Arrow' />
            </div>
          </button>
          <img src={searchingIcon} alt='searching' className='search-icon' />
        </div>
      </div>
      <StatusBar />
      <div className='ribben-space '>
        <h5 className='heading ml-3'>Latest Transactions</h5>
        <Table {...props} />
      </div>
    </div>
  );
};

export default trackAndTrace;
