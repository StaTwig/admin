import React, { useState, useEffect } from "react";
import Add from "../../assets/icons/add.svg";
import uploadBlue from "../../assets/icons/coverImage.png";
import {
  getManufacturers,
  addNewProduct,
  getProducts,
} from "../../actions/poActions";
import Modal from "../../shared/modal";
import ProductPopUp from "./productPopUp";
import "./style.scss";
import add_icon from "../../assets/icons/add_blue.png";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddProduct = (props) => {
  const { t } = props;
  const [productName, setProductName] = useState("");
  const [UOM, setUOM] = useState("");
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState();
  const [category, setCategory] = useState();
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(undefined);
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [image, setImage] = useState(false);

  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push("/inventory");
  };
  useEffect(() => {
    async function fetchData() {
      const manufacturerResult = await getManufacturers();
      setManufacturers(manufacturerResult);
      const result = await getProducts();
      const categoryArray = result.map((product) => product.type);
      setCategories(
        categoryArray
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((item) => {
            return item;
          })
      );
    }
    fetchData();
  }, []);
  const [categoryErr, setCategoryErr] = useState(false);
  const [UOMErr, setUOMErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const [pdNameErr, setPdNameErr] = useState(false);
  const [manufacturerErr, setManufacturerErr] = useState(false);
  const validation = () => {
    console.log("Manufacturer from valid:", manufacturer);
    if (
      productName === "" ||
      manufacturer === undefined ||
      category === undefined ||
      UOM === ""
    ) {
      if (manufacturer === undefined) {
        setManufacturerErr(true);
      }
      if (productName === "") {
        setPdNameErr(true);
      }
      if (category === undefined) {
        setCategoryErr(true);
      }
      if (UOM === "") {
        setUOMErr(true);
      }
    } else {
      return true;
    }
  };
  const addProduct = async () => {
    const isValid = validation();
    if (isValid) {
      let formData = new FormData();
      formData.append("manufacturer", manufacturer);
      formData.append("name", productName);
      formData.append("shortName", productName);
      formData.append("externalId", Math.random().toString(36).substr(2, 7));
      formData.append("type", category);
      formData.append(
        "unitofMeasure",
        JSON.stringify({
          id: UOM,
          name: UOM,
        })
      );
      formData.append("description", description);
      formData.append("photo", photo);
      const result = await addNewProduct(formData);
      console.log("Result:", result);
      if (result?.success) {
        setOpenCreatedInventory(true);
      }
    }
  };
  const setFile = (evt) => {
    const fileExtension = evt.target.files[0].name.split(".").at(-1);
    const allowedFileTypes = ["jpg", "jpeg", "png"];
    if (!allowedFileTypes.includes(fileExtension)) {
      setImage(t("upload_error"));
    } else {
      setPhotoUrl(URL.createObjectURL(evt.target.files[0]));
      setPhoto(evt.target.files[0]);
      setImage(false);
    }
  };

  const defaultPropsManufacturer = {
    options: manufacturers,
    getOptionLabel: (option) => option,
  };

  const defaultPropsCategory = {
    options: categories,
    getOptionLabel: (option) => option,
  };

  return (
    <div className='addproduct'>
      <div
        className='d-flex'
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1 className='breadcrumb'>{t("add_new_product")}</h1>
        {/* <div className="d-flex flex-column align-items-center"> */}
        <button
          className='btn-primary btn fontSize20 font-bold mt-1 ml-2'
          // onClick={() => setMenu(!menu)}
        >
          <div className='d-flex align-items-center'>
            <img
              src={ExportIcon}
              width='16'
              height='16'
              className='mr-2'
              alt=''
            />
            <span>
              <b>{t("import")}</b>
            </span>
            <img
              src={dropdownIcon}
              width='14'
              height='14'
              className='ml-2'
              alt=''
            />
          </div>
        </button>
      </div>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex flex-row justify-content-between'>
            <div className='col pt-4'>
              {/* <h6 className='font-weight-bold mb-4'>Product Image</h6>m */}
              <div className='d-flex flex-column upload'>
                <img
                  src={photoUrl || uploadBlue}
                  name='photo'
                  width={photoUrl ? "120" : "150"}
                  height={photoUrl ? "120" : "150"}
                  className='mt-3'
                  alt=''
                />

                {/* <div>or</div>
                  <label className='btn-primary btn browse'>
                    BROWSE FILES
                    <input
                      type='file'
                      className='select'
                      onChange={setExcelFile}
                    />{" "}
                  </label> */}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "12rem",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label
                  className=' card-link btn btn-outline-primary'
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src={add_icon}
                    width='10'
                    height='10'
                    className='mr-2'
                    alt=''
                  />
                  {t("add_image")}
                  <input
                    type='file'
                    className='select'
                    onChange={setFile}
                    accept='image/*'
                  />{" "}
                </label>
              </div>
              {image && (
                <span
                  className='error-msg text-dangerS'
                  style={{ color: "#d80909", fontSize: "15px" }}
                >
                  {image}
                </span>
              )}
            </div>

            <div
              className='col mr-5'
              style={{ position: "relative", right: "8rem" }}
            >
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'> {t("product_name")}</label>
                  <input
                    type='text'
                    className={`form-control ${
                      pdNameErr ? "border-danger" : ""
                    }`}
                    name='product'
                    placeholder={t("enter") + " " + t("product_name")}
                    onChange={(e) => {
                      setPdNameErr(false);
                      setProductName(e.target.value);
                    }}
                    value={productName}
                  />
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t("manufacturer")}</label>
                  <div
                    className={`w-100 ${
                      manufacturerErr ? "border-danger" : ""
                    }`}
                  >
                    <Autocomplete
                      {...defaultPropsManufacturer}
                      id='manufacturer controllable-states-demo'
                      value={manufacturer ? manufacturer : ""}
                      onChange={(event, newValue) => {
                        setManufacturer(newValue);
                        setManufacturerErr(false);
                      }}
                      inputValue={manufacturer ? manufacturer : ""}
                      onInputChange={(event, newInputValue) => {
                        setManufacturer(newInputValue);
                        setManufacturerErr(false);
                      }}
                      autoComplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className={`${
                            manufacturerErr ? "border-danger" : ""
                          }`}
                          name='Manufacturer'
                          variant='outlined'
                          placeholder={t("enter_manufacturer")}
                        />
                      )}
                    />
                    {manufacturerErr && (
                      <span
                        className='error-msg text-danger mt-3 '
                        style={{ left: "0px" }}
                      >
                        {t("enter_manufacturer")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t("product_category")}</label>
                  <div
                    className={`w-100 ${categoryErr ? "border-danger" : ""}`}
                  >
                    {/* <DropdownButton
                      name={category}
                      onSelect={(item) => {
                        setCategoryErr(false);
                        setCategory(item);
                      }}
                      groups={categories}
                    /> */}

                    <Autocomplete
                      {...defaultPropsCategory}
                      id='category controllable-states-demo'
                      value={category ? category : ""}
                      onChange={(event, newValue) => {
                        setCategory(newValue);
                        setCategoryErr(false);
                      }}
                      inputValue={category ? category : ""}
                      onInputChange={(event, newInputValue) => {
                        setCategory(newInputValue);
                        setCategoryErr(false);
                      }}
                      autoComplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className={`${categoryErr ? "border-danger" : ""}`}
                          name='Category'
                          variant='outlined'
                          placeholder={t("product_category")}
                        />
                      )}
                    />
                    {categoryErr && (
                      <span
                        className='error-msg text-danger mt-3 '
                        style={{ left: "0px" }}
                      >
                        {t("product_category")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t("unit_of_measure")}</label>
                  <input
                    type='text'
                    className={`form-control ${UOMErr ? "border-danger" : ""}`}
                    name='UOM'
                    placeholder={t("enter") + " " + t("unit_of_measure")}
                    onChange={(e) => {
                      setUOMErr(false);
                      setUOM(e.target.value);
                    }}
                    value={UOM}
                  />
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t("short_description")}</label>
                  <input
                    type='text'
                    className={`form-control ${descErr ? "border-danger" : ""}`}
                    name='description'
                    placeholder={t("enter") + " " + t("short_description")}
                    onChange={(e) => {
                      setDescErr(false);
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                className='fontSize20 font-bold mr-4 addNewBtn'
                onClick={() => props.history.push("/addNewCategory")}
                // style={{position:"relative",top:"2.5rem",height:"2rem",right:"10rem"}}
              >
                <img src={Add} width='10' height='10' className='mr-2' alt='' />
                <span style={{ fontSize: "1vw" }}>{t("add_new_category")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <div className='d-flex flex-row justify-content-between'>
          <div />
          <div>
            {" "}
            <button
              className='btn btn-outline-primary mr-4'
              onClick={() => props.history.push("/productcategory")}
              style={{ fontSize: "1vw" }}
            >
              {t("cancel")}
            </button>
            <button
              className='addNewBtn addNewBtn-padding fontSize20 font-bold mr-4 product'
              onClick={addProduct}
              style={{ position: "unset" }}
            >
              <img src={Add} width='10' height='10' className='mr-2' alt='' />
              <span style={{ fontSize: "1vw" }}>{t("add_new_product")}</span>
            </button>
          </div>{" "}
          {openCreatedInventory && (
            <Modal
              close={() => closeModal()}
              size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
            >
              <ProductPopUp
                onHide={closeModal}
                t={t} //FailurePopUp
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
