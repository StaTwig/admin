import React from "react";
import "./FileUpload.scss";

const FileUpload = ({ files, setFiles, removeFile }) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);
  };

  return (
    <>
      <div className='file-card'>
        <div className='file-inputs'>
          <input type='file' onChange={uploadHandler} />
          <button>
            <i className='fa-solid fa-cloud-arrow-up'></i>
            Upload Files
          </button>
        </div>

        <p className='main'>Supported files</p>
        <p className='info'>Excel, CSV</p>
      </div>
    </>
  );
};

export default FileUpload;
