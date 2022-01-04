import React, { useState } from "react";
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
import { useDispatch } from "react-redux";

const UpdateStatus = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => {
    return state.user;
  });
  // console.log('Profile');
  // console.log(profile);
  const { id } = props.match.params;
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
  const [commentEnabled, setCommentEnabled] = useState(false);
  const setFile = (evt) => {
    setPhotoUrl(URL.createObjectURL(evt.target.files[0]));
    setPhoto(evt.target.files[0]);
  };

  console.log(comment);

  React.useEffect(() => {
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
    } else {
      console.log(result.status);
    }
  };

  const updateStatus = async (values) => {
    const { shipmentId, comments, updateStatusLocation } = values;
    const data = {
      id: shipmentId,
      shipmentUpdates: {
        updateComment: comments,
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
    <div className="updateStatus">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">UPDATE STATUS</h1>
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
            errors.shipmentId = "Required";
          }
          if (!values.updateStatusLocation) {
            errors.updateStatusLocation = "Required";
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
          isSubmitting,
          setFieldValue,
          dirty,
        }) => (
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="card bg-light border-0">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col ">
                    <div className="panel commonpanle">
                      <div className="form-group">
                        <label className="mt-3 text-secondary">
                          Shipment ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="shipmentId"
                          onBlur={handleBlur}
                          value={values.shipmentId}
                        />
                      </div>
                      {/* {errors.shipmentId && touched.shipmentId && (
                        <span className="error-msg text-danger row justify-content-end col-8">
                          {errors.shipmentId}
                        </span>
                      )} */}
                    </div>
                    <h6 className="poheads potext m-4">
                      Account Holder Details
                    </h6>
                    <div className="panel commonpanle">
                      <div className="form-group">
                        <label className="mb-1 text-secondary">User Name</label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="firstName"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={profile.firstName}
                          readonly
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-secondary">
                          Organisation Name
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="organisationName"
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
                      <div className="form-group mb-0">
                        <label className="mb-1 text-secondary">
                          Update Status Location
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="updateStatusLocation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.updateStatusLocation}
                        />
                      </div>
                      {/* {errors.updateStatusLocation &&
                        touched.updateStatusLocation && (
                          <span className="error-msg text-danger-US row justify-content-end col-8">
                            {errors.updateStatusLocation}
                          </span>
                        )} */}
                    </div>

                    <h6 className="poheads potext m-4">Comments</h6>
                    <div className="panel commonpanle mb-5">
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

                      <div className=" pt-2 pb-2 d-flex row">
                        <span
                          onClick={() => {
                            setCount("r1");
                            setCommentEnabled(false);
                            setComment("Damaged in transit");
                          }}
                          className={`txt-outline ${
                            count === "r1" && "comment-active"
                          }`}
                        >
                          Damaged in transit
                        </span>
                        <span
                          onClick={() => {
                            setCount("r2");
                            setCommentEnabled(false);
                            setComment("Miscount");
                          }}
                          className={`txt-outline ${
                            count === "r2" && "comment-active"
                          }`}
                        >
                          Miscount
                        </span>
                        <span
                          onClick={() => {
                            setCount("r3");
                            setCommentEnabled(false);
                            setComment("Shipment Stolen");
                          }}
                          className={`txt-outline ${
                            count === "r3" && "comment-active"
                          }`}
                        >
                          Shipment Stolen
                        </span>
                        <span
                          onClick={() => {
                            setCount("r4");
                            setCommentEnabled(false);
                            setComment("Wrong Shipment");
                          }}
                          className={`txt-outline ${
                            count === "r4" && "comment-active"
                          }`}
                        >
                          Wrong Shipment
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
                          Other
                        </span>
                      </div>
                      <div
                        className="form-group"
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
                            type="text"
                            className="form-control"
                            name="Comment"
                            onChange={(e) => setComment(e.target.value)}
                            size="40"
                            cols="120"
                            rows="7"
                            placeholder="Enter Comment"
                            value={comment}
                          />
                        )}
                      </div>

                      {errors.comments && touched.comments && (
                        <span className="error-msg text-danger">
                          {errors.comments}
                        </span>
                      )}

                      {/* <div className="row mt-3 justify-content-end">
                        <span className="col row col-6 justify-content-end text-secondary">
                          Should send an alert?
                        </span>
                        <div className="col col-2 ml-2 custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value="True"
                            id="yesradio"
                            name="alerttrue"
                          />
                          <label
                            className="custom-control-label"
                            for="yesradio"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="col col-1 pl-2 custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value="False"
                            id="noradio"
                            name="alerttrue"
                          />
                          <label className="custom-control-label" for="noradio">
                            No
                          </label>
                        </div>
                      </div>
                      {errors.alerttrue && touched.alerttrue && (
                        <span className="error-msg text-danger row justify-content-end col-12">
                          {errors.alerttrue}
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="col ">
                    <div className="row">
                      <h6 className="col font-weight-bold mt-4">
                        Upload Image
                      </h6>
                      <button
                        type="button"
                        className="col col-3 btn btn-primary font-weight-bold mr-5 mb-3"
                        onClick={uploadPhoto}
                      >
                        <img
                          src={uploadWhite}
                          width="20"
                          height="17"
                          className="mr-2 mb-1"
                          alt="Upload"
                        />
                        <span>Upload</span>
                      </button>
                    </div>
                    <div className="d-flex flex-column upload bg-white col-9 p-5">
                      {photo ? (
                        <div>
                          <div
                            className="row"
                            style={{ margin: "auto", display: "table" }}
                          >
                            <img
                              onClick={clearImage}
                              width="20"
                              height="20"
                              src={crossIcon}
                              style={{ position: "relative", left: "15vw" }}
                              alt="Clear"
                            />
                            <img
                              src={photoUrl}
                              name="photo"
                              width="250"
                              height="125"
                              className="mt-1"
                              style={{ margin: "auto", display: "table" }}
                              alt="PhotoURL"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            className="row"
                            style={{ margin: "auto", display: "table" }}
                          >
                            {/* <label>{photo.name?photo.name:""}</label> */}
                            <img
                              src={uploadBlue}
                              name="photo"
                              width="50"
                              height="50"
                              className="mt-1"
                              style={{ margin: "auto", display: "table" }}
                              alt="Upload"
                            />
                            <label>
                              Drag and drop files here{" "}
                              <input
                                type="file"
                                className="select"
                                onChange={setFile}
                              />{" "}
                            </label>
                          </div>
                          <div
                            className="row mb-3"
                            style={{ margin: "auto", display: "table" }}
                          >
                            OR
                          </div>
                          <div
                            className="row"
                            style={{
                              margin: "auto",
                              display: "table",
                              position: "relative",
                              top: "3%",
                            }}
                          >
                            <label
                              className="btn btn-primary"
                              style={{ margin: 0, height: "5vh" }}
                            >
                              Browse Files
                              <input
                                type="file"
                                className="select"
                                onChange={setFile}
                              />{" "}
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-row-reverse justify-content-between">
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-primary mr-3"
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
                      Cancel
                    </button>
                    <button
                      className="btn btn-orange fontSize20 font-bold mr-4 product"
                      onClick={updateStatus}
                    >
                      <span>Update Status</span>
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
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModal} //FailurePopUp
          />
        </Modal>
      )}
      {openShipmentFail && (
        <Modal
          close={() => closeModalFail()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <FailPopup
            onHide={closeModalFail} //FailurePopUp
          />
        </Modal>
      )}
      {/* {message && (
        <div className="d-flex justify-content-center mt-3"> <Alert severity="success"><AlertTitle>Success</AlertTitle>{message}</Alert></div>
      )}

      {errorMessage && (
        <div className="d-flex justify-content-center mt-3"> <Alert severity="error"><AlertTitle>Error</AlertTitle>{errorMessage}</Alert></div>
      )} */}
    </div>
  );
};
export default UpdateStatus;
