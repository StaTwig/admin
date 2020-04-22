import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Table from './table';
import Tabs from '../../shared/tabs';
import Tiles from './tiles';
import Add from '../../assets/icons/add.svg';
import Order from '../../assets/icons/order.svg';
import TableFilter from '../../shared/advanceTableFilter';
import Modal from '../../shared/modal';
import PurchaseForm from '../../components/purchaseform';
import user from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';

const ShipmentAnalytic = props => {
  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenPurchaseOrder(false);
  };

  const users = useSelector(state => {
    return state.users;
  });
  const user = useSelector(state => {
    return state.user;
  });
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const headers = {
    coloumn1: 'Client',
    coloumn2: 'Shipping Date',
    coloumn3: 'Product Type',
    coloumn4: 'Status',

    img1: <img src={user} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Package} width="16" height="16" />,
    img4: <img src={Status} width="16" height="16" />,
  };
  return (
    <div className="shipment">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">SHIPMENT</h1>
        <div className="d-flex">
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
      <Tiles {...props} />
      <div className="mt-4">
        <Tabs />
      </div>
      <div className="full-width-ribben mt-4">
        <TableFilter data={headers} />
      </div>
      <div className="ribben-space">
        <Table {...props} />
      </div>
      {openPurchaseOrder && (
        <Modal
          close={() => closeModal()}
          title="Create Purchase Order"
          size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <PurchaseForm users={users} user={user}/>
        </Modal>
      )}
    </div>
  );
};

export default ShipmentAnalytic;
