import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Tabs from "./tabs/tabs";
import Newrequests from "../overview/newrequests";
import Recentrequests from "../overview/recentrequests";
import Sentrequests from "../overview/sentrequests";
import AffiliateOrganisation from "./affiliateorganisation";
import ReceivedRecentRequests from "./receivedrecentrequests";
import Modal from "../../shared/modal";
import NUModal from "../users/NUModal";

const Affiliate = (props) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <div className="ml-5">
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
      <div className="affiliate pl-3">
        <h1 className="breadcrumb dash mb-3">AFFILIATED ORGANISATION</h1>
        <div>
          <Tabs {...props} tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </div>
      </div>
      <div className="panel mt-3 ml-3 mr-5 p-2">
        {tabIndex == 1 && (
          <>
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
            <AffiliateOrganisation />
          </>
        )}
        {tabIndex == 2 && (
          <>
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
            <ReceivedRecentRequests setShowModal={setShowModal} />
          </>
        )}
        {tabIndex == 3 && (
          <div>
            <div className="ml-4 txtColor d-flex flex-row justify-content-between">
              <span className="w-25">Name</span>
              <span className="w-25">Organisation</span>
              <span className="w-25">Email</span>
              <span className="w-25">Date</span>
              <span className="w-25">Wallet address</span>
            </div>
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
            <Recentrequests />
          </div>
        )}
        {tabIndex == 4 && (
          <div className="w-50">
            <Sentrequests disableShadow={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Affiliate;
