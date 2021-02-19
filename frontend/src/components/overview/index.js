import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import NewRequests from "./newrequests";
import SentRequests from "./sentrequests";
import RecentRequests from "./recentrequests";
import Modal from "../../shared/modal";
import NUModal from "../users/NUModal";

const DashBoard = (props) => {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <div className="container-fluid pl-5">
      {showModal && (
        <Modal
          close={closeModal}
          title="ASSIGN USER ROLE"
          size="modal-lg" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <NUModal onHide={closeModal} buttonText="ASSIGN" />
        </Modal>
      )}
      <div className="rowDash">
        <div className="dashboard">
          <h1 className="breadcrumb dash">ADMIN DASHBOARD </h1>
        </div>
        <div>
          <button type="button" className="btn btn-warning ">
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">Add New User</span>
          </button>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between pl-2 pr-1">
        <div className="panel w-50 mr-3 mt-3">
          <h5 className="sub-header">Request Pending</h5>
          <NewRequests setShowModal={setShowModal} />
          <NewRequests setShowModal={setShowModal} />
          <NewRequests setShowModal={setShowModal} />
          <NewRequests setShowModal={setShowModal} />
          <NewRequests setShowModal={setShowModal} />
        </div>
        <div className="panel w-50 mr-3 mt-3">
          <div>
            <h5 className="sub-header">Send request</h5>
            <SentRequests />
          </div>
          <div className="mt-4">
            <h5 className="sub-header">Recent Requests sent</h5>
            <div className="ml-4 txtColor d-flex flex-row justify-content-between">
              <span className="w-25">Name</span>
              <span className="w-25">Organisation</span>
              <span className="w-25">Email</span>
              <span className="w-25">Date</span>
              <span className="w-25">Wallet address</span>
            </div>
            <RecentRequests />
            <RecentRequests />
            <RecentRequests />
            <RecentRequests />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
