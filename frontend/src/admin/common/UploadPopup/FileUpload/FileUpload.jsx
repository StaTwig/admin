import React from "react";
import "./FileUpload.scss";

const FileUpload = ({ files, setFiles, removeFile, t }) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles(file);
    // setFiles([...files, file]);
  };

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            <i className="fa-solid fa-cloud-arrow-up"></i>
            {t("upload_file")}
          </button>
        </div>

        <p className="main">{t("supported_file")}</p>
        <p className="info">Excel, CSV</p>
      </div>
    </>
  );
};

export default FileUpload;
