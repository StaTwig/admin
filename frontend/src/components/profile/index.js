import React from "react";
import { Link } from "react-router-dom";
import Pen from "../../assets/icons/pen.svg";
import PenWhite from "../../assets/icons/pen-white.svg";
import Mail from "../../assets/icons/mail.svg";
import Briefcase from "../../assets/icons/briefcase.svg";
import Telephone from "../../assets/icons/telephone.svg";
import "./style.scss";
import { config } from "../../config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getImage } from "../../actions/notificationActions";
import SuccessPopUp from "./successPopup";

import { getUserInfoUpdated, updateProfile } from "../../actions/userActions";
import { getWarehouseByOrgId } from "../../actions/productActions";
import PopUpLocation from "./popuplocation";
import Modal from "./modal/index";
import Modal1 from "../../shared/modal";
import moment from "moment";
const axios = require("axios");

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      selectedFile: null,
      profile: null,
      editMode: props.location.state ? props.location.state.editMode : false,
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
      signup_date: "",
      warehouseLocations: [],
      warehouseAddress_country: "",
      warehouseAddress_city: "",
      warehouseAddress_firstline: "",
      warehouseAddress_zipcode: "",
      warehouseAddress_secondline: "",
      warehouseAddress_state: "",
      title: "",
      warehouseLocByOrg: [],
      image: "",
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
        signup_date,
        title,
      } = response.data.data;
      // console.log("User Data");
      // console.log(response.data.data);
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
        signup_date,
        title,
      });
      // if((this.state.profileData.phoneNumber).includes("+")){
      //   this.setState({phoneNumber:(this.state.profileData.phoneNumber).replace('+','')});
      //   // this.setState({phoneNumber:(this.state.profileData.phoneNumber).slice(1,(this.state.profileData.phoneNumber).length)});
      // }
      // console.log(this.state.profileData.phoneNumber.replace('+',''),"Profile Data");
    } else {
      //error
    }

    const item = this.state.organisation.split("/")[1];
    const wareHouseResponse = await getWarehouseByOrgId(item);
    if (wareHouseResponse.status === 1) {
      const wareHouseIdResult = wareHouseResponse.data.map((txn) => txn.id);
      const wareHouseAddresses = wareHouseResponse.data;
      // console.log(wareHouseAddresses,"All warehouses");
      this.setState({
        wareIds: wareHouseIdResult,
        warehouseLocations: response.data.data.warehouses.filter(
          (i) =>
            i.status === "ACTIVE" ||
            i.status === "PENDING" ||
            i.status === "NOTVERIFIED"
        ),
        warehouseLocByOrg: wareHouseAddresses,
      });

      //  this.state.warehouseLocations.map((id)=>{
      //     this.state.warehouseLocations= this.state.warehouseLocations.filter((data)=>response.data.data.warehouseId.includes(data.id));
      //   })
    }

    const that = this;
    const r = await getImage(this.props.user.photoId);
    const reader = new window.FileReader();
    reader.readAsDataURL(r.data);
    reader.onload = function () {
      that.setState({ image: reader.result });
    };
  }

  closeModal() {
    console.log("Closed Model called");
    this.setState({ openModal: false, message: "" });
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
      selectedFile: null,
      title,
    });
  }
  onChange() {
    console.log(this.state.selectedFile, "selected");
    const formData = new FormData();
    formData.append("photo", this.state.selectedFile);
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
      },
      params: {
        action: "PROFILE",
      },
    };
    if (this.state.selectedFile != null) {
      if (
        this.state.selectedFile &&
        this.state.selectedFile.type.match("image.*")
      ) {
        axios
          .post(config().upload, formData, configs)
          .then((response) => {
            this.setState({ profile_picture: response.data.data });
          })
          .catch((error) => {
            alert(error);
          });
        // this.setState({ selectedFile: null });
      }
      // else if(!(this.state.selectedFile).type.match('image.*')){
      //   alert("Please Select only image file");
      // };'

      //  else {
      //   alert("File not selected, Please try again");
      //  }
    }
  }

  async onSubmit() {
    this.onChange();
    let {
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
    phoneNumber = phoneNumber ? phoneNumber.replaceAll("+", "") : "";
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
      // const dispatch = useDispatch();
      // dispatch(getUserInfo());
      // history.push("/profile");
    } else {
      this.setState({ message: "Error while updating please try again." });
    }
  }

  render() {
    const { editMode, selectedFile, firstName, lastName, image } = this.state;
    const imgs = config().fetchProfileImage;

    return (
      <div className='profile'>
        <h1 className='breadcrumb'>Profile</h1>
        <div className='card' style={{ border: "none" }}>
          <div className='card-body'>
            <div className='d-flex flex-row justify-content-between'>
              <div className='col-2'>
                <div className='userPic mb-4 mr-2'>
                  {selectedFile ? (
                    <img
                      name='photo'
                      src={`${URL.createObjectURL(selectedFile)}`}
                      className='rounded rounded-circle'
                      alt='ProfilePhoto'
                    />
                  ) : (
                    <img
                      name='photo'
                      src={`${image}`}
                      className='rounded rounded-circle'
                      alt='ProfilePhoto'
                    />
                  )}
                </div>
                <input
                  id='profile'
                  onChange={(e) => {
                    this.setState({ selectedFile: e.target.files[0] });
                    if (!e.target.files[0].type.match("image.*")) {
                      alert("Please Select only image file");
                      this.setState({ selectedFile: null });
                    }
                  }}
                  type='file'
                  ref={(ref) => (this.upload = ref)}
                  style={{ display: "none" }}
                />
                {editMode ? (
                  <button
                    type='button'
                    onClick={(e) => this.upload.click()}
                    className='btn btn-outline-info'
                  >
                    Change Photo
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className='col-8 mt-5'>
                {editMode ? (
                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='shipmentId'> First Name</label>
                      <input
                        style={{ flexBasis: "34%" }}
                        className='input refship '
                        type='text'
                        id='referenceShipmentId'
                        name='firstname'
                        placeholder='Enter First Name'
                        value={firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='shipmentId'>Last Name</label>
                      <input
                        style={{ flexBasis: "34%" }}
                        className='input refship '
                        type='text'
                        id='referenceShipmentId'
                        name='lastname'
                        value={lastName}
                        placeholder='Enter Last Name'
                        onChange={(e) =>
                          this.setState({
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='shipmentId'>Organisation</label>
                      <input
                        className='form-control wallet'
                        //disabled
                        style={{ flexBasis: "34.5%", fontSize: "14px" }}
                        value={this.state.organisation}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='shipmentId'>Email</label>
                      <input
                        className='form-control wallet'
                        //disabled
                        style={{ flexBasis: "34.5%", fontSize: "14px" }}
                        value={this.props.user.emailId}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='shipmentId'>Phone</label>
                      <PhoneInput
                        className='form-group'
                        country={"in"}
                        placeholder='Enter Phone number'
                        style={{ position: "absolute", marginLeft: "64%" }}
                        value={this.state.phoneNumber}
                        onChange={(phone) =>
                          this.setState({ phoneNumber: phone })
                        }
                      />
                    </div>

                    <div className='col'>
                      <div className='row'>
                        <div className='row location'>
                          <h5>
                            <b>MY LOCATIONS</b>
                          </h5>
                        </div>
                        <div className='addloc1'>
                          {editMode && (
                            <button
                              className='buttonA btn btn-orange font-bold mt-1'
                              onClick={() => {
                                this.setState({ openModal: true });
                              }}
                            >
                              <span>+ ADD </span>
                            </button>
                          )}
                          <div className='inventorypopup'>
                            {this.state.openModal && (
                              <Modal
                                className='modal-lg'
                                style={{ width: "60vw" }}
                                close={() => this.closeModal()}
                                size=''
                              >
                                <PopUpLocation
                                  {...this.props}
                                  closeModal={this.closeModal}
                                  wareHouses={this.state.warehouseLocByOrg}
                                />
                              </Modal>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className='row'
                      style={{ width: "50vw", overflow: "hidden" }}
                    >
                      {Object.keys(this.state.warehouseLocations).map((id) => {
                        return (
                          <div className='col location-cards p-3'>
                            <div className='custom-card p-3'>
                              <div className='card-header'>
                                <div className='d-flex align-items-center justify-content-between'>
                                  <h3
                                    className='card-title font-weight-bold'
                                    style={{ fontSize: "18px" }}
                                  >
                                    {this.state.warehouseLocations[id]["title"]}
                                    <div
                                      style={{
                                        fontSize: "15px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {this.state.warehouseLocations[id]["id"]}
                                    </div>
                                  </h3>
                                  {this.state.warehouseLocations[id][
                                    "status"
                                  ] === "ACTIVE" && (
                                    <Link
                                      to={{
                                        pathname: `/editLocation/${this.state.warehouseLocations[id]["id"]}`,
                                        state: {
                                          editMode: this.state.editMode,
                                        },
                                      }}
                                    >
                                      <button
                                        className='btn-edit fontSize20 pl-2 pr-10'
                                        style={{
                                          height: "35px",
                                          width: "100px",
                                        }}
                                      >
                                        <img
                                          src={Pen}
                                          width='15'
                                          height='15'
                                          className='mr-2'
                                          alt='Edit'
                                        />
                                        <span className='font-weight-bold edit-text'>
                                          EDIT
                                        </span>
                                      </button>
                                    </Link>
                                  )}
                                  {/* <button
                                className="btn-primary btn edit-button"
                              >
                                <img src={Pen} width="15" height="15" className="mr-2" />
                                <span>EDIT</span>
                              </button> */}
                                  {this.state.warehouseLocations[id][
                                    "status"
                                  ] !== "ACTIVE" && (
                                    <span className='font-weight-bold badge badge-danger'>
                                      Approval Pending
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className='card-body'>
                                <input
                                  className='total-input'
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.city
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_city: e.target.value,
                                    })
                                  }
                                  placeholder='City'
                                />
                                <input
                                  className='total-input'
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.state
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_state: e.target.value,
                                    })
                                  }
                                  placeholder='State'
                                />
                                <input
                                  className='total-input'
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.country
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_country: e.target.value,
                                    })
                                  }
                                  placeholder='Country'
                                />

                                <input
                                  className='full-address-input'
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.firstLine
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_firstline:
                                        e.target.value,
                                    })
                                  }
                                  placeholder='Address'
                                />
                                <input
                                  className='full-address-input'
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.secondLine
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_secondline:
                                        e.target.value,
                                    })
                                  }
                                  placeholder='Address'
                                />

                                <input
                                  className='pin-code-input'
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.zipCode
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_zipcode: e.target.value,
                                    })
                                  }
                                  placeholder='Zipcode'
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='col'>
                      <div className='row role'>
                        {this.state.role ? (
                          <span>{this.state.role}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div
                        className='row mb-3'
                        style={{ fontSize: "35px", fontWeight: "600" }}
                      >
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
                      <div className='row date-joined'>
                        {this.state.signup_date ? (
                          <span>
                            Joined on{" "}
                            {moment(this.state.signup_date).format(
                              "Do MMMM YYYY"
                            ) === "Invalid date"
                              ? this.state.signup_date
                              : moment(this.state.signup_date).format(
                                  "Do MMMM YYYY"
                                )}
                          </span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div className='row row-list'>
                        <img
                          src={Briefcase}
                          width='20'
                          height='20'
                          className='mr-3'
                          alt='Organisation'
                        />
                        {this.state.organisation ? (
                          <span>{this.state.organisation.split("/")[0]}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div className='row row-list'>
                        <img
                          src={Mail}
                          width='20'
                          height='20'
                          className='mr-3'
                          alt='Address'
                        />
                        {this.props.user.emailId ? (
                          <span>{this.props.user.emailId}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div className='row row-list'>
                        <img
                          src={Telephone}
                          width='20'
                          height='20'
                          className='mr-3'
                          alt='Phone Number'
                        />
                        {this.state.phoneNumber ? (
                          <span>
                            +{this.state.phoneNumber.replaceAll("+", "")}
                          </span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                    </div>
                    <div className='col mt-5'>
                      <div className='row location'>MY LOCATIONS</div>
                    </div>
                    <div
                      className='row'
                      style={{ width: "50vw", overflow: "hidden" }}
                    >
                      {Object.keys(this.state.warehouseLocations).map((id) => {
                        return (
                          <div className='col'>
                            <div className='location-cards mt-1'>
                              <div className='custom-card p-3'>
                                <div className='card-header'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                    <h3
                                      className='card-title font-weight-bold'
                                      style={{ fontSize: "18px" }}
                                    >
                                      {
                                        this.state.warehouseLocations[id][
                                          "title"
                                        ]
                                      }
                                      <div
                                        style={{
                                          fontSize: "15px",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {
                                          this.state.warehouseLocations[id][
                                            "id"
                                          ]
                                        }
                                      </div>
                                    </h3>
                                    {this.state.warehouseLocations[id][
                                      "status"
                                    ] !== "ACTIVE" && (
                                      <div className='font-weight-bold badge badge-danger ml-3'>
                                        Approval Pending
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className='card-body'>
                                  <div className='total'>
                                    {this.state.warehouseLocations[id]
                                      .warehouseAddress.city && (
                                      <span>
                                        {
                                          this.state.warehouseLocations[id]
                                            .warehouseAddress.city
                                        }
                                      </span>
                                    )}

                                    {this.state.warehouseLocations[id]
                                      .warehouseAddress.state && (
                                      <span>
                                        ,
                                        {
                                          this.state.warehouseLocations[id]
                                            .warehouseAddress.state
                                        }
                                      </span>
                                    )}

                                    {this.state.warehouseLocations[id]
                                      .warehouseAddress.country && (
                                      <span>
                                        ,
                                        {
                                          this.state.warehouseLocations[id]
                                            .warehouseAddress.country
                                        }
                                      </span>
                                    )}
                                  </div>

                                  <div className='full-address'>
                                    {/* 50 /b/, Takshila Apt, Mahakali Caves Road, Chakala, Andheri (west) Mumbai, Maharashtra, */}
                                    {this.state.warehouseLocations[id]
                                      .warehouseAddress.firstLine ? (
                                      <span>
                                        {
                                          this.state.warehouseLocations[id]
                                            .warehouseAddress.firstLine
                                        }
                                      </span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </div>
                                  <div className='full-address'>
                                    {/* 50 /b/, Takshila Apt, Mahakali Caves Road, Chakala, Andheri (west) Mumbai, Maharashtra, */}
                                    {this.state.warehouseLocations[id]
                                      .warehouseAddress.secondLine ? (
                                      <span>
                                        {
                                          this.state.warehouseLocations[id]
                                            .warehouseAddress.secondLine
                                        }
                                      </span>
                                    ) : null}
                                  </div>
                                  <div className='pin-code'>
                                    Zipcode :{" "}
                                    {this.state.warehouseLocations[id]
                                      .warehouseAddress.zipCode ? (
                                      <span>
                                        {
                                          this.state.warehouseLocations[id]
                                            .warehouseAddress.zipCode
                                        }
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
                  className='buttonS btn-primary btn'
                  onClick={() => {
                    this.setState({ editMode: true });
                    // this.onOrganisation();
                  }}
                >
                  <img
                    src={PenWhite}
                    width='15'
                    height='15'
                    className='mr-2 mb-1'
                    alt='Edit'
                  />
                  <span>EDIT</span>
                </button>
              ) : (
                // </div>
                <div
                  className='d-flex flex-row justify-content-between'
                  style={{ position: "relative", left: -100 }}
                >
                  <button
                    className='buttonS btn btn-outline-primary mr-2'
                    onClick={this.onCancel}
                  >
                    <span>CANCEL</span>
                  </button>
                  <button
                    className='buttonS btn-orange btn'
                    onClick={this.onSubmit}
                  >
                    {/* <button className="btn-primary btn" onClick={this.onSubmit(),()=>{this.onChange()}}> */}
                    <span>SAVE</span>
                  </button>
                </div>
              )}
              <div className=''>
                {this.state.message && (
                  <Modal1
                    close={() => this.closeModal()}
                    size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
                  >
                    <SuccessPopUp onHide={this.closeModal} />
                  </Modal1>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* {message && <div> <SuccessPopUp severity="success">{message}</SuccessPopUp></div>
    } */}
      </div>
    );
  }
}

export default Profile;
