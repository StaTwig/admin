import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPendingOrgs } from "../../../actions/organisationActions";
import StatwigHeader from "../../../shared/Header/StatwigHeader/StatwigHeader";
import Analytics from "./Analytics/Analytics";
import "./Dashboard.css";
import Pendings from "./Pendings/Pendings";

export default function Dashboard(props) {
  const history = useHistory();
  if (props.user.type !== "CENTRAL_AUTHORITY") {
    history.push("/overview");
  }

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const pendingOrgs = useSelector(
    (state) => state.organisationReducer.pendingOrgs
  );

  useEffect(() => {
    dispatch(getPendingOrgs());
  }, []);

  const refetchOrgs = () => {
    dispatch(getPendingOrgs());
  };

  return (
    <>
      <StatwigHeader />
      <section className="admin-page-layout">
        <div className="admin-container">
          <div className="admin-dashboard-container admin-section-space">
            <div className="dashboard-left-space">
              <Analytics t={t} />
            </div>
            <div className="dashboard-right-space">
              <Pendings
                t={t}
                pendingOrgs={pendingOrgs}
                refetchOrgs={refetchOrgs}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
