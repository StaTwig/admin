import React, { useState, useEffect } from 'react';
import Modal from '../../../shared/modal';
import ViewShippingModal from './viewShippingModal';
import { getShippingOrders } from '../../../actions/shippingOrderAction';
import './style.scss';

const ShippingOrderTable = props => {
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [shippingOrders, setShippingOrders] = useState([]);
  const[singleShippingOrder,setSingleShippingOrder] = useState({})
  const closeModal = () => {
    setShowShippingModal(false);
  };
  const openModal = shipping => {
    setSingleShippingOrder(shipping)
    setShowShippingModal(true);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getShippingOrders();
      setShippingOrders(result);
    }
    fetchData();
  }, []);
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
            {shippingOrders.length === 0 ? (
              <div>N/A </div>
            ) : (
              shippingOrders.map((shipping, index) => (
                <div className="rTableRow" key={index}>
                  <div className="rTableCell text-primary">{shipping.id}</div>
                  <div className="rTableCell">
                    <div className="d-flex flex-column sub1">
                      <div>{shipping.soAssignedTo.warehouseLocation.split(',')[0]}</div>
                      <div>{shipping.soAssignedTo.warehouseLocation.split(',')[1]}</div>
                    </div>
                    <div className="sub">
                    {shipping.soAssignedTo.warehouseId}
                      </div>
                  </div>
                  <div className="rTableCell">
                    <div className="d-flex flex-column ">
                      <div>{shipping.products[0].productName}</div>
                      <div className="sub">
                        {shipping.products[0].productID}
                      </div>
                    </div>
                  </div>
                  <div className="rTableCell ">
                    <div className="ml-1">{shipping.products[0].productQuantity}</div>
                  </div>
                  <div className="rTableCell">
                    {shipping.products[0].manufacturer}
                  </div>
                  <div className="rTableCell">
                    {shipping.soUpdatedOn.split('T')[0].split('-')[2]+"/"+shipping.soUpdatedOn.split('T')[0].split('-')[1]+"/"+shipping.soUpdatedOn.split('T')[0].split('-')[0]}
                    </div>

                  <div className="rTableCell">
                    <div className="status success-bg">
                      {' '}
                      {shipping.soStatus}
                    </div>
                  </div>
                  <div className="rTableCell">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => openModal(shipping)}
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
                      <ViewShippingModal
                        singleShippingOrder={singleShippingOrder}
                        {...props}
                      />
                    </Modal>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingOrderTable;
