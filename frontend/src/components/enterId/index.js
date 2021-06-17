import React, { useEffect, useState } from "react";
import "./style.scss";
import { Formik } from "formik";
import update from '../../assets/icons/Update_Status.png';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getShipmentIds,getViewShipment} from '../../actions/shipmentActions';
import { useDispatch, useSelector } from 'react-redux';
import { func } from "prop-types";

const EnterId = (props) => {
  const { id } = props.match.params;
  const [billid, setbillid] = useState(null);
  const [shipmentArray,setShipmentArray] = useState([]);
  const [shipdisabled, setshipdisabled] = useState(true);
  useEffect(()=>{
    async function getShipmentArray(){
      let arr = await getShipmentIds();
      setShipmentArray(arr.data);
    }
    getShipmentArray();
  },[]);

  const defaultProps = {
    options: shipmentArray,
    getOptionLabel: (option) => option.id,
  };
  const flatProps = {
    options: shipmentArray.map((option) => option.id),
  };
  const [shipmentId, setShipmentId] = useState(null);
  const [enableSearch,setenableSearch] = useState(false);
  const [errorShipment,seterrorShipment] = useState(false);
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useDispatch();
  async function getShipmentStatus(id){
    let result = await dispatch(getViewShipment(id));
    console.log(result);
    return result;
  }
  if(shipmentId){
    var val = getShipmentStatus(shipmentId).then((data)=>{return data.status});
    val.then((val)=>{
      if(val=="RECEIVED"){
        setshipdisabled(true);
        seterrorShipment(true);
      }
      else{
        setshipdisabled(false);
        seterrorShipment(false);
      }
    })
    console.log(val);
  }

  return (
    <div className="updateStatus">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">UPDATE SHIPMENT</h1>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          shipmentId: shipmentId,
          billno: billid,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.shipmentId) {
            errors.shipmentId = "Required";
          }
          if (!values.billno) {
            errors.billno = "Required";
          }
          if (!values.updateStatusLocation) {
            errors.updateStatusLocation = "Required";
          }
          if (!values.comments) {
            errors.comments = "Required";
          }
          if (!values.alerttrue) {
            errors.alerttrue = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          updateStatus(values);
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
          <form onSubmit={handleSubmit} className="">
              <div className="">
                <div className="row" >
                  <div className="" >
                    <div className="panel commonpanle ml-4" style={{height:"70%",width:"114%" }}>
                      <div
                        className={`form-group ${
                          errors.shipmentId && touched.shipmentId && ``
                        }`}
                      >
                        <label className="mt-1 text-secondary">
                          Shipment ID
                        </label>
                        <div className="mb-2" style={{width: 300 }}>
                        <Autocomplete
                          {...defaultProps}
                          id="auto-complete"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setShipmentId(newInputValue);
                            setInputValue(newInputValue);
                            newInputValue?setshipdisabled(false):setshipdisabled(true);
                          }}
                          id="controllable-states-demo"
                  
                         
                          autoComplete
                          renderInput={(params) => <TextField {...params}  name="shipmentId" label="Enter Shipment ID" margin="normal"                     
                          />}
                        />
                                              {errorShipment && (
                    <span className="error-msg text-danger mt-3">This shipment has been already delivered.</span>
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
                  <div className="col-1 ml-3 mr-4" >
                    <h6 className="or" style={{position:"absolute", left:"4px",top:"8px"}}><b>OR</b></h6>
                  </div>

                  <div className="" >
                    <div className="panel commonpanle ml-5" style={{height:"70%", width:"140%" }}>
                      <div
                        className={`form-group ${
                          errors.shipmentId && touched.shipmentId && ``
                        }`}
                      >
                        <label className="mt-3 text-secondary">Bill No.</label>
                        <TextField id="standard-basic" label="Enter Bill No." 
                          type="text"
                          className="form-controll ml-5 mt-1 "
                          // placeholder=" Enter Bill No."
                          name="shipmentId"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setbillid(e.target.value);
                            if (e.target.value.length === 0)
                              setshipdisabled(true);
                            else setshipdisabled(false);
                          }}
                          value={values.billno}
                        />
                        {/* <input
                          type="text"
                          className="form-control ml-5 "
                          placeholder=" Enter Bill No."
                          name="shipmentId"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setbillid(e.target.value);
                            if (e.target.value.length === 0)
                              setshipdisabled(true);
                            else setshipdisabled(false);
                          }}
                          value={values.billno}
                        /> */}
                      </div>

                      {/* {errors.billno && touched.billno && (
                        <span className="error-msg text-danger row justify-content-end col-8">
                          {errors.billno}
                        </span>
                      )} */}
                    </div>
                    <div className="row" style={{position:"relative",left:"20rem",top:"300px"}}>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-4 "
                        onClick={() =>  props.history.push(`/shipments`)
                          
                        }
                      >
                        CANCEL
                      </button>
                      <button
                        disabled={shipdisabled}
                        className="btn btn-orange fontSize20 font-bold mr-4 product"
                        onClick={() => {
                        if(shipmentId){
                          if(shipmentArray.filter(e=>e.id === shipmentId).length>0){
                              props.history.push(`/updatestatus/${shipmentId}`)
                          }}
                        else{
                           props.history.push(`/updatestatus/${billid}`);
                        }
                        }}
                      >
                        <img src={update} width="20" height="17" className="mr-2 mb-1" />
                      <span>Update Shipment</span>
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
