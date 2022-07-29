import React, { useState } from "react";
import BestSeller from "./bestseller/BestSeller";
import Instock from "./instocks/Instock";
import Outstock from "./outofstock/Outstock";
import DatePicker from "react-datepicker";
import "./Report.scss";
import Tab from "./tabs/Tab";

export default function Reports(props) {
  const {
    bestseller,
    inStock,
    outStock,
    reportWarehouse,
    myRef,
    MainTab,
    setMainTab,
    startDate,
    setStartDate
  } = props;
  return (
    <div className="reports-main-container">
      <div className="reports-header">
        <div className="heading-text-holder" ref={myRef}>
          <h1 className="mi-body-lg dark f-500 mi-reset">REPORTS</h1>
        </div>
        <div className="header-actions-group">
          {/* <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input-calender-form"
          /> */}
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="date-input"
              // className="input-calender-form"
            />
            <i class="fa-solid fa-calendar-days cal-icon"></i>
          </div>
          {/* <button className="nt-btn nt-btn-sm nt-btn-blue">Export</button> */}
        </div>
      </div>
      <div className="reports-body">
        <div className="tab-area">
          <Tab layout="main" MainTab={MainTab} setMainTab={setMainTab} />
        </div>

        <div className='report-table-container'>
          {MainTab === "INSTOCK" && (
            <Instock inStock={inStock} reportWarehouse={reportWarehouse} />
          )}
          {MainTab === "OUTSTOCK" && (
            <Outstock outStock={outStock} reportWarehouse={reportWarehouse} />
          )}
          {MainTab === "BESTSELLER" && (
            <BestSeller
              bestseller={bestseller}
              reportWarehouse={reportWarehouse}
            />
          )}
        </div>
      </div>
    </div>
  );
}
