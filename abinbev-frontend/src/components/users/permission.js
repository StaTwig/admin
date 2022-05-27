import React from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";

const Permission = (props) => {
  const { permissionTitle, permissionDescription } = props;
  return (
    <div className="d-flex flex-row p-2">
      <span className="w-50">{permissionTitle}</span>
      <span className="w-50">{permissionDescription}</span>
    </div>
  );
};

export default Permission;
