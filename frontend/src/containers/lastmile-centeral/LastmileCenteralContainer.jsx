import React from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
import LastmileTrack from "../../components/lastmile-track/LastmileTrack";
import LastmileCenteral from "../../components/lastmile-centeral/LastmileCenteral";

const LastmileCenteralContainer = (props) => {
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
          <LastmileCenteral {...props} />
        </div>
      </div>
    </div>
  );
};

export default LastmileCenteralContainer;
