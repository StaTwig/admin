import React from 'react';
import './style.scss';
import Add from '../../assets/icons/add.svg';
import uploadBlue from '../../assets/icons/UploadBlue.svg';
import uploadWhite from '../../assets/icons/UploadWhite.svg';

const AddProduct = (props) => {
     
  return (
      <div className="addproduct">
        <h1 className="breadcrumb">ADD NEW PRODUCT</h1>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
                <div className='d-flex flex-column'>
                <div className="form-group">
            <label htmlFor="shipmentId"> Product Name</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Product"
              onChange={e => (e.target.value)}
              value="Enter Product"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Manufacturer</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Product"
              onChange={e => (e.target.value)}
              value="Select Manufacturer"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Product Category</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Select Product-Category"
              onChange={e => (e.target.value)}
              value="Enter Product"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Product sub-Category</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Product"
              onChange={e => (e.target.value)}
              value="Select Product Sub-category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Storage Conditions</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Product"
              onChange={e => (e.target.value)}
              value="Select Storage conditions"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Short Description</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Short Description"
              onChange={e => (e.target.value)}
              value="Enter Short Description"
            />
          </div>
          
                </div>
                <div className="d-flex flex-column">
               <h6 className="font-weight-bold mb-4">Product Image</h6>
               <div className="d-flex flex-column upload">
               <img src={uploadBlue} width="50" height="50" className="mt-3" />
                 <div>Drag and drop files here</div>
                 <div>or</div>
                 <button className="btn btn-primary mb-3">Browse Files</button>
               </div>
               </div>
               <button className="btn btn-primary font-bold">
               <img src={uploadWhite} width="14" height="14" className="mr-2" />
            <span>Upload</span>
            </button>
              
                         
                  </div>
                
                  <div className="d-flex flex-row justify-content-between"> 
                  <div></div>
                 <div> <button className="btn btn-outline-primary mr-4">cancel</button>
                  <button className="btn btn-orange fontSize20 font-bold mr-4">
          <img src={Add} width="14" height="14" className="mr-2" />
            <span>Add New Product</span>
          </button>
          </div>  </div>
                  </div>
                  </div>
                  </div>
  );
}

export default AddProduct;







