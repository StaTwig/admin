import React, { useEffect, useState } from 'react';
import ViewOrder from '../../components/vieworder';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/poActions';

const ViewOrderContainer = props => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const { id, type } = props.match.params;
  
  useEffect(() => {
    (async () => {
      const results = await dispatch(getOrder(id));
      setOrder(type == 'one' ? results.inboundPOs[0] : results.outboundPOs[0]);
    })();
  }, []);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ViewOrder
            order={order}
            id={id}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewOrderContainer;
