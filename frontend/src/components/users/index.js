import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import UserDetails from "./userdetails";
import Modal from "../../shared/modal";
import NUModal from "./NUModal";

const Users = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const closeModal = () => setShowModal(false);
  const {
    usersList,
    activateUser,
    deactivateUser,
    setShowModals,
    permissions,
    addUser,
    unaffiliate,
  } = props;

  return (
    <div className="users">
      {showModal && (
        <Modal
          close={closeModal}
          title="ADD NEW USER"
          size="modal-lg" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <NUModal
            data={data}
            permissions={permissions}
            onSuccess={() => {
              addUser(data);
              closeModal();
            }}
            setData={setData}
            onHide={closeModal}
            buttonText="ADD USER"
          />
        </Modal>
      )}
      <div className="d-flex pl-2 justify-content-between">
        <h1 className="breadcrumb dash">MANAGE USERS</h1>
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
              <span className="text-center w-15">Name</span>
              <span className="text-center w-20">Role</span>
              <span className="text-center w-15">Affiliated Organisation</span>
              <span className="text-center w-15">Wallet address</span>
              <span className="text-center w-15">Email/Mobile</span>
              <span className="text-center w-10">Account status</span>
              <span className="text-center w-10">&nbsp;</span>
            </div>
            {usersList.map((row, index) => (
              <UserDetails
                key={index}
                user={row}
                rindex={index}
                setShowModals={setShowModals}
                activateUser={activateUser}
                deactivateUser={deactivateUser}
                unaffiliate={unaffiliate}
                permissions={permissions}
                permission={
                  permissions.length
                    ? permissions.filter((row) => row.role == row.role)[0]
                        .permissions
                    : []
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
