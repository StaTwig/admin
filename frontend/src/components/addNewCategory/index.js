import React, { useState, useEffect } from "react";
import "./style.scss";
import { Formik } from "formik";
import uploadBlue from '../../assets/icons/UploadBlue.svg';

const AddCategory = (props) => {
    const [editMode,setEditMode]=useState(true);
  
  
  return (
    <div>
      <div className="addproduct" style={{overflow:"hidden"}}>
        <h1 className="breadcrumb">ADD NEW CATEGORY</h1>
            <button className="btn btn-orange fontSize20 font-bold mt-1" style={{position:"relative ",left:"880px" }}> 
              <span style={{ color: 'white'}}>+ Add New Category</span>
            </button>
      
        <div className="card">
            <div className="card-body">
                <div className="d-flex flex-row justify-content-left">         
                    <div className="col-2">
                    <div className="userPic mb-4 mr-2">
                  <img
                    name="photo"
                    src={uploadBlue}
                    style={{height:"150px",width:"100px"}}
                    className="rounded rounded-circle"
                  />
                </div>
                <input
                  id="profile"  
                  type="file"
                  style={{ display: "none" }}
                />
                {editMode ? (
                  <button
                    type="button"
                    // onClick={(e) => this.upload.click()}
                    className="btn btn-outline-info br-2"
                    style={{boarder:"20px 20px 20px 20px"}}
                  >
                    + ADD Photo
                  </button>
                ) : (
                  ""
                )}
                </div>
             
                <div className="col-8 mt-5">
                    <div className="form-group">
                        <label htmlFor="shipmentId"> Category Name</label>
                        <input
                        type="text"
                        
                        className="form-control1"
                        name="product"
                        placeholder="Enter Category Title"
                        />
                    </div>
              <div className="form-group">
                    <label htmlFor="shipmentId"> Description</label>
                    <input
                    type="text"
                    className="form-control1"
                    name="product"
                    placeholder="Enter Category Description"
                    />
              </div>
              

                    </div>
                </div>
          </div>
        </div> 
        <div className="d-flex mt-3 " style={{position:"relative",left:"1030px"}}>
                <button type="button" className="btn btn-white shadow-radius font-bold mr-4">
                  Cancel

                </button>
                <button className="btn btn-orange fontSize20 font-bold mb-2">
                    <span>+ Add New Category</span>
                </button>
        </div>
             
       </div>
    </div>
  );
};

export default AddCategory;