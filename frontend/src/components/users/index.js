import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import UserDetails from "./userdetails";
import Modal from "../../shared/modal";
import NUModal from "./NUModal";

const Users = (props) => {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <div className="container-fluid pl-5 pr-3">
      {showModal && (
        <Modal
          close={closeModal}
          title="ADD NEW USER"
          size="modal-lg" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <NUModal onHide={closeModal} buttonText="ADD USER" />
        </Modal>
      )}
      <div className="rowDash">
        <div className="dashboard">
          <h1 className="breadcrumb dash">MANAGE USERS</h1>
        </div>
        <div className="pr-4">
          <button
            type="button"
            className="btn btn-warning "
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">Add New User</span>
          </button>
        </div>
      </div>
      <div className="flex-row justify-content-between pl-2 pr-1">
        <div className="panel mr-3 mt-3">
          <div className="mt-4">
            <div className="ml-4 txtColor d-flex flex-row justify-content-between">
              <span className="w-20">Name</span>
              <span className="w-10">Role</span>
              <span className="w-20">Affiliated Organisation</span>
              <span className="w-10">Wallet address</span>
              <span className="w-20">Email/Mobile</span>
              <span className="w-10">Account status</span>
              <span className="w-10">&nbsp;</span>
            </div>
            <UserDetails />
            <UserDetails />
            <UserDetails />
            <UserDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
