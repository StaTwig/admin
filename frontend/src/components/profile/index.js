import React from "react";
import { Link } from "react-router-dom";
import Pen from "../../assets/icons/pen.svg";
import PenWhite from "../../assets/icons/pen-white.svg";
import Mail from "../../assets/icons/mail.svg";
import Briefcase from "../../assets/icons/briefcase.svg";
import Telephone from "../../assets/icons/telephone.svg";
import "./style.scss";
import { config } from "../../config";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { getImage } from "../../actions/notificationActions";
import SuccessPopUp from "./successPopup";
import { getUserInfoUpdated, updateProfile } from "../../actions/userActions";
import { getWarehouseByOrgId } from "../../actions/productActions";
import PopUpLocation from "./popuplocation";
import Modal from "./modal/index";
import Modal1 from "../../shared/modal";
import moment from "moment";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
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
      title: "",
      warehouseLocByOrg: [],
      image: "",
      preferredLanguage: "EN",
      phoneNumberErrorMsg: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const response = await getUserInfoUpdated();
    if (response?.status === 200) {
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
        signup_date,
        title,
        preferredLanguage,
        warehouses,
      } = response.data.data;
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
        warehouseLocations: warehouses,
        signup_date,
        title,
        preferredLanguage,
      });
    }
    const item = this.state.organisation.split("/")[1];
    const wareHouseResponse = await getWarehouseByOrgId(item, true);
    if (wareHouseResponse.status === 1 || wareHouseResponse.success) {
      const wareHouseIdResult = wareHouseResponse.data.map((txn) => txn.id);
      const wareHouseAddresses = wareHouseResponse.data;

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
    }
    const resultImage = await getImage(this.props.user?.photoId);
    this.setState({ image: resultImage.data });
  }

  closeModal() {
    this.setState({ openModal: false, message: "" });
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
      }
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
      preferredLanguage,
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
      preferredLanguage,
    };

    const result = await updateProfile(data);
    if (result.status === 200) {
      this.setState({ message: result.data.message, editMode: false });
    } else {
      this.setState({ message: "Error while updating please try again." });
    }
  }


  handlePhoneVerification(currentPhone) {
    const phone = '+'+currentPhone;
    if (phone) {
      if (isValidPhoneNumber(phone) === false) {
        this.setState({ phoneNumberErrorMsg: "invalid_phone_number" });
      } else {
        this.setState({ phoneNumberErrorMsg: "" });
      }
      // this.setState({ phoneNumberErrorMsg: "" });
    } else {
      this.setState({ phoneNumberErrorMsg: "" });
    }
  }


  render() {
    const { editMode, selectedFile, firstName, lastName, image } = this.state;
    const { t } = this.props;
    return (
      <div className="profile">
        <h1 className="breadcrumb">{t("profile")}</h1>
        <div className="card" style={{ border: "none" }}>
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div className="col-2">
                <div className="userPic mb-4 mr-2">
                  {selectedFile ? (
                    <img
                      name="photo"
                      src={image}
                      className="rounded rounded-circle"
                      alt="ProfilePhoto"
                    />
                  ) : (
                    <img
                      name="photo"
                      src={`${image}`}
                      className="rounded rounded-circle"
                      alt="ProfilePhoto"
                    />
                  )}
                </div>
                <input
                  id="profile"
                  onChange={(e) => {
                    this.setState({ selectedFile: e.target.files[0] });
                    if (!e.target.files[0].type.match("image.*")) {
                      alert(t("image_error"));
                      this.setState({ selectedFile: null });
                    }
                  }}
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
                    {t("change_photo")}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8 mt-5">
                {editMode ? (
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="shipmentId">{t("first_name")}</label>
                      <input
                        style={{ flexBasis: "34%" }}
                        className="input refship "
                        type="text"
                        id="referenceShipmentId"
                        name="firstname"
                        placeholder={t("enter") + " " + t("first_name")}
                        value={firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">{t("last_name")}</label>
                      <input
                        style={{ flexBasis: "34%" }}
                        className="input refship "
                        type="text"
                        id="referenceShipmentId"
                        name="lastname"
                        value={lastName}
                        placeholder={t("enter") + " " + t("last_name")}
                        onChange={(e) =>
                          this.setState({
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">{t("organisation")}</label>
                      <input
                        className="form-control wallet"
                        //disabled
                        style={{ flexBasis: "34.5%", fontSize: "14px" }}
                        value={this.state.organisation}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">{t("email_id")}</label>
                      <input
                        className="form-control wallet"
                        //disabled
                        style={{ flexBasis: "34.5%", fontSize: "14px" }}
                        value={this.props.user.emailId}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group2 mb-3 relative">
                      <label htmlFor="shipmentId">{t("phone")}</label>
                      {/* <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry={COUNTRY_CODE}
                        className="phone-Input-new-profile"
                        placeholder={t("enter_phone_number")}
                        
                        // style={{ position: "absolute", marginLeft: "64%" }}
                        value={this.state.phoneNumber}
                        onChange={(phone) =>
                          this.setState({ phoneNumber: phone })
                        }
                      /> */}
                      <PhoneInput
                        international={true}
                      //  countryCallingCodeEditable={false}
                        defaultCountry="United States"
                        country="United States"

                        className="phone-Input-new-profile"
                        placeholder={t("enter_phone_number")}
                        value={this.state.phoneNumber}
                        onChange={(e) => {
                          this.setState({ phoneNumber: e })
                          this.handlePhoneVerification(e);
                        }
                        }
                      />
                    </div>
                    {this.state.phoneNumberErrorMsg != "" && <div style={{color:'red', marginLeft: '17rem', marginTop: '-1rem', marginBottom: '1rem' }} >{t(this.state.phoneNumberErrorMsg)}</div>}
                    {/* <div className="form-group">
                      <label htmlFor="">{t("language")}</label>
                      <Select
                        noOptionsMessage={() => t("no_options")}
                        className="my-form-width"
                        placeholder={t("select_the_language")}
                        style={{ fontSize: "14px" }}
                        options={[
                          { value: "EN", label: "English" },
                          { value: "ES", label: "Español" },
                        ].map((v) => v)}
                        onChange={(language) =>
                          this.setState({ preferredLanguage: language.value })
                        }
                      />
                    </div> */}
                    <div className="col">
                      <div className="row">
                        <div className="row location">
                          <h5>
                            <b>{t("my_locations")}</b>
                          </h5>
                        </div>
                        <div className="addloc1">
                          {editMode && (
                            <button
                              className="buttonA btn btn-S btn-orange font-bold mt-1"
                              onClick={() => {
                                this.setState({ openModal: true });
                              }}
                            >
                              <span className="d-flex align-items-center">
                                {" "}
                                <span>+</span>
                                {t("add")}{" "}
                              </span>
                            </button>
                          )}
                          <div className="inventorypopup">
                            {this.state.openModal && (
                              <Modal
                                className="modal-lg"
                                style={{ width: "60vw" }}
                                close={() => this.closeModal()}
                                size=""
                              >
                                <PopUpLocation
                                  {...this.props}
                                  closeModal={this.closeModal}
                                  wareHouses={this.state.warehouseLocByOrg}
                                  setWareHouseLocations={(v) => this.setState({warehouseLocations: [...this.state.warehouseLocations,v] }) }
                                />
                              </Modal>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{ width: "50vw", overflow: "hidden" }}
                    >
                      {Object.keys(this.state.warehouseLocations).map((id) => {
                        return (
                          <div className="col location-cards p-3" key={id}>
                            <div className="custom-card p-3">
                              <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3
                                    className="card-title font-weight-bold"
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
                                          className="btn-edit fontSize20 pl-2 pr-10"
                                          style={{
                                            height: "35px",
                                            width: "100px",
                                          }}
                                        >
                                          <img
                                            src={Pen}
                                            width="15"
                                            height="15"
                                            className="mr-2"
                                            alt="Edit"
                                          />
                                          <span className="font-weight-bold edit-text">
                                            {t("edit")}
                                          </span>
                                        </button>
                                      </Link>
                                    )}
                                  {this.state.warehouseLocations[id][
                                    "status"
                                  ] !== "ACTIVE" && (
                                      <span className="font-weight-bold badge badge-danger">
                                        {t("approval_pending")}
                                      </span>
                                    )}
                                </div>
                              </div>
                              <div className="card-body">
                                <input
                                  className="total-input"
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.city
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_city: e.target.value,
                                    })
                                  }
                                  placeholder={t("city")}
                                />
                                <input
                                  className="total-input"
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.state
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_state: e.target.value,
                                    })
                                  }
                                  placeholder={t("state")}
                                />
                                <input
                                  className="total-input"
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.country
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_country: e.target.value,
                                    })
                                  }
                                  placeholder={t("country")}
                                />

                                <input
                                  className="full-address-input"
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
                                  placeholder={t("address")}
                                />
                                <input
                                  className="full-address-input"
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
                                  placeholder={t("address")}
                                />

                                <input
                                  className="pin-code-input"
                                  value={
                                    this.state.warehouseLocations[id]
                                      .warehouseAddress.zipCode
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      warehouseAddress_zipcode: e.target.value,
                                    })
                                  }
                                  placeholder={t("pincode")}
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
                    <div className="col">
                      <div className="row role">
                        {this.state.role ? (
                          <span>{this.state.role}</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                      <div
                        className="row mb-3"
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
                      <div className="row date-joined">
                        {this.state.signup_date ? (
                          <span>
                            {t("joined_on")}{" "}
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
                      <div className="row row-list">
                        <img
                          src={Briefcase}
                          width="20"
                          height="20"
                          className="mr-3"
                          alt="Organisation"
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
                          alt="Address"
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
                          alt="Phone Number"
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
                    <div className="col mt-5">
                      <div className="row location">{t("my_locations")}</div>
                    </div>
                    <div
                      className="row"
                      style={{ width: "50vw", overflow: "hidden" }}
                    >
                      {Object.keys(this.state.warehouseLocations).map((id) => {
                        return (
                          <div className="col" key={id}>
                            <div className="location-cards mt-1">
                              <div className="custom-card p-3">
                                <div className="card-header">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <h3
                                      className="card-title font-weight-bold"
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
                                        <div className="font-weight-bold badge badge-danger ml-3">
                                          {t("approval_pending")}
                                        </div>
                                      )}
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="total">
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

                                  <div className="full-address">
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
                                  <div className="pin-code">
                                    {t("pincode")} :{" "}
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
                <button
                  className="buttonS btn-primary btn"
                  onClick={() => {
                    this.setState({ editMode: true });
                  }}
                >
                  <img
                    src={PenWhite}
                    width="15"
                    height="15"
                    className="mr-2 mb-1"
                    alt="Edit"
                  />
                  <span>{t("edit")}</span>
                </button>
              ) : (
                <div
                  className="d-flex flex-row justify-content-between"
                  style={{ position: "relative", right: "10rem" }}
                >
                  <button
                    className="buttonS btn btn-outline-primary mr-2"
                    onClick={this.onCancel}
                  >
                    <span>{t("cancel")}</span>
                  </button>
                  <button
                    className="buttonS btn-orange btn"
                    onClick={this.onSubmit}
                    disabled={this.state.phoneNumberErrorMsg !== ''}
                  >
                    <span>{t("save")}</span>
                  </button>
                </div>
              )}
              <div className="">
                {this.state.message && (
                  <Modal1 close={() => this.closeModal()} size="modal-sm">
                    <SuccessPopUp onHide={this.closeModal} t={t} />
                  </Modal1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
