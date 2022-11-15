import React from "react";
import BestSeller from "./bestseller/BestSeller";
import Instock from "./instocks/Instock";
import Outstock from "./outofstock/Outstock";
import DatePicker from "react-datepicker";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Report.scss";
import Tab from "./tabs/Tab";
import { getReports } from "../../../actions/networkActions";
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
    setStartDate,
    inStockFilters,
    setInstockType,
    setInstockId,
    setOutstockType,
    setOutstockId,
    outStockFilters,
    t,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (type) => {
    if (type) {
      const fileData = await getReports(
        MainTab,
        type,
        reportWarehouse,
        startDate
      );
      const downloadUrl = window.URL.createObjectURL(new Blob([fileData]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `${MainTab}-${startDate.toISOString().split("T")[0]}.${
          type.toLowerCase() === "excel" ? "xlsx" : "pdf"
        }`
      ); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    setAnchorEl(null);
  };
  return (
    <div className='reports-main-container'>
      <div className='reports-header'>
        <div className='heading-text-holder' ref={myRef}>
          <h1 className='mi-body-lg dark f-500 mi-reset'>{t("reports")}</h1>
        </div>
        <div className='header-actions-group'>
          {/* <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input-calender-form"
          /> */}
          <div className='date-picker'>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat='MM/yyyy'
              showMonthYearPicker
              className='date-input'
              // className="input-calender-form"
            />
            <i className='fa-solid fa-calendar-days cal-icon'></i>
          </div>
          <button
            className='nt-btn nt-btn-sm nt-btn-blue'
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {t("export")}
          </button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div className='d-flex flex-column'>
              <MenuItem onClick={() => handleClose("pdf")} className='mb-3'>
                PDF
              </MenuItem>
              <MenuItem onClick={() => handleClose("excel")}>EXCEL</MenuItem>
            </div>
          </Menu>
        </div>
      </div>
      <div className='reports-body'>
        <div className='tab-area'>
          <Tab layout='main' MainTab={MainTab} setMainTab={setMainTab} t={t}/>
        </div>

        <div className='report-table-container'>
          {MainTab === "INSTOCK" && (
            <Instock inStock={inStock} inStockFilters={inStockFilters} setInstockType={setInstockType} setInstockId={setInstockId} reportWarehouse={reportWarehouse} t={t} />
          )}
          {MainTab === "OUTSTOCK" && (
            <Outstock setOutstockType={setOutstockType} outStockFilters={outStockFilters} setOutstockId={setOutstockId} outStock={outStock} reportWarehouse={reportWarehouse} t={t} />
          )}
          {MainTab === "BESTSELLER" && (
            <BestSeller
              bestseller={bestseller}
              reportWarehouse={reportWarehouse}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
}
