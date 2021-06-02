import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { addAddressesFromExcel } from "../../actions/organisationActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import Checked from "../../assets/icons/checked.svg";
import createHistory from "history/createBrowserHistory";

const ExcelPopUp = (props) => {
  const [excel, setExcel] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const history = createHistory();

  const setExcelFile = (evt) => {
    setExcel(evt.target.files[0]);
  };

  const uploadExcel = async () => {
    let formData = new FormData();
    formData.append("excel", excel);
    dispatch(turnOn());
    const result = await addAddressesFromExcel(formData);
    if (result.status === 200) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        props.onHide();
        history.go(0);
      }, 3000);
    }
    dispatch(turnOff());
  };

  return (
    <div className="excelpopup col p-4">
      <div className="d-flex flex-column upload mb-5 ml-5">
        <img
          src={uploadBlue}
          name="photo"
          width="50"
          height="50"
          className="mt-2"
        />
        <div>"Drag and drop" your Excel file here</div>
        <div>or</div>
        <input
          type="file"
          className="mb-3 excelSpace"
          onChange={setExcelFile}
        />
      </div>
      {visible && (
        <span className="  text-success d-flex flex-row-reverse pr-5 pb-2">
          Addresses Imported
        </span>
      )}
      <div className="row justify-content-between">
        <div />
        <div className="row">
          <button
            className="btn-outline-primary btn mr-3"
            onClick={props.onHide}
          >
            CANCEL
          </button>
          <button className="btn-primary btn mr-4" onClick={uploadExcel}>
            IMPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelPopUp;
