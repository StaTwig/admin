import React, { useState, useEffect } from "react";
import Organisations from "../../components/organisation";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOrgs, updateOrg } from "../../actions/organisationActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import Modal from "../../shared/modal";
import SuccessPopUp from "../../shared/PopUp/successPopUp";

const OrganisationContainer = (props) => {
  if (props.user.type != "CENTRAL_AUTHORITY") {
    props.history.push(`/overview`);
  }
  const [showModals, setShowModals] = useState(false);
  const closeModals = () => setShowModals(false);
  const [message, setMessage] = useState("");
  const [successmessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrgs());
  }, []);

  const orgList = useSelector((state) => {
    return state.organisation.list;
  });

  const updateOrgs = async (data) => {
    dispatch(turnOn());
    const result = await updateOrg(data);
    if (result.status == 200) {
      setSuccessMessage("This organisation " + data.status.toLowerCase() + "!");
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

  // const addOrgs = async (data) => {
  //   dispatch(turnOn());
  //   const result = await addOrg(data);
  //   if (result.status === 200) {
  //     setSuccessMessage("This organisation added!");
  //     setMessage(result.message);
  //   } else {
  //     setError(result.message);
  //   }
  //   dispatch(turnOff());
  // };

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <div className="text-center text text-success">{message}</div>
          <div className="text-center text text-danger">{error}</div>

          {showModals && (
            <Modal
              close={closeModals}
              // title="ADD NEW USER"
              // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
              buttonclassName="btn-orange"
            >
              <SuccessPopUp onHide={closeModals} message={successmessage} />
            </Modal>
          )}
          <Organisations
            {...props}
            orgList={orgList}
            modifyOrg={updateOrgs}
            showModals={showModals}
            setShowModals={setShowModals}
            // addOrg={addOrgs}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganisationContainer;
