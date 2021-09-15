import React from "react";
import "./style.scss";
// import { Formik } from "formik";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import { Link } from "react-router-dom";
const AddCategory = (props) => {
  // const [editMode,setEditMode]=useState(true);
  console.log(props);
  return (
    <div>
      <div className='addproduct' style={{ overflow: "hidden" }}>
        <h1 className='breadcrumb'>ADD NEW CATEGORY</h1>
        {/* <button className="btn btn-orange fontSize20 font-bold mt-1" style={{position:"relative ",left:"805px" }}> 
              <span style={{ color: 'white'}}>+ Add New Category</span>
            </button> */}
        <div className='card'>
          <div className='card-body'>
            <div className='d-flex flex-row justify-content-left'>
              <div className='col-2'>
                <div className='userPic mb-4 mr-2'>
                  <img
                    name='photo'
                    src={uploadBlue}
                    style={{
                      height: "150px",
                      width: "100px",
                      marginLeft: "43px",
                    }}
                    className='rounded rounded-circle'
                    alt=''
                  />
                </div>
                <label class='btn-primary btn browse pl-5 ml-2'>
                  ADD IMAGE
                  <input type='file' class='select' />{" "}
                </label>
              </div>

              <div className='col-7 mt-5'>
                <div className='form-group'>
                  <label
                    className='required-field'
                    htmlFor='shipmentId'
                    style={{ textAlign: "right", paddingRight: "50px" }}
                  >
                    {" "}
                    Category Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='product'
                    placeholder='Enter Category Title'
                  />
                </div>
                <div className='form-group'>
                  <label
                    className='required-field'
                    htmlFor='shipmentId'
                    style={{ textAlign: "right", paddingRight: "50px" }}
                  >
                    {" "}
                    Description
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='product'
                    placeholder='Enter Category Description'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='d-flex mt-3 '
          style={{ position: "relative", left: "1005px" }}
        >
          <Link to='/productcategory'>
            <button
              type='button'
              className='btn btn-white shadow-radius font-bold mr-3'
            >
              Cancel
            </button>
          </Link>
          <button className='btn btn-orange fontSize20 font-bold mb-2 mt-0'>
            <span>+ Add New Category</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
