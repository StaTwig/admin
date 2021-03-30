import React, { useEffect, useState } from 'react';
import ViewOrder from '../../components/vieworder';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getViewShipment } from '../../actions/shipmentActions';

const ViewOrderContainer = props => {
  const dispatch = useDispatch();
  const [shipment, setShipment] = useState([]);
  // const { id } = props.match.params;
  
  // useEffect(() => {
  //   (async () => {
  //     const results = await dispatch(getViewShipment(id));
  //     setShipment(results);
  //   })();
  // }, []);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ViewOrder
            // shipment={shipment}
            // id={id}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewOrderContainer;
