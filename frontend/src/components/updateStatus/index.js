import React, { useState } from "react";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import uploadWhite from "../../assets/icons/UploadWhite.svg";
import { useSelector } from "react-redux";
import { UpdateTrackingStatus } from "../../actions/spinnerActions";
import Modal from "../../shared/modal";
import "./style.scss";

const UpdateStatus = (props) => {
  const profile = useSelector((state) => {
    return state.user;
  });
  const [orders, setOrders] = useState([]);

  const [comments, setComments] = useState("");
  const [photo, setPhoto] = useState("");
  const [updateStatusLocation, setUpdateStatusLocation] = useState("");
  const [alerttrue, setTrue] = useState("");
  const [alertfalse, setFalse] = useState("");

  const [openUpdatedStatus, setOpenUpdatedStatus] = useState(false);
  const setFile = (evt) => {
    setPhoto(evt.target.files[0]);
  };

  const updateStatus = async () => {
    const data = {
      shipmentId,
      firstName,
      organisationName,
      organisationLocation,
      updateStatusLocation,
      alerttrue,
      alertfalse,
      comments,
    };
    let formData = new FormData();

    formData.append("shipmentId", shipmentId);
    formData.append("firstName", firstName);
    formData.append("organisationName", organisationName);
    formData.append(" organisationLocation", organisationLocation);
    formData.append(" updateStatusLocation", updateStatusLocation);
    formData.append("alerttrue", alerttrue);
    formData.append("alertfalse", alertfalse);
    formData.append("comments ", comments);
    formData.append("photo", photo);
    const result = await addNewProduct(formData);
    if (result.status == 1) {
      setOpenUpdatedStatus(true);
      console.log("success add product");
    }
  };

  const closeModal = () => {
    setOpenUpdatedStatus(false);
    props.history.push("/tracing");
  };

  return (
    <div className="updateStatus">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">UPDATE STATUS</h1>
        <div className="d-flex">
          <button className="btn btn-primary font-weight-bold">
            <img
              src={uploadWhite}
              width="20"
              height="17"
              className="mr-2 mb-1"
            />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between">
            <div className="col mr-3">
              <div className="panel commonpanle">
                <div className="form-group">
                  <label className="mb-1 text-secondary">Order</label>
                  <input name="id" type="text" className="form-control" />
                </div>
              </div>
              <div className="panel commonpanle">
                <h6 className="poheads potext mt-3 mb-3">
                  Account Holder Details
                </h6>
                <div className="form-group">
                  <label className="mb-1 text-secondary">UserName*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={profile.firstName}
                    readonly
                  />
                </div>
                <div className="form-group">
                  <label className="mb-1 text-secondary">
                    Organisation Name*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="organisationName"
                    value={profile.organisation}
                    readonly
                  />
                </div>
                <div className="form-group">
                  <label className="mb-1 text-secondary">
                    Organisation Location*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="organisationLocation"
                    value={profile.location}
                    readonly
                  />
                </div>
                <div className="form-group">
                  <label className="mb-1 text-secondary">
                    Update Status Location*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="updateStatusLocation"
                    onChange={(e) => setUpdateStatusLocation(e.target.value)}
                    value={updateStatusLocation}
                  />
                </div>
              </div>
              <div className="panel commonpanle">
                <label className="mb-1 text-secondary">is Alert True?</label>
                <input
                  type="radio"
                  name="alerttrue"
                  placeholder="YES"
                  value="True"
                />{" "}
                <label className="mb-1">Yes</label>
                <input type="radio" name="alerttrue" value="False" />
                <label className="mb-1">No</label>
                <h6 className="poheads potext mt-3 mb-3">Comment*</h6>
                <input
                  type="text"
                  className="form-control"
                  name="comments"
                  onChange={(e) => setComments(e.target.value)}
                  value={comments}
                />
              </div>
            </div>
            <div className="col ml-5">
              <h6 className="font-weight-bold mb-4">Upload Image</h6>
              <div className="d-flex flex-column upload">
                <img
                  src={uploadBlue}
                  name="photo"
                  width="50"
                  height="50"
                  className="mt-3"
                />
                <label>
                  Drag and drop files here{" "}
                  <input type="file" class="select" onChange={setFile} />{" "}
                </label>
                <div>or</div>
                <label class="btn-primary btn browse">
                  Browse Files
                  <input type="file" class="select" onChange={setFile} />{" "}
                </label>
              </div>
            </div>
            <div></div>
          </div>

          <div className="d-flex flex-row justify-content-between">
            <div />
            <div>
              {" "}
              <button
                className="btn btn-outline-primary mr-4"
                onClick={() => props.history.push("/tracing")}
              >
                CANCEL
              </button>
              <button
                className="btn btn-orange fontSize20 font-bold mr-4 product"
                onClick={updateStatus}
              >
                <span>UPDATE STATUS</span>
              </button>
            </div>{" "}
            {openUpdatedStatus && (
              <Modal
                close={() => closeModal()}
                size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
              ></Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateStatus;
