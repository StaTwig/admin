/* eslint-disable */

import React, { useEffect, useState } from "react";
import "./style.scss";
import { Formik } from "formik";
import update from "../../assets/icons/Update_Status.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  getShipmentIds,
  getViewShipment,
  fetchairwayBillNumber,
} from "../../actions/shipmentActions";
import { useDispatch, useSelector } from "react-redux";
import { element, func } from "prop-types";
import { t } from "i18next";

const EnterId = (props) => {
  const { id } = props.match.params;
  const [billno, setbillno] = useState(null);
  const [shipmentArray, setShipmentArray] = useState([]);
  const [transitNumberArray, settransitNumberArray] = useState([]);
  const [shipdisabled, setshipdisabled] = useState(true);
  const [shipdisabled1, setshipdisabled1] = useState(true);
  useEffect(() => {
    async function getShipmentArray() {
      let arr = await getShipmentIds();
      setShipmentArray(arr.data);
    }
    async function fetchairwayBill() {
      let temp_arr = await fetchairwayBillNumber();
      settransitNumberArray(temp_arr.data);
    }
    getShipmentArray();
    fetchairwayBill();
  }, []);

  //For Transit Number
  const defaultProps1 = {
    options: transitNumberArray,
    getOptionLabel: (option) => option.airWayBillNo,
  };
  const flatProps1 = {
    options: transitNumberArray.map((option) => option.airWayBillNo),
  };

  //for shipment id
  const defaultProps = {
    options: shipmentArray,
    getOptionLabel: (option) => option.id,
  };
  const flatProps = {
    options: shipmentArray.map((option) => option.id),
  };
  const [shipmentId, setShipmentId] = useState(null);
  const [shipmentId2, setShipmentId2] = useState(null);
  const [enableSearch, setenableSearch] = useState(false);
  const [errorShipment, seterrorShipment] = useState(false);
  const [errorShipment1, seterrorShipment1] = useState(false);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [inputValue1, setInputValue1] = React.useState("");
  const dispatch = useDispatch();
  async function getShipmentStatus(id) {
    let result = await dispatch(getViewShipment(id));
    return result;
  }
  if (shipmentId) {
    var val = getShipmentStatus(shipmentId).then((data) => {
      return data.status;
    });
    val.then((val) => {
      if (val == "RECEIVED") {
        setshipdisabled(true);
        seterrorShipment(true);
      } else {
        setshipdisabled(false);
        seterrorShipment(false);
      }
    });
  }
  const billNoCheck = (bno) => {
    let val = transitNumberArray.filter((e) => e.airWayBillNo == bno);
    setShipmentId2(val[0]?.id);
    if (val[0]?.status == "RECEIVED") {
      setshipdisabled(true);
      seterrorShipment1(true);
    } else {
      setshipdisabled(false);
      seterrorShipment1(false);
    }
  };
  return (
    <div className='updateStatus'>
      <div className='d-flex justify-content-between'>
        <h1 className='breadcrumb'>{t("update_shipment")}</h1>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          shipmentId: shipmentId,
          billno: billno,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.shipmentId) {
            errors.shipmentId = t("Required");
          }
          if (!values.billno) {
            errors.billno = t("Required");
          }
          if (!values.updateStatusLocation) {
            errors.updateStatusLocation = t("Required");
          }
          if (!values.comments) {
            errors.comments = t("Required");
          }
          if (!values.alerttrue) {
            errors.alerttrue = t("Required");
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // updateStatus(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          dirty,
        }) => (
          <form
            onSubmit={handleSubmit}
            className=''
            style={{ height: "600px" }}
          >
            <div className=''>
              <div className='row'>
                <div className=''>
                  <div
                    className='panel commonpanle'
                    style={{ height: "60%", width: "114%" }}
                  >
                    <div
                      className={`form-group ${
                        errors.shipmentId && touched.shipmentId && ``
                      }`}
                    >
                      <label className='text-secondary'>
                        {t("shipment_id")}
                      </label>
                      <div className='mb-2' style={{ width: 300 }}>
                        <Autocomplete
                          {...defaultProps}
                          id='auto-complete'
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setShipmentId(newInputValue);
                            setInputValue(newInputValue);
                            newInputValue
                              ? setshipdisabled(false)
                              : (setshipdisabled(true),
                                seterrorShipment(false));
                          }}
                          id='controllable-states-demo'
                          autoComplete
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name='shipmentId'
                              margin='normal'
                              variant='outlined'
                              placeholder={t('Enter_Shipment_ID')}
                            />
                          )}
                        />
                        {errorShipment && (
                          <span
                            className='error-msg text-danger mt-3 '
                            style={{ top: "-10px", left: "0px" }}
                          >
                            {t("update_msg")}
                          </span>
                        )}
                      </div>

                      {/* <input
                          type="text"
                          placeholder="Enter Shipment ID"
                          className="form-control ml-5 "
                          name="shipmentId"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setShipmentId(e.target.value);
                            if (e.target.value.length === 0)
                              setshipdisabled(true);
                            else setshipdisabled(false);
                          }}
                          value={values.shipmentId}
                        /> */}
                    </div>

                    {/* {errors.shipmentId && touched.shipmentId && (
                        <span className="error-msg text-danger row justify-content-end col-8">
                          {errors.shipmentId}
                        </span>
                      )} */}
                  </div>
                </div>
                <div className='col-1 ml-3 mr-4'>
                  <h6
                    className='or'
                    style={{ position: "absolute", left: "4px", top: "25px" }}
                  >
                    <b>{t("or")}</b>
                  </h6>
                </div>

                <div className=''>
                  <div
                    className='panel commonpanle ml-5'
                    style={{ height: "60%", width: "110%" }}
                  >
                    <div className='form-group'>
                      <label className='text-secondary'>
                        {t("transit_no")}
                      </label>
                      <div className='' style={{ width: 300 }}>
                        <Autocomplete
                          {...defaultProps1}
                          id='billNo'
                          value1={value1}
                          onChange={(event, newValue) => {
                            setValue1(newValue);
                          }}
                          inputValue1={inputValue1}
                          onInputChange={(event, newInputValue) => {
                            setbillno(newInputValue);
                            setInputValue1(newInputValue);
                            billNoCheck(newInputValue);
                            //newInputValue?setshipdisabled(false):(setshipdisabled(true),seterrorShipment(false));
                          }}
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name='billNo'
                              margin='normal'
                              variant='outlined'
                              placeholder={t('Enter_Transit_No')}
                            />
                          )}
                        />
                        {errorShipment1 && (
                          <span
                            className='error-msg text-danger mt-3 '
                            style={{ top: "-10px", left: "0px" }}
                          >
                            {t("update_msg")}
                          </span>
                        )}
                      </div>
                      {/* <label className="mb-1 text-secondary pt-2">Bill No:</label>
              <input
                type="text"
                className="form-control ml-5"
                name="billNo"
                onChange={(e) => setBillNo(e.target.value)}
                size="39"
                value={billNo}
              /> */}
                    </div>
                  </div>
                  <div
                    className='col'
                    style={{
                      position: "relative",
                      left: "16.5rem",
                      top: "300px",
                    }}
                  >
                    <button
                      type='button'
                      className='btn btn-outline-primary mr-4 '
                      onClick={() => props.history.push(`/shipments`)}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      disabled={shipdisabled}
                      className='btn btn-orange fontSize20 font-bold mr-4 product'
                      onClick={() => {
                        if (shipmentId) {
                          if (
                            shipmentArray.filter((e) => e.id === shipmentId)
                              .length > 0
                          ) {
                            props.history.push(`/updatestatus/${shipmentId}`);
                          }
                        } else {
                          props.history.push(`/updatestatus/${shipmentId2}`);
                        }
                      }}
                    >
                      <img
                        src={update}
                        width='20'
                        height='17'
                        className='mr-2 mb-1'
                      />
                      <span>{t("update_shipment")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default EnterId;
