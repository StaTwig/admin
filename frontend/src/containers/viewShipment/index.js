import React, { useEffect, useState } from 'react';
import ViewShipment from '../../components/viewshipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getShipments, resetShipments } from '../../actions/shipmentActions';

const NewShipmentContainer = props => {
  // const dispatch = useDispatch();
  const [shipment, setShipment] = useState([]);
  
  // useEffect(async() => {
  //   const results = await dispatch(getShipments());
  //   setShipment(results);
  //   return () => dispatch(resetShipments());
  // }, []);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ViewShipment
            shipment={shipment}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default NewShipmentContainer;
