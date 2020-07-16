import React, { useState } from 'react';
import EditTable from '../../shared/table/editTable';
import { useDispatch,useSelector} from "react-redux";
import './style.scss';
import Modal from '../../shared/modal';
import InventoryPopUp from './inventorypopup';
import FailurePopUp  from './failurepopup';
import {addInventory,setReviewinventories} from "../../actions/inventoryActions";
//import FailurePopUp from './failurepopup';

const NewInventory = (props) => {

  const editInventory = useSelector(state => {
    return state.editInventory;
  });
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openFailInventory, setOpenFailInventory] = useState(false);
  const [inventoryError, setInventoryError] = useState('');
  const [productName, setProductName] = useState(editInventory.productName);
  const [manufacturerName, setManufacturerName] = useState(editInventory.manufacturerName);
  const [errorMessage, setErrorMessage] = useState('');
  const [quantity, setQuantity] = useState(editInventory.quantity);
  const [manufacturingDate, setManufacturingDate] = useState(editInventory.manufacturingDate);
  const [expiryDate, setExpiryDate] = useState(editInventory.expiryDate);
  const [storageConditionmin, setStorageConditionmin] = useState(editInventory.storageConditionmin);
  const [storageConditionmax, setStorageConditionmax] = useState(editInventory.storageConditionmin);
  const [batchNumber, setBatchNumber] = useState(editInventory.batchNumber);
  const [serialNumber, setSerialNumber] = useState(editInventory.serialNumber);
  const editTableProps = {
    manufacturerName,
    setManufacturerName,
    productName,
    setProductName,
    quantity,
    setQuantity,
    manufacturingDate,
    setManufacturingDate,
    expiryDate,
    setExpiryDate,
    storageConditionmin,
    setStorageConditionmin,
    storageConditionmax,
    setStorageConditionmax,
    batchNumber,
    setBatchNumber,
    serialNumber,
    setSerialNumber,
  };
  const closeModal = () => {
    setOpenCreatedInventory(false);
  };

  const closeModalFail = () => {
    setOpenFailInventory(false);
  };
  
  var numeric = { year: 'numeric', month: 'numeric' };
  
  const dispatch = useDispatch();

  const inventoryFields= ['productName','manufacturerName','quantity','storageConditionmin','storageConditionmax',
  'manufacturingDate','expiryDate','batchNumber','serialNumber']

  const month = new Date().getMonth()+1;
  const newMonth = `0${month}`.slice(-2);
  const todayDate =  newMonth + '/'  +new Date().getFullYear();
  const dateValidationFields =['expiryDate']
  //const [validate,setValidate] = useState('')
  const expiryDateValidation = (date) =>
  {
    let error = false;
    let validationVariable =  eval(date[0]);
    let a = new Date(Date.parse(typeof validationVariable =='string' ?   validationVariable  : validationVariable.toLocaleDateString())).getFullYear()
    let b =todayDate.slice(-4)
    let c = `0${new Date(Date.parse(  typeof validationVariable =='string' ?   validationVariable  : validationVariable.toLocaleDateString())).getMonth()+1}`.slice(-2)
    let d = todayDate.substring(0,2)
    if(a<b||(a==b&&c<=d)){
      setInventoryError('Check expiryDate')
      setOpenFailInventory(true);
      error = true;
    }
    return error;
  }
  const checkValidationErrors = (validations) => {
    
    let error = false;
    for(let i=0; i< validations.length; i++) {
      let validationVariable =  eval(validations[i]);
      if(validationVariable.length < 1|| validationVariable=="Select Product"||validationVariable=="Select Manufacturer") {
        setInventoryError(validations[i])
        setOpenFailInventory(true);
        error = true;
        break;
      }
    }
   
    return error;
  }
  const onProceedToReview = () => {
    if(checkValidationErrors(inventoryFields)) { return; }
    else if(expiryDateValidation(dateValidationFields)){return;}
     const data = {
      productName,
      manufacturerName,
      quantity,
      manufacturingDate: typeof manufacturingDate =='string' ?   manufacturingDate  :manufacturingDate.toLocaleDateString(),
      expiryDate : typeof expiryDate =='string' ?   expiryDate  : expiryDate.toLocaleDateString(),
      storageConditionmin,
      storageConditionmax,
      batchNumber,
      serialNumber,
    };

    //Store in reducer
    dispatch(setReviewinventories(data));
    console.log('new inventory data', data);

  console.log('clicked');
    //Redirect to review page.
    props.history.push('/reviewinventory');
  

    console.log('new inventory data', data);
    console.log('clicked');

  }
  const onAddInventory = async() => {
    const data = {
      productName,
      manufacturerName,
      quantity,
      manufacturingDate:manufacturingDate.date.toLocaleDateString('en-GB', numeric),
      expiryDate : expiryDate.date1.toLocaleDateString('en-GB', numeric),
      storageConditionmin,
      storageConditionmax,
      batchNumber,
      serialNumber,
    };
    console.log(data);
    const result = await addInventory({ data });
    if (result.status != 400) {
      setOpenCreatedInventory(true);
    }
    else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }

  };
  return (
    <div className="Newinventory">
      <h1 className="breadcrumb">ADD INVENTORY</h1>
      <EditTable {...editTableProps} />   
      
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>

     
      <hr />
      <div className="d-flex justify-content-between">
        
          <div className="total" >Grand Total</div>
  <span className="value" >{quantity}</span>
        
        <button className="btn-primary btn"  onClick={onProceedToReview}>Proceed To Review</button>
        
      </div>
      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <InventoryPopUp onHide={closeModal} //FailurePopUp
          
          />
        </Modal>
      )}

    {openFailInventory && (
        <Modal
          close={() => closeModalFail()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <FailurePopUp onHide={closeModalFail} //FailurePopUp
          inventoryError={inventoryError}
          />
        </Modal>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default NewInventory;


/*<button className="btn-primary btn" onClick={onAddInventory}>
          {' '}
          Add Inventory
        </button>*/
      