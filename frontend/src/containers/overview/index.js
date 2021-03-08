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
  getAllOrganisations,
  addAffiliate,
  getOrgActiveUsers,
} from "../../actions/organisationActions";

const DashBoardContainer = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requestsPending, setRequestsPending] = useState([]);
  const [recentRequestsSent, setRecentRequestsSent] = useState([]);
  const dispatch = useDispatch();

  const reqPending = useSelector((state) => {
    return state.organisation.requestPending;
  });

  const permissions = useSelector((state) => {
    return state.organisation.permissions;
  });

  const rRequestsSent = useSelector((state) => {
    return state.organisation.requestsSent;
  });

  const organisationsList = useSelector((state) => {
    return state.organisation.list;
  });

  const usersList = useSelector((state) => {
    return state.organisation.users;
  });

  useEffect(() => {
    dispatch(getRequestsPending());
    dispatch(getPermissions());
    dispatch(getRecentReqSent());
    dispatch(getAllOrganisations());
    dispatch(getOrgActiveUsers());
  }, []);

  useEffect(() => {
    setRequestsPending(reqPending);
  }, [reqPending, setRequestsPending]);

  useEffect(() => {
    setRecentRequestsSent(rRequestsSent);
  }, [rRequestsSent, setRecentRequestsSent]);

  const acceptApproval = async (data) => {
    let result;
    if (data?.emailId) result = await addOrgUser(data);
    else result = await verifyOrgUser(data);
    if (result.status == 200) {
      if (data.rindex) reqPending.splice(data.rindex, 1);
      setMessage(result.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setError(result.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const rejectApproval = async (data) => {
    const result = await rejectOrgUser(data);
    if (result.status === 200) {
      reqPending.splice(data.rindex, 1);
      setMessage(result.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setError(result.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const sendAffiliate = async (data) => {
    const result = await addAffiliate(data);
    if (result.status === 200) {
      if (result.data.nModified > 0)
        rRequestsSent.push(
          usersList.filter((user) => user.id == data.employee)[0]
        );
      setMessage(result.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setError(result.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
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
            organisationsList={organisationsList}
            sendAffiliate={sendAffiliate}
            users={usersList}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardContainer;
