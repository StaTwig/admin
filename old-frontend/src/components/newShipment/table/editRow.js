import React, { useState, useEffect } from 'react';
import Delete from '../../../assets/icons/Delete.png';
import DropdownButton from '../../../shared/dropdownButtonGroup';
import Select from 'react-select';
import {getProductList} from '../../../actions/productActions';
import './style.scss';
import Modal from "../../../shared/modal";
import CloseIcon from "../../../assets/icons/cross.svg";
import TotalInventoryAdded from '../../../assets/icons/TotalInventoryAddedcopy.svg';
import Add from '../../../assets/icons/add.svg';
import user from '../../../assets/icons/brand.svg';
import Quantity from '../../../assets/icons/Quantity.png';
import Product from '../../../assets/icons/Producttype.png';
import date from '../../../assets/icons/ShippingDate.svg';
import Batch from '../../../assets/icons/batch.png';
import TableFilter from './tablefilter.js';
import axios from 'axios';
import { config } from '../../../config';
import { formatDate } from '../../../utils/dateHelper';

const EditRow = props => {
  const {
    prod,
    handleQuantityChange,
    handleLabelIdChange,
    index,
    onRemoveRow,
    enableDelete,
    category,
    handleCategoryChange,
    handleProductChange,
    handleBatchChange,
    products,
    check,
    warehouseID
  } = props;
  
  const headers = {
    coloumn1: 'Product Name',
    coloumn2: 'Manufacturer',
    coloumn3: 'Batch Number',
    coloumn4: 'Mfg Date',
    coloumn5: 'Exp Date',
    coloumn6: 'Quantity',

    img1: <img src={Product} width="15" height="15"/>,
    img2: <img src={user} width="15" height="15"/>,
    img3: <img src={Batch} width="15" height="15"/>,
    img4: <img src={date} width="15" height="15"/>,
    img5: <img src={date} width="15" height="15"/>,
    img6: <img src={Quantity} width="20" height="15"/>,
  };
  // console.log(prod,"Edit rowt",index);
  const [editButtonStatus, setEditButtonStatus] = useState(false);
  const [changeValue, setValue] = useState("");
  const [changebtn, setbtn] = useState(false);
  const [addnew, setAddnew] = useState(!props.category);
  const [disabled, setDisabled] = useState(true);
  const [productsList,setProductsList] = useState([]);
  const [quantityChecker,setQuantityChecker] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [ModelProd, setModelProduct] = useState({});
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [selectedIndex, setSelectedIndex] = useState();
  const [BatchSelected, setBatchSelected] = useState([]);
  const closeModal = () => setShowModal(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEditClick = (e) => {
    setDisabled(!disabled);
    setEditButtonStatus(true);
    //setDisabled(!disabled);
    //setEditButtonStatus(false);
  };
  const editBatchSelected = (index, type, value) => {
    let buffer = [...batches];
    buffer[index][type] = value;
    setBatches(buffer);
    console.log(buffer)
  }

  const onSaveClick = (e) => {
    setbtn(true);
    setDisabled(!disabled);
    setEditButtonStatus(false);
  };

  const handleBatchQuantityChange = (e) => {
    setValue(e);
  };

  
  useEffect(() => {

    async function fetchData() {
  
      const result111 = await getProductList();
      // console.log(result111);
      setProductsList(result111.message);
  
    }
  
    fetchData();
  }, []);

  const new_products = [];

  if(typeof(products)!="undefined" && typeof(productsList)!="undefined"){
  for(var i=0;i<products.length;i++)
  {
    // console.log(productsList);
    let check = false;
    for(var j=0;j<productsList.length;j++)
    {
      if(products[i].label===productsList[j].productName)
      {
        check = true;
        break;
      }
    }
    if(check)
    {
      new_products.push(products[i]);
    }
  }
}

var defaultQuantity  =  "Quantity";

const updateQuantity = () =>
{
  setQuantityChecker(0);
}
// console.log("product Quantity is "+ prod.productQuantity);
if(check==="0" && quantityChecker===1 && typeof(prod)!="undefined" && typeof(prod.name!="undefined") && typeof(productsList)!="undefined")
  {
                     let qty;
                    for(var i=0;i<productsList.length;i++)
                    {
                      if(prod.name===productsList[i].productName)
                      {
                        qty = String(productsList[i].quantity);
                        console.log(typeof(qty));
                        break;
                      }
                    }
                    if(i < productsList.length){
                     prod.productQuantity = qty;
                     handleQuantityChange(prod.productQuantity, index);
                    console.log("productQuantity is " + prod.productQuantity);
                    updateQuantity();
                    }
  }

  async function changeBatch(batch, index){
    console.log(selectedBatch.quant, selectedBatch.bnp, index);
    handleBatchChange(batch.bnp, index);
    handleQuantityChange(batch.quant, index);
    // closeModal()
  }
  async function fetchBatches(prod, index){
    // console.log(warehouseID)
    setSelectedIndex(index);
    // console.log("index, ", selectedIndex )
    setModelProduct(prod);
    let res = await axios.get(`${config().fetchBatchesOfInventory}?productId=${prod.id}&wareId=${warehouseID}`)
    // console.log(res.data);
    let buffer = res.data.data
    buffer.forEach(element => {
      element.selected = false;
      element.editable = false;
      element.immutableQuantity = element.quantity
    });
    setBatches(buffer)

  }
  const numbersOnly = (e) => {
    // Handle paste
    if (e.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      e.returnValue = false;
      if(e.preventDefault) e.preventDefault();
    }
  }
const handleChange = (value) =>
{
    console.log(value);
    setSelectedBatch(value);
}
const setQuantity = (value) => {
  let buffer = selectedBatch;
  buffer.quant = value;
  setSelectedBatch(buffer);
  console.log(selectedBatch)
}
const editQuantity = (value, index) => {
  let buffer = [...batches];
  if(parseInt(value) > parseInt(buffer[index].immutableQuantity)){
    alert("quantity cannot exceed batch limit")
    return
  }
  buffer[index].quantity = value;

  setBatches(buffer);
  setQuantity(value);
  
}
//console.log("yyyy",prod);
// console.log(products);
// const handlee = () =>
// {
//   console.log("Hi");
//     const value = document.getElementById("checker").value;
//     console.log("value is " + value);
//     if(value)
//     {
//       this.props.checkAndTrace(true);
//     }
//     else{
//       this.props.checkAndTrace(false);
//     }
// };

  return (
    <div className="row ml-3 mr-1">
      <div className="trow row mr-1 col">
        <div className="col pl-4 tcell">
          <div className=" p-0">
            {/* <div className="profileIconRound recived-bg">OPV</div> */}

            <div className="d-flex flex-column">
              <div className="title recived-text">
                {/* <DropdownButton
                  name={prod.type ? prod.type : "Select Product Category"}
                  onSelect={item => { handleCategoryChange(index, item) }}
                  groups={category}
                /> */}
                { enableDelete ?
                <Select
                  className="no-border"
                  placeholder={<div className="select-placeholder-text">Select Product Category</div>} 
                  value={(prod.type==undefined || prod.id==undefined)?null:{value: prod.id, label: prod.type}}
                  defaultInputValue={prod.type}
                  onChange={(v) => {
                    handleCategoryChange(index, v.value,prod.batchNumber);
                    handleBatchChange("", index);
                  }
                }
                  options={category}
                />: prod.type
                }
              </div>
            </div>
</div>
</div>
<div className="Divider1"></div>
<div className="col tcell">
          <div className=" p-0">
            <div className="col tcell text-center justify-content-center pl-0">
              <div className="title recived-text">
              {/* {enableDelete ?
                <DropdownButton
                  //name={prod.name == '' ? "Select product" : prod.name}
                  name={prod.name ?  prod.name: "Select Product Name"}
                  onSelect={item => { handleProductChange(index, item) }}
                  groups={products}
                  // groups={products.filter(p => !p?.isSelected)}
                /> : prod.name
                } */}
                {enableDelete ?
                <Select
                className="no-border"
                placeholder= {<div className= "select-placeholder-text" > Product Name </div>} 
                value={(prod.id==undefined || prod.name==undefined || prod.name==="")?null:{value: prod.id, label: prod.name}}
                placeholder="Product Name"
                   defaultInputValue={prod.name}
                  onChange={(v) => {
                    handleProductChange(index, v);
                    handleBatchChange("", index);
                    setQuantityChecker(1);
                  }
                }
                  options={new_products}
                /> : prod.name
                }
              </div>
              
            </div>
          </div>
        </div>
        <div className="col tcell text-center justify-content-center p-2">{prod.manufacturer ? prod.manufacturer : <div className="select-placeholder-text">Manufacturer</div>}</div>
        
        <div className="col tcell text-center justify-content-center p-2">
          <div className="">
            <input
              className="form-control text-center"
              id="checker"
              placeholder="Quantity"
              onKeyPress={numbersOnly}
              value={prod.productQuantity}
              
              onChange={(e) => {
                handleQuantityChange(e.target.value, index);
                }}
            />
          </div>
        </div>
        <div className="title recived-text align-self-center" style={{position:"relative",right:"40px"}}>
          {prod.unitofMeasure && prod.unitofMeasure.name  ? <div>{prod.unitofMeasure.name}</div>:
          <div className="placeholder_id">Unit</div>}
        </div>

        <div className="col tcell text-center justify-content-center p-2">
          <div className="">
            <input
              className="form-control text-center"
              id="checker"
              placeholder="Batch number"
              value={prod.batchNumber}
              onChange={(e) => {
                handleBatchChange(e.target.value, index);
                setQuantityChecker(1);
              }}
            />
          </div>
        </div>
        <div className="d-flex">
            <button type="button" class="btn btn-outline-primary mr-2 ml-2"
                style={{height:"30px",width:"60px"}}
                onClick={() => {setShowModal(true); fetchBatches(prod, index)}}>
                <div style={{position:"relative",fontSize:"12px",left:"-6px"}}>Fetch</div>
            </button>
            <div className="">
            {showModal && (
              <div>
              <Modal
                close={closeModal}
                title="FETCH SERIAL NUMBERS"
                size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
              >
              
              <div className="">
                  <TableFilter data={headers} fb="140%"/>
                </div>
              
              
              {batches.length === 0 ? <div className="rTableRow pt-3 pb-3 justify-content-center text-muted shadow-none">No records found</div> : batches.map((product, index) => (
              <div className="rTable pt-1">
            <div>
               <div>
                <div className="rTableRow mb-1"> 
                        <input className="txt2 ml-3" type="checkbox" id={index} 
                               onChange={(e) => {handleChange({quant: product.quantity, bnp: product.batchNumbers[0]}); editBatchSelected(index, "selected", !batches[index].selected); editBatchSelected(index, "editable", false)}}>
                        </input>
                        {/* <img src={user} width="27" height="18" alt="User" className="txt1"/> */}
                        <div className="col txt" style={{position:"relative",left:'0%'}}>{ModelProd?.name}</div>
                        <div className="col txt1" style={{position:"relative",left:'6%'}} >{ModelProd?.manufacturer}</div>
                        <div className="col txt1" style={{position:"relative",left:'8%'}} >{product.batchNumbers[0]}</div>
                        <div className="col txt1" style={{position:"relative",left:'8%'}}>{(product.attributeSet.mfgDate.length > 0) ?  formatDate(product.attributeSet.mfgDate, "mmyyyy"): "-"}</div>
                        <div className="col txt1" style={{position:"relative",left:'8%'}}>{(product.attributeSet.expDate.length > 0) ? formatDate(product.attributeSet.expDate, "mmyyyy") : "-"}</div> 
                        <div className="col txt1" style={{position:"relative",left:'4%'}}>
                        <div className="txt1">
                        <input
                          className="form-control text-center input1"
                          id="checker"
                          placeholder="Quantity"
                          onKeyPress={numbersOnly}
                          value={product.quantity}
                          disabled={!product.editable}
                          onChange={(e) => editQuantity(e.target.value, index)}
                        />
              </div>
            </div>
            <div className="txt1 title recived-text align-self-center mr-2">
            {prod.unitofMeasure.name}
             </div>
            
            <div className="txt1 mr-3">
              <div>
                {editButtonStatus ? (
                  <div>
                    {addnew ? (
                      <button
                        type="submit"
                        className="btn-sm btn-yellow d-width"
                        onClick={onSaveClick}
                      >
                        <i className="fa fa-pencil text-center"></i>
                        <span className="">{changebtn ? "" : "" }</span>
                      </button>
                    ) : (
                      <button
                        className="btn-sm btn-yellow d-width"
                        onClick={onEditClick}
                      >
                        <i className="fa fa-pencil text-center"></i>
                        {/* <span className="ml-1"></span> */}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn-sm btn-yellow d-width"
                    disabled={!batches[index].selected}
                    onClick={(e) => editBatchSelected(index, "editable", !batches[index].editable)}
                  >
                    <i className="fa fa-pencil text-center"></i>
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
             </div>
          
          ))}
          
          
          
          
              <div className="d-flex flex-row-reverse p-3">
                <button type="button" className="ml-3 btn btn-orange" onClick={() => {changeBatch(selectedBatch, selectedIndex); closeModal()}}>
                 Next
                </button>
                <button
                  type="button"
                  onClick={() => {closeModal(); setBatchSelected(false); setDisabled(true)}}
                  className="btn btn-outline-dark"
                >
                  CANCEL
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
         <div className="m-2 pl-3 pt-1" style={{position:"relative", left:"10px"}}>
           <span
             className="del-pad shadow border-none rounded-circle mr-1"
             onClick={() => props.onRemoveRow(index)}
           >
             <img className="cursorP p-1" height="30" src={Delete} />
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

