import React, { useState, useEffect } from "react";
import Add from "../../assets/icons/add.svg";
import uploadBlue from "../../assets/icons/coverImage.png";
// import uploadWhite from '../../assets/icons/UploadWhite.svg';
import {
  getManufacturers,
  addNewProduct,
  addMultipleProducts,
  getProducts
} from "../../actions/poActions";

// import DropdownButton from "../../shared/dropdownButtonGroup";
import Modal from "../../shared/modal";
import ProductPopUp from "./productPopUp";
import "./style.scss";
import DropdownButton from "./ProductsDropDown"
import add_icon from "../../assets/icons/add_blue.png";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";

const AddProduct = (props) => {
  const { t } = props;
  const [manufacturer, setManufacturer] = useState(t('select') +' '+t('manufacturer'));
  const [category, setCategory] = useState(t('select_category'));
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [UOM, setUOM] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(undefined);
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
      const result = await getProducts();
      const categoryArray = result.map((product) => product.type);
      setCategories(
        categoryArray
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((item) => {
            return item
          })
      );
    }
    fetchData();
  }, []);
  const [pdNameErr, setPdNameErr] = useState(false);
  const [manufacturerErr, setManufacturerErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [UOMErr, setUOMErr] = useState(false);
  const [descErr, setDescErr] = useState(false);

  const validation = () => {
    if (productName === "" || manufacturer === t('select') + ' ' + t('manufacturer') || category === t('select_category') || UOM === "" || description === "") {
      if (productName === "") {
        setPdNameErr(true);
      }
      if (manufacturer === t('select') + ' ' + t('manufacturer')) {
        setManufacturerErr(true);
      }
      if (category === t('select_category')) {
        setCategoryErr(true);
      }
      if (UOM === "") {
        setUOMErr(true);
      }
      if (description === "") {
        setDescErr(true);
      }
    }
    else {
      return true;
    }
  };
  const addProduct = async () => {
    // const data = { manufacturer, productName, productCategory: category, productSubCategory: subCategory, UOM, description };
    const isValid = validation();
    if (isValid) {
      let formData = new FormData();

      formData.append("manufacturer", manufacturer);
      // let unitofMeasure = 
      formData.append("name", productName);
      formData.append("shortName", productName);
      formData.append("externalId", Math.random().toString(36).substr(2, 7));
      formData.append("type", category);
      formData.append("unitofMeasure", JSON.stringify({
        id: UOM,
        name: UOM
      }));
      formData.append("description", description);
      formData.append("photo", photo);
      const result = await addNewProduct(formData);
      if (result.status === 1) {
        setOpenCreatedInventory(true);
        console.log("success add product");
      }
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
    setPhotoUrl(URL.createObjectURL(evt.target.files[0]));
    setPhoto(evt.target.files[0]);
  };
  // const setExcelFile = (evt) => {
  //   setExcel(evt.target.files[0]);
  // };

  return (
    <div className='addproduct'>
      <div className='d-flex' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <h1 className='breadcrumb'>{t('add_new_product')}</h1>
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
              <b>{t('import')}</b>
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
        {/* </div> */}
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
                  width={photoUrl ? '120' : '150'}
                  height={photoUrl ? '120' : '150'}
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
              <div style={{ display: "flex", width: "10vw", flexDirection: "row", justifyContent: 'flex-end' }}>
                <label className=' card-link btn btn-outline-primary' style={{ display: "flex", flexDirection: "row", alignItems: "center", fontSize: "1vw", height: "2rem" }}>
                  <img src={add_icon} width='10' height='10' className='mr-2' alt='' />
                   {t('add_image')}
                  <input
                    type='file'
                    className='select'
                    onChange={setFile}
                  />{" "}
                </label>
              </div>
            </div>


            <div className='col mr-5' style={{ position: "relative", right: "8rem" }}>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'> {t('product_name')}</label>
                  <input
                    type='text'
                    className={`form-control ${pdNameErr ? "border-danger" : ""
                      }`}
                    name='product'
                    placeholder={t('enter')+' '+t('product_name')}
                    onChange={(e) => { setPdNameErr(false); setProductName(e.target.value) }}
                    value={productName}
                  />
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t('manufacturer')}</label>
                  <div className={`form-control ${manufacturerErr ? "border-danger" : ""
                    }`}>
                    <DropdownButton
                      name={manufacturer}
                      onSelect={(item) => {
                        setManufacturerErr(false);
                        setManufacturer(item)
                      }}
                      groups={manufacturers}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t('product_category')}</label>
                  {/* <input
                    type='text'
                    className='form-control'
                    name='productcategory'
                    placeholder='Enter Product-Category'
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  /> */}
                  <div className={`form-control ${categoryErr ? "border-danger" : ""
                    }`}>
                    <DropdownButton
                      name={category}
                      onSelect={(item) => {
                        setCategoryErr(false);
                        setCategory(item)
                      }}
                      groups={categories}
                    />
                  </div>
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t('unit_of_measure')}</label>
                  <input
                    type='text'
                    className={`form-control ${UOMErr ? "border-danger" : ""
                      }`}
                    name='UOM'
                    placeholder={t('enter')+' '+t('unit_of_measure')}
                    onChange={(e) => {
                      setUOMErr(false);
                      setUOM(e.target.value)
                    }}
                    value={UOM}
                  />
                </div>
              </div>
              <div className='flex-row'>
                <div className='form-group'>
                  <label htmlFor='shipmentId'>{t('short_description')}</label>
                  <input
                    type='text'
                    className={`form-control ${descErr ? "border-danger" : ""
                      }`}
                    name='description'
                    placeholder={t('enter')+' '+t('short_description')}
                    onChange={(e) => {
                      setDescErr(false);
                      setDescription(e.target.value)
                    }}
                    value={description}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                className='fontSize20 font-bold mr-4 addNewBtn'
                onClick={() => props.history.push('/addNewCategory')}
              // style={{position:"relative",top:"2.5rem",height:"2rem",right:"10rem"}}
              >
                <img src={Add} width='10' height='10' className='mr-2' alt='' />
                <span style={{ fontSize: "1vw" }}>{t('add_new_category')}</span>
              </button>
            </div>
          </div>


        </div>
      </div>
      <div className="mt-5">
        <div className='d-flex flex-row justify-content-between'>
          <div />
          <div>
            {" "}
            <button
              className='btn btn-outline-primary mr-4'
              onClick={() => props.history.push("/productcategory")}
              style={{ fontSize: "1vw", height: "2rem" }}
            >
              {t('cancel')}
            </button>
            <button
              className='addNewBtn fontSize20 font-bold mr-4 product'
              onClick={addProduct}
              style={{ position: "unset" }}
            >
              <img src={Add} width='10' height='10' className='mr-2' alt='' />
              <span style={{ fontSize: "1vw" }}>{t('add_new_product')}</span>
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
  );
};

export default AddProduct;

/*<button className="btn btn-primary font-bold">
<img src={uploadWhite} width="14" height="14" className="mr-2" />
<span>Upload</span>
</button> */
