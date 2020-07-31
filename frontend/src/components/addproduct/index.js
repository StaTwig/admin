import React, { useState ,useEffect} from 'react';
import Add from '../../assets/icons/add.svg';
import uploadBlue from '../../assets/icons/UploadBlue.svg';
import uploadWhite from '../../assets/icons/UploadWhite.svg';
import {getManufacturers} from '../../actions/poActions';
import DropdownButton from '../../shared/dropdownButtonGroup';
import './style.scss'

const AddProduct = (props) => {
  
  const [manufacturer, setManufacturer] = useState('Select Manufacturer');
  const [manufacturers, setManufacturers] = useState([]);
  const[productName,setProductName]=useState('');
  const[category,setCategory]=useState('');
  const[subCategory,setSubCategory]=useState('');
  const[storageConditions,setStorageConditions]=useState('');
  const[description,setDescription]=useState('');
  


  useEffect(() => {
    async function fetchData() {
     const manufacturerResult = await getManufacturers();
     setManufacturers(manufacturerResult);
    }
    fetchData();
  },[]);
     
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
              name="product"
              placeholder="Enter Product Name"
              onChange={e => setProductName(e.target.value)}
              value={productName}
            />

          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Manufacturer</label>
            <div className="form-control">
              <DropdownButton
                name={manufacturer}
                onSelect={item => setManufacturer(item)}
                groups={manufacturers}
               />
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Product Category</label>
            <input
              type="text"
              className="form-control"
              name="productcategory"
              placeholder="Select Product-Category"
              onChange={e => setCategory(e.target.value)}
              value={category}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Product sub-Category</label>
            <input
              type="text"
              className="form-control"
              name="productsubcategory"
              placeholder="Enter Product Sub-category"
              onChange={e => setSubCategory(e.target.value)}
              value={subCategory}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Storage Conditions</label>
            <input
              type="text"
              className="form-control"
              name="StorageConditions"
              placeholder="Enter StorageConditions"
              onChange={e => setStorageConditions(e.target.value)}
              value={storageConditions}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Short Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter Short Description"
              onChange={e => setDescription(e.target.value)}
              value={description}
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







