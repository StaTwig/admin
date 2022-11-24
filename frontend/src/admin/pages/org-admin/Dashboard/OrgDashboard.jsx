import React, { useEffect } from "react";
import Analytics from "./Analytics/Analytics";
import "./OrgDashboard.css";
import "../../../assets/styles/index.css";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrganisations,
  getOrgActiveUsers,
  getOrgUserAnalytics,
  getPermissions,
  getRecentReqSent,
  getRequestsPending,
  getWareHouses,
} from "../../../actions/organisationActions";
import { useHistory } from "react-router";
import PendingUsers from "./Pendings/PendingUsers";
import PendingWarehouses from "./Pendings/PendingWarehouses";
import { useTranslation } from "react-i18next";

export default function OrgDashboard(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  if (props.user.role !== "admin") {
    history.push("/overview");
  }

  const user = useSelector((state) => state.user);
  const permissions = useSelector(
    (state) => state?.organisationReducer?.permissions
  );
  const addresses = useSelector(
    (state) => state?.organisationReducer?.addresses
  );
  const { userAnalytics } = useSelector((state) => state.organisationReducer);

  useEffect(() => {
    dispatch(getRequestsPending());
    props.user.organisationType == "Third Party Logistics"
      ? dispatch(getPermissions(props.user.organisationId))
      : dispatch(getPermissions());
    dispatch(getRecentReqSent());
    dispatch(getAllOrganisations());
    dispatch(getOrgActiveUsers());
    dispatch(getWareHouses());
    dispatch(getOrgUserAnalytics(user.organisationId));
    // async function loadData() {
    // 	try {
    // 		const result = await getLocationApproval();
    // 		result.data.sort(function (a, b) {
    // 			return new Date(b.createdAt) < new Date(a.createdAt) ? -1 : 0;
    // 		});
    // 		console.log("GetLocationApproval", result.data);
    // 		setLocationApprovals(result.data);
    // 	} catch (err) {
    // 		console.log("Error from Location Appoval", error);
    // 	}
    // }

    // loadData();
  }, []);

  return (
    <>
      <OrgHeader />
      <section className="admin-page-layout">
        <div className="admin-container">
          <div className="admin-dashboard-container-alt admin-section-space">
            <div className="dashboard-left-space">
              <Analytics t={t} userAnalytics={userAnalytics} />
            </div>
            <div className="dashboard-right-space">
              <PendingUsers
                t={t}
                heading={"Users Approvals"}
                permissions={permissions}
                addresses={addresses}
                {...props}
              />
            </div>
            <div className="dashboard-right-space">
              <PendingWarehouses
                t={t}
                heading={"Location Approvals"}
                permissions={permissions}
                addresses={addresses}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
