import React, { useState } from "react";
import Delete from "../../assets/icons/Delete.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import mon from "../../assets/icons/brand.svg";
import Package from "../../assets/icons/package.svg";
import qty from "../../assets/icons/TotalInventoryAdded_2.png";
import sdate from "../../assets/icons/ShippingDate.svg";
import Batch from "../../assets/icons/batch.png";
import Serial from "../../assets/icons/serial.png";
import Select from "react-select";

import "./style.scss";
const months = ['Enero' ,'Febrero','Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
const locale = {
  localize: {
    month: n => months[n]
  },
  formatLong: {
    date: () => 'dd/yyyy'
  }
}
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

const EditRow = (props) => {
  const {
    manufacturer,
    productName,
    quantity,
    categories,
    manufacturingDate,
    unitofMeasure,
    expiryDate,
    batchNumber,
    serialNumber,
    handleAddMore,
    handleInventoryChange,
    idx,
    prods,
    category,
    handleCategoryChange,
    productId,
    inventories,
    t,
  } = props;
  const [addMore, setAddMore] = useState(
    manufacturingDate || expiryDate || batchNumber || serialNumber
      ? true
      : false
  );
  const mfgLocale = t("mfg_date");
  const expLocale = t("exp_date");

  const numbersOnly = (e) => {
    // Handle paste
    if (e.type === "paste") {
      // eslint-disable-next-line no-use-before-define
      key = e.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    if (!e.target.value && key === 0) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
      e.cancelBubble = true;
      return false;
    } else {
      var regex = /[0-9]/;
      if (!regex.test(key)) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
      }
    }
  };

  return (
    <div className={`${idx > 0 ? `borderTop` : ``}`}>
      <h6 className='ml-3 text-info font-weight-bold'>
        {t("product")} {idx + 1}
      </h6>
      <br />
      <div className='d-flex flex-column ml-5 itable'>
        <div className='row mb-2'>
          <div className={`row ${!addMore ? `col-10` : `col-12`}`}>
            <div
              className={`col-3 theader  ml-5 ${
                addMore
                  ? "product-cat-add-inventory"
                  : "Bproduct-cat-add-inventory"
              }`}
            >
              <img src={Package} width='16' height='16' alt='ProductCategory' />
              <span className='pl-2 text-muted'>{t("product_category")}*</span>
            </div>
            <div
              className={` theader ${
                addMore
                  ? "col-3 product-add-inventory"
                  : " col-2 Bproduct-add-inventory"
              }`}
            >
              <img src={Package} width='16' height='16' alt='product' />
              <span className='pl-2 text-muted'>{t("product")}*</span>
            </div>
            <div
              className={`col-2 theader ${
                addMore
                  ? "manufacturer-add-inventory"
                  : "Bmanufacturer-add-inventory"
              }`}
            >
              <img src={mon} width='16' height='16' alt='manufacturer' />
              <span className='pl-2 text-muted'>{t("manufacturer")}</span>
            </div>
            <div
              className={`col-2 theader ${
                addMore ? "batch-add-inventory" : "Bbatch-add-inventory"
              }`}
            >
              <img src={Batch} width='16' height='16' alt='Batch' />
              <span className='pl-2 text-muted'>{t("batch_no")}</span>
            </div>
            <div
              className={`col theader text-center ${
                addMore ? "quantity-add-inventory" : "Bquantity-add-inventory"
              }`}
            >
              <img src={qty} width='25' height='16' alt='quantity' />
              <span className='pl-2 text-muted'>{t("quantity")}*</span>
            </div>
          </div>
        </div>
        <div className='row rTable'>
          <div
            className='rTableRow inp-grp mb-3 col row bg-white p-1'
            // style={{ height: "56px" }}
          >
            <div className='col-3 align-self-center pt-1 pb-1 border-right bg-white ml-1'>
              <div className='square-box' />
              {/* <DropdownButton
                name={categories}
                onSelect={(item) => {
                  handleCategoryChange(idx, item);
                }}
                groups={category}
              /> */}
              <Select
              noOptionsMessage={() => t("no_options")}
                className='no-border'
                placeholder={
                  <div className='select-placeholder-text-prod-category'>
                    {t("select_product_category")}
                  </div>
                }
                value={
                  categories === "Select Category"
                    ? null
                    : { value: categories, label: categories }
                }
                defaultInputValue={inventories.type}
                onChange={(item) => handleCategoryChange(idx, item.value)}
                options={category}
              />
            </div>
            <div
              className='col-3 align-self-center pt-1 pb-1 border-right bg-white'
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div className='d-flex pt-1 flex-row justify-content-between'>
                <div
                  className='title col-10 recived-text'
                  style={{ position: "relative", left: "-15px" }}
                >
                  <Select
                  noOptionsMessage={() => t("no_options")}
                    className='no-border'
                    placeholder={
                      <div className='select-placeholder-text-prod'>
                        {t("select") + " " + t("product_name")}
                      </div>
                    }
                    value={
                      productName === "Select Product" || productName === ""
                        ? null
                        : { value: productName, label: productName }
                    }
                    // defaultInputValue={inventories.type}
                    onChange={(item) =>
                      handleInventoryChange(idx, "productName", item.name)
                    }
                    options={prods.filter((p) => p.type === categories)}
                  />
                </div>
                <div
                  className='col-4 title recived-text'
                  style={{ position: "relative", top: "7px", left: "-41px" }}
                >
                  {truncate(productId, 6)}
                </div>
              </div>
            </div>
            <div className='col mt-1 mb-1 border-right'>
              <div
                className='text-center'
                style={{ position: "relative", top: "10px", fontSize: "16px" }}
              >
                {manufacturer ? (
                  manufacturer
                ) : (
                  <div
                    className='select-placeholder-text-manufacturer'
                    style={{ fontSize: "14px" }}
                  >
                    {t("manufacturer")}
                  </div>
                )}
              </div>
            </div>
            <div
              className='col-2 mt-1 mb-1 border-right'
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className=''>
                <input
                  type='text'
                  style={{ fontSize: "14px" }}
                  className='form-control text-center'
                  placeholder={t("enter") + " " + t("batch_no")}
                  value={batchNumber}
                  onChange={(e) =>
                    handleInventoryChange(idx, "batchNumber", e.target.value)
                  }
                />
              </div>
            </div>
            <div className='col mt-1 mb-1'>
              <div style={{ position: "relative", right: "13px" }}>
                <input
                  type='text'
                  onKeyPress={numbersOnly}
                  className='form-control text-center'
                  style={{
                    position: "relative",
                    top: "3.5px",
                    fontSize: "14px",
                  }}
                  placeholder={t("enter") + " " + t("quantity")}
                  value={quantity}
                  onChange={(e) =>
                    handleInventoryChange(idx, "quantity", e.target.value)
                  }
                />
              </div>
            </div>
            <div
              className='title recived-text align-self-center'
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                display: "block",
              }}
            >
              {unitofMeasure?.name ? (
                <div>{unitofMeasure?.name}</div>
              ) : (
                <div className='placeholder_name' style={{ fontSize: "14px" }}>
                  {t("unit")}{" "}
                </div>
              )}
            </div>
          </div>
          {inventories.length > 1 && (
            <div
              className='m-2 pl-3 pt-1'
              style={{ position: "relative", left: "10px" }}
            >
              <span
                className='del-pad shadow border-none rounded-circle mr-1'
                onClick={() => props.onRemoveRow(idx)}
              >
                <img
                  className='cursorP p-1'
                  height='30'
                  src={Delete}
                  alt='Delete'
                />
              </span>
            </div>
          )}
          {!addMore && (
            <div className='ml-2 mt-1 pl-3 mb-1 '>
              <button
                style={{ width: "150px", height: "53px", borderRadius: "12px" }}
                type='button'
                onClick={() => {
                  setAddMore(true);
                  props.setVisible(true);
                }}
                className='btn btn-warning '
              >
                <i className='txt-inventory' aria-hidden='true'></i>
                <span className='txt-inventory'>
                  {" "}
                  + &nbsp; {t("add_details")}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {addMore && (
        <div className='d-flex ml-4 pl-2 itable w-90'>
          <div className='rTable row col-12'>
            <div className='row col-12 mb-2'>
              <div className='col theader text-center pro mfg-add-inventory'>
                <img
                  src={sdate}
                  width='16'
                  height='16'
                  alt='ManufacturedDate'
                />
                <span className='pl-2 text-muted'>{t("mfg_date")}</span>
              </div>
              <div className='col theader text-center pro exp-add-inventory'>
                <img src={sdate} width='16' height='16' alt='ExpiryDate' />
                <span className='pl-2 text-muted'>{t("exp_date")}</span>
              </div>
              {/* <div className='col theader text-center pro'>
                <img src={Batch} width='16' height='16' alt='Batch' />
                <span className='pl-2 text-muted'>Batch Number</span>
              </div> */}
              <div className='col theader text-center pro'>
                <img src={Serial} width='16' height='16' alt='Serial' />
                <span className='pl-2 text-muted'>{t("serial_numbers")}</span>
              </div>
            </div>
            <div className='rTableRow inp-grp mb-3 row bg-white col-12 p-1'>
              <div className='col mt-1 mb-1 border-right'>
                <div className=''>
                  <DatePicker
                    locale={(mfgLocale==="Fecha de fabricación")?locale:"en"}
                    className='form-control text-center'
                    onChange={(date) =>
                      handleInventoryChange(idx, "manufacturingDate", date)
                    }
                    selected={
                      manufacturingDate
                        ? new Date(Date.parse(manufacturingDate))
                        : manufacturingDate
                    }
                    onKeyDown={(e) => e.keyCode !== 8 && e.preventDefault()}
                    dateFormat='MM/yyyy'
                    placeholderText={t("enter") + " " + t("mfg_date")}
                    showMonthYearPicker
                    showFullMonthYearPicker
                  />
                </div>
              </div>
              <div className='col mt-1 mb-1 border-right'>
                <div className=''>
                  <DatePicker
                    locale={(expLocale==="Fecha de caducidad")?locale:"en"}
                    className='form-control text-center'
                    placeholderText={t("enter") + " " + t("exp_date")}
                    dateFormat='MM/yyyy'
                    onChange={(date) =>
                      handleInventoryChange(idx, "expiryDate", date)
                    }
                    selected={
                      expiryDate ? new Date(Date.parse(expiryDate)) : expiryDate
                    }
                    onKeyDown={(e) => e.keyCode !== 8 && e.preventDefault()}
                    showMonthYearPicker
                    showFullMonthYearPicker
                  />
                </div>
              </div>
              {/* <div className='col mt-1 mb-1 border-right'>
                <div className=''>
                  <input
                    type='text'
                    style={{ fontSize: "14px" }}
                    className='form-control text-center'
                    placeholder='Enter Batch Number'
                    value={batchNumber}
                    onChange={(e) =>
                      handleInventoryChange(idx, "batchNumber", e.target.value)
                    }
                  />
                </div>
              </div> */}
              <div className='col mt-1 mb-1 '>
                <div className=''>
                  <input
                    type='text'
                    style={{ fontSize: "14px" }}
                    className='form-control text-center'
                    placeholder={t("enter") + " " + t("serial_numbers")}
                    value={serialNumber}
                    onChange={(e) =>
                      handleInventoryChange(idx, "serialNumber", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-4 pt-4'>
            <span
              className='del-pad shadow border-none rounded-circle mr-1'
              onClick={() => {
                handleAddMore(idx);
                setAddMore(false);
              }}
            >
              <img
                className='cursorP p-1'
                height='30'
                src={Delete}
                alt='Delete'
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRow;
