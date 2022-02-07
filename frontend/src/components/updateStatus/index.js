import React, { useState, useEffect } from "react";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import uploadWhite from "../../assets/icons/UploadWhite.svg";
import { useSelector } from "react-redux";
import crossIcon from "../../assets/icons/crossRed.svg";
import SuccessPopup from "./successPopup";
import FailPopup from "./failPopup";
import {
  updateTrackingStatus,
  uploadImage,
  getViewShipmentGmr,
} from "../../actions/shipmentActions";
import Modal from "../../shared/modal";
import "./style.scss";
import { Formik } from "formik";
import { FormControlLabel, Switch } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useDispatch } from "react-redux";
import moment from "moment";
import Loader from "../../shared/loader/Loader";

const UpdateStatus = (props) => {
  const { t, shipmentData } = props;
  const dispatch = useDispatch();
  const profile = useSelector((state) => {
    return state.user;
  });
  const { id } = props.match.params;
  const billNo = shipmentData?.airWayBillNo;
  const { quantity, weight } = useState("");
  const [firstName, setFirstName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(undefined);
  const [openUpdatedStatus, setOpenUpdatedStatus] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shipment, setShipment] = useState({});
  const [count, setCount] = useState("");
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const [loaderC, setLoaderC] = useState(false);
  const [loaderL, setLoaderL] = useState(false);
  const [commentEnabled, setCommentEnabled] = useState(false);
  const setFile = (evt) => {
    setPhotoUrl(URL.createObjectURL(evt.target.files[0]));
    setPhoto(evt.target.files[0]);
  };

  const [acceptanceDate, setAcceptanceDate] = useState("");
  const [customsDate, setCustomsDate] = useState("");
  const [lastStatusDate, setLastStatusDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(getViewShipmentGmr(props.match.params.id));
      if (result) {
        setShipment(result);
      } else {
        setShipment({});
      }
    }
    fetchData();
  }, [dispatch, props.match.params.id]);
  useEffect(() => {
    const acceptanceArr = shipmentData.shipmentUpdates?.filter(
      (u) => u.updateComment === "Acceptance Date"
    );
    let accDate =
      acceptanceArr?.length > 0 ? acceptanceArr[0].updatedOn.split(" ")[0] : "";
    setAcceptanceDate(accDate);

    const customsArr = shipmentData.shipmentUpdates?.filter(
      (u) => u.updateComment === "Customs clearance Date"
    );
    let cusDate =
      customsArr?.length > 0 ? customsArr[0].updatedOn.split(" ")[0] : "";
    setCustomsDate(cusDate);

    const lastStatusArr = shipmentData.shipmentUpdates?.filter(
      (u) => u.updateComment === "Last Status"
    );
    let lsDate =
      lastStatusArr?.length > 0 ? lastStatusArr[0].updatedOn.split(" ")[0] : "";
    setLastStatusDate(lsDate);
  }, [shipmentData]);

  const onToggle = async (value) => {
    document.getElementById(value.target.id).checked =
      value.currentTarget.checked;

    if (value.target.id === "toggle1") setLoader(true);
    else if (value.target.id === "toggle2") setLoaderC(true);
    else if (value.target.id === "toggle3") setLoaderL(true);
    const data = {
      id: id,
      shipmentUpdates: {
        updateComment:
          value.target.id === "toggle1"
            ? "Acceptance Date"
            : value.target.id === "toggle2"
            ? "Customs clearance Date"
            : "Last Status",
        updatedBy: profile.firstName,
        orgid: profile.organisation,
        orglocation: profile.location,
        updatedAt: "InTransit",
        isAlertTrue: true,
      },
    };
    const result = await updateTrackingStatus(data);
    if (result.status === 200) {
      setTimeout(() => {
        if (value.target.id === "toggle1")
          setAcceptanceDate(moment(new Date()).format("D/M/YYYY"));
        else if (value.target.id === "toggle2")
          setCustomsDate(moment(new Date()).format("D/M/YYYY"));
        else if (value.target.id === "toggle3")
          setLastStatusDate(moment(new Date()).format("D/M/YYYY"));
        setLoader(false);
        setLoaderC(false);
        setLoaderL(false);
      }, 2000);
    } else {
      setOpenShipmentFail(true);
      setErrorMessage("Failed to Update");
    }
  };

  const CustomSwitch = withStyles({
    switchBase: {
      "&$checked": {
        color: "#0b65c1",
      },
      "&$checked + $track": {
        backgroundColor: "#0b65c1",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const clearImage = () => {
    setPhoto("");
    setPhotoUrl(undefined);
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("photo", photo, photo.name);
    const result = await uploadImage(id, formData);
    if (result.status === 200) {
      setMessage("Image Uploaded");
    }
  };

  const updateStatus = async (values) => {
    const { shipmentId, updateStatusLocation } = values;

    if (updateStatusLocation === "") {
      setErrorMessage("Require Update Status Location");
    }
    const data = {
      id: shipmentId,
      shipmentUpdates: {
        updateComment: comment,
        updatedBy: profile.firstName,
        orgid: profile.organisation,
        orglocation: profile.location,
        updatedAt: updateStatusLocation,
        isAlertTrue: true,
      },
    };
    const result = await updateTrackingStatus(data);
    if (result.status === 200) {
      setOpenUpdatedStatus(true);
      setMessage("Status updated Successfully");
    } else {
      setOpenShipmentFail(true);
      setErrorMessage("Failed to Update");
    }
  };

  const closeModal = () => {
    setOpenUpdatedStatus(false);
    props.history.push(
      `/${
        shipment.isCustom === true ? `viewgmrshipment` : `viewshipment`
      }/${id}`
    );
  };
  const closeModalFail = () => {
    setOpenShipmentFail(false);
  };
  return (
    <div className='updateStatus'>
      <div className='d-flex justify-content-between'>
        <h1 className='breadcrumb'>{t("update_status")}</h1>
        {/* <div className="d-flex">
          <button className="btn btn-primary font-weight-bold">
            <img
              src={uploadWhite}
              width="20"
              height="17"
              className="mr-2 mb-1"
            />
            <span>Upload</span>
          </button>
        </div> */}
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          shipmentId: id,
          airWayBillNo: billNo,
          quantity: quantity,
          weight: weight,
          firstName: profile.firstName,
          organisationName: profile.organisation,
          organisationLocation: profile.location,
          updateStatusLocation: "",
          alerttrue: "",
          comments: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.shipmentId) {
            errors.shipmentId = t("Required");
          }
          if (!values.updateStatusLocation) {
            errors.updateStatusLocation = t("Required");
          }
          // if (!values.comments) {
          //   errors.comments = "Required";
          // }
          // if (!values.alerttrue) {
          //   errors.alerttrue = "Required";
          // }
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
        }) => (
          <form onSubmit={handleSubmit} className='mb-3'>
            <div className='card bg-light border-0'>
              <div className='card-body'>
                <div className='row justify-content-between'>
                  <div className='col'>
                    <div className='panel commonpanle'>
                      <div className='form-group'>
                        <label className='mt-3 text-secondary'>
                          {t("shipment_id")}
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='shipmentId'
                          onBlur={handleBlur}
                          value={values.shipmentId}
                        />
                      </div>
                      {props.user.isCustom ? (
                        <div>
                          <div className='form-group'>
                            <label className='mt-3 text-secondary'>
                              Airway Bill No
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='airWayBillNo'
                              onBlur={handleBlur}
                              value={values.airWayBillNo}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mt-3 text-secondary'>
                              Quantity
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='quantity'
                              onBlur={handleBlur}
                              value={values.quantity}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mt-3 text-secondary'>
                              Weight
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='weight'
                              onBlur={handleBlur}
                              value={values.weight}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <h6 className='poheads potext m-4'>
                      {t("account_holder_details")}
                    </h6>
                    <div className='panel commonpanle'>
                      <div className='form-group'>
                        <label className='mb-1 text-secondary'>
                          {t("user_name")}
                        </label>
                        <input
                          type='text'
                          className='form-control mb-2'
                          name='firstName'
                          onChange={(e) => setFirstName(e.target.value)}
                          value={profile.firstName}
                          readonly
                        />
                      </div>
                      <div className='form-group'>
                        <label className='mb-1 text-secondary'>
                          {t("organisation_name")}
                        </label>
                        <input
                          type='text'
                          className='form-control mb-2'
                          name='organisationName'
                          onChange={(e) => setOrganisationName(e.target.value)}
                          value={profile.organisation}
                          readonly
                        />
                      </div>
                      {/* <div className="form-group">
                        <label className="mb-1 text-secondary">
                          Organisation Location*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="organisationLocation"
                          onChange={(e) =>
                            setOrganisationLocation(e.target.value)
                          }
                          value={profile.location}
                          readonly
                        />
                      </div> */}
                      <div className='form-group mb-0'>
                        <label className='mb-1 text-secondary'>
                          {t("update_status") + " " + t("location")}
                        </label>
                        <input
                          type='text'
                          className={`form-control mb-2 ${
                            values.updateStatusLocation === ""
                              ? "border-danger"
                              : ""
                          }`}
                          name='updateStatusLocation'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.updateStatusLocation}
                          placeholder={` ${
                            values.updateStatusLocation === ""
                              ? t("Required")
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                    {props.user.isCustom ? (
                      <div>
                        <h6 className='poheads potext m-4'>
                          Shipment Cargo Status
                        </h6>
                        <div
                          className={`col-12 p-3 mb-3 ml-1 rounded1 row bg-white shadow justify-content-between ${
                            loader && "fade-color"
                          }`}
                        >
                          <div className='cargoLabels'>
                            <label className='mb-1 text-secondary'>
                              Acceptance Date
                            </label>
                          </div>
                          {loader && <Loader />}
                          {!loader && (
                            <input
                              type='text'
                              className='form-control mb-2'
                              name='acceptanceDate'
                              onChange={(e) => console.log(e.target.value)}
                              value={acceptanceDate}
                              style={{
                                border: "0px",
                                color: "#6c757d!important",
                              }}
                            />
                          )}
                          <div className='appearDate'>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  readOnly={acceptanceDate !== ""}
                                  disabled={acceptanceDate !== ""}
                                  checked={acceptanceDate !== ""}
                                  onChange={onToggle}
                                  name='checkedB'
                                  id='toggle1'
                                />
                              }
                            />
                          </div>
                        </div>
                        <div className='col col-1 pl-2 custom-control custom-radio'>
                          <input
                            type='radio'
                            className='custom-control-input'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value='False'
                            id='noradio'
                            name='alerttrue'
                          />
                        </div>
                        <div
                          className={`col-12 p-3 mb-3 ml-1 rounded1 row bg-white shadow justify-content-between ${
                            loaderC && "fade-color"
                          }`}
                        >
                          <div className='cargoLabels'>
                            <label className='mb-1 text-secondary'>
                              Customs clearance Date
                            </label>
                          </div>
                          {loaderC && <Loader />}
                          {!loaderC && (
                            <div>
                              <input
                                type='text'
                                className='form-control mb-2'
                                name='customsClearanceDate'
                                onChange={(e) => console.log(e.target.value)}
                                value={customsDate}
                                style={{
                                  border: "0px",
                                  color: "#6c757d!important",
                                }}
                              />
                            </div>
                          )}
                          <FormControlLabel
                            control={
                              <CustomSwitch
                                readOnly={customsDate !== ""}
                                disabled={customsDate !== ""}
                                checked={customsDate !== ""}
                                onChange={onToggle}
                                name='checkedB'
                                id='toggle2'
                              />
                            }
                          />
                        </div>
                        <div
                          className={`col-12 p-3 mb-3 ml-1 rounded1 row bg-white shadow justify-content-between ${
                            loaderL && "fade-color"
                          }`}
                        >
                          <div className='cargoLabels'>
                            <label className='mb-1 text-secondary'>
                              Last Status
                            </label>
                          </div>
                          {loaderL && <Loader />}
                          {!loaderL && (
                            <div>
                              <input
                                type='text'
                                className='form-control mb-2'
                                name='lastStatus'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={lastStatusDate}
                                style={{
                                  border: "0px",
                                  color: "#6c757d!important",
                                }}
                              />
                            </div>
                          )}
                          <FormControlLabel
                            control={
                              <CustomSwitch
                                readOnly={lastStatusDate !== ""}
                                disabled={lastStatusDate !== ""}
                                checked={lastStatusDate !== ""}
                                onChange={onToggle}
                                name='checkedB'
                                id='toggle3'
                              />
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h6 className='poheads potext m-4'>{t("comment")}</h6>
                        <div className='panel commonpanle mb-5'>
                          {/* <div className='form-group mb-0'>
                        <input
                          type='text'
                          className='form-control mb-2'
                          name='comments'
                          //style={{ flexBasis: "100%" }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder='Enter comments here...'
                          value={values.comments}
                        />
                      </div> */}

                          <div className=' pt-2 pb-2 d-flex row'>
                            <span
                              onClick={() => {
                                setCount("r1");
                                setCommentEnabled(false);
                                setComment(t("damaged_in_transit"));
                              }}
                              className={`txt-outline ${
                                count === "r1" && "comment-active"
                              }`}
                            >
                              {t("damaged_in_transit")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r2");
                                setCommentEnabled(false);
                                setComment(t("miscount"));
                              }}
                              className={`txt-outline ${
                                count === "r2" && "comment-active"
                              }`}
                            >
                              {t("miscount")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r3");
                                setCommentEnabled(false);
                                setComment(t("shipment_stolen"));
                              }}
                              className={`txt-outline ${
                                count === "r3" && "comment-active"
                              }`}
                            >
                              {t("shipment_stolen")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r4");
                                setCommentEnabled(false);
                                setComment(t("wrong_shipment"));
                              }}
                              className={`txt-outline ${
                                count === "r4" && "comment-active"
                              }`}
                            >
                              {t("wrong_shipment")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r5");
                                setCommentEnabled(true);
                                setComment("");
                              }}
                              className={`txt-outline ${
                                count === "r5" && "comment-active"
                              }`}
                            >
                              {t("other")}
                            </span>
                          </div>
                          <div
                            className='form-group'
                            style={{ width: "150%", height: "60px" }}
                          >
                            {commentEnabled && (
                              <input
                                disabled={!commentEnabled}
                                style={{
                                  fontSize: "14px",
                                  resize: "none",
                                  //borderBottom: "none",
                                  marginTop: "40px",
                                  //marginBottom:"10px"
                                }}
                                type='text'
                                className='form-control'
                                name='Comment'
                                onChange={(e) => setComment(e.target.value)}
                                size='40'
                                cols='120'
                                rows='7'
                                placeholder={t("enter") + " " + t("comment")}
                                value={comment}
                              />
                            )}
                          </div>

                          {errors.comments && touched.comments && (
                            <span className='error-msg text-danger'>
                              {errors.comments}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className='col '>
                    <div className='row'>
                      <h6 className='col font-weight-bold mt-4'>
                        {t("upload_image")}
                      </h6>
                      <button
                        type='button'
                        className='col col-3 btn btn-primary font-weight-bold mr-5 mb-3'
                        onClick={uploadPhoto}
                      >
                        <img
                          src={uploadWhite}
                          width='20'
                          height='17'
                          className='mr-2 mb-1'
                          alt='Upload'
                        />
                        <span>{t("upload")}</span>
                      </button>
                    </div>
                    <div className='d-flex flex-column upload bg-white col-9 p-5'>
                      {photo ? (
                        <div>
                          <div
                            className='row'
                            style={{ margin: "auto", display: "table" }}
                          >
                            <img
                              onClick={clearImage}
                              width='20'
                              height='20'
                              src={crossIcon}
                              style={{ position: "relative", left: "15vw" }}
                              alt='Clear'
                            />
                            <img
                              src={photoUrl}
                              name='photo'
                              width='250'
                              height='125'
                              className='mt-1'
                              style={{ margin: "auto", display: "table" }}
                              alt='PhotoURL'
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            className='row'
                            style={{ margin: "auto", display: "table" }}
                          >
                            <img
                              src={uploadBlue}
                              name='photo'
                              width='50'
                              height='50'
                              className='mt-1'
                              style={{ margin: "auto", display: "table" }}
                              alt='Upload'
                            />
                            <label>
                              {t("drag_drop") + " " + t("files_here")}{" "}
                              <input
                                type='file'
                                className='select'
                                onChange={setFile}
                              />{" "}
                            </label>
                          </div>
                          <div
                            className='row mb-3'
                            style={{ margin: "auto", display: "table" }}
                          >
                            {t("or")}
                          </div>
                          <div
                            className='row'
                            style={{
                              margin: "auto",
                              display: "table",
                              position: "relative",
                              top: "3%",
                            }}
                          >
                            <label
                              className='btn btn-primary'
                              style={{ margin: 0, height: "5vh" }}
                            >
                              {t("browse_files")}
                              <input
                                type='file'
                                className='select'
                                onChange={setFile}
                              />{" "}
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    {props.user.isCustom && (
                      <>
                        <h6 className='poheads potext m-4'>{t("comment")}</h6>
                        <div className='panel commonpanle mb-5'>
                          {/* <div className='form-group mb-0'>
                        <input
                          type='text'
                          className='form-control mb-2'
                          name='comments'
                          //style={{ flexBasis: "100%" }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder='Enter comments here...'
                          value={values.comments}
                        />
                      </div> */}

                          <div className=' pt-2 pb-2 d-flex row'>
                            <span
                              onClick={() => {
                                setCount("r1");
                                setCommentEnabled(false);
                                setComment(t("damaged_in_transit"));
                              }}
                              className={`txt-outline ${
                                count === "r1" && "comment-active"
                              }`}
                            >
                              {t("damaged_in_transit")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r2");
                                setCommentEnabled(false);
                                setComment(t("miscount"));
                              }}
                              className={`txt-outline ${
                                count === "r2" && "comment-active"
                              }`}
                            >
                              {t("miscount")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r3");
                                setCommentEnabled(false);
                                setComment(t("shipment_stolen"));
                              }}
                              className={`txt-outline ${
                                count === "r3" && "comment-active"
                              }`}
                            >
                              {t("shipment_stolen")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r4");
                                setCommentEnabled(false);
                                setComment(t("wrong_shipment"));
                              }}
                              className={`txt-outline ${
                                count === "r4" && "comment-active"
                              }`}
                            >
                              {t("wrong_shipment")}
                            </span>
                            <span
                              onClick={() => {
                                setCount("r5");
                                setCommentEnabled(true);
                                setComment("");
                              }}
                              className={`txt-outline ${
                                count === "r5" && "comment-active"
                              }`}
                            >
                              {t("other")}
                            </span>
                          </div>
                          <div
                            className='form-group'
                            style={{ width: "150%", height: "60px" }}
                          >
                            {commentEnabled && (
                              <input
                                disabled={!commentEnabled}
                                style={{
                                  fontSize: "14px",
                                  resize: "none",
                                  //borderBottom: "none",
                                  marginTop: "40px",
                                  //marginBottom:"10px"
                                }}
                                type='text'
                                className='form-control'
                                name='Comment'
                                onChange={(e) => setComment(e.target.value)}
                                size='40'
                                cols='120'
                                rows='7'
                                placeholder={t("enter") + " " + t("comment")}
                                value={comment}
                              />
                            )}
                          </div>

                          {errors.comments && touched.comments && (
                            <span className='error-msg text-danger'>
                              {errors.comments}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-row-reverse justify-content-between'>
                  <div>
                    <button
                      type='button'
                      className='btn btn-outline-primary mr-3'
                      onClick={() =>
                        props.history.push(
                          `/${
                            shipment.isCustom === true
                              ? `viewgmrshipment`
                              : `viewshipment`
                          }/${id}`
                        )
                      }
                    >
                      {t("cancel")}
                    </button>
                    <button
                      disabled={!values.updateStatusLocation}
                      className='btn btn-orange fontSize20 font-bold mr-4 product'
                      type='submit'
                    >
                      <span>{t("update_status")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {openUpdatedStatus && (
        <Modal
          close={() => closeModal()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModal} //FailurePopUp
            t={t}
          />
        </Modal>
      )}
      {openShipmentFail && (
        <Modal
          close={() => closeModalFail()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <FailPopup
            onHide={closeModalFail}
            t={t} //FailurePopUp
          />
        </Modal>
      )}
    </div>
  );
};
export default UpdateStatus;
