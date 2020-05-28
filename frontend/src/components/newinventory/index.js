import React, { useState } from 'react';
import EditTable from '../../shared/table/editTable';
import { useDispatch} from "react-redux";
import './style.scss';
import Modal from '../../shared/modal';
import InventoryPopUp from './inventorypopup';
import {addInventory,setReviewinventories} from "../../actions/inventoryActions";
//import FailurePopUp from './failurepopup';

const NewInventory = (props) => {
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [productName, setProductName] = useState('Select Product');
  const [manufacturerName, setManufacturerName] = useState(
    'Select Manufacturer',
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [storageConditionmin, setStorageConditionmin] = useState('');
  const [storageConditionmax, setStorageConditionmax] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
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
  
  var numeric = { year: 'numeric', month: 'numeric' };
  
  const dispatch = useDispatch();
  const onProceedToReview = () => {
    
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
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default NewInventory;


/*<button className="btn-primary btn" onClick={onAddInventory}>
          {' '}
          Add Inventory
        </button>*
         <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/