import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPOs, changePOStatus, resetPOs} from '../../../actions/poActions';
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
    dispatch(getPOs());
    return () => dispatch(resetPOs());
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
    const purchaseStatsResult = await dispatch(getPOs(skip, limit));
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
          <div className="rTableHead">Supplier</div>
          <div className="rTableHead">Purchase Order ID</div>
          <div className="rTableHead">Product</div>
          <div className="rTableHead">
            <span>Customer</span>
          </div>
          <div className="rTableHead">
            <span>Customer</span>
          </div>
          <div className="rTableHead">
            <span>CustomerLocation</span>
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
              <div className="rTableCell">
                <div className="combine-data">
                <div className="d-flex flex-column ">
                  <div className="align-self-start">Richard Parker</div>
                  <div className="sub align-self-start">123455678</div>
                </div></div>
              </div>
              <div className="rTableCell">ACT1324526</div>
              <div className="rTableCell">
                <div className="d-flex flex-column ">
                  <div>MMR</div>
                  <div className="sub">PR455678</div>
                </div>
              </div>
              <div className="rTableCell ">
               <div className="ml-1">500000</div> 
                  </div>
              <div className="rTableCell"> 
              <div className="d-flex flex-column ">
                <div>Bharat1234</div>
                <div className="sub">PR455678</div>
              </div></div>
              <div className="rTableCell">  
              <div className="d-flex flex-column">
                <div>Australia</div>
                <div className="sub">PR455678</div>
              </div></div>

              <div className="rTableCell">
                <div className="status success-bg">Status</div>
              </div>
              <div className="rTableCell">
                <button
                  className="btn btn-outline-primary"
                  onClick={() =>  setShowModal(true)}
                >
                  View
                    </button>
              </div>
            </div>
          </div>
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
