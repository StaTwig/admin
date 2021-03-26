import React, { useEffect, useState } from 'react';
import ViewShipment from '../../components/viewshipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getViewShipment } from '../../actions/shipmentActions';

const NewShipmentContainer = props => {
  const dispatch = useDispatch();
  const [shipment, setShipment] = useState([]);
  const { id } = props.match.params;
  
  useEffect(() => {
    (async () => {
      const results = await dispatch(getViewShipment(id));
      setShipment(results);
    })();
  }, []);

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ViewShipment
            shipment={shipment}
            id={id}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default NewShipmentContainer;
