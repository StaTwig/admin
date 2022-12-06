import React from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
import LastmileTrack from "../../components/lastmile-track/LastmileTrack";

const LastmileTrackingContainer = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="container-fluid p-0">
      <Header {...props} t={t} />
      <div className="d-flex">
        <Sidebar {...props} t={t} />
        <div
          className="Network-content"
          style={{ pointerEvents: props.demoLogin ? "none" : "auto" }}
        >
          <LastmileTrack {...props} />
        </div>
      </div>
    </div>
  );
};

export default LastmileTrackingContainer;
