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
import isBefore from "date-fns/isBefore";
const EditRow = (props) => {
  const {
    prod,
    handleQuantityChange,
    index,
    enableDelete,
    category,
    handleCategoryChange,
    handleProductChange,
    handleBatchChange,
    products,
    check,
    warehouseID,
    t,
  } = props;

  const headers = {
    coloumn1: t("product_name"),
    coloumn2: t("manufacturer"),
    coloumn3: t("batch_no"),
    coloumn4: t("mfg_date"),
    coloumn5: t("exp_date"),
    coloumn6: t("quantity"),

    img1: <img src={Product} width='15' height='15' alt='' />,
    img2: <img src={user} width='15' height='15' alt='' />,
    img3: <img src={Batch} width='15' height='15' alt='' />,
    img4: <img src={date} width='15' height='15' alt='' />,
    img5: <img src={date} width='15' height='15' alt='' />,
    img6: <img src={Quantity} width='20' height='15' alt='' />,
  };
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
  const [expired, setExpired] = useState(0);
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

  let new_products = [];

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
    let uniqueObjArray = [
      ...new Map(new_products.map((item) => [item["label"], item])).values(),
    ];
    new_products = [...uniqueObjArray];
  }

  const updateQuantity = () => {
    setQuantityChecker(0);
  };
  if (
    check === "0" &&
    quantityChecker === 1 &&
    typeof prod !== "undefined" &&
    typeof prod.name !== "undefined" &&
    typeof productsList != "undefined"
  ) {
    let qty;
    for (var i = 0; i < productsList?.length; i++) {
      if (prod.name === productsList[i]?.productName) {
        qty = String(productsList[i].quantity);
        break;
      }
    }
    if (i < productsList.length) {
      prod.productQuantity = qty;
      handleQuantityChange(prod.productQuantity, index);
      updateQuantity();
    }
  }

  async function changeBatch(batch, index) {
    handleBatchChange(batch.bnp, index, [batch]);
    handleQuantityChange(batch.quant, index);
    // closeModal()
  }
  async function fetchBatches(prod, index) {
    setSelectedIndex(index);
    setModelProduct(prod);
    let res = await axios.get(
      `${config().fetchBatchesOfInventory}?productId=${
        prod.id ? prod.id : prod.productID
      }&wareId=${warehouseID}`
    );
    let buffer = res.data.data;
    buffer.forEach((element, index, object) => {
      element.selected = false;
      element.editable = false;
      element.immutableQuantity = element.quantity;
      console.log(element.attributeSet.expDate);
      if (isBefore(new Date(element.attributeSet.expDate), new Date())) {
        object.splice(index, 1);
        setExpired(expired + 1);
      }
    });
    setBatches(buffer);
  }
  const numbersOnly = (e) => {
    // Handle paste
    let key;
    if (e.type === "paste") {
      key = e.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  };
  const handleChange = (value) => {
    setSelectedBatch(value);
  };
  const setQuantity = (value) => {
    let buffer = selectedBatch;
    buffer.quant = value;
    setSelectedBatch(buffer);
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
            {/* <div className="profileIconRound recived-bg">OPV</div> */}

            <div className='d-flex flex-column'>
              <div className='title recived-text'>
                {/* <DropdownButton
                  name={prod.type ? prod.type : "Select Product Category"}
                  onSelect={item => { handleCategoryChange(index, item) }}
                  groups={category}
                /> */}
                {enableDelete ? (
                  <Select
                    noOptionsMessage={() => t("no_options")}
                    className='no-border'
                    placeholder={
                      <div className='select-placeholder-text'>
                        {t("select_product_category")}
                      </div>
                    }
                    value={
                      (prod.type === undefined &&
                        prod.productCategory === undefined) ||
                      prod.id === undefined
                        ? null
                        : {
                            value: prod.id,
                            label: prod.type,
                          }
                    }
                    defaultInputValue={prod.type}
                    onChange={(v) => {
                      handleCategoryChange(index, v.value, prod.batchNumber);
                      handleBatchChange("", index);
                    }}
                    options={category}
                  />
                ) : (
                  prod.type ?? prod.productCategory
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
                {/* {enableDelete ?
                <DropdownButton
                  //name={prod.name == '' ? "Select product" : prod.name}
                  name={prod.name ?  prod.name: "Select Product Name"}
                  onSelect={item => { handleProductChange(index, item) }}
                  groups={products}
                  // groups={products.filter(p => !p?.isSelected)}
                /> : prod.name
                } */}
                {enableDelete ? (
                  <Select
                    noOptionsMessage={() => t("no_options")}
                    className='no-border'
                    placeholder={
                      <div className='select-placeholder-text'>
                        {" "}
                        {t("product_name")}
                      </div>
                    }
                    value={
                      prod.id === undefined ||
                      prod.name === undefined ||
                      prod.name === ""
                        ? null
                        : { value: prod.id, label: prod.name }
                    }
                    defaultInputValue={prod.name}
                    onChange={(v) => {
                      handleProductChange(index, v);
                      handleBatchChange("", index);
                      setQuantityChecker(1);
                    }}
                    options={new_products}
                  />
                ) : (
                  prod.name
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col tcell text-center justify-content-center p-2'>
          {prod.manufacturer ? (
            prod.manufacturer
          ) : (
            <div className='select-placeholder-text'>{t("manufacturer")}</div>
          )}
        </div>

        <div className='col tcell text-center justify-content-center p-2'>
          <div className=''>
            <input
              className='form-control text-center'
              id='checker'
              placeholder={t("quantity")}
              onKeyPress={numbersOnly}
              value={prod.productQuantity}
              onChange={(e) => {
                if (
                  Object.keys(selectedBatch).length === 0 ||
                  selectedBatch.quant > e.target.value
                ) {
                  handleQuantityChange(e.target.value, index);
                }
              }}
            />
          </div>
        </div>
        <div
          className='title recived-text align-self-center'
          style={{ position: "relative", right: "40px" }}
        >
          {prod.unitofMeasure && prod.unitofMeasure.name ? (
            <div>{prod.unitofMeasure.name}</div>
          ) : (
            <div className='placeholder_id'>{t("unit")}</div>
          )}
        </div>

        <div className='col tcell text-center justify-content-center p-2'>
          <div className=''>
            <input
              className='form-control text-center'
              id='checker'
              placeholder={t("batch_no")}
              disabled={true}
              value={prod.batchNumber}
              onChange={(e) => {
                handleBatchChange(e.target.value, index);
                setQuantityChecker(1);
              }}
            />
          </div>
        </div>
        <div className='d-flex'>
          <button
            type='button'
            className='btn btn-outline-primary mr-2 ml-2'
            style={{ height: "30px", width: "70px" }}
            onClick={() => {
              setShowModal(true);
              fetchBatches(prod, index);
            }}
          >
            <div
              style={{ position: "relative", fontSize: "12px", left: "-6px" }}
            >
              {t("fetch") === "Fetch" ? "Fetch" : "obtener"}
            </div>
          </button>
          <div className=''>
            {showModal && (
              <div>
                <Modal
                  close={closeModal}
                  title={
                    (t("fetch") === "Fetch" ? "Fetch" : "obtener") +
                    " " +
                    t("batch_details")
                  }
                  size='modal-xl' //for other size's use `modal-lg, modal-md, modal-sm`
                >
                  <div className=''>
                    <TableFilter data={headers} fb='140%' />
                  </div>
                  <div className='overflow'>
                    {batches.length === 0 ? (
                      <div>
                        <div className='rTableRow pt-3 pb-3 justify-content-center text-muted shadow-none'>
                          {t("no_records_found")}
                        </div>
                        <div className='rTableRow pt-3 pb-3 justify-content-center text-muted shadow-none'>
                          {expired
                            ? `${expired} ` + t("expired_records_found")
                            : ""}
                        </div>
                      </div>
                    ) : (
                      batches.map((product, index) => (
                        <div className='rTable pt-1'>
                          <div>
                            <div className='rTableRow mb-1'>
                              <input
                                className='txt2 ml-3'
                                type='checkbox'
                                id={index}
                                onChange={(e) => {
                                  handleChange({
                                    quant: product.quantity,
                                    bnp: product.batchNumbers[0],
                                  });
                                  editBatchSelected(
                                    index,
                                    "selected",
                                    !batches[index].selected
                                  );
                                  editBatchSelected(index, "editable", false);
                                }}
                              ></input>
                              {/* <img src={user} width="27" height="18" alt="User" className="txt1"/> */}
                              <div
                                className='col txt'
                                style={{ position: "relative", left: "0%" }}
                              >
                                {ModelProd?.name}
                              </div>
                              <div
                                className='col txt1'
                                style={{ position: "relative", left: "6%" }}
                              >
                                {ModelProd?.manufacturer}
                              </div>
                              <div
                                className='col txt1'
                                style={{ position: "relative", left: "8%" }}
                              >
                                {product.batchNumbers[0]}
                              </div>
                              <div
                                className='col txt1'
                                style={{ position: "relative", left: "8%" }}
                              >
                                {product.attributeSet.mfgDate &&
                                product.attributeSet.mfgDate.length > 0
                                  ? formatDate(product.attributeSet.mfgDate)
                                  : "-"}
                              </div>
                              <div
                                className='col txt1'
                                style={{ position: "relative", left: "8%" }}
                              >
                                {product.attributeSet.expDate &&
                                product.attributeSet.expDate.length > 0
                                  ? formatDate(product.attributeSet.expDate)
                                  : "-"}
                              </div>
                              <div
                                className='col txt1'
                                style={{ position: "relative", left: "4%" }}
                              >
                                <div className='txt1'>
                                  <input
                                    className='form-control text-center input1'
                                    id='checker'
                                    placeholder='Quantity'
                                    onKeyPress={numbersOnly}
                                    value={product.quantity}
                                    disabled={!product.editable}
                                    onChange={(e) =>
                                      editQuantity(e.target.value, index)
                                    }
                                  />
                                </div>
                              </div>
                              <div
                                className='txt1 title recived-text align-self-left mr-4'
                                style={{ left: "-10px" }}
                              >
                                {prod.unitofMeasure.name}
                              </div>

                              <div className='txt1 mr-3'>
                                <div>
                                  {editButtonStatus ? (
                                    <div>
                                      {addnew ? (
                                        <button
                                          type='submit'
                                          className='btn-sm btn-yellow d-width'
                                          onClick={onSaveClick}
                                        >
                                          <i className='fa fa-pencil text-center'></i>
                                          <span className=''>
                                            {changebtn ? "" : ""}
                                          </span>
                                        </button>
                                      ) : (
                                        <button
                                          className='btn-sm btn-yellow d-width'
                                          onClick={onEditClick}
                                        >
                                          <i className='fa fa-pencil text-center'></i>
                                          {/* <span className="ml-1"></span> */}
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <button
                                      type='button'
                                      className='btn-sm btn-yellow d-width'
                                      disabled={!batches[index].selected}
                                      onClick={(e) =>
                                        editBatchSelected(
                                          index,
                                          "editable",
                                          !batches[index].editable
                                        )
                                      }
                                    >
                                      <i className='fa fa-pencil text-center'></i>
                                      {/* <span className="ml-1"></span> */}
                                    </button>
                                  )}
                                </div>
                              </div>
                              {/* <div className="pr-3">
                                    <button className="bg-white btn-outline-primary d-width">
                                      <i className="fa fa-pencil"></i>
                                      <span className="ml-1"></span>
                                    </button>
                                </div> */}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className='d-flex flex-row-reverse p-3'>
                    <button
                      type='button'
                      className='ml-3 btn btn-orange'
                      onClick={() => {
                        changeBatch(selectedBatch, selectedIndex);
                        closeModal();
                      }}
                    >
                      {t("next")}
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        closeModal();
                        setBatchSelected(false);
                        setDisabled(true);
                      }}
                      className='btn btn-outline-dark'
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </Modal>
              </div>
            )}
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
