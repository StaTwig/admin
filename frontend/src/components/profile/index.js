import React, { Component } from 'react';
import ProfilePic from "../../assets/brands/user-image/Image73@2x.png";
import Pen from "../../assets/icons/pen.svg";
import './style.scss';
import { SERVER_URL } from '../../config';
const axios = require("axios");

class Profile extends React.Component{
// const Profile = props => {
  // const [file, setFile] = useState('')
  // const [profile, setProfile] = useState('')
  // const upload = useRef(null);
  constructor(props) {
    super(props);
    this.state ={
        selectedFile: null,
        profile: null
    };
    this.onChange = this.onChange.bind(this);
}
componentDidMount() {
  axios.get(`${SERVER_URL}/usermanagement/api/auth/userInfo`)
    .then(res => {
      const prof = res.data;
      this.setState({profile : prof})
      console.log(prof)
      console.log(this.state.profile)
    })
    
}

// useEffect(() => {
//   axios.get(`${SERVER_URL}/auth/userInfo`)
//     .then(res => {
//       const profile = res.data;
//       setProfile({ profile });
//     })
//  }, [])

onChange(e)  {
  this.setState({ selectedFile: event.target.files[0] }) 
    e.preventDefault();
    console.log(this.state.selectedFile)
    const formData = new FormData();
    formData.append('profile',this.state.selectedFile);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post(`${SERVER_URL}/usermanagement/api/auth/upload`,formData,config)
        .then((response) => {
            alert("The file is successfully uploaded" + response);
        }).catch((error) => {
          alert(error);
    });
    state = { selectedFile: null }
}



render(){
  return (
    <div className="profile">
      <h1 className="breadcrumb">Profile</h1>
      <div className="card">
            
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
              <div className="col-2">
              <div className="userPic mb-4 mr-2">
            {this.state.profile ? <img src={this.state.profile.data.profile_picture} alt="John Name" className="rounded rounded-circle" />: ''}
           
          </div>
          <input id="profile" onChange={this.onChange} type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
    
          <button type="button" onClick={(e) => this.upload.click() } className="btn btn-outline-info">Change Photo</button>
         
          </div>
          <div className="col-8 mt-5">
          {this.state.profile ? <h3>{this.state.profile.data.name}</h3> : 'Name'}
          <div className="row">
           <ul>
           <li>Role</li>
           <li>Organisation</li>
           <li>Affiliated Organisation</li>
           <li>Wallet Address</li>
           <li>Email</li>
           <li>Phone</li>
           <li>Account Status</li>
           </ul>
           <ul>
           <li>ERP Specialist</li>
           <li>XYZ Ltd.</li>
           <li>ABC Ltd. | ABC Ltd. | ABC Ltd. | ABC Ltd. | ABC Ltd.</li>
           <li>09hsfyaryyeryvbr77r7rfgrvrbv66787898788</li>
           <li>JohnDoe@gmail.com</li>
           <li>+91 8846554789</li>
           <li>Active</li>
           </ul>
          </div>
         </div>
              <div className="col">
         <button className="btn-primary btn"><img src={Pen} width='15' height='15' className="mr-3" />
                                   <span>EDIT</span>
                 </button>
               </div>
              </div>
                </div>
                </div>
      
    </div>
   
  );
  }
};

export default Profile;

