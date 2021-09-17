import React, { useState } from "react";
import Location from "../../assets/icons/Location.png";
import Location1 from "../../assets/icons/add_new_location.png";
import DropdownButton from "../../shared/dropdownButtonGroup";
import { addWarehouse } from "../../actions/userActions";
import { Link } from "react-router-dom";
import SuccessPopup from "../../shared/PopUp/successPopUp";
import Modal from "../../shared/modal";

const PopUpLocation = (props) => {
  // const wareHouseDetails = props.wareHouses.map((txn) => txn.warehouseAddress.firstLine + "," + txn.warehouseAddress.city);
  const [wareHouse, setWareHouse] = useState({});
  const [selectLocation, setSelectLocation] = useState("Select Location");
  const [addedLocationModal, setAddedLocationModal] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);

  const closeModalAddedLocation = () => {
    console.log(props.history);
    setAddedLocationModal(false);
    props.history.push("/profile");
  };

  const updateStatus = async (wareHouse) => {
    const data = {
      title: wareHouse.title,
      organisationId: wareHouse.organisationId,
      postalAddress: wareHouse.postalAddress,
      region: wareHouse.region,
      country: wareHouse.country,
      location: wareHouse.location,
      warehouseAddress: wareHouse.warehouseAddress,
      supervisors: wareHouse.supervisors,
      employeess: wareHouse.employees,
    };

    const result = await addWarehouse(data);
    if ((result.status = 200)) {
      console.log("Added Location");
      console.log(result);
      if (result.data.data) {
        setAddedLocationModal(true);
      } else {
        setAlertFlag(true);
        console.log("Error in add location");
        console.log(result);
      }
    }
  };

  return (
    <div className='addLocation'>
      <center>
        <h1 className='addLocationText'>
          <b>Add Location</b>
        </h1>
      </center>

      <div className='wrapper1'>
        <Link to={"/Addlocation"}>
          <button className='btn btn-orange fontSize18' type='button'>
            <img
              src={Location1}
              width='20'
              height='20'
              className='mr-2 mb-1'
              alt='Location'
            />
            <span className="buttonS">
              <b>Add New Location</b>
            </span>
          </button>
        </Link>
      </div>

      <div className='line'>
        <center>
          <h6>
            {" "}
            ━━━━━━━━━━ &nbsp;&nbsp;&nbsp; Or &nbsp;&nbsp;&nbsp; ━━━━━━━━━━{" "}
          </h6>
        </center>
      </div>
      <br></br>
      <div className='ml-5'>
        <div className='col-md-12'>
          <div className='form-group'>
            <img
              src={Location}
              className='addLocModalImg pt-2'
              alt='Location'
            ></img>
            <label htmlFor='Select Location' className='addLocModal pt-3'>
              <b>Select Location</b>
            </label>
            <div
              className={`form-controlAddLoc mr-5 ${
                alertFlag ? "border-danger" : ""
              }`}
            >
              <DropdownButton
                name={selectLocation}
                // name2="Select Location"
                onSelect={(v) => {
                  setAlertFlag(false);
                  console.log("Location Selected");
                  console.log(v);
                  setWareHouse({ ...v });
                  setSelectLocation(v.warehouseAddress.firstLine);
                  console.log(wareHouse);
                }}
                groups={props.wareHouses}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='wrapper1'>
        <button
          className='buttonS btn btn-primary mt-3'
          onClick={() => {
            updateStatus(wareHouse);
          }}
        >
          <span>CONTINUE</span>
        </button>
      </div>
      {addedLocationModal && (
        <Modal
          close={() => closeModalAddedLocation()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModalAddedLocation} //FailurePopUp
          />
        </Modal>
      )}
      {/* {openLocationFail && (
          <Modal
            close={() => closeModalFail()}
            size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          >
            <FailPopup
              onHide={closeModalFail} //FailurePopUp
            />
          </Modal>
        )}   */}
      {/* {alertFlag && 
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          Please select Location
        </Alert>} */}
    </div>
  );
};
export default PopUpLocation;
