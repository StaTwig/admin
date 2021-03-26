import React, { useEffect, useState } from 'react';
import Orders from '../../components/orders';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getShipments, resetShipments } from '../../actions/shipmentActions';

const OrdersContainer = props => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  // const shipments = useSelector(state => {
  //   return state.shipments;
  // });
  
  useEffect(() => {
    (async () => {
      const results = await dispatch(getShipments());
      setOrders(results);
      return () => dispatch(resetShipments());
    })();
  }, []);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Orders
            orders={orders}
            setShipments={setOrders}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
