import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPOs, changePOStatus, resetPOs } from "../../../actions/poActions";
import Modal from "../../../shared/modal";
import POModal from "./POModal";
import AlertModal from "./AlertModal";
import "./style.scss";

const PoTable = (props) => {
  //const [purchases, setPurchases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState({});
  const [alertMessage, setAlertMessage] = useState({});
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(5);
  const [limit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);

  const purchases = useSelector((state) => state.pos);

  useEffect(() => {
    dispatch(getPOs());
    return () => dispatch(resetPOs());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const closeModal = () => setShowModal(false);
  const closeAlertModal = () => setShowAlertModal(false);
  const openModal = (purchase) => {
    setPurchaseOrder(purchase);
    setShowModal(true);
  };

  const onCreateShipment = () => props.history.push("/newshipment");
  const onPOStatusChange = async (status) => {
    const data = { status, orderID: purchaseOrder.orderID };
    const result = await changePOStatus(data);
    if (result.status === 200) {
      setAlertMessage("Success");
      setShowAlertModal(true);
      setShowModal(false);
      // dispatch(getPurchaseStats());
    } else {
      setShowAlertModal(true);
      setAlertMessage("Fail");
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
    <div className='table'>
      {showAlertModal && (
        <Modal
          close={() => closeAlertModal()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
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
          title='Purchase Order'
          size='modal-xl' //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName='btn-orange'
        >
          <POModal
            onHide={closeModal}
            purchaseOrder={purchaseOrder}
            userAddress={user.address}
            onAccept={onPOStatusChange}
            onReject={onPOStatusChange}
            onCreateShipment={onCreateShipment}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
      <div className='rTable'>
        <div className='rTableHeading'>
          <div className='rTableHead'>Supplier</div>
          <div className='rTableHead'>Purchase Order ID</div>
          <div className='rTableHead'>
            <span>Customer</span>
          </div>
          <div className='rTableHead'>
            <span>Customer Location</span>
          </div>
          <div className='rTableHead'>
            <span>Status</span>
          </div>
          <div className='rTableHead'>
            <span />
          </div>
        </div>
        <div className='overflow'>
          {purchases.map((purchase, index) => {
            let statusStyle = "warning-bg";
            if (purchase.status === "Accepted") {
              statusStyle = "success-bg";
            } else if (purchase.status === "Created") {
              statusStyle = "info-bg";
            } else if (purchase.status === "Rejected") {
              statusStyle = "secondary-bg";
            }
            return (
              <div key={index}>
                <div className='rTableRow'>
                  <div className='rTableCell'>
                    <div className='d-flex flex-column'>
                      <div className='text-primary font-weight-bold'>
                        {" "}
                        {purchase.supplierOrgName}{" "}
                      </div>
                      <div className='sub text-primary  font-weight-bold'>
                        {" "}
                        {purchase.suppplierOrgID}{" "}
                      </div>
                    </div>
                  </div>
                  <div className='rTableCell'>{purchase.externalId}</div>
                  <div className='rTableCell'>
                    <div className='d-flex flex-column'>
                      <div>{purchase.customerOrgName}</div>
                      <div className='sub'> {purchase.customerOrgID} </div>
                    </div>
                  </div>
                  <div className='rTableCell'>
                    <div className='d-flex flex-column'>
                      <div>{purchase.customerCountryName}</div>
                      <div className='sub'>{purchase.customerCountryID}</div>
                    </div>
                  </div>
                  <div className='rTableCell'>
                    <div className={`status ${statusStyle}`}>
                      {purchase.status}
                    </div>
                  </div>
                  <div className='rTableCell'>
                    <button
                      className='btn btn-outline-primary'
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
        <button className=' btn-primary btn mr-2' onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default PoTable;
