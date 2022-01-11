import React, { useState, useEffect } from "react";
import "./style.scss";
import user from "../../assets/icons/brand.svg";
import Quantity from "../../assets/icons/Quantity.png";
import Product from "../../assets/icons/Producttype.png";
import calender from "../../assets/icons/calendar.svg";
import { useDispatch } from "react-redux";
import {
  getExpiredProductsByBatch,
  getNearExpiringProductsByBatch,
} from "../../actions/inventoryActions";
import { formatDate } from "../../utils/dateHelper";
import { turnOn, turnOff } from "../../actions/spinnerActions";

const BatchExpiry = (props) => {
  const [data, setData] = useState([]);
  const [enable, setEnable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(turnOn());
      let result;
      if (props.match.params?.category)
        result = await getNearExpiringProductsByBatch();
      else {
        setEnable(false);
        result = await getExpiredProductsByBatch();
      }
      if (Array.isArray(result))
        setData(result);
      dispatch(turnOff());
    }
    fetchData();
  }, [dispatch, props]);

  return (
    <div className="batchexpiry">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">
          {enable ? "BATCH NEAR EXPIRATION" : "BATCH EXPIRED"}
        </h1>
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
        <div className="ribbon-space col-12 pl-0 pr-0">
          {data?.map((exp, i) => (
            <div
              key={i}
              className="col-12 p-3 mb-3 rounded row bg-white shadow"
            >
              <div style={{ width: "14%" }} className="txt txtBlue">
                {exp.products.name}
              </div>
              <div style={{ width: "16%" }} className="fieldVals ">
                {exp.products.type}
              </div>
              <div style={{ width: "15%" }} className="fieldVals ">
                {exp.products.manufacturer}
              </div>
              <div style={{ width: "12%", fontWeight: 1000 }} className="fieldVals ">
                {exp?.quantity ? exp.quantity : 0}
                {" ("}
                {exp.products.unitofMeasure
                  ? exp.products.unitofMeasure.name
                  : "N/A"}
                {")"}
              </div>
              <div style={{ width: "14%" }} className="fieldVals ">
                {exp.batchNumbers[0]}
              </div>
              <div style={{ width: "12%" }} className="fieldVals ">
                {exp.attributeSet.mfgDate
                  ? formatDate(exp.attributeSet.mfgDate, "mmyyyy")
                  : ""}
              </div>
              <div style={{ width: "8%" }} className="fieldVals ">
                {exp.attributeSet.expDate
                  ? formatDate(exp.attributeSet.expDate, "mmyyyy")
                  : ""}
              </div>
              <div style={{ width: "9%" }} className="txt mt-2">
                <button
                  type="button"
                  className="sm-btn btn-outline-primary"
                  onClick={() =>
                    props.history.push(`/viewexpiry`, { data: exp })
                  }
                >
                  Show more
                </button>
              </div>
            </div>
          ))}
          {data?.length === 0 && (
            <div className="col-12 p-3 mb-3 rounded row bg-white shadow">
              <div className="col-12 txt text-center txtBlue">
                No records found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchExpiry;
