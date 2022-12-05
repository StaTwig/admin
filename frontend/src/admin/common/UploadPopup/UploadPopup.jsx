import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { turnOn } from "../../../actions/spinnerActions";
import Modal from "../../../shared/modal";
import { addOrgsFromExcel } from "../../actions/organisationActions";
import { turnOff } from "../../actions/spinnerActions";
import { addUsersFromExcel } from "../../actions/userActions";
import SuccessPopup from "../../shared/Popup/SuccessPopup";
import FileList from "./FileList/FileList";
import FileUpload from "./FileUpload/FileUpload";

export default function UploadPopup({
  type,
  handleImportClose,
  orgUpload,
  resetFlag,
  t,
}) {
  const [excel, setExcel] = useState([]);
  const dispatch = useDispatch();
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [openFailurePopup, setOpenFailurePopup] = useState(false);
  // const setExcelFile = (evt) => {
  //   const extension = evt.target.files[0].name.split(".").pop()
  //   if(["xlsx","xls"].includes(extension)){
  //   setExcel(evt.target.files[0]);
  //   }else{
  //     console.log("Invalid file");
  //   }
  // };
  const closeModal = () => {
    if (openSuccessPopup) {
      setOpenSuccessPopup(false);
    }
    setOpenFailurePopup(false);
  };
  const uploadExcel = async () => {
    try {
      let formData = new FormData();
      formData.append("excel", excel);
      dispatch(turnOn());
      let result;
      if (orgUpload) result = await addOrgsFromExcel(formData);
      else result = await addUsersFromExcel(formData);
      dispatch(turnOff());
      result.status === 200
        ? setOpenSuccessPopup(true)
        : setOpenFailurePopup(true);
      resetFlag();
    } catch (err) {
      console.log(err);
      setOpenFailurePopup(true);
    }
  };
  return (
    <div className="addOrganization-container">
      <div className="addorganization-header">
        <p className="vl-subheading f-500 vl-blue">
          {type === "org" ? t("import_org") : t("import_users")}
        </p>
        <i className="fa-solid fa-xmark" onClick={handleImportClose}></i>
      </div>
      <div className="addorganization-body">
        <div className="Popup-wrapper">
          <FileUpload t={t} files={excel} setFiles={setExcel} />
          <FileList files={excel} />
        </div>
      </div>
      <div className="addorganization-actions">
        <button
          onClick={uploadExcel}
          className="vl-btn vl-btn-sm vl-btn-primary"
        >
          {t("import_file")}
        </button>
      </div>
      {openSuccessPopup && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModal}
            successMessage={`${
              orgUpload ? "Organisations" : "Users"
            } added succesfully`}
            // errorMessage="Put the Error Message Here"
          />
        </Modal>
      )}
      {openFailurePopup && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModal}
            // successMessage="Product added succesfully"
            errorMessage={`Unable to Add ${
              orgUpload ? "Organisations" : "Users"
            } please try again later`}
          />
        </Modal>
      )}
    </div>
  );
}
