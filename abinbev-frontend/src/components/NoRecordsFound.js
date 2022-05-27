import React from "react";

const NoRecordsFound = (props) => (
  <div
    className={`card rounded border border-white shadow bg-white mt-3 ml-2 p-3 ${props?.dClass}`}
  >
    <span className="text-center txtColor">No records found</span>
  </div>
);

export default NoRecordsFound;
