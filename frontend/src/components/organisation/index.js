import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Details from "./details";
import Modal from "../../shared/modal";
import OrganisationPopUp from "./organisationPopUp";

const Organisations = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const closeModal = () => setShowModal(false);
  const { orgList, modifyOrg, setShowModals, addOrg, orgTypes } = props;
  // console.log("org" + orgTypes)
  return (
    <div className="users">
      {showModal && (
        <Modal
          close={closeModal}
          title="ADD ORGANISATION"
          size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <OrganisationPopUp
            data={data}
            onSuccess={() => {
              addOrg(data);
              closeModal();
            }}
            setData={setData}
            onHide={closeModal}
            buttonText="ADD"
          />
        </Modal>
      )}
      <div className="d-flex pl-2 justify-content-between">
        <h1 className="breadcrumb dash">MANAGE ORGANISATIONS</h1>
        {/* <div className="pr-4">
          <button
            type="button"
            className="btn btn-warning "
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">Add organisation</span>
          </button>
        </div> */}
      </div>
      <div className="flex-row justify-content-between pl-2 pr-1">
        <div className="panel mr-3 mt-3">
          <div className="mt-4">
            <div className="ml-4 txtColor d-flex flex-row justify-content-between">
              <span className="text-center w-20">Name</span>
              <span className="text-center w-15">Type</span>
              <span className="text-center w-20">Postal address</span>
              <span className="text-center w-10">Country</span>
              <span className="text-center w-10">Status</span>
              <span className="text-center w-15">Created on</span>
              <span className="text-center w-20">&nbsp;</span>
            </div>
            {orgList.map((row, index) => (
              <Details
                key={index}
                org={row}
                rindex={index}
                setShowModals={setShowModals}
                modifyOrg={modifyOrg}
                types={orgTypes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organisations;
