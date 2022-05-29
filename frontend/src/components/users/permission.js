import React from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { t } from "i18next";

const Permission = (props) => {
  const { permissionTitle, permissionDescription } = props;
  // console.log(`Permission: ${permissionTitle}  ${permissionDescription}`);
  return (
    <div className="d-flex flex-row p-2">
      <span className="w-50">{permissionTitle}</span>
      <span className="w-50">{t(permissionDescription)}</span>
    </div>
  );
};

export default Permission;
