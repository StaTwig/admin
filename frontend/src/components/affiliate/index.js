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
import NoRecordsFound from "../NoRecordsFound";

const Affiliate = (props) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const {
    recentRequestsSent,
    affilatedPendingReq,
    affiliatedOrgs,
    unaffiliatedOrg,
    acceptAffliate,
    rejectAffliate,
  } = props;

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
      <div className="affiliate">
        <h1 className="breadcrumb dash mb-3">AFFILIATED ORGANISATION</h1>
        <div>
          <Tabs {...props} tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </div>
      </div>
      <div className="panel affiliate">
        {tabIndex == 1 && (
          <>
            {affiliatedOrgs.map((row, index) => (
              <AffiliateOrganisation
                unaffiliatedOrg={unaffiliatedOrg}
                org={row}
                key={index}
                index={index}
              />
            ))}
            {affiliatedOrgs.length == 0 && <NoRecordsFound />}
          </>
        )}
        {tabIndex == 2 && (
          <>
            {affilatedPendingReq.map((row, index) => (
              <ReceivedRecentRequests
                pendingRow={row}
                key={index}
                index={index}
                acceptAffliate={acceptAffliate}
                rejectAffliate={rejectAffliate}
              />
            ))}
            {affilatedPendingReq.length == 0 && <NoRecordsFound />}
          </>
        )}
        {tabIndex == 3 && (
          <div>
            {recentRequestsSent.length > 0 && (
              <div className="ml-4 txtColor d-flex flex-row justify-content-between">
                <span className="w-25">Name</span>
                <span className="w-25">Organisation</span>
                <span className="w-25">Email</span>
                <span className="w-25">Date</span>
                <span className="w-25">Wallet address</span>
              </div>
            )}
            {recentRequestsSent.map((row, index) => (
              <Recentrequests
                reqSent={row}
                unaffiliatedOrg={unaffiliatedOrg}
                key={index}
              />
            ))}
            {recentRequestsSent.length == 0 && <NoRecordsFound />}
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
