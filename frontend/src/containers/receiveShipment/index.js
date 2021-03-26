import { useDispatch} from 'react-redux';
import React from 'react';
import ReceiveShipment from '../../components/receiveShipment';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';



const ReceiveShipmentContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ReceiveShipment {...props}/>
        </div>
      </div>
    </div>
  );
};

export default ReceiveShipmentContainer;
