import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPurchaseStats, changePOStatus, resetPurchaseStats } from '../../../actions/poActions';
import Modal from '../../../shared/modal';
import POModal from './POModal';
import AlertModal from './AlertModal';
import './style.scss';

const PoTable = props => {
  //const [purchases, setPurchases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState({});
  const [alertMessage, setAlertMessage] = useState({});
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);

  const purchases = useSelector(state => state.pos);

  useEffect(() => {
    dispatch(getPurchaseStats());
    return () => dispatch(resetPurchaseStats());
  }, []);

  const user = useSelector(state => state.user);
  const closeModal = () => setShowModal(false);
  const closeAlertModal = () => setShowAlertModal(false);
  const openModal = purchase => {
    setPurchaseOrder(purchase);
    setShowModal(true);
  };

  const onCreateShipment = () => props.history.push('/newshipment')
  const onPOStatusChange = async status => {
    const data = { status, orderID: purchaseOrder.orderID };
    const result = await changePOStatus(data);
    if (result.status === 200) {
      setAlertMessage('Success');
      setShowAlertModal(true);
      setShowModal(false);
      dispatch(getPurchaseStats());
    } else {
      setShowAlertModal(true);
      setAlertMessage('Fail');
    }
  };


  const onLoadMore = async () => {
    const newSkip = skip + 5;
    setSkip(newSkip);
    const purchaseStatsResult = await dispatch(getPurchaseStats(skip, limit));
    if (purchaseStatsResult.data.data.length === 0) {
      setLoadMore(false);
    }
  };
  return (
    <div className="table">
      {showAlertModal && (
         <Modal
         close={() => closeAlertModal()}
         size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
       >
      <AlertModal
          type={alertMessage}
          productID={purchaseOrder.key}
          onHide={() => setShowAlertModal(false)}
        />
          </Modal>
      )}
      {showModal && (
        <Modal
          close={closeModal}
          title="Purchase Order"
          size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <POModal
            onHide={closeModal}
            purchaseOrder={purchaseOrder}
            userAddress={user.address}
            onAccept={onPOStatusChange}
            onReject={onPOStatusChange}
            onCreateShipment={onCreateShipment}
          />
        </Modal>
      )}
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Vendor</div>
          <div className="rTableHead">Purchase Order ID</div>
          <div className="rTableHead">Product Name</div>
          <div className="rTableHead">
            <span>Quantity</span>
          </div>
          <div className="rTableHead">
            <span>Order Date</span>
          </div>
          <div className="rTableHead">
            <span>Shipped From</span>
          </div>
          <div className="rTableHead">
            <span>To Location</span>
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
            const p = purchase;
            let statusStyle = 'warning-bg';
            if (purchase.status === 'Accepted') {
              statusStyle = 'success-bg';
            } else if (purchase.status === 'Created') {
              statusStyle = 'info-bg';
            } else if (purchase.status === 'Rejected') {
              statusStyle = 'secondary-bg';
            }
            return (
              <div>
                <div className="rTableRow" key={index}>
                  <div className="rTableCell">
                    <div className="combine-data">
                      {Object.keys(p.products[0])[0].split('-')[1]}
                    </div>
                  </div>
                  <div className="rTableCell">{purchase.orderID}</div>
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
                  <div className="rTableCell">{p.incoterms2}</div>
                  <div className="rTableCell">{p.destination}</div>
                  <div className="rTableCell">
                  <div className= {`status ${statusStyle}`}>{p.status}</div>
                  </div>
                  <div className="rTableCell">
                    <button
                      className="btn btn-outline-primary"
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
      {loadMore && (
        <button className="btn btn-success" onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default PoTable;
