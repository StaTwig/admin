import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import AddressDetails from "./addressdetails";
import { Link } from "react-router-dom";
import NoRecordsFound from "../NoRecordsFound";
import ExcelPopUp from "./excelpopup";
import ExportIcon from "../../assets/icons/Export.svg";
import Modal from "../../shared/modal";

const Address = (props) => {
  const { addresses } = props;
  const [openExcel, setOpenExcel] = useState(false);
  const closeExcelModal = () => {
    setOpenExcel(false);
  };

  return (
    <div className="address">
      <div className="d-flex pl-2 justify-content-between">
        <h1 className="breadcrumb dash">MANAGE ADDRESS</h1>
        <div>
          <button
            className="btn-primary btn"
            onClick={() => setOpenExcel(true)}
          >
            <div className="d-flex  align-items-center ">
              <img src={ExportIcon} width="16" height="16" className="mr-3" />
              <span>Import addresses</span>
            </div>
          </button>
          {openExcel && (
            <Modal
              title="Import"
              close={() => closeExcelModal()}
              size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
            >
              <ExcelPopUp
                {...props}
                onHide={closeExcelModal} //FailurePopUp
              />
            </Modal>
          )}
          <button type="button" className="btn btn-warning ml-3" style={{backgroundColor:'#b2b0aa', borderColor: '#b2b0aa'}}>
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <Link to="/newaddress" className="forgot-link text-decoration-none">
              <span className="txt ">Add New Address</span>
            </Link>
          </button>
        </div>
      </div>
      <div className={`d-flex row ${addresses.length == 0 ? "w-100" : ""}`}>
        {addresses.map((address, index) => (
          <AddressDetails address={address} key={index} />
        ))}

        {addresses.length == 0 && <NoRecordsFound dClass="w-100" />}
      </div>
    </div>
  );
};

export default Address;
