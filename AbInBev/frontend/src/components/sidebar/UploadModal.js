import React from "react";
import Popup from 'reactjs-popup';

const UploadModal = (props) => {
  return (
    <Popup
      trigger={<div className="btn btn-warning dahbtnupload" > Upload Sales Data </div >}
      modal
    >
      <div className="col-md-12 uploadModal">
        <h1>Upload Sales Data</h1><hr />
        <div className="col-md-12">
          <div className="col-md-12">
            <label className="filterSubHeading mt-3"> Data Collected Date </label>
            <input className="filterSelect" type="date" />
          </div>
          <div className="col-md-12">
            <label className="filterSubHeading mt-3">Upload Sales Data</label>
            <input className="filterInput" type="file" />
          </div>
          <div className="col-md-12">
            <label className="filterSubHeading mt-3"> Target Sales Percentage </label>
            <input className="filterSelect" type="number" maxlength="100" />
          </div>
          <div className="col-md-12" style={{ display: "flex" }}>
            <button className="btn cancelButton mt-4">Close</button>
            <button className="btn uploadButton mt-4">Upload</button>
          </div>
        </div>
      </div>
    </Popup >
  );
}


export default UploadModal;
