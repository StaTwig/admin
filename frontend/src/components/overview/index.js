import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import NewRequests from "./newrequests";
import LocationRequests from "./locationrequests";
import SentRequests from "./sentrequests";
import RecentRequests from "./recentrequests";
import Modal from "../../shared/modal";
import NUModal from "../users/NUModal";
import NoRecordsFound from "../NoRecordsFound";
import { t } from "i18next";
import { getAllRoles, getAllRolesForTPL } from "../../actions/organisationActions";

const DashBoard = (props) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [btnTxt, setBtnTxt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAddNewUser, toggleAddNewUser] = useState(false);
  const [autoPopUp, setAutoPopUp] = props.popupUser;

  const [defaultRoles, setDefaultRoles] = useState([]);

  React.useEffect(() => {
    if (autoPopUp) {
      setShowModal(true)
      toggleAddNewUser(true);
    };
  }, [autoPopUp])
  

  useEffect(() => {
    //getRoles
    async function getRoles() {
      var roles = [];
      if(props.user.organisationType == "Third Party Logistics"){
         roles = await getAllRolesForTPL(props.user.organisationId)
      }
      else roles = await getAllRoles();
      let role = [];
     for (let i = 0; i < permissions.length; i++) {
       for (let j = 0; j < roles.length; j++) {
         if (permissions[i].role === roles[j]) {
           role.push(permissions[i]);
           continue;
        }
       }
      }
      setDefaultRoles(role);
    }
    getRoles();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    toggleAddNewUser(false);
    setAutoPopUp(false);
  }
  const {
    requestsPending,
    permissions,
    acceptApproval,
    rejectApproval,
    recentRequestsSent,
    organisationsList,
    sendAffiliate,
    users,
    modifyLocations,
    addresses,
    locationApprovals,
    redirectToConfigurationPage
  } = props;
  requestsPending?.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  locationApprovals.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
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
            addresses={addresses}
            isAddNewUser={isAddNewUser}
            onSuccess={() => {
              acceptApproval(data);
              closeModal();
            }}
            onHide={closeModal}
            setData={setData}
            redirectToConfigurationPage={redirectToConfigurationPage}
            defaultRoles={defaultRoles}
          />
        </Modal>
      )}
      <div className="d-flex  pl-3  justify-content-between">
        <h1 className="breadcrumb dash">{t('admin_dashboard')} </h1>
        <div className="d-flex">
          <button
            type="button"
            onClick={() => {
              setTitle("ADD NEW USER");
              setBtnTxt("ADD USER");
              toggleAddNewUser(true);
              setData([]);
              setShowModal(true);
            }}
            className="btn btn-warning "
          >
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">{t('add')} {t('new')} {t('user')}</span>
          </button>
        </div>
      </div>
      <div className="d-flex flex-row ">
        <div className="panel w-50 mr-3 mt-3">
          <h5 className="sub-header" style={{ fontWeight: "bold" }}>{t('request_pending')}</h5>
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
          {/* <div>
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
          </div> */}
          <div className="">
            <h5 className="sub-header" style={{ fontWeight: "bold" }}>{t('location_approvals')}</h5>
            {locationApprovals.map((row, index) => (
              <LocationRequests
                row={row}
                key={index}
                rindex={index}
                setShowModal={setShowModal}
                setData={setData}
                rejectApproval={rejectApproval}
                setTitle={setTitle}
                setBtnTxt={setBtnTxt}
                modifyLocations={modifyLocations}
              />
            ))}
            {locationApprovals.length == 0 && <NoRecordsFound />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
