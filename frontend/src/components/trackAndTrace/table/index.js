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
                   <div className="rTableCell mr-5">
                <div className="combine-data">
              <img className="round-sign1" src={profile.profile_picture} width="20" height="20"/>
              <a className="txn" href="javascript:void(0);">{shipment.txnId}</a>
              </div>
            </div>
            <div className="rTableCell">
              <div className="combine-data">
             <span className="round-sign">From :</span>
             <a className="address">{shipment.supplier}</a>
            </div>
            </div>
            <div className="rTableCell">
            <div className="combine-data">
             <span className="round-sign">To :</span>
              <a className="address">{shipment.deliveryTo}</a>
            </div>
            </div>
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