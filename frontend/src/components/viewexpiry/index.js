import React, { useState } from "react";
import "./style.scss";
import user from "../../assets/icons/brand.svg";
import Quantity from "../../assets/icons/Quantity.png";
import Product from "../../assets/icons/Producttype.png";
import calender from "../../assets/icons/calendar.svg";
import { useDispatch } from "react-redux";
import { getBatchDetailsByWareHouse } from "../../actions/inventoryActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { formatDate } from "../../utils/dateHelper";
import Batch from "../../assets/icons/batch.png";

const ViewExpiry = (props) => {
  const [data, setData] = useState([]);
  const exps = [props.location.state.data];
  console.log(exps);
  const [more, setMore] = useState([]);
  const dispatch = useDispatch();

  const toggleShowMore = async (inventory_id, product_id, index, enable) => {
    if (!enable) {
      dispatch(turnOn());
      let result = await getBatchDetailsByWareHouse(inventory_id, product_id);
      setData(result);
      console.log("hiii");
      console.log(result);
      dispatch(turnOff());
    }
    let new_arr = !enable ? [] : [...more];
    if (enable) setMore([]);
    new_arr[index] = !new_arr[index];
    setMore((m) => [...new_arr]);
  };

  return (
    <div className="viewinventory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">PRODUCT LIST</h1>
      </div>
      <div className="row">
        <div className=" p-2 rounded full-width-ribbon">
          <div className=" row filter">
            <div style={{ width: "14%" }}>
              <img src={Product} width="24" height="24" alt="Product Name" />
              <span className="ml-2 font-small">Product Name</span>
            </div>
            <div style={{ width: "16%" }}>
              <img
                src={Quantity}
                width="35"
                height="24"
                alt="Product Category"
              />
              <span className="ml-2 font-small">Product Category</span>
            </div>
            <div style={{ width: "15%" }}>
              <img src={user} width="16" height="24" alt="Manufacturer" />
              <span className="ml-2 font-small">Manufacturer</span>
            </div>
            <div style={{ width: "12%" }} className="p-0">
              <img src={Quantity} width="35" height="24" alt="Quantity" />
              <span className="ml-2 font-small">Quantity</span>
            </div>
            <div style={{ width: "13%" }}>
              <img src={Quantity} width="35" height="24" alt="Batch Number" />
              <span className="ml-2 font-small">Batch Number</span>
            </div>
            <div style={{ width: "11%" }} className="pl-0">
              <img src={calender} width="35" height="24" alt="Mfg Date" />
              <span className="ml-1 font-small">Mfg Date</span>
            </div>
            <div style={{ width: "12%" }} className="p-0">
              <img src={calender} width="35" height="24" alt="Exp Date" />
              <span className="ml-1 font-small">Exp Date</span>
            </div>
          </div>
        </div>
        <div className="w-100 pt-5 mt-2">
          {exps.map((exp, i) => (
            <>
              <div
                key={i}
                className="col-12 p-3 mb-3 rounded row bg-white shadow"
              >
                <div style={{ width: "14%" }} className="txt txtBlue">
                  {exp.products.name}
                </div>
                <div style={{ width: "16%" }} className="txt1 ">
                  {exp.products.type}
                </div>
                <div style={{ width: "15%" }} className="txt1 ">
                  {exp.products.manufacturer}
                </div>
                <div style={{ width: "12%" }} className="txt1 ">
                  {exp?.quantity ? exp.quantity : 0}
                  {" ("}
                  {exp.products.unitofMeasure
                    ? exp.products.unitofMeasure.name
                    : "N/A"}
                  {")"}
                </div>
                <div style={{ width: "14%" }} className="txt1 ">
                  {exp.batchNumbers[0]}
                </div>
                <div style={{ width: "12%" }} className="txt1 ">
                  {exp.attributeSet.mfgDate
                    ? formatDate(exp.attributeSet.mfgDate, "mmyyyy")
                    : ""}
                </div>
                <div style={{ width: "8%" }} className="txt1 ">
                  {exp.attributeSet.expDate
                    ? formatDate(exp.attributeSet.expDate, "mmyyyy")
                    : ""}
                </div>
                <div style={{ width: "9%" }} className="txt mt-2">
                  {more[i] ? (
                    <div className="col-0 txt">
                      <button
                        type="button"
                        onClick={() =>
                          toggleShowMore(exp?.id, exp?.productId, i, more[i])
                        }
                        className="btn btn-outline-primary"
                      >
                        Show {more[i] ? `less` : `more`}
                      </button>
                    </div>
                  ) : (
                    <div className="col-0 txt">
                      <button
                        type="button"
                        onClick={() =>
                          toggleShowMore(exp?.id, exp?.productId, i, more[i])
                        }
                        className="btn btn-outline-primary"
                      >
                        Show {more[i] ? `less` : `more`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {more[i] && (
                <div className="row">
                  <div className="p-2 mt-4 full-width-ribbon">
                    <div className="row filter">
                      <div className="col-2">
                        <img
                          src={Product}
                          width="16"
                          height="16"
                          alt="Product Name"
                        />
                        <span className="ml-2 font-small">Product Name</span>
                      </div>
                      <div className="col-2">
                        <img
                          src={Quantity}
                          width="25"
                          height="16"
                          alt="Product Category"
                        />
                        <span className="ml-2 font-small">
                          Product Category
                        </span>
                      </div>
                      <div className="col">
                        <img
                          src={user}
                          width="16"
                          height="16"
                          alt="Manufacturer"
                        />
                        <span className="ml-2 font-small">Manufacturer</span>
                      </div>
                      <div className="col p-0">
                        <img
                          src={Quantity}
                          width="25"
                          height="16"
                          alt="Quantity"
                        />
                        <span className="ml-2 font-small">Quantity</span>
                      </div>
                      <div className="col">
                        <span className="ml-2 font-small">Batch Number</span>
                      </div>
                      <div className="col">
                        <span className="ml-2 font-small">Serial Number</span>
                      </div>
                      <div className="col pl-0">
                        <img
                          src={calender}
                          width="25"
                          height="16"
                          alt="Mfg Date"
                        />
                        <span className="ml-1 font-small">Mfg Date</span>
                      </div>
                      <div className="col p-0">
                        <img
                          src={calender}
                          width="25"
                          height="16"
                          alt="Exp Date"
                        />
                        <span className="ml-1 font-small">Exp Date</span>
                      </div>
                    </div>
                  </div>
                  <div className="ribbon-space col-12 pl-0 pt-3 ml-2">
                    {data.map((exp, i) => (
                      <div
                        key={i}
                        className="col-12 p-3 mb-3 rounded row bg-white shadow"
                      >
                        <div className="col-2 txt txtBlue">
                          {exp.products.name}
                        </div>
                        <div className="col ml-4 txt1 ">
                          {exp.products.type}
                        </div>
                        <div className="col ml-4 txt1 ">
                          {exp.products.manufacturer}
                        </div>
                        <div className="col ml-5 txt1 ">
                          {exp?.quantity ? exp.quantity : 0}
                        </div>
                        <div className="col ml-4 txt1 ">
                          {exp.batchNumbers[0]}
                        </div>
                        <div className="col ml-4 txt1 ">
                          {formatDate(exp.attributeSet?.mfgDate)}
                        </div>
                        <div className="col ml-4 txt1 ">
                          {formatDate(exp.attributeSet?.expDate)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewExpiry;
