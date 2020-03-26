import React, { useState } from "react";
import EditTable from '../../shared/table/editTabel';
import './style.scss';
import Modal from '../../shared/modal';
import InventoryPopUp from './inventorypopup'

const NewInventory = () => {
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const closeModal = () => {
    setOpenCreatedInventory(false);
  }
  return (
    <div className="Newinventory">
      <h1 className="breadcrumb">ADD INVENTORY</h1>
      <EditTable />
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>
      <hr />
      <div className="d-flex justify-content-between">
      <div className="d-flex w-25 justify-content-between">
        <div className="total">Grand Total</div>
        <span className="value">0</span>
      </div>
        
        <button className="btn-primary btn" onClick={() => setOpenCreatedInventory(true)}> Add Inventory</button>
      </div>
      {
        openCreatedInventory && <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <InventoryPopUp />
        </Modal>
      }

    </div>
  );
};

export default NewInventory;
