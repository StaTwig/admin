import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Table from './table';
import Tabs from './tabs';
import Tiles from './tiles';
import OrderIcon from '../../assets/icons/order.svg';
import TableFilter from '../../shared/advanceTableFilter';
import mon from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Order from '../../assets/icons/orders.svg';
import Totalshipments from "../../assets/icons/TotalShipment.svg";
import { useDispatch, useSelector } from 'react-redux';
import { getSentPOs, getReceivedPOs, getOrderIds, getProductIdDeliveryLocationsOrganisations, getPOs, resetPOs, resetReviewPos } from '../../actions/poActions';

const Orders = props => {
  const [visible, setvisible] = useState('one');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();
  const [outboundRecords, setOutboundRecords] = useState([]);
  const [inboundRecords, setInboundRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [poOrderIdList, setPoOrderIdList] = useState([]);
  const [poDeliveryLocationsList, setPoDeliveryLocationsList] = useState([]);
  const [poProductsList, setPoProductsList] = useState([]);
  const [poOrganisationsList, setPoOrganisationsList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (visible == 'one') {
        const outboundRes = await getSentPOs("", "", "", "", "", 0, limit); //to, orderId, productName, deliveryLocation, date, skip, limit
        setOutboundRecords(outboundRes.data.outboundPOs);
        setCount(outboundRes.data.count)
      } else {
        const inboundRes = await getReceivedPOs("", "", "", "", "", 0, limit); //from, orderId, productName, deliveryLocation, date, skip, limit
        setInboundRecords(inboundRes.data.inboundPOs);
        setCount(inboundRes.data.count)
      }
      const orderIdListRes = await getOrderIds();
      setPoOrderIdList(orderIdListRes);

      const productsLocationsOrganisationsRes = await getProductIdDeliveryLocationsOrganisations();
      setPoDeliveryLocationsList(productsLocationsOrganisationsRes.deliveryLocations);
      setPoProductsList(productsLocationsOrganisationsRes.productIds);
      setPoOrganisationsList(productsLocationsOrganisationsRes.organisations);
      setSkip(0);
    };
    // dispatch(resetReviewPos({}));
    fetchData();
  }, [visible])

  const onPageChange = async (pageNum) => {
    const recordSkip = (pageNum-1)*limit;
    setSkip(recordSkip);
    if (visible == 'one') {
      const outboundRes = await getSentPOs(toFilter, orderIdFilter, productNameFilter, locationFilter, dateFilter, recordSkip, limit);//to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count)
    } else {
      const inboundRes = await getReceivedPOs(fromFilter, orderIdFilter, productNameFilter, locationFilter, dateFilter, recordSkip, limit);//from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count)
    }
    setData(visible);
  };

  const headers = {
    coloumn1: visible == 'one' ? 'To' : 'From',
    coloumn2: 'Order Date',
    coloumn3: 'Order ID',
    coloumn4: 'Product',
    coloumn5: 'Delivery Location',

    img1: <img src={mon} width="16" height="16" />,
    img2: <img src={calender} width="16" height="16" />,
    img3: <img src={Order} width="18" height="16" />,
    img4: <img src={Package} width="16" height="16" />,
    img5: <img src={Totalshipments} width="18" height="18" />,
  };

  const setData = (v, a = false) => {
    setvisible(v);
    setAlerts(a);
  }
  const setDateFilterOnSelect = async (dateFilterSelected) => {
    setDateFilter(dateFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const outboundRes = await getSentPOs(toFilter, orderIdFilter, productNameFilter, locationFilter, dateFilterSelected, 0, limit); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count)
    } else {
      const inboundRes = await getReceivedPOs(fromFilter, orderIdFilter, productNameFilter, locationFilter, dateFilterSelected, 0, limit); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count)
    }
  }

  const setLocationFilterOnSelect = async (locationFilterSelected) => {
    setLocationFilter(locationFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const outboundRes = await getSentPOs(toFilter, orderIdFilter, productNameFilter, locationFilterSelected, dateFilter, 0, limit); //to, orderId, productName, deliveryLocation, date, skip, limit;
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count)
    } else {
      const inboundRes = await getReceivedPOs(fromFilter, orderIdFilter, productNameFilter, locationFilterSelected, dateFilter, 0, limit); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count)
    }
  }

  const setProductNameFilterOnSelect = async (productNameFilterSelected) => {
    setProductNameFilter(productNameFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const outboundRes = await getSentPOs(toFilter, orderIdFilter, productNameFilterSelected, locationFilter, dateFilter, 0, limit); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count)
    } else {
      const inboundRes = await getReceivedPOs(fromFilter, orderIdFilter, productNameFilterSelected, locationFilter, dateFilter, 0, limit); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count)
    }
  }

  const setOrderIdNameFilterOnSelect = async (orderIdFilterSelected) => {
    setOrderIdFilter(orderIdFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const outboundRes = await getSentPOs(toFilter, orderIdFilterSelected, productNameFilter, locationFilter, dateFilter, 0, limit); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count)
    } else {
      const inboundRes = await getReceivedPOs(fromFilter, orderIdFilterSelected, productNameFilter, locationFilter, dateFilter, 0, limit); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count)
    }
  }

  const setFromToFilterOnSelect = async (fromToFilterSelected) => {
    setFromFilter(fromToFilterSelected);
    setToFilter(fromToFilterSelected);
    setSkip(0);
    if (visible == 'one') {
      const outboundRes = await getSentPOs(fromToFilterSelected, orderIdFilter, productNameFilter, locationFilter, dateFilter, 0, limit); //to, orderId, productName, deliveryLocation, date, skip, limit
      setOutboundRecords(outboundRes.data.outboundPOs);
      setCount(outboundRes.data.count)
    } else {
      const inboundRes = await getReceivedPOs(fromToFilterSelected, orderIdFilter, productNameFilter, locationFilter, dateFilter, 0, limit); //from, orderId, productName, deliveryLocation, date, skip, limit
      setInboundRecords(inboundRes.data.inboundPOs);
      setCount(inboundRes.data.count)
    }
  }

  const sendData = () => {
    let rtnArr = visible == 'one' ? outboundRecords : inboundRecords;
    if (alerts)
      rtnArr = rtnArr.filter(row => row?.shipmentAlerts?.length > 0);
    return rtnArr ? rtnArr : [];
  }

  return (
    <div className="orders">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">YOUR ORDERS</h1>
        <div className="d-flex">
          <Link to="/neworder">
            <button className="btn btn-orange fontSize20 font-bold mt-1">
              <img src={OrderIcon} width="20" height="17" className="mr-2 mb-1" />
              <span style={{ color: 'white' }}>Create New Order</span>
            </button>
          </Link>
        </div>
      </div>
      <Tiles {...props} setData={setData} />
      <div className="mt-4 ">
        <Tabs {...props} setvisible={setvisible} visible={visible} />
      </div>
      <div className="full-width-ribben mt-4">
        <TableFilter data={headers} poOrderIdList={poOrderIdList} poDeliveryLocationsList={poDeliveryLocationsList} poProductsList={poProductsList} poOrganisationsList={poOrganisationsList} setFromToFilterOnSelect={setFromToFilterOnSelect} setOrderIdNameFilterOnSelect={setOrderIdNameFilterOnSelect} setProductNameFilterOnSelect={setProductNameFilterOnSelect} setLocationFilterOnSelect={setLocationFilterOnSelect} setDateFilterOnSelect={setDateFilterOnSelect} fb="76%" />
      </div>
      <div className="ribben-space">
        <Table {...props} skip={skip} ordrs={sendData} visible={visible} count={count} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default Orders;
