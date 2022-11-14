import React, { useState } from "react";
import FileList from "./FileList/FileList";
import FileUpload from "./FileUpload/FileUpload";

export default function UploadPopup({ handleImportClose }) {
  const [files, setFiles] = useState([]);

  return (
    <div className="addOrganization-container">
      <div className="addorganization-header">
        <p className="vl-subheading f-500 vl-blue">Import Organization</p>
        <i className="fa-solid fa-xmark" onClick={handleImportClose}></i>
      </div>
      <div className="addorganization-body">
        <div className="Popup-wrapper">
          <FileUpload
            files={files}
            setFiles={setFiles}
          />
          <FileList files={files} />
        </div>
      </div>
      <div className="addorganization-actions">
        <button className="vl-btn vl-btn-sm vl-btn-primary">Import File</button>
      </div>
    </div>
  );
}
