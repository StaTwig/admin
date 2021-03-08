import React, { useState, useEffect } from "react";
import Affiliate from "../../components/affiliate";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentReqSent,
  getAffilatedPendingReq,
  getAffilatedOrgs,
  unaffiliateOrg,
  acceptAffiliate,
  rejectAffiliate,
  getAllOrganisations,
  addAffiliate,
  getOrgActiveUsers,
} from "../../actions/organisationActions";

const AffiliateContainer = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getRecentReqSent());
    dispatch(getAffilatedPendingReq());
    dispatch(getAffilatedOrgs());
    dispatch(getAllOrganisations());
    dispatch(getOrgActiveUsers());
  }, []);

  const recentRequestsSent = useSelector((state) => {
    return state.organisation.requestsSent;
  });

  const affilatedPendingReq = useSelector((state) => {
    return state.organisation.affilatedPendingReq;
  });

  const affiliatedOrgs = useSelector((state) => {
    return state.organisation.affiliatedOrgs;
  });

  const organisationsList = useSelector((state) => {
    return state.organisation.list;
  });

  const usersList = useSelector((state) => {
    return state.organisation.users;
  });

  const unaffiliatedOrgs = async (data) => {
    const result = await unaffiliateOrg(data);
    if (result.status === 200) {
      affiliatedOrgs.splice(data.rindex, 1);
      setMessage(result.data.data.message);
    } else {
      setError(result.data.data.message);
    }
  };

  const acceptAffliate = async (data) => {
    const result = await acceptAffiliate(data);
    if (result.status === 200) {
      affilatedPendingReq.splice(data.rindex, 1);
      setMessage(result.data.data.message);
    } else {
      setError(result.data.data.message);
    }
  };

  const rejectAffliate = async (data) => {
    const result = await rejectAffiliate(data);
    if (result.status === 200) {
      affilatedPendingReq.splice(data.rindex, 1);
      setMessage(result.data.data.message);
    } else {
      setError(result.data.data.message);
    }
  };

  const sendAffiliate = async (data) => {
    const result = await addAffiliate(data);
    if (result.status === 200) {
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
          <Affiliate
            {...props}
            affiliatedOrgs={affiliatedOrgs}
            affilatedPendingReq={affilatedPendingReq}
            recentRequestsSent={recentRequestsSent}
            unaffiliatedOrg={unaffiliatedOrgs}
            acceptAffliate={acceptAffliate}
            rejectAffliate={rejectAffliate}
            organisationsList={organisationsList}
            sendAffiliate={sendAffiliate}
            users={usersList}
          />
        </div>
      </div>
    </div>
  );
};

export default AffiliateContainer;
