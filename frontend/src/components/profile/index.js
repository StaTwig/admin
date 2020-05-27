import React, { Component } from 'react';
import ProfilePic from '../../assets/brands/user-image/Image73@2x.png';
import { useDispatch } from 'react-redux';
import Pen from '../../assets/icons/pen.svg';
import './style.scss';
import { config } from '../../config';
const axios = require('axios');
import { getUserInfoUpdated, updateProfile, getUserInfo } from '../../actions/userActions';
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
    const response = await getUserInfoUpdated();
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
    this.setState({ selectedFile: event.target.files[0] })
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile', event.target.files[0]);
    const configs = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    if(event.target.files[0]){
    axios
      .post(config().upload, formData, configs)
      .then(response => {
        alert('Profile Picture updated Successfully');
        this.setState({ profile_picture: response.data.data }) 
      })
      .catch(error => {
        alert(error);
      });
    this.setState({ selectedFile: null });           
    
    }
    else{
      alert('File not selected, please try again')
    }
  }

  async onSubmit() {
    const { name, organisation, affiliateOrganisation, phone } = this.state;
    const data = { name, organisation, affiliateOrganisation, phone }  ;
    const result = await updateProfile(data);
    
    if (result.status === 200) {
      this.setState({ message: result.data.message, editMode: false });
      const dispatch = useDispatch();    
      dispatch(getUserInfo());
      history.push('/profile');
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
                {editMode ? (
                <button
                  type="button"
                  onClick={e => this.upload.click()}
                  className="btn btn-outline-info"
                >
                  Change Photo
                </button>
                ) : '' }
              </div>
              <div className="col-8 mt-5">
                {editMode ? (
                  <div className="col-sm-12">
                  <div className="row">

                  <ul>
                  <li> <label>Name </label></li>
                  <li><label>Role </label></li>
                  <li> <label>Organisation</label></li>
                  <li><label>Affiliated Organisation</label></li>
                  <li><label>Wallet Address</label></li>
                  <li><label>Email</label></li>
                  <li><label>Phone</label></li>
                  <li>Account Status</li>
                  
                  </ul>

                  <ul>
                  <li> 
                      <input
                        className="form-control"
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                      />
                      </li>
                  <li><input
                        className="form-control"
                        disabled
                        value={role}
                        onChange={e => this.setState({ role: e.target.value })}
                      />
                      </li>
                  <li>
                      <input
                        className="form-control"
                        value={organisation}
                        onChange={e =>
                          this.setState({ organisation: e.target.value })
                        }
                      /></li>
                  <li>  <input
                         className="form-control"
                        value={affiliateOrganisation}
                        onChange={e =>
                          this.setState({
                            affiliateOrganisation: e.target.value,
                          })
                        }
                      />
                    </li>
                  <li> <input
                        className="form-control wallet"
                        value={walletAddress}
                        onChange={e =>
                          this.setState({ walletAddress: e.target.value })
                        }
                      />
                    </li>
                    <li> <input
                        className="form-control"
                        disabled
                        value={email}
                        onChange={e =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </li>
                  <li> <input
                        className="form-control"
                        value={phone}
                        onChange={e => this.setState({ phone: e.target.value })}
                      /></li>

                         <li > 
                       
                        {status && <li className="form-control wallet">Active</li>}
                      
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
                <div className="d-flex flex-row justify-content-between">
                   <button className="btn btn-outline-info mr-2" onClick={this.onCancel}>
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
        {
          message && <div className="alert alert-success">{message}</div>
        }
      </div>
    );
  }
}

export default Profile;







