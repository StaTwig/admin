import React, { useState, useEffect } from "react";
import Add from "../../assets/icons/add.svg";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
// import uploadWhite from '../../assets/icons/UploadWhite.svg';
import {
  getManufacturers,
  addNewProduct,
  addMultipleProducts,
} from "../../actions/poActions";
import DropdownButton from "../../shared/dropdownButtonGroup";
import Modal from "../../shared/modal";
import "./style.scss";
import ProductPopUp from "./productPopUp";

const AddProduct = (props) => {
  const [manufacturer, setManufacturer] = useState("Select Manufacturer");
  const [manufacturers, setManufacturers] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [storageConditions, setStorageConditions] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [excel, setExcel] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);

  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push("/inventory");
  };
  useEffect(() => {
    async function fetchData() {
      const manufacturerResult = await getManufacturers();
      setManufacturers(manufacturerResult);
    }
    fetchData();
  }, []);
  const addProduct = async () => {
    // const data = { manufacturer, productName, productCategory: category, productSubCategory: subCategory, storageConditions, description };
    let formData = new FormData();

    formData.append("manufacturer", manufacturer);
    formData.append("productName", productName);
    formData.append("productCategory", category);
    formData.append("productSubCategory", subCategory);
    formData.append("storageConditions", storageConditions);
    formData.append("description", description);
    formData.append("photo", photo);
    const result = await addNewProduct(formData);
    if (result.status === 1) {
      setOpenCreatedInventory(true);
      console.log("success add product");
    }
  };
  const addProducts = async () => {
    let formData = new FormData();
    formData.append("excel", excel);
    const result = await addMultipleProducts(formData);
    if (result.status === 200) {
      console.log("success add product");
    }
  };
  const setFile = (evt) => {
    setPhoto(evt.target.files[0]);
  };
  const setExcelFile = (evt) => {
    setExcel(evt.target.files[0]);
  };

  return (
    <div className='addproduct'>
      <h1 className='breadcrumb'>ADD NEW PRODUCT</h1>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex flex-row justify-content-between'>
            <div className='col mr-5'>
              <div className='form-group'>
                <label htmlFor='shipmentId'> Product Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='product'
                  placeholder='Enter Product Name'
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='shipmentId'>Manufacturer</label>
                <div className='form-control'>
                  <DropdownButton
                    name={manufacturer}
                    onSelect={(item) => setManufacturer(item)}
                    groups={manufacturers}
                  />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='shipmentId'>Product Category</label>
                <input
                  type='text'
                  className='form-control'
                  name='productcategory'
                  placeholder='Enter Product-Category'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='shipmentId'>Product Sub-Category</label>
                <input
                  type='text'
                  className='form-control'
                  name='productsubcategory'
                  placeholder='Enter Sub-Category'
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='shipmentId'>Storage Conditions</label>
                <input
                  type='text'
                  className='form-control'
                  name='StorageConditions'
                  placeholder='Enter Storage Conditions'
                  onChange={(e) => setStorageConditions(e.target.value)}
                  value={storageConditions}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='shipmentId'>Short Description</label>
                <input
                  type='text'
                  className='form-control'
                  name='description'
                  placeholder='Enter Short Description'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
            </div>
            <div className='col ml-5'>
              <h6 className='font-weight-bold mb-4'>Product Image</h6>
              <div className='d-flex flex-column upload'>
                <img
                  src={uploadBlue}
                  name='photo'
                  width='50'
                  height='50'
                  className='mt-3'
                  alt=''
                />

                <label class='btn-primary btn browse'>
                  ADD IMAGE
                  <input type='file' class='select' onChange={setFile} />{" "}
                </label>
                <div>or</div>
                <label class='btn-primary btn browse'>
                  BROWSE FILES
                  <input
                    type='file'
                    class='select'
                    onChange={setExcelFile}
                  />{" "}
                </label>
              </div>
            </div>
            <div></div>
          </div>

          <div className='d-flex flex-row justify-content-between'>
            <div />
            <div>
              {" "}
              <button
                className='btn btn-outline-primary mr-4'
                onClick={() => props.history.push("/productlist")}
              >
                CANCEL
              </button>
              <button
                className='btn btn-orange fontSize20 font-bold mr-4 product'
                onClick={addProduct}
              >
                <img src={Add} width='14' height='14' className='mr-2' alt='' />
                <span>Add New Product</span>
              </button>
              <button
                className='btn btn-orange fontSize20 font-bold mr-4'
                onClick={addProducts}
              >
                <img src={Add} width='14' height='14' className='mr-2' alt='' />
                <span>Add Multiple Products</span>
              </button>
            </div>{" "}
            {openCreatedInventory && (
              <Modal
                close={() => closeModal()}
                size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
              >
                <ProductPopUp
                  onHide={closeModal} //FailurePopUp
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

/*<button className="btn btn-primary font-bold">
<img src={uploadWhite} width="14" height="14" className="mr-2" />
<span>Upload</span>
</button> */
