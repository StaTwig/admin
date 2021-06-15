import React, { useState } from "react";
import Location from "../../assets/icons/Location.png";
import { useSelector, useDispatch } from "react-redux";
import Location1 from "../../assets/icons/add_new_location.png";
import DropdownButton from "../../shared/dropdownButtonGroup";
import {addWarehouse} from "../../actions/userActions";
import { Link } from "react-router-dom";
import SuccessPopup from "../../shared/PopUp/successPopUp";
import FailPopup from "../../shared/PopUp/failedPopUp";
import Modal from "../../shared/modal";

const PopUpLocation = (props) => {
  console.log("Pop Up Detail");
  console.log(props.wareHouses);
  // const wareHouseDetails = props.wareHouses.map((txn) => txn.warehouseAddress.firstLine + "," + txn.warehouseAddress.city);
  const [wareHouse, setWareHouse]= useState({});
  const [selectLocation, setSelectLocation] = useState("Select Location");
  const [addedLocationModal, setAddedLocationModal] = useState(false);
  const [openLocationFail, setOpenLocationFail] = useState(false);

  const closeModalAddedLocation = ()=>{
    setAddedLocationModal(false);
    props.history.push('/profile');
  };

  const updateStatus = async (wareHouse)=>{
    console.log("warehouse for post");
    console.log(wareHouse);
    const data =  {
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
    if(result.status = 200){
      console.log('Added Location');
      console.log(result);
      if (result.data.data.status!=0)
      { 
        setAddedLocationModal(true);
      }
    }
    else{
      console.log("Error in add location");
      console.log(result);
    }
  };

  return (
    <div class="">
      <center>
        <h1 className="">
          <b>Add Location</b>
        </h1>
      </center>
      <br></br>

      <div className="slectloc1">
        <div className="row">
          <div className="col-md-6 com-sm-12">
            <div className="form-group">
              <img src={Location} height="30" width="20" className="pt-2"></img>
              <label htmlFor="Select Location" className="pt-3">
                <b>Select Location</b>
              </label>
              <div className="form-control">
                <DropdownButton
                  name={selectLocation}
                  // name2="Select Location"
                  onSelect={(v)=>{
                    console.log('Location Selected');
                    console.log(v);
                    setWareHouse({...v});
                    setSelectLocation(v.warehouseAddress.firstLine);
                    console.log(wareHouse);
                  }}
                  groups={props.wareHouses}
                />.
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <center>
        <h7>------------------------- Or -------------------------</h7>
      </center>
      <div class="wrapper1">
        <Link to={"/Addlocation"}>
          <button className="btn btn-orange fontSize18 font-bold">
            <img src={Location1} width="23" height="23" className="mr-2 mb-1" />
            <span>
              <b>Add New Location</b>
            </span>
          </button>
        </Link>
      </div>

      <div class="wrapper1">
        <button className="btn btn-orange fontSize20 font-bold mr-4" onClick={()=>{updateStatus(wareHouse);}}>
          <span>Continue</span>
        </button>
      </div>
      {addedLocationModal && (
        <Modal
          close={() => closeModalAddedLocation()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
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
    </div>
  );
};
export default PopUpLocation;
