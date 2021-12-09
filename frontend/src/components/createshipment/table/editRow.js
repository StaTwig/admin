import React, { useState, useEffect } from "react";
import Delete from "../../../assets/icons/Delete.png";
import Select from "react-select";
import { getProductList } from "../../../actions/productActions";
import "./style.scss";
import Modal from "../../../shared/modal";
import user from "../../../assets/icons/brand.svg";
import Quantity from "../../../assets/icons/Quantity.png";
import Product from "../../../assets/icons/Producttype.png";
import date from "../../../assets/icons/ShippingDate.svg";
import Batch from "../../../assets/icons/batch.png";
import TableFilter from "./tablefilter.js";
import axios from "axios";
import { config } from "../../../config";
import { formatDate } from "../../../utils/dateHelper";

const EditRow = (props) => {
  const {
    prod,
    handleQuantityChange,
    handleManufacturerChange,
    index,
    enableDelete,
    category,
    handleCategoryChange,
    handleProductChange,
    handleBatchChange,
    products,
    check,
    warehouseID,
  } = props;

  const headers = {
    coloumn1: "Product Name",
    coloumn2: "Manufacturer",
    coloumn3: "Batch Number",
    coloumn4: "Mfg Date",
    coloumn5: "Exp Date",
    coloumn6: "Quantity",

    img1: <img src={Product} width='15' height='15' alt='' />,
    img2: <img src={user} width='15' height='15' alt='' />,
    img3: <img src={Batch} width='15' height='15' alt='' />,
    img4: <img src={date} width='15' height='15' alt='' />,
    img5: <img src={date} width='15' height='15' alt='' />,
    img6: <img src={Quantity} width='20' height='15' alt='' />,
  };
  // console.log(prod,"Edit rowt",index);
  const [editButtonStatus, setEditButtonStatus] = useState(false);
  const [changebtn, setbtn] = useState(false);
  const [addnew] = useState(!props.category);
  const [disabled, setDisabled] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [quantityChecker, setQuantityChecker] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [ModelProd, setModelProduct] = useState({});
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [selectedIndex, setSelectedIndex] = useState();
  const [BatchSelected, setBatchSelected] = useState([]);
  const closeModal = () => setShowModal(false);

  const onEditClick = (e) => {
    setDisabled(!disabled);
    setEditButtonStatus(true);
  };
  const editBatchSelected = (index, type, value) => {
    let buffer = [...batches];
    buffer[index][type] = value;
    setBatches(buffer);
    console.log(buffer);
  };

  const onSaveClick = (e) => {
    setbtn(true);
    setDisabled(!disabled);
    setEditButtonStatus(false);
  };

  useEffect(() => {
    async function fetchData() {
      const result111 = await getProductList();
      setProductsList(result111.message);
    }

    fetchData();
  }, []);

  const new_products = [];

  if (typeof products != "undefined" && typeof productsList != "undefined") {
    for (var i = 0; i < products.length; i++) {
      let check = false;
      for (var j = 0; j < productsList.length; j++) {
        if (products[i].label === productsList[j].productName) {
          check = true;
          break;
        }
      }
      if (check) {
        new_products.push(products[i]);
      }
    }
  }

  const updateQuantity = () => {
    setQuantityChecker(0);
  };
  // console.log("product Quantity is "+ prod.productQuantity);
  if (
    check === "0" &&
    quantityChecker === 1 &&
    typeof prod !== undefined &&
    typeof (prod.name !== undefined) &&
    typeof productsList != undefined
  ) {
    let qty;
    for (var i = 0; i < productsList.length; i++) {
      if (prod.name === productsList[i].productName) {
        qty = String(productsList[i].quantity);
        console.log(typeof qty);
        break;
      }
    }
    if (i < productsList.length) {
      prod.productQuantity = qty;
      handleQuantityChange(prod.productQuantity, index);
      console.log("productQuantity is " + prod.productQuantity);
      updateQuantity();
    }
  }

  async function changeBatch(batch, index) {
    console.log(selectedBatch.quant, selectedBatch.bnp, index);
    handleBatchChange(batch.bnp, index);
    handleQuantityChange(batch.quant, index);
    // closeModal()
  }
  async function fetchBatches(prod, index) {
    // console.log(warehouseID)
    setSelectedIndex(index);
    // console.log("index, ", selectedIndex )
    setModelProduct(prod);
    let res = await axios.get(
      `${config().fetchBatchesOfInventory}?productId=${
        prod.id
      }&wareId=${warehouseID}`
    );
    // console.log(res.data);
    let buffer = res.data.data;
    buffer.forEach((element) => {
      element.selected = false;
      element.editable = false;
      element.immutableQuantity = element.quantity;
    });
    setBatches(buffer);
  }
  const numbersOnly = (e) => {
    // Handle paste
    if (e.type === "paste") {
      var key = e.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  };
  const handleChange = (value) => {
    console.log(value);
    setSelectedBatch(value);
  };
  const setQuantity = (value) => {
    let buffer = selectedBatch;
    buffer.quant = value;
    setSelectedBatch(buffer);
    console.log(selectedBatch);
  };
  const editQuantity = (value, index) => {
    let buffer = [...batches];
    if (parseInt(value) > parseInt(buffer[index].immutableQuantity)) {
      alert("quantity cannot exceed batch limit");
      return;
    }
    buffer[index].quantity = value;

    setBatches(buffer);
    setQuantity(value);
  };

  return (
    <div className='row ml-3 mr-1'>
      <div className='trow row mr-1 col'>
        <div className='col pl-4 tcell'>
          <div className=' p-0'>
            <div className='d-flex flex-column'>
              <div className='title recived-text'>
                {enableDelete ? (
                  <input
                    className='form-control text-center'
                    placeholder='Product Category'
                    value={prod.type}
                    onChange={(e) => 
                      handleCategoryChange(index, e.target.value)
                    }
                  />
                ) : (
                  prod.type
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='Divider1'></div>
        <div className='col tcell'>
          <div className=' p-0'>
            <div className='col tcell text-center justify-content-center pl-0'>
              <div className='title recived-text'>
                {enableDelete ? (
                  <input
                    className='form-control text-center'
                    placeholder='Product Name'
                    value={prod.name}
                    onChange={(e) => {
                      handleProductChange(index, e.target.value);
                    }}
                  />
                ) : (
                  prod.name
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col tcell text-center justify-content-center p-2'>
          {enableDelete ? (
            <input
              className='form-control text-center'
              placeholder='Manufacturer'
              value={prod.manufacturer}
              onChange={(e) => {
                handleManufacturerChange(index, e.target.value);
              }}
            />
          ) : (
            prod.manufacturer
          )}
        </div>

        <div className='col tcell text-center justify-content-center p-2'>
          <div className=''>
            <input
              className='form-control text-center'
              id='checker'
              placeholder='Quantity'
              onKeyPress={numbersOnly}
              value={prod.productQuantity}
              onChange={(e) => {
                handleQuantityChange(e.target.value, index);
              }}
            />
          </div>
        </div>
        <div
          className='title recived-text align-self-center'
          style={{ position: "relative", right: "40px" }}
        >
          <div className='placeholder_id'>Kgs</div>
        </div>

        <div className='col tcell text-center justify-content-center p-2'>
          <div className=''>
            <input
              className='form-control text-center'
              id='checker'
              placeholder='Batch number'
              value={prod.batchNumber}
              onChange={(e) => {
                handleBatchChange(e.target.value, index);
                setQuantityChecker(1);
              }}
            />
          </div>
        </div>
      </div>
      {
        // enableDelete && props.product.length > 1 &&
        //   <div className="m-3 bg-light">
        //   <span className="del-pad shadow border-none rounded-circle ml-2 " onClick={() => onRemoveRow(index)}><img className=" cursorP  p-1" height="30" src={Delete} /></span>
        //   </div>
      }

      {props.product.length > 1 && (
        <div
          className='m-2 pl-3 pt-1'
          style={{ position: "relative", left: "10px" }}
        >
          <span
            className='del-pad shadow border-none rounded-circle mr-1'
            onClick={() => props.onRemoveRow(index)}
          >
            <img
              className='cursorP p-1'
              height='30'
              src={Delete}
              alt='Delete'
            />
          </span>
        </div>
      )}
    </div>
    // <div className="rTableRow"
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Product ID"
    //         value={product.productID}
    //         disabled={true}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Product Name"
    //         value={product.productName}
    //         disabled={true}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Manufacturer"
    //         value={product.manufacturer}
    //         disabled={true}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Quantity"
    //         value={product.productQuantity}
    //         onChange={e => handleQuantityChange(e.target.value, index)}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Label Id"
    //         value={product.labelId}
    //         onChange={e => handleLabelIdChange(e.target.value, index)}

    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default EditRow;
