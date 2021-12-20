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
  const [excel, setExcel] = useState("");
  const dispatch = useDispatch();

  const setExcelFile = (evt) => {
    setExcel(evt.target.files[0]);
  };

  const uploadExcel = async () => {
    let formData = new FormData();
    formData.append("excel", excel);
    console.log(formData);
    dispatch(turnOn());
    const result = await addInventoriesFromExcel(formData);
    if (result.status === 200) {
      dispatch(setReviewinventories(result.data.data));
      props.history.push("/reviewinventory");
    }
    dispatch(turnOff());
  };
  return (
    <div className='excelpopup col'>
      <div className='d-flex flex-column upload mb-5 ml-5'>
        <img
          src={uploadBlue}
          name='photo'
          width='50'
          height='50'
          className='mt-2'
          alt='Upload'
        />
        <div>"Drag and drop" your Excel file here</div>
        <div>or</div>
        <input
          type='file'
          className='mb-3 excelSpace'
          onChange={setExcelFile}
        />
      </div>
      <div className='row justify-content-between'>
        <div />
        <div className='row'>
          <button
            className='btn-outline-primary btn mr-3'
            onClick={props.onHide}
          >
            Cancel
          </button>
          <button className='btn-primary btn mr-4' onClick={uploadExcel}>
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelPopUp;
