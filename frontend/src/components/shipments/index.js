import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Table from './table';
import PoTable from './potable';
import ShippingOrderTable from './shippingOrder'
import Tabs from '../../shared/tabs';
import Tiles from './tiles';
import Add from '../../assets/icons/add.svg';
import Order from '../../assets/icons/order.svg';
import TableFilter from '../../shared/advanceTableFilter';
import Modal from '../../shared/modal';
import PurchaseForm from '../../components/purchaseform';
import mon from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import PurchaseFormReview from '../../components/verifyPO/purchaseFormReview';
import { getShipments, resetShipments } from '../../actions/shipmentActions';
import ExcelPopUp from './ExcelPopup';

const ShipmentAnalytic = props => {
  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
  const [openPOExcel, setOpenPOExcel] = useState(false);
  const [visible, setvisible] = useState('one');
  const [editMode, setEditMode] = useState(false);
  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);
  let headers;
  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenPurchaseOrder(false);
    setOpenPOExcel(false);
  };

  const users = useSelector(state => {
    return state.users;
  });
  const user = useSelector(state => {
    return state.user;
  });
  useEffect(() => {
    dispatch(resetShipments());
    dispatch(getAllUsers());
  }, []);

  const onLoadMore = async () => {
    const newSkip = skip + 5;
    setSkip(newSkip);
    const results = await dispatch(getShipments(skip, limit));
    if (results === 0) {
      setLoadMore(false);
    }
  };

  const headers1 = {
    coloumn1: 'Client',
    coloumn2: 'Purchase Order ID',
    coloumn3: 'Product Name',
    coloumn4: 'Delivery To',
    coloumn5: 'Status',

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Package} width="16" height="16" />,
    img4: <img src={Package} width="16" height="16" />,
    img5: <img src={Status} width="16" height="16" />,
  };
  
  const headers2 = {
    coloumn1: 'Shipping Order ID',
    coloumn2: 'Warehouse',
    coloumn3: 'Product',
    coloumn4: 'Status',

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Package} width="16" height="16" />,
    img4: <img src={Status} width="16" height="16" />,
  };
  
  const headers3 = {
    coloumn1: 'Client',
    coloumn2: 'Shipping Date',
    coloumn3: 'Product Type',
    coloumn4: 'Status',

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Package} width="16" height="16" />,
    img4: <img src={Status} width="16" height="16" />,
  };
  if(visible==="one"){
      headers= headers1
  }else if(visible==="two"){
      headers=headers2
  }else if(visible==="three"){
      headers=headers3
  }
  return (
    <div className="shipment">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">SHIPMENT</h1>
        <div className="d-flex">
           <button className=" btn-primary btn mr-2" onClick={()=>setOpenPOExcel(true)}>Import PO</button>

          <button
            className="btn btn-orange fontSize20 font-bold mr-2"
            onClick={() => setOpenPurchaseOrder(true)}
          >
            <img src={Order} width="14" height="14" className="mr-2" />
            <span>Create Purchase Order</span>
          </button>
          <Link to="/newshipment">
            <button className="btn btn-yellow fontSize20 font-bold">
              <img src={Add} width="14" height="14" className="mr-2" />
              <span>Create Shipment</span>
            </button>
          </Link>
        </div>
      </div>
      {openPOExcel && (
        <Modal
          title="Import"
          close={closeModal}
          size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ExcelPopUp
            onHide={closeModal} //FailurePopUp
            setOpenPOExcel={setOpenPOExcel}
          />
        </Modal>
      )}
      <Tiles {...props} />
      <div className="mt-4">
        <Tabs {...props} setvisible={setvisible} visible={visible} />
      </div>
      <div className="full-width-ribben mt-4">
        <TableFilter data={headers}/>
      </div>
      <div className="ribben-space">
        {visible === "one"? <PoTable {...props}/> : null}
        {visible === "two"? <ShippingOrderTable/>:null}
        {visible === "three"?<Table {...props} loadMore={loadMore} onLoadMore={onLoadMore}/>:null}
       
      </div>
      {openPurchaseOrder && (
        <Modal
          close={() => closeModal()}
          title="Create Purchase Order"
          size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          {editMode ? (
            <PurchaseFormReview
              setEditMode={setEditMode}
              setEditMode={() => setEditMode(false)}
            />
          ) : (
            <PurchaseForm
              setEditMode={() => setEditMode(true)}
              users={users}
              user={user}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ShipmentAnalytic;
