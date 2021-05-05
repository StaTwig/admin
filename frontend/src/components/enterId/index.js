import React, { useState } from "react";
import "./style.scss";
import { Formik } from "formik";
const EnterId = (props) => {
  const [shipmentId, setShipmentId] = useState(null);
  const [billid, setbillid] = useState(null);
  const [shipdisabled, setshipdisabled] = useState(true);
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
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="card bg-light border-0">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col">
                    <div className="panel commonpanle mr-5">
                      <div
                        className={`form-group ${
                          errors.shipmentId && touched.shipmentId && `mb-0`
                        }`}
                      >
                        <label className="mt-3 text-secondary">
                          Shipment ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="shipmentId"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setShipmentId(e.target.value);
                            if (e.target.value.length === 0)
                              setshipdisabled(true);
                            else setshipdisabled(false);
                          }}
                          value={values.shipmentId}
                        />
                      </div>

                      {/* {errors.shipmentId && touched.shipmentId && (
                        <span className="error-msg text-danger row justify-content-end col-8">
                          {errors.shipmentId}
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="col-1 ml-2 mr-5">
                    <h3 className="or">OR</h3>
                  </div>

                  <div className="col ">
                    <div className="panel commonpanle mr-5">
                      <div
                        className={`form-group ${
                          errors.shipmentId && touched.shipmentId && `mb-0`
                        }`}
                      >
                        <label className="mt-3 text-secondary">Bill No.</label>
                        <input
                          type="text"
                          className="form-control"
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
                      </div>

                      {/* {errors.billno && touched.billno && (
                        <span className="error-msg text-danger row justify-content-end col-8">
                          {errors.billno}
                        </span>
                      )} */}
                    </div>
                    <div className="row mt-5 bottom">
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-4"
                        onClick={() =>
                          props.history.push(`/viewshipment/${id}`)
                        }
                      >
                        CANCEL
                      </button>
                      <button
                        disabled={shipdisabled}
                        className="btn btn-orange fontSize20 font-bold mr-4 product"
                        onClick={() => {
                          shipmentId
                            ? props.history.push(`/updatestatus/${shipmentId}`)
                            : props.history.push(`/updatestatus/${billid}`);
                        }}
                      >
                        <span>UPDATE SHIPMENT</span>
                      </button>
                    </div>
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
