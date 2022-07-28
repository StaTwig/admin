import React, { useState } from "react";
import BestSeller from "./bestseller/BestSeller";
import Instock from "./instocks/Instock";
import Outstock from "./outofstock/Outstock";
import "./Report.scss";
import Tab from "./tabs/Tab";

export default function Reports(props) {
  const {
    bestseller,
    inStock,
    manufacturer,
    oManufacturer,
    outStock,
    user,
    reportWarehouse,
  } = props;
  const [MainTab, setMainTab] = useState("INSTOCK");
  return (
    <div className='reports-main-container'>
      <div className='reports-header'>
        <div className='heading-text-holder'>
          <h1 className='mi-body-lg dark f-500 mi-reset'>REPORTS</h1>
        </div>
        <div className='header-actions-group'>
          <button className='nt-btn nt-btn-sm nt-btn-blue'>Export</button>
        </div>
      </div>
      <div className='reports-body'>
        <div className='tab-area'>
          <Tab layout='main' MainTab={MainTab} setMainTab={setMainTab} />
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
