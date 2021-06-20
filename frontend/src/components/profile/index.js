import React, { Component, useState } from "react";
import ProfilePic from "../../assets/brands/user-image/Image73@2x.png";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DropdownButton from "../../shared/dropdownButtonGroup";
import Pen from "../../assets/icons/pen.svg";
import Mail from "../../assets/icons/mail.svg";
import Briefcase from "../../assets/icons/briefcase.svg";
import Telephone from "../../assets/icons/telephone.svg";
import "./style.scss";
import { config } from "../../config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const axios = require("axios");
import {
  getUserInfoUpdated,
  updateProfile,
  getUserInfo,
  updateWarehouse,
} from "../../actions/userActions";
import { getWarehouseByOrgId } from "../../actions/productActions";
import PopUpLocation from "./popuplocation";

import Modal from "../../shared/modal";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      selectedFile: null,
      profile: null,
      editMode: false,
      role: "",
      organisation: "",
      warehouseId: "",
      lastName: "",
      walletAddress: "",
      phoneNumber: "",
      status: "",
      email: "",
      profileData: {},
      profile_picture: "",
      message: "",
      location: "",
      orgs: [],
      wareIds: [],
      warehouseLocations: [],
      warehouseAddress_country: "",
      warehouseAddress_city: "",
      warehouseAddress_firstline: "",
      warehouseAddress_zipcode: "",
      warehouseAddress_secondline: "",
      warehouseAddress_state: "",
      title: "",
      warehouseLocByOrg: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const response = await getUserInfoUpdated();
    if (response.status === 200) {
      const {
        profile_picture,
        email,
        firstName,
        lastName,
        phoneNumber,
        address,
        organisation,
        warehouseId,
        status,
        role,
        location,
        warehouseAddress_country,
        warehouseAddress_city,
        warehouseAddress_firstline,
        warehouseAddress_zipcode,
        warehouseAddress_secondline,
        warehouseAddress_state,

        title,
      } = response.data.data;
      console.log("User Data");
      console.log(response.data.data);
      this.setState({
        profile_picture,
        email,
        firstName,
        lastName,
        phoneNumber,
        walletAddress: address,
        organisation,
        warehouseId,
        status,
        role,
        profileData: response.data.data,
        location,
        warehouseAddress_country,
        warehouseAddress_city,
        warehouseAddress_firstline,
        warehouseAddress_zipcode,
        warehouseAddress_secondline,
        warehouseAddress_state,
        title,
      });
    } else {
      //error
    }

    //const [photo, setPhoto] = useState("");

    const item = this.state.organisation.split("/")[1];
    const wareHouseResponse = await getWarehouseByOrgId(item);
    if (wareHouseResponse.status === 1) {
      const wareHouseIdResult = wareHouseResponse.data.map((txn) => txn.id);
      const wareHouseAddresses = wareHouseResponse.data;
      // console.log(wareHouseAddresses,"All warehouses");
      this.setState({
        wareIds: wareHouseIdResult,
        warehouseLocations: wareHouseAddresses,
        warehouseLocByOrg:wareHouseAddresses
      });
      console.log(this.state.warehouseLocByOrg,"warehouseLocByOrg");
      // warehouseLocByOrg.push(this.state.warehouseLocations);
      this.state.warehouseLocations.map((id)=>{
        this.state.warehouseLocations= this.state.warehouseLocations.filter((data)=>response.data.data.warehouseId.includes(data.id));
      })
    }
  }


  closeModal() {
    console.log("Closed Model called");
    this.setState({ openModal: false });
    // props.history.push("/Addlocation");
  }
  onCancel() {
    const {
      prof,
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      organisation,
      warehouseId,
      status,
      location,
      warehouseAddress_country,
      warehouseAddress_city,
      warehouseAddress_firstline,
      warehouseAddress_zipcode,
      warehouseAddress_secondline,
      warehouseAddress_state,

      title,
    } = this.state.profileData;

    this.setState({
      editMode: false,
      profile: prof,
      email,
      firstName,
      phoneNumber,
      walletAddress: address,
      organisation,
      warehouseId,
      lastName,
      status,
      location,
      warehouseAddress_country,
      warehouseAddress_city,
      warehouseAddress_firstline,
      warehouseAddress_zipcode,
      warehouseAddress_secondline,
      warehouseAddress_state,

      title,
    });
  }

  onChange(e) {
    this.setState({ selectedFile: event.target.files[0] });
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", event.target.files[0]);
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
      },
      params: {
        action: "PROFILE",
      },
    };

    if (event.target.files[0] && event.target.files[0].type.match('image.*')) {
      axios
        .post(config().upload, formData, configs)
        .then((response) => {
          alert("Profile Picture updated Successfully");
          this.setState({ profile_picture: response.data.data });
        })
        .catch((error) => {
          alert(error);
        });
      this.setState({ selectedFile: null });
    }else if(!event.target.files[0].type.match('image.*')){
      alert("Please Select only image file");
    }
     else {
      alert("File not selected, Please try again");
    }
  }

  async onSubmit() {
    const {
      firstName,
      lastName,
      organisation,
      warehouseId,
      phoneNumber,
      location,
      warehouseAddress_country,
      warehouseAddress_city,
      warehouseAddress_firstline,
      warehouseAddress_zipcode,
      warehouseAddress_secondline,
      warehouseAddress_state,
      title,
    } = this.state;
    const data = {
      firstName,
      lastName,
      organisation,
      warehouseId,
      phoneNumber,
      location,
      warehouseAddress_country,
      warehouseAddress_city,
      warehouseAddress_firstline,
      warehouseAddress_zipcode,
      warehouseAddress_secondline,
      warehouseAddress_state,
      title,
    };
    const result = await updateProfile(data);

    if (result.status === 200) {
      this.setState({ message: result.data.message, editMode: false });
      const dispatch = useDispatch();
      dispatch(getUserInfo());
      history.push("/profile");
    } else {
      this.setState({ message: "Error while updating please try again." });
    }
  }

  render() {
    const {
      editMode,
      role,
      organisation,
      warehouseId,
      walletAddress,
      phoneNumber,
      status,
      email,
      firstName,
      message,
      lastName,
      location,
      orgs,
      wareIds,
      profile_picture,
      warehouseAddress_country,
      warehouseAddress_city,
      warehouseAddress_firstline,
      warehouseAddress_zipcode,
      warehouseAddress_secondline,
      warehouseAddress_state,
      title,
    } = this.state;
    const imgs = config().fetchProfileImage;
    return (
      <div className="profile">
        <h1 className="breadcrumb">Profile</h1>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div className="col-2">
                <div className="userPic mb-4 mr-2">
                  <img
                    name="photo"
                    src={`${imgs}${this.props.user.photoId}`}
                    className="rounded rounded-circle"
                  />
                </div>
                <input
                  id="profile"
                  onChange={this.onChange}
                  type="file"
                  ref={(ref) => (this.upload = ref)}
                  style={{ display: "none" }}
                />
                {editMode ? (
                  <button
                    type="button"
                    onClick={(e) => this.upload.click()}
                    className="btn btn-outline-info"
                  >
                    Change Photo
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8 mt-5">
                {editMode ? (
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="shipmentId"> First Name</label>
                      <input
                        className="form-control"
                        value={firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Last Name</label>
                      <input
                        className="form-control"
                        value={lastName}
                        placeholder="Enter last Name"
                        onChange={(e) =>
                          this.setState({
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Organisation</label>
                      <input
                        className="form-control wallet"
                        disabled
                        value={this.state.organisation}
                        style={{ textAlign: "left" }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Email</label>
                      <input
                        className="form-control wallet"
                        disabled
                        value={this.props.user.emailId}
                        style={{ textAlign: "left" }}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Phone</label>
                      <PhoneInput
                        className="form-group"
                        country={"in"}
                        placeholder="Enter Phone number"
                        style={{ position: "absolute", marginLeft: "64%" }}
                        value={this.state.phoneNumber}
                        onChange={(phone) =>
                          // {phone > 0 &&
                            this.setState({ phoneNumber: phone })
                          // }
                        }  
                      />
                    </div>

                    <div className="col">
                      <div className="row">
                        <div className="row location">
                          <h5>
                            <b>MY LOCATIONS</b>
                          </h5>
                        </div>
                        <div class="addloc1">
                          {editMode && (
                            <button
                              className="btn btn-orange fontSize20 font-bold pl-10 pr-10"
                              onClick={() => {
                                this.setState({ openModal: true });
                              }}
                            >
                              <span>+ Add </span>
                            </button>
                          )}
                          <div className="inventorypopup">
                            {this.state.openModal && (
                              <Modal
                                class="modal-lg"
                                style="width: 60vw"
                                close={() => this.closeModal()}
                                size="" //for other size's use `modal-lg, modal-md, modal-sm`
                              >
                                <PopUpLocation
                                  wareHouses={this.state.warehouseLocByOrg}
                                />
                              </Modal>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                      <div className="row" style={{width:"50vw", overflow:"hidden"}}>
                        {Object.keys(this.state.warehouseLocations).map((id)=>{
                          return (
                          <div className="col location-cards p-3">
                          <div className="custom-card p-3">
                            <div className="card-header">
                              <div className="d-flex align-items-center justify-content-between">
                                <h3 className="card-title font-weight-bold">
                                  {this.state.warehouseLocations[id]['title']}-{this.state.warehouseLocations[id]['id']}
                                </h3>
                                <Link
                                  to={{
                                    pathname: `/editLocation/${this.state.warehouseLocations[id]['id']}`,
                                    state: { message: "hellow" },
                                  }}
                                >
                                  <button
                                    className="btn btn-blue fontSize20 font-bold pl-2 pr-10"
                                    style={{ height: "35px", width: "100px" }}
                                  >
                                    <img
                                      src={Pen}
                                      width="15"
                                      height="15"
                                      className="mr-2"
                                    />
                                    <span>EDIT</span>
                                  </button>
                                </Link>
                                {/* <button
                                className="btn-primary btn edit-button"
                              >
                                <img src={Pen} width="15" height="15" className="mr-2" />
                                <span>EDIT</span>
                              </button> */}
                              </div>
                            </div>
                            <div className="card-body">
                              <input
                                className="total-input"
                                value={this.state.warehouseLocations[id].warehouseAddress.city}
                                onChange={(e) =>
                                  this.setState({
                                    warehouseAddress_city: e.target.value,
                                  })
                                }
                                placeholder="City"
                              />
                              <input
                                className="total-input"
                                value={this.state.warehouseLocations[id].warehouseAddress.state}
                                onChange={(e) =>
                                  this.setState({
                                    warehouseAddress_state: e.target.value,
                                  })
                                }
                                placeholder="State"
                              />
                              <input
                                className="total-input"
                                value={this.state.warehouseLocations[id].warehouseAddress.country}
                                onChange={(e) =>
                                  this.setState({
                                    warehouseAddress_country: e.target.value,
                                  })
                                }
                                placeholder="Country"
                              />

                              <input
                                className="full-address-input"
                                value={this.state.warehouseLocations[id].warehouseAddress.firstLine}
                                onChange={(e) =>
                                  this.setState({
                                    warehouseAddress_firstline: e.target.value,
                                  })
                                }
                                placeholder="Address"
                              />
                              <input
                                className="full-address-input"
                                value={this.state.warehouseLocations[id].warehouseAddress.secondLine}
                                onChange={(e) =>
                                  this.setState({
                                    warehouseAddress_secondline: e.target.value,
                                  })
                                }
                                placeholder="Address"
                              />

                              <input
                                className="pin-code-input"
                                value={this.state.warehouseLocations[id].warehouseAddress.zipCode}
                                onChange={(e) =>
                                  this.setState({
                                    warehouseAddress_zipcode: e.target.value,
                                  })
                                }
                                placeholder="Zipcode"
                              />
                            </div>
                          </div>
                        </div>);
                        })}
                      </div>
                  </div>
                ) : (
                  <div>
                    <div className="col">
                      <div className="row role">
                        {this.state.role ? (
                          <span>{this.state.role}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div className="row name">
                        {this.state.firstName ? (
                          <span>{this.state.firstName}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                        &nbsp;
                        {this.state.lastName ? (
                          <span>{this.state.lastName}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div className="row row-list">
                        <img
                          src={Briefcase}
                          width="20"
                          height="20"
                          className="mr-3"
                        />
                        {this.state.organisation ? (
                          <span>{this.state.organisation.split("/")[0]}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div className="row row-list">
                        <img
                          src={Mail}
                          width="20"
                          height="20"
                          className="mr-3"
                        />
                        {this.props.user.emailId ? (
                          <span>{this.props.user.emailId}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div className="row row-list">
                        <img
                          src={Telephone}
                          width="20"
                          height="20"
                          className="mr-3"
                        />
                        {(this.state.phoneNumber) ? (
                          <span>{"+"+this.state.phoneNumber}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="row location">MY LOCATIONS</div>
                    </div>
                    <div
                      className="row"
                      style={{ width: "50vw", overflow: "hidden" }}
                    >
                      {Object.keys(this.state.warehouseLocations).map((id) => {
                        console.log(this.state.warehouseLocations,"this.state.warehouseLocations");
                        return (
                          <div className="col">
                            <div className="location-cards">
                              <div className="custom-card p-3">
                                <div className="card-header">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <h3 className="card-title font-weight-bold">
                                    {this.state.warehouseLocations[id]['title']}-{this.state.warehouseLocations[id]['id']}
                                    </h3>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="total">
                                    {this.state.warehouseLocations[id].warehouseAddress.city && (
                                      <span>
                                        {this.state.warehouseLocations[id].warehouseAddress.city}
                                      </span>
                                    )}
                                    
                                    {this.state.warehouseLocations[id].warehouseAddress.state && (
                                      <span>
                                        ,{this.state.warehouseLocations[id].warehouseAddress.state}
                                      </span>
                                    )}
                                    
                                    {this.state.warehouseLocations[id].warehouseAddress.country && (
                                      <span>
                                        ,{this.state.warehouseLocations[id].warehouseAddress.country}
                                      </span>
                                    )}
                                  </div>

                                  <div className="full-address">
                                    {/* 50 /b/, Takshila Apt, Mahakali Caves Road, Chakala, Andheri (west) Mumbai, Maharashtra, */}
                                    {this.state.warehouseLocations[id].warehouseAddress.firstLine ? (
                                      <span>
                                        {this.state.warehouseLocations[id].warehouseAddress.firstLine}
                                      </span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </div>
                                  <div className="full-address">
                                    {/* 50 /b/, Takshila Apt, Mahakali Caves Road, Chakala, Andheri (west) Mumbai, Maharashtra, */}
                                    {this.state.warehouseLocations[id].warehouseAddress.secondLine ? (
                                      <span>
                                        {this.state.warehouseLocations[id].warehouseAddress.secondLine}
                                      </span>
                                    ) : null}
                                  </div>
                                  <div className="pin-code">
                                    Zipcode :{" "}
                                    {this.state.warehouseLocations[id].warehouseAddress.zipCode ? (
                                      <span>
                                        {this.state.warehouseLocations[id].warehouseAddress.zipCode}
                                      </span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {!editMode ? (
                // <div>
                <button
                  className="btn-primary btn"
                  onClick={() => {
                    this.setState({ editMode: true });
                    this.onOrganisation();
                  }}
                >
                  <img src={Pen} width="15" height="15" className="mr-3" />
                  <span>EDIT</span>
                </button>
              ) : (
                // </div>
                <div className="d-flex flex-row justify-content-between">
                  <button
                    className="btn btn-outline-info mr-2"
                    onClick={this.onCancel}
                  >
                    <span>CANCEL</span>
                  </button>
                  <button className="btn-primary btn" onClick={this.onSubmit}>
                    <span>SAVE</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {message && <div className="alert alert-success">{message}</div>}
      </div>
    );
  }
}

export default Profile;
