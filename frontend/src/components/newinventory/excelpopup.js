import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import {
  addInventoriesFromExcel,
  setReviewinventories,
} from "../../actions/inventoryActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import uploadBlue from "../../assets/icons/UploadBlue.svg";

const ExcelPopUp = (props) => {
  const { t, setOpenExcel, setOpenFailInventory, setInventoryError } = props;
  const [excel, setExcel] = useState(null);
  const dispatch = useDispatch();

  const setExcelFile = (evt) => {
    const extension = evt.target.files[0].name.split(".").pop()
    if(["xlsx","xls"].includes(extension)){
    setExcel(evt.target.files[0]);
    }else{
      props.importError("Invalid file");
    }
  };

  const uploadExcel = async () => {

    let formData = new FormData();
    formData.append("excel", excel);
    dispatch(turnOn());
    const result = await addInventoriesFromExcel(formData);
    if (result.status === 200 && result.data.data?.length !== 0) {
      dispatch(setReviewinventories(result.data.data));
      props.history.push("/reviewinventory");
    } else if (result.status === 200 && result.data.data?.length === 0) {
      setOpenExcel(false);
      setInventoryError("all_products_are_expired");
      setOpenFailInventory(true);
    }
    if (result.status === 400) {
      props.importError(result.data.message);
    }
    if (result.status === 500) {
      props.importError(result.data.message);
    }
    dispatch(turnOff());
  };
  return (
    <div className='excelpopup col'>
      <div
        className='d-flex flex-column upload mb-5 ml-5'
        style={excel === null ? { height: "200px" } : { height: "220px" }}
      >
        <img
          src={uploadBlue}
          name='photo'
          width='50'
          height='50'
          className='mt-3'
          alt=''
        />
        <div>
          "{t("drag_drop")}" {t("your_excel_file_here")}
        </div>
        <div>{t("or")}</div>
        <div className='row' style={{ position: "relative" }}>
          <label
            htmlFor='fileE'
            className='mb-3 mt-3 btn btn-primary d-center'
            style={{
              display: "block",
              margin: "0 auto",
            }}
          >
            {t("select_a_file")}
          </label>

          <input
            type='file'
            id='fileE'
            style={{ visibility: "hidden" }}
            className='mb-3 excelSpace'
            onChange={setExcelFile}
          />
          {excel !== null && <p className='file-name'>{excel?.name}</p>}
        </div>
      </div>
      <div className='row justify-content-between'>
        <div />
        <div className='row'>
          <button
            className='btn-outline-primary btn mr-3'
            onClick={props.onHide}
          >
            {t("cancel")}
          </button>
          <button
            className='btn-primary btn mr-4 import-disable-button'
            disabled={excel === null ? true : false}
            onClick={uploadExcel}
          >
            {t("import")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelPopUp;
