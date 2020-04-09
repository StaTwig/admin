import React, { Component } from 'react';
import ProfilePic from '../../assets/brands/user-image/Image73@2x.png';
import Pen from '../../assets/icons/pen.svg';
import './style.scss';
import { config } from '../../config';
const axios = require('axios');
import { getUserInfo, updateProfile } from '../../actions/userActions';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      profile: null,
      editMode: false,
      role: '',
      organisation: '',
      affiliateOrganisation: '',
      walletAddress: '',
      phone: '',
      status: '',
      email: '',
      profileData: {},
      profile_picture: '',
      message: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  async componentDidMount() {
    const response = await getUserInfo();
    if (response.status === 200) {
      const {
        profile_picture,
        email,
        name,
        phone,
        address,
        organisation,
        status,
        role,
        affiliateOrganisation,
      } = response.data.data;
      this.setState({
        profile_picture,
        email,
        name,
        phone,
        walletAddress: address,
        organisation,
        affiliateOrganisation,
        status,
        role,
        profileData: response.data.data,
      });
    } else {
      //error
    }
  }

  onCancel() {
    const {
      prof,
      email,
      name,
      phone,
      address,
      organisation,
      affiliateOrganisation,
      status,
    } = this.state.profileData;

    this.setState({
      editMode: false,
      profile: prof,
      email,
      name,
      phone,
      walletAddress: address,
      organisation,
      affiliateOrganisation,
      status,
    });
  }

  onChange(e) {
    this.setState({ selectedFile: event.target.files[0] });
    e.preventDefault();
    console.log(this.state.selectedFile);
    const formData = new FormData();
    formData.append('profile', this.state.selectedFile);
    const configs = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(config().upload, formData, configs)
      .then(response => {
        alert('The file is successfully uploaded' + response);
      })
      .catch(error => {
        alert(error);
      });
    this.setState({ selectedFile: null });
  }

  async onSubmit() {
    const { name, organisation, affiliateOrganisation, phone } = this.state;
    const data = { name, organisation, affiliateOrganisation, phone }  ;
    const result = await updateProfile(data);
    debugger;
    if (result.status === 200) {
      this.setState({ message: result.data.message, editMode: false });
    } else {
      this.setState({ message: 'Error while updating please try again.' });
    }
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
      profile_picture
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
                  ref={ref => (this.upload = ref)}
                  style={{ display: 'none' }}
                />

                <button
                  type="button"
                  onClick={e => this.upload.click()}
                  className="btn btn-outline-info"
                >
                  Change Photo
                </button>
              </div>
              <div className="col-8 mt-5">
                {editMode ? (
                  <div className="col-sm-12">
                    <div>
                      <label>Name </label>
                      <input
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Role </label>
                      <input
                        disabled
                        value={role}
                        onChange={e => this.setState({ role: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Organisation</label>
                      <input
                        value={organisation}
                        onChange={e =>
                          this.setState({ organisation: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label>Affiliated Organisation</label>
                      <input
                        value={affiliateOrganisation}
                        onChange={e =>
                          this.setState({
                            affiliateOrganisation: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>Wallet Address</label>
                      <input
                        disabled
                        value={walletAddress}
                        onChange={e =>
                          this.setState({ walletAddress: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={e => this.setState({ phone: e.target.value })}
                      />
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
                      <li>Email</li>
                      <li>Phone</li>
                      <li>Account Status</li>
                    </ul>
                    <ul>
                      <li>{name}</li>
                      <li>{role}</li>
                      <li>{organisation}</li>
                      <li>{affiliateOrganisation}</li>
                      <li>{walletAddress}</li>
                      <li>{email}</li>
                      <li>{phone}</li>
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
                <div className="col">
                  <button className="btn-primary btn" onClick={this.onCancel}>
                    <span>Cancel</span>
                  </button>
                  <button className="btn-primary btn" onClick={this.onSubmit}>
                    <span>Submit</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {
          message && <div className="alert alert-success">{message}</div>
        }
      </div>
    );
  }
}

export default Profile;
