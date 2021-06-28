import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Table from './table';
import PoTable from './potable';
import ShippingOrderTable from './shippingOrder'
import Tabs from '../../shared/tabs';
import Tiles from './tiles';
import Add from '../../assets/icons/createshipment.png';
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
import { getInboundShipments, getOutboundShipments, getSupplierAndReceiverList, getShipmentIds, getShipments, resetShipments } from '../../actions/shipmentActions';
import ExcelPopUp from './ExcelPopup';
import Received from '../../assets/icons/Received1.svg';
import Sent from '../../assets/icons/Sent.png';
import update from '../../assets/icons/Update_Status.png';
const ShipmentAnalytic = props => {
  const [visible, setvisible] = useState('one');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [shpmnts, setShpmnts] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();
  const [outboundShipments, setOutboundShipments] = useState([]);
  const [inboundShipments, setInboundShipments] = useState([]);
  const [supplierReceiverList, setSupplierReceiverList] = useState([]);
  const [shipmentIdList, setShipmentIdList] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (visible == 'one') {
        const inboundRes = await getInboundShipments("", "", "", "", "", 0, limit); // id, from, to, dateFilter, status, skip, limit
        setInboundShipments(inboundRes.data.inboundShipments);
        setCount(inboundRes.data.count)
      } else {
        const outboundRes = await getOutboundShipments("", "", "", "", "", 0, limit); // id, from, to, dateFilter, status, skip, limit
        setOutboundShipments(outboundRes.data.outboundShipments);
        setCount(outboundRes.data.count);
      }

      const supplierReceiverListRes = await getSupplierAndReceiverList();
      setSupplierReceiverList(supplierReceiverListRes.data);

      const shipmentIdListRes = await getShipmentIds();
      setShipmentIdList(shipmentIdListRes.data);
      setSkip(0);
    };
    fetchData();
    // dispatch(resetShipments());
    dispatch(getAllUsers());
  }, [visible]);

  const onPageChange = async (pageNum) => {
    const recordSkip = (pageNum-1)*limit;

    setSkip(recordSkip);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toFilter, dateFilter, statusFilter, recordSkip, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count)
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toFilter, dateFilter, statusFilter, recordSkip, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
    setData(visible)
  };

  const headers = {
    coloumn1: 'Shipment ID',
    coloumn2: 'Shipment Date',
    coloumn3: 'From',
    coloumn4: 'To',
    coloumn5: 'Status ',

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Received} width="16" height="16" />,
    img4: <img src={Sent} width="16" height="16" />,
    img5: <img src={Status} width="16" height="16" />,
  };

  const setData = (v, a = false) => {
    setvisible(v);
    setAlerts(a);
  }

  const setDateFilterOnSelect = async (dateFilterSelected) => {
    setDateFilter(dateFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toFilter, dateFilterSelected, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toFilter, dateFilterSelected, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setStatusFilterOnSelect = async (statusFilterSelected) => {
    setStatusFilter(statusFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toFilter, dateFilter, statusFilterSelected, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toFilter, dateFilter, statusFilterSelected, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setToShipmentFilterOnSelect = async (toShipmentFilterSelected) => {
    setToFilter(toShipmentFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromFilter, toShipmentFilterSelected, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromFilter, toShipmentFilterSelected, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setFromShipmentFilterOnSelect = async (fromShipmentFilterSelected) => {
    setFromFilter(fromShipmentFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(idFilter, fromShipmentFilterSelected, toFilter, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(idFilter, fromShipmentFilterSelected, toFilter, dateFilter, statusFilter, 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }

  const setShipmentIdFilterOnSelect = async (shipmentIdFilterSelected) => {
    setSkip(0);
    if (visible == 'one') {
      const inboundRes = await getInboundShipments(shipmentIdFilterSelected, "", "", "", "", 0, limit); //id, from, to, dateFilter, status, skip, limit
      setInboundShipments(inboundRes.data.inboundShipments);
      setCount(inboundRes.data.count);
    } else {
      const outboundRes = await getOutboundShipments(shipmentIdFilterSelected, "", "", "", "", 0, limit); // id, from, to, dateFilter, status, skip, limit
      setOutboundShipments(outboundRes.data.outboundShipments);
      setCount(outboundRes.data.count);
    }
  }
  const sendData = () => {
    let rtnArr = visible == 'one' ? inboundShipments : outboundShipments;
    if (alerts)
      rtnArr = rtnArr.filter(row => row?.shipmentAlerts?.length > 0);
    return rtnArr ? rtnArr : [];
  }

  return (
    <div className="shipment">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">SHIPMENT</h1>
        <div className="d-flex">
          {/* <button className=" btn-primary btn mr-2" onClick={()=>setOpenPOExcel(true)}>Import PO</button>

          <button
            className="btn btn-orange fontSize20 font-bold mr-2"
            onClick={() => setOpenPurchaseOrder(true)}
          >
            <img src={Order} width="14" height="14" className="mr-2" />
            <span>Create Purchase Order</span>
          </button> */}
          <Link to='/enterid'>
            <button className="btn btn-orange fontSize20 font-bold mr-3 chain mt-2" disabled={status == "RECEIVED"}>
              <img src={update} width="20" height="17" className="mr-2 mb-1" />
              <span>Update Shipment</span>
            </button>
          </Link>
          <Link to="/newshipment">
            <button className="btn btn-yellow fontSize20 font-bold mt-2">
              <img src={Add} width="20" height="17" className="mr-2 mb-1" />
              <span>Create Shipment</span>
            </button>
          </Link>
        </div>
      </div>
      <Tiles {...props} setData={setData} />
      <div className="mt-4">
        <Tabs {...props} setvisible={setvisible} visible={visible} />
      </div>
      <div className="full-width-ribben mt-4">
        <TableFilter data={headers} shipmentIdList={shipmentIdList} supplierReceiverList={supplierReceiverList} setShipmentIdFilterOnSelect={setShipmentIdFilterOnSelect} setFromShipmentFilterOnSelect={setFromShipmentFilterOnSelect} setToShipmentFilterOnSelect={setToShipmentFilterOnSelect} setStatusFilterOnSelect={setStatusFilterOnSelect} setDateFilterOnSelect={setDateFilterOnSelect} fb="80%" />
      </div>
      <div className="ribben-space">
        <Table {...props} skip={skip} shpmnts={sendData} count={count} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default ShipmentAnalytic;
