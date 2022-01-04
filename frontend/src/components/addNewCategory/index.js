import React, { useState, useEffect } from "react";
import "./style.scss";
import { Formik } from "formik";
import { addNewProduct } from "../../actions/poActions";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import { Link } from "react-router-dom";
import Modal from "../../shared/modal";
import ProductPopUp from "./productPopUp";

const AddCategory = (props) => {
  const [manufacturer, setManufacturer] = useState("Select Manufacturer");
  const [categoryName, setcategoryName] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(undefined);
  const [description, setDescription] = useState("");
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [BtnVisible, setBtnVisible] = useState(true);

  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push("/inventory");
  };

  const setFile = (evt) => {
    setPhotoUrl(URL.createObjectURL(evt.target.files[0]));
    setPhoto(evt.target.files[0]);
  };

  const [catNameErr, setCategoryNameErr] = useState(false);
  const [catDescErr, setDescErr] = useState(false);
  const validation = () => {
    if (categoryName === "" || description === "") {
      if (categoryName === "") {
        setCategoryNameErr(true);
        setBtnVisible(false);
      }
      if (description === "") {
        setDescErr(true);
        setBtnVisible(false)
      }
    }
    else {
      return true;
    }
  };
  const addProduct = async () => {
    // const data = { manufacturer, categoryName, productCategory: category, productSubCategory: subCategory, storageConditions, description };
    const isValid = validation();
    if (isValid) {
      let formData = new FormData();

      formData.append("manufacturer", manufacturer);
      let unitofMeasure = {
        id: "N/A",
        name: "N/A",
      };
      formData.append("name", "category");
      formData.append("shortName", "category");
      formData.append("externalId", Math.random().toString(36).substr(2, 7));
      formData.append("type", categoryName);
      formData.append("unitofMeasure", JSON.stringify(unitofMeasure));
      formData.append("description", description);
      formData.append("photo", photo);
      const result = await addNewProduct(formData);
      if (result.status === 1) {
        setOpenCreatedInventory(true);
        console.log("success add product");
      }
    }
  };

  console.log(props);
  return (
    <div>
      <div className="addproduct" style={{ overflow: "hidden" }}>
        <h1 className="breadcrumb mt-2">ADD NEW CATEGORY</h1>
        {/* <button className="btn btn-orange fontSize20 font-bold mt-1" style={{position:"relative ",left:"805px" }}> 
              <span style={{ color: 'white'}}>+ Add New Category</span>
            </button> */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex">
              <div className="">
                <div className="mb-4">
                  <div className="d-flex flex-column upload">
                    <img
                      src={photoUrl || uploadBlue}
                      name="photo"
                      width={photoUrl ? "150" : "50"}
                      height={photoUrl ? "150" : "50"}
                      className="mt-3"
                      alt=""
                    />

                    <label className="btn-primary btn browse">
                      ADD IMAGE
                      <input
                        type="file"
                        className="select"
                        onChange={setFile}
                      />{" "}
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-8 mt-5">
                <div className="form-group">
                  <label
                    className="required-field"
                    htmlFor="shipmentId"
                    style={{ textAlign: "right", paddingRight: "50px" }}
                  >
                    {" "}
                    Category Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${catNameErr ? "border-danger" : ""
                      }`}
                    name="product"
                    placeholder="Enter Category Name"
                    onChange={(e) => { setBtnVisible(true); setCategoryNameErr(false); setcategoryName(e.target.value) }}
                    value={categoryName}
                  />
                </div>
                <div className="form-group">
                  <label
                    className="required-field"
                    htmlFor="shipmentId"
                    style={{ textAlign: "right", paddingRight: "50px" }}
                  >
                    {" "}
                    Description
                  </label>
                  <input
                    type="text"
                    className={`form-control ${catDescErr ? "border-danger" : ""
                      }`}
                    name="product"
                    placeholder="Enter Category Description"
                    onChange={(e) => {
                      setBtnVisible(true);
                      setDescErr(false)
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex mt-3" style={{ float: "right" }}>
          <Link to="/productcategory">
            <button
              type="button"
              className="btn btn-white shadow-radius font-bold mr-3"
            >
              Cancel
            </button>
          </Link>
          <button
            className={`btn ${BtnVisible ? "btn-orange" : "add-btn-orange"
              } fontSize20 font-bold mb-2 mt-0`}
            // onClick={() => {
            //   BtnVisible && addProduct;
            // }}
            onClick={() => {
              if (BtnVisible) addProduct();
            }}
          >
            {/* <span>{BtnVisible ? "+ Add New Category T" : "+ Add New Category F"}+ Add New Category</span> */}
            <span>+ Add New Category</span>
          </button>
        </div>
        {openCreatedInventory && (
          <Modal
            close={() => closeModal()}
            size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          >
            <ProductPopUp
              onHide={closeModal} //FailurePopUp
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
