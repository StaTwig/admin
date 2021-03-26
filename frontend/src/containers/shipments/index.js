import React, { useEffect, useState } from 'react';
import Shipment from '../../components/shipments';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getShipments, resetShipments } from '../../actions/shipmentActions';

const ShipmentContainer = props => {
  const dispatch = useDispatch();
  const [shipments, setShipments] = useState([]);

  // const shipments = useSelector(state => {
  //   return state.shipments;
  // });
  
  const shipmentsCount = useSelector(state => {
    return state.shipmentsCount;
  });
  useEffect(() => {
    (async () => {
      const results = await dispatch(getShipments());
      setShipments(results);
      return () => dispatch(resetShipments());
    })();
  }, []);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Shipment
            shipments={shipments}
            setShipments={setShipments}
            shipmentsCount={shipmentsCount}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default ShipmentContainer;
