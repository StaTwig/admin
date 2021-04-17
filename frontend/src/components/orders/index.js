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
import { getPOs, resetPOs, resetReviewPos } from '../../actions/poActions';

const Orders = props => {
  const [visible, setvisible] = useState('one');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetReviewPos({}));
  },[])
  
  const onLoadMore = async (isInc, isReset = false) => {
    const newSkip = isInc ? skip + 5 : skip - 5;
    setSkip(isReset ? 0 : newSkip);
    const results = await dispatch(getPOs(isReset ? 0 : newSkip, limit));
    props.setOrders(results);
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

  const sendData = () => {
    let rtnArr = visible == 'one' ? props.orders?.outboundPOs : props.orders?.inboundPOs;
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
            <button className="btn btn-orange fontSize20 font-bold">
              <img src={OrderIcon} width="20" height="17" className="mr-2 mb-1" />
              <span style={{color:'white'}}>Create New Order</span>
            </button>
          </Link>
        </div>
      </div>
      <Tiles {...props} setData={setData} />
      <div className="mt-4">
        <Tabs {...props} setvisible={setvisible} visible={visible} />
      </div>
      <div className="full-width-ribben mt-4">
        <TableFilter data={headers} fb="73%"/>
      </div>
      <div className="ribben-space">
        <Table {...props} skip={skip} loadMore={loadMore} ordrs={sendData} visible={visible} onLoadMore={onLoadMore}/>
      </div>
    </div>
  );
};

export default Orders;
