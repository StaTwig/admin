import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getPurchaseStats, changePOStatus } from '../../../actions/poActions';
import Modal from '../../../shared/modal';
import POModal from './POModal';
import AlertModal from './AlertModal';
import './style.scss';

const PoTable = props => {
  const [purchases, setPurchases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState({});
  const [alertMessage, setAlertMessage] = useState({});
  useEffect(() => {
    async function fetchData() {
      const result = await getPurchaseStats();
      setPurchases(result.data.data);
    }
    fetchData();
  }, []);

  const user = useSelector(state => state.user);
  const closeModal = () => setShowModal(false);
  const openModal = purchase => {
    setPurchaseOrder(purchase);
    setShowModal(true);
  };

  const onPOStatusChange = async status => {
    const data = { status, orderID: purchaseOrder.key };
    const result = await changePOStatus(data);
    if (result.status === 200) {
      setAlertMessage('Success');
      setShowAlertModal(true);
      setShowModal(false);
      const purchaseStatsResult = await getPurchaseStats();
      setPurchases(purchaseStatsResult.data.data);
    } else {
      setShowAlertModal(true);
      setAlertMessage('Fail');
    }
  };
  return (
    <div className="table">
      {showAlertModal && (
        <AlertModal
          type={alertMessage}
          productID={purchaseOrder.key}
          onHide={() => setShowAlertModal(false)}
        />
      )}
      {showModal && (
        <Modal
          close={closeModal}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <POModal
            onHide={closeModal}
            purchaseOrder={purchaseOrder}
            userAddress={user.address}
            onAccept={onPOStatusChange}
            onReject={onPOStatusChange}
          />
        </Modal>
      )}
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Manufacturer</div>
          <div className="rTableHead">Order ID</div>
          <div className="rTableHead">Product Name</div>
          <div className="rTableHead">
            <span>Quantity</span>
          </div>
          <div className="rTableHead">
            <span>Order Date</span>
          </div>
          <div className="rTableHead">
            <span>Delivery To</span>
          </div>
          <div className="rTableHead">
            <span>Delivery Location</span>
          </div>
          <div className="rTableHead">
            <span>Status</span>
          </div>
          <div className="rTableHead">
            <span />
          </div>
        </div>
        <div className="overflow">
          {purchases.map((purchase, index) => {
            const p = JSON.parse(purchase.data);
            return (
              <div>
                <div className="rTableRow" key={index}>
                  <div className="rTableCell">
                    <div className="combine-data">
                      {Object.keys(p.products[0])[0].split('-')[1]}
                    </div>
                  </div>
                  <div className="rTableCell">{purchase.key}</div>
                  <div className="rTableCell">
                    {Object.keys(p.products[0])[0].split('-')[0]}
                  </div>
                  <div className="rTableCell">
                    {
                      p.products[0][
                        `${Object.keys(p.products[0])[0].split('-')[0]}-${
                          Object.keys(p.products[0])[0].split('-')[1]
                        }`
                      ]
                    }
                  </div>
                  <div className="rTableCell">{p.date}</div>
                  <div className="rTableCell">{p.receiver.name}</div>
                  <div className="rTableCell">{p.destination}</div>
                  <div className="rTableCell">
                    <div className="status">
                      <span className="text">{purchase.status}</span>
                    </div>
                  </div>
                  <div className="rTableCell">
                    <button
                      className="success"
                      onClick={() => openModal(purchase)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PoTable;
