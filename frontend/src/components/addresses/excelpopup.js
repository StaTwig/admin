import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { addAddressesFromExcel } from "../../actions/organisationActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import Checked from "../../assets/icons/checked.svg";
import createHistory from "history/createBrowserHistory";
import { t } from "i18next";

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
      <div className="d-flex flex-column upload pb-3 mb-5 ml-5">
        <img
          src={uploadBlue}
          name="photo"
          width="50"
          height="50"
          className="mt-3"
        />
        <div>{t(`Drag and drop your Excel file here`)}</div>
        <div>{t('or')}</div>
        <div className='row' style={{ position: 'relative', display:"flex", flexDirection:"column" }}
        >
          <label htmlFor='fileE' className='mt-2 btn-primary' style={{
            display: "block",
            margin: "0 auto",
            padding:"10px 25px",
            cursor:"pointer"
          }}>
            {t("select_a_file")}
          </label>

          <input
            type='file'
            id='fileE'
            style={{ visibility: "hidden", display:"none" }}
            className='mb-3 excelSpace'
            onChange={setExcelFile}
          />
          {excel !== null && <p className="file-name py-2">{excel?.name}</p>}
        </div>
      </div>
      {visible && (
        <span className="  text-success d-flex flex-row-reverse pr-5 pb-2">
          {t('Addresses Imported')}
        </span>
      )}
      <div className="row justify-content-between">
        <div />
        <div className="row">
          <button
            className="btn-outline-primary btn mr-3"
            onClick={props.onHide}
          >
            {t('CANCEL')}
          </button>
          <button className="btn-primary btn mr-4" onClick={uploadExcel}>
            {t('IMPORT')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelPopUp;
