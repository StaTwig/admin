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
import { getShipments, resetShipments } from '../../actions/shipmentActions';
import ExcelPopUp from './ExcelPopup';
import Received from '../../assets/icons/Received1.svg';
import Sent from '../../assets/icons/Sent.png';
const ShipmentAnalytic = props => {
  const [visible, setvisible] = useState('one');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);
  const [shpmnts, setShpmnts] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetShipments());
    dispatch(getAllUsers());
  }, []);

  const onLoadMore = async (isInc, isReset = false) => {
    const newSkip = isInc ? skip + 5 : skip - 5;
    setSkip(isReset ? 0 : newSkip);
    const results = await dispatch(getShipments(isReset ? 0 : newSkip, limit));
    props.setShipments(results);
    if (results.length === 0) {
      setLoadMore(false);
    }
    setData(visible)
  };

  const headers = {
    coloumn1: 'Shipment ID',
    coloumn2: 'Shipment Date',
    coloumn3: 'From',
    coloumn4: 'To',
    coloumn5: 'Status',

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Received} width="16" height="16" />,
    img4: <img src={Sent} width="16" height="16" />,
    img5: <img src={Status} width="16" height="16" />,
  };

  const setData = (v, a = false) => {
    setvisible(v);
    setAlerts(a);
    // if(skip > 0)
    //   onLoadMore(true, true);

    // let rtnArr = v == 'two' ? shpmnt.filter(row => props.user.warehouseId == row.supplier.locationId) : shpmnt.filter(row => props.user.warehouseId != row.supplier.locationId);
    // if (a != '')
    //   rtnArr = rtnArr.filter(row => row?.shipmentAlerts?.length > 0);
    // setShpmnts(rtnArr);
  }

  const sendData = () => {
    let rtnArr = visible == 'two' ? props.shipments?.outboundShipments : props.shipments?.inboundShipments;
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
            <button className="btn btn-orange fontSize20 font-bold mr-5 chain" disabled={status=="RECEIVED"}>
              Update Status
            </button>
          </Link>
          <Link to="/newshipment">
            <button className="btn btn-yellow fontSize20 font-bold">
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
        <TableFilter data={headers} fb="74%"/>
      </div>
      <div className="ribben-space">
        <Table {...props} skip={skip} loadMore={loadMore} shpmnts={sendData} onLoadMore={onLoadMore}/>
      </div>
    </div>
  );
};

export default ShipmentAnalytic;
