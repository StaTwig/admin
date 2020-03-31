import React from "react";
import ProfilePic from "../../assets/brands/user-image/Image73@2x.png";
import Pen from "../../assets/icons/pen.svg";
import './style.scss';

const Profile = () => {
  return (
    <div className="profile">
      <h1 className="breadcrumb">Profile</h1>
      <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row">
              <div className="col-2">
              <div className="userPic mb-4 mr-2">
            <img src={ProfilePic} alt="Jhon Name" className="rounded rounded-circle" />
          </div>
          <button className="btn-primary btn">Change Photo</button>
          </div>
          <div className="col-8 mt-5">
          <h3>John Doe</h3>
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
};

export default Profile;

