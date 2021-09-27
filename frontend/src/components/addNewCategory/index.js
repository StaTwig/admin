import React from "react";
import "./style.scss";
// import { Formik } from "formik";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import { Link } from "react-router-dom";
const AddCategory = (props) => {
  console.log(props);
  return (
    <div>
      <div className='addproduct' style={{ overflow: "hidden" }}>
        <h1 className='breadcrumb mt-2'>ADD NEW CATEGORY</h1>
        {/* <button className="btn btn-orange fontSize20 font-bold mt-1" style={{position:"relative ",left:"805px" }}> 
              <span style={{ color: 'white'}}>+ Add New Category</span>
            </button> */}
        <div className='card'>
          <div className='card-body'>
            <div className='d-flex'>
              <div className=''>
                <div className='mb-4'>
                  <img
                    name='photo'
                    src={uploadBlue}
                    style={{
                      height: "150px",
                      width: "100px",
                      marginLeft: "45px",
                    }}
                    className='rounded rounded-circle'
                    alt=''
                  />
                </div>
                <label className='btn-primary btn btn-browse font-weight-bold'
                       style={{padding:"10px 10px 10px 10px", marginLeft:"15px", width:"10rem"}} 
                >
                  {"ADD IMAGE"}
                  <input type='file' class='select' />{" "}
                </label>
              </div>

              <div className='col-8 mt-5'>
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
          className="d-flex mt-3"
          style={{float:"right"}}
        >
          <Link to='/productcategory'>
            <button
              type='button'
              className='btn btn-white shadow-radius font-bold mr-3'
            >
              Cancel
            </button>
          </Link>
          <button className='btn btn-orange fontSize20 font-bold mb-2 mt-0'
          >
            <span>+ Add New Category</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
