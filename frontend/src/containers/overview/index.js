import React, { useState, useEffect } from "react";
import DashBoard from "../../components/overview";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestsPending,
  getPermissions,
  verifyOrgUser,
  rejectOrgUser,
  getRecentReqSent,
  addOrgUser,
} from "../../actions/organisationActions";

const DashBoardContainer = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestsPending());
    dispatch(getPermissions());
    dispatch(getRecentReqSent());
  }, []);

  const requestsPending = useSelector((state) => {
    return state.organisation.requestPending;
  });

  const permissions = useSelector((state) => {
    return state.organisation.permissions;
  });

  const recentRequestsSent = useSelector((state) => {
    return state.organisation.requestsSent;
  });

  const acceptApproval = async (data) => {
    let result;
    if (data?.emailId) result = await addOrgUser(data);
    else result = await verifyOrgUser(data);
    if (result.status === 200) {
      if (data?.rindex) requestsPending.splice(data.rindex, 1);
      setMessage(result.data.data.message);
    } else {
      setError(result.data.data.message);
    }
  };

  const rejectApproval = async (data) => {
    const result = await rejectOrgUser(data);
    if (result.status === 200) {
      requestsPending.splice(data.rindex, 1);
      setMessage(result.data.data.message);
    } else {
      setError(result.data.data.message);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <div className="text-center text text-success">{message}</div>
          <div className="text-center text text-danger">{error}</div>
          <DashBoard
            {...props}
            requestsPending={requestsPending}
            permissions={permissions}
            acceptApproval={acceptApproval}
            rejectApproval={rejectApproval}
            recentRequestsSent={recentRequestsSent}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardContainer;
