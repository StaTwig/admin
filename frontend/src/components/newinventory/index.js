import React, { useState } from 'react';
import EditTable from '../../shared/table/editTable';
import './style.scss';
import Modal from '../../shared/modal';
import InventoryPopUp from './inventorypopup';
import {addInventory} from "../../actions/inventoryActions";

const NewInventory = () => {
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [productName, setProductName] = useState('Select Product');
  const [manufacturerName, setManufacturerName] = useState(
    'Select Manufacturer',
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [storageCondition, setStorageCondition] = useState('');
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
    storageCondition,
    setStorageCondition,
    batchNumber,
    setBatchNumber,
    serialNumber,
    setSerialNumber,
  };
  const closeModal = () => {
    setOpenCreatedInventory(false);
  };
  
  var numeric = { year: 'numeric', month: 'numeric' };
  const onAddInventory = async() => {
    const data = {
      productName,
      manufacturerName,
      quantity,
      manufacturingDate:manufacturingDate.date.toLocaleDateString('en-GB', numeric),
      expiryDate : expiryDate.date1.toLocaleDateString('en-GB', numeric),
      storageCondition,
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
        <div className="d-flex w-25 justify-content-between">
          <div className="total">Grand Total</div>
          <span className="value">0</span>
        </div>

        <button className="btn-primary btn" onClick={onAddInventory}>
          {' '}
          Add Inventory
        </button>
      </div>
      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <InventoryPopUp onHide={closeModal} />
        </Modal>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default NewInventory;
