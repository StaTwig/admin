import React, {useState}from 'react';
import Modal from '../../../shared/modal';
import ViewShippingModal from './viewShippingModal'
import './style.scss';

const ShippingOrderTable = props => {
  const[showShippingModal,setShowShippingModal]=useState(false);
  const closeModal = () => {
    setShowShippingModal(false);
  }
  return (
    <div className="table">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Shipping Order ID</div>
          <div className="rTableHead">Warehouse</div>
          <div className="rTableHead">Product</div>
          <div className="rTableHead">
            <span>Quantity</span>
          </div>
          <div className="rTableHead">
            <span>Manufacturer</span>
          </div>
          <div className="rTableHead">
            <span>Date Created</span>
          </div>
          <div className="rTableHead">
            <span>Status</span>
          </div>
          <div className="rTableHead">
            <span />
          </div>
        </div>
        <div className="overflow">
          <div>
            <div className="rTableRow">
              <div className="rTableCell text-primary">
                SG123
              </div>
              <div className="rTableCell">
                <div className="d-flex flex-column ">
                  <div>MMR</div>
                  <div className="sub">PR455678</div>
                </div>
              </div>
             <div className="rTableCell">
                <div className="d-flex flex-column ">
                  <div>MMR</div>
                  <div className="sub">PR455678</div>
                </div>
              </div>
              <div className="rTableCell ">
               <div className="ml-1">500000</div> 
                  </div>
            <div className="rTableCell">ACT1324526</div>
              <div className="rTableCell">  
              20/12/9898</div>

              <div className="rTableCell">
                <div className="status success-bg">Status</div>
              </div>
              <div className="rTableCell">
                <button
                  className="btn btn-outline-primary"
                  onClick={() =>  setShowShippingModal(true)}
                >
                  View
                    </button>
              </div>
              {showShippingModal && (
          <Modal
          close={() => closeModal()}
          title="Shipping Order"
          size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <ViewShippingModal />
        </Modal>
      )}
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default ShippingOrderTable;
