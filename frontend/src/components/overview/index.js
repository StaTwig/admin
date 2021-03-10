import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import NewRequests from "./newrequests";
import SentRequests from "./sentrequests";
import RecentRequests from "./recentrequests";
import Modal from "../../shared/modal";
import NUModal from "../users/NUModal";
import NoRecordsFound from "../NoRecordsFound";

const DashBoard = (props) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [btnTxt, setBtnTxt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const {
    requestsPending,
    permissions,
    acceptApproval,
    rejectApproval,
    recentRequestsSent,
    organisationsList,
    sendAffiliate,
    users,
  } = props;

  return (
    <div className="dashboard">
      {showModal && (
        <Modal
          close={closeModal}
          title={title}
          size="modal-lg" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <NUModal
            data={data}
            permissions={permissions}
            onSuccess={() => {
              acceptApproval(data);
              closeModal();
            }}
            onHide={closeModal}
            buttonText={btnTxt}
            setData={setData}
          />
        </Modal>
      )}
      <div className="d-flex  pl-3  justify-content-between">
        <h1 className="breadcrumb dash">ADMIN DASHBOARD </h1>
        <div className="d-flex">
          <button
            type="button"
            onClick={() => {
              setTitle("ADD NEW USER");
              setBtnTxt("ADD USER");
              setData([]);
              setShowModal(true);
            }}
            className="btn btn-warning "
          >
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">Add New User</span>
          </button>
        </div>
      </div>
      <div className="d-flex flex-row ">
        <div className="panel w-50 mr-3 mt-3">
          <h5 className="sub-header">Request Pending</h5>
          {requestsPending.map((row, index) => (
            <NewRequests
              requestRow={row}
              key={index}
              rindex={index}
              setShowModal={setShowModal}
              setData={setData}
              rejectApproval={rejectApproval}
              setTitle={setTitle}
              setBtnTxt={setBtnTxt}
            />
          ))}
          {requestsPending.length == 0 && <NoRecordsFound />}
        </div>
        <div className="panel w-50 mt-3">
          <div>
            <h5 className="sub-header">Send Request</h5>
            <SentRequests
              sendAffiliate={sendAffiliate}
              organisationsList={organisationsList}
              users={users}
            />
          </div>
          <div className="mt-4">
            <h5 className="sub-header">Recent Requests Sent</h5>
            <div className="ml-4 txtColor d-flex flex-row justify-content-between">
              <span className="w-25">Name</span>
              <span className="w-25 text-center">Organisation</span>
              <span className="w-25 text-center">Email</span>
              <span className="w-25 text-center">Date</span>
              <span className="w-25 text-center">Wallet address</span>
            </div>
            {recentRequestsSent.map((row, index) => (
              <RecentRequests reqSent={row} key={index} />
            ))}
            {recentRequestsSent.length == 0 && <NoRecordsFound />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
