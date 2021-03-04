import React, { useState, useEffect } from "react";
import Users from "../../components/users";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrgUsers,
  getPermissions,
  addOrgUser,
  activateOrgUser,
  deactivateOrgUser,
  unaffiliateUser,
} from "../../actions/organisationActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import Modal from "../../shared/modal";
import SuccessPopUp from "../../shared/PopUp/successPopUp";

const UserContainer = (props) => {
  const [showModals, setShowModals] = useState(false);
  const closeModals = () => setShowModals(false);
  const [message, setMessage] = useState("");
  const [successmessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrgUsers());
    dispatch(getPermissions());
  }, []);

  const usersList = useSelector((state) => {
    return state.organisation.users;
  });

  const permissions = useSelector((state) => {
    return state.organisation.permissions;
  });

  const activateUser = async (data) => {
    dispatch(turnOn());
    const result = await activateOrgUser(data);
    if (result.status == 200) {
      setSuccessMessage("This User has been Activated successfully!");
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

  const deactivateUser = async (data) => {
    dispatch(turnOn());
    const result = await deactivateOrgUser(data);
    if (result.status == 200) {
      setSuccessMessage("This User has been Deactivated successfully!");
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

  const addUser = async (data) => {
    dispatch(turnOn());
    const result = await addOrgUser(data);
    if (result.status === 200) {
      setMessage(result.data.data.message);
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

  const unaffiliate = async (data) => {
    dispatch(turnOn());
    const result = await unaffiliateUser(data);
    if (result.status === 200) {
      setSuccessMessage("This User has been UnAffliated successfully!");
      setShowModals(true);
    } else {
      setError(result.data.data.message);
    }
    dispatch(turnOff());
  };

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
          <Users
            {...props}
            usersList={usersList}
            activateUser={activateUser}
            deactivateUser={deactivateUser}
            showModals={showModals}
            setShowModals={setShowModals}
            permissions={permissions}
            addUser={addUser}
            unaffiliate={unaffiliate}
          />
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
