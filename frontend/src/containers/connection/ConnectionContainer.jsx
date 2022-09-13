import React from "react";
import Connection from "../../components/connection/Connection";

export default function ConnectionContainer(props) {
  return (
    <div className="connection-full-container">
      <Connection {...props} />
    </div>
  );
}
