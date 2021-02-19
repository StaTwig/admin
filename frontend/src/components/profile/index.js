import React from "react";
import Pen from "../../assets/icons/pen.svg";
import "./style.scss";
const axios = require("axios");

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      profile: null,
      editMode: false,
      role: "",
      organisation: "",
      affiliateOrganisation: "",
      walletAddress: "",
      phone: "",
      status: "",
      email: "",
      profileData: {},
      profile_picture: "",
      message: "",
      location: "",
    };
  }

  render() {
    const {
      editMode,
      role,
      organisation,
      affiliateOrganisation,
      walletAddress,
      phone,
      status,
      email,
      name,
      message,
      location,
      profile_picture,
    } = this.state;
    return (
      <div className="profile">
        <h1 className="breadcrumb">Profile</h1>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div className="col-2">
                <div className="userPic mb-4 mr-2">
                  <img
                    src={profile_picture}
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
                  <div className="col-sm-12">
                    <div className="row">
                      <ul>
                        <li>
                          {" "}
                          <label>Name </label>
                        </li>
                        <li>
                          <label>Role </label>
                        </li>
                        <li>
                          {" "}
                          <label>Organisation</label>
                        </li>
                        <li>
                          <label>Affiliated Organisation</label>
                        </li>
                        <li>
                          <label>Wallet Address</label>
                        </li>
                        <li>
                          <label>location</label>
                        </li>
                        <li>
                          <label>Email</label>
                        </li>
                        <li>
                          <label>Phone</label>
                        </li>
                        <li>Account Status</li>
                      </ul>

                      <ul>
                        <li>
                          <input
                            className="form-control wallet"
                            disabled
                            value={name}
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                          />
                        </li>
                        <li>
                          <input
                            className="form-control wallet"
                            disabled
                            value={role}
                            onChange={(e) =>
                              this.setState({ role: e.target.value })
                            }
                          />
                        </li>
                        <li>
                          <input
                            className="form-control"
                            value={organisation}
                            onChange={(e) =>
                              this.setState({ organisation: e.target.value })
                            }
                          />
                        </li>
                        <li>
                          {" "}
                          <input
                            className="form-control"
                            value={affiliateOrganisation}
                            onChange={(e) =>
                              this.setState({
                                affiliateOrganisation: e.target.value,
                              })
                            }
                          />
                        </li>
                        <li>
                          {" "}
                          <input
                            className="form-control wallet"
                            disabled
                            value={walletAddress}
                            onChange={(e) =>
                              this.setState({ walletAddress: e.target.value })
                            }
                          />
                        </li>
                        <li>
                          {" "}
                          <input
                            className="form-control"
                            value={location}
                            onChange={(e) =>
                              this.setState({ location: e.target.value })
                            }
                          />
                        </li>
                        <li>
                          {" "}
                          <input
                            className="form-control wallet"
                            disabled
                            value={email}
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </li>
                        <li>
                          {" "}
                          <input
                            className="form-control"
                            value={phone}
                            onChange={(e) =>
                              this.setState({ phone: e.target.value })
                            }
                          />
                        </li>

                        <li>
                          {status && (
                            <li className="form-control wallet">Active</li>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <ul>
                      <li>Name</li>
                      <li>Role</li>
                      <li>Organisation</li>
                      <li>Affiliated Organisation</li>
                      <li>Wallet Address</li>
                      <li>location</li>
                      <li>Email</li>
                      <li>Phone</li>
                      <li>Account Status</li>
                    </ul>
                    <ul>
                      {name ? <li>{name}</li> : <li>N/A</li>}
                      {role ? <li>{role}</li> : <li>N/A</li>}
                      {organisation ? <li>{organisation}</li> : <li>N/A</li>}
                      {affiliateOrganisation ? (
                        <li>{affiliateOrganisation}</li>
                      ) : (
                        <li>N/A</li>
                      )}
                      {walletAddress ? <li>{walletAddress}</li> : <li>N/A</li>}
                      {location ? <li>location</li> : <li>N/A</li>}
                      {email ? <li>{email}</li> : <li>N/A</li>}
                      {phone ? <li>{phone}</li> : <li>N/A</li>}
                      {status && <li>Active</li>}
                    </ul>
                  </div>
                )}
              </div>
              {!editMode ? (
                <div className="col">
                  <button
                    className="btn-primary btn"
                    onClick={() => this.setState({ editMode: true })}
                  >
                    <img src={Pen} width="15" height="15" className="mr-3" />
                    <span>EDIT</span>
                  </button>
                </div>
              ) : (
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
