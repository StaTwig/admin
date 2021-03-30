import React, { useEffect, useState } from 'react';
import Orders from '../../components/orders';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getPOs, changePOStatus, resetPOs} from '../../actions/poActions';

const OrdersContainer = props => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  // const orders = useSelector(state => state.pos);  

  useEffect(() => {
    (async () => {
      const result = await dispatch(getPOs());
      setOrders(result);
      
      return () => dispatch(resetPOs());
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
            setOrders={setOrders}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
