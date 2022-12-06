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

const ViewExpiry = (props) => {
  const { t } = props;
  const [data, setData] = useState([]);
  const exps = [props.location.state.data];
  const [more, setMore] = useState([]);
  const dispatch = useDispatch();

  const toggleShowMore = async (inventory_id, product_id, index, enable) => {
    if (!enable) {
      dispatch(turnOn());
      let result = await getBatchDetailsByWareHouse(inventory_id, product_id);
      setData(result);
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
        <h1 className="breadcrumb">{t("product_list")}</h1>
      </div>
      <div className="row">
        <div className=" p-2 rounded full-width-ribbon">
          <div className=" row filter">
            <div style={{ width: "14%" }} className="flex-align">
              <img src={Product} width="24" height="24" alt="Product Name" />
              <span className="ml-2 font-small">{t("product_name")}</span>
            </div>
            <div style={{ width: "16%" }} className="flex-align">
              <img
                src={Quantity}
                width="35"
                height="24"
                alt="Product Category"
              />
              <span className="ml-2 font-small">{t("product_category")}</span>
            </div>
            <div style={{ width: "15%" }} className="flex-align">
              <img src={user} width="16" height="24" alt="Manufacturer" />
              <span className="ml-2 font-small">{t("manufacturer")}</span>
            </div>
            <div style={{ width: "12%" }} className="flex-align p-0">
              <img src={Quantity} width="35" height="24" alt="Quantity" />
              <span className="ml-2 font-small">{t("quantity")}</span>
            </div>
            <div style={{ width: "13%" }} className="flex-align">
              <img src={Quantity} width="35" height="24" alt="Batch Number" />
              <span className="ml-2 font-small">{t("batch_number")}</span>
            </div>
            <div style={{ width: "11%" }} className="flex-align pl-0">
              <img src={calender} width="35" height="24" alt="Mfg Date" />
              <span className="ml-1 font-small">{t("mfg_date")}</span>
            </div>
            <div style={{ width: "12%" }} className="flex-align p-0">
              <img src={calender} width="35" height="24" alt="Exp Date" />
              <span className="ml-1 font-small">{t("exp_date")}</span>
            </div>
          </div>
        </div>
        <div className="w-100 pt-5 mt-2">
          {exps.map((exp, i) => (
            <>
              <div
                key={i}
                className="col-12 p-3 mb-3 rounded row bg-white shadow"
                style={{marginTop:"2rem"}}
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
                    ? formatDate(exp.attributeSet.mfgDate)
                    : ""}
                </div>
                <div style={{ width: "8%" }} className="txt1 ">
                  {exp.attributeSet.expDate
                    ? formatDate(exp.attributeSet.expDate)
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
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {more[i] ? `${t("show_less")}` : `${t("show_more")}`}
                      </button>
                    </div>
                  ) : (
                    <div className="col-0 txt">
                      <button
                        type="button"
                        onClick={() =>
                          toggleShowMore(exp?.id, exp?.productId, i, more[i])
                        }
                        style={{ whiteSpace: "nowrap" }}
                        className="btn btn-outline-primary"
                      >
                        {more[i] ? `${t("show_less")}` : `${t("show_more")}`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {more[i] && (
                <div className="row">
                  <div className="p-2 mt-4 full-width-ribbon">
                    <div className="row filter">
                      <div className="flex-align col-2">
                        <img
                          src={Product}
                          width="16"
                          height="16"
                          alt="Product Name"
                        />
                        <span className="ml-2 font-small">
                          {t("product_name")}
                        </span>
                      </div>
                      <div className="flex-align col-2">
                        <img
                          src={Quantity}
                          width="25"
                          height="16"
                          alt="Product Category"
                        />
                        <span className="ml-2 font-small">
                          {t("product_category")}
                        </span>
                      </div>
                      <div className="flex-align col">
                        <img
                          src={user}
                          width="16"
                          height="16"
                          alt="Manufacturer"
                        />
                        <span className="ml-2 font-small">
                          {t("manufacturer")}
                        </span>
                      </div>
                      <div className="flex-align col p-0">
                        <img
                          src={Quantity}
                          width="25"
                          height="16"
                          alt="Quantity"
                        />
                        <span className="ml-2 font-small">{t("quantity")}</span>
                      </div>
                      <div className="flex-align col">
                        <span className="ml-2 font-small">
                          {t("batch_number")}
                        </span>
                      </div>
                      <div className="flex-align col">
                        <span className="ml-2 font-small">
                          {t("serial_number")}
                        </span>
                      </div>
                      <div className="flex-align col pl-0">
                        <img
                          src={calender}
                          width="25"
                          height="16"
                          alt="Mfg Date"
                        />
                        <span className="ml-1 font-small">{t("mfg_date")}</span>
                      </div>
                      <div className="flex-align col p-0">
                        <img
                          src={calender}
                          width="25"
                          height="16"
                          alt="Exp Date"
                        />
                        <span className="ml-1 font-small">{t("exp_date")}</span>
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
