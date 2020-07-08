import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';

const Table = (props) => {

    const profile = useSelector(state => {
        return state.user;
      });


  return (
    <div className="trackandtrace mt-3">
      <div className="rTable">
        <div className="overflow">
          {props.shipments.map((shipment, index) => (
            <div className="rTableRow">
              <div className="rTableCell"><img className="round-sign mr-1" src={profile.profile_picture} width="20" />{shipment.txnId}</div>
              <div className="transactions"><span className="bold mr-1">From:</span>{profile.address}</div>
             
              <div className="transactions"><span className="bold mr-1">To:</span>{shipment.receiver}</div>
              <div className="rTableCell">{shipment.shipmentDate}</div>

              <div className="rTableCell">{shipment.products[0].productName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;