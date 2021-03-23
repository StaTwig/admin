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
  getWareHouses,
} from "../../actions/organisationActions";

const DashBoardContainer = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requestsPending, setRequestsPending] = useState([]);
  const [recentRequestsSent, setRecentRequestsSent] = useState([]);
  const dispatch = useDispatch();

  const addresses = useSelector((state) => {
    return state.organisation.addresses;
  });

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
    dispatch(getWareHouses());
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
      if (result.data.data.nModified) {
        const user_arr = usersList.filter((user) => user.id == data.employee);
        const org_arr = organisationsList.filter(
          (organisation) => organisation.id == data.org
        );

        if (user_arr.length && org_arr.length) {
          rRequestsSent.push({
            affiliations: {
              employee_id: data.employee,
              request_date: new Date(),
              request_status: "PENDING",
              last_updated_on: new Date(),
            },
            name: org_arr[0].name,
            user: user_arr[0],
          });
        }
      }
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
            addresses={addresses}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardContainer;
