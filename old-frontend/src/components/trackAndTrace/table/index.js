import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setTracingShipments, setVisibleShipments } from '../../../actions/shipmentActions';
import { useDispatch} from 'react-redux';
import Verifiedpic from '../../../assets/icons/Verifiedpic.png';
import { formatDate } from "../../../utils/dateHelper";

import './style.scss';

const Table = (props) => {

  const dispatch = useDispatch ();

    const profile = useSelector(state => {
        return state.user;
      });
     
 return (
    <div className="trackandtrace mt-3">
      <div className="rTable">
        <div className="overflow">
          {props.shipments.map((shipment, index) => (
            <div className="rTableRow">
                   <div className="rTableCell">
                <div className="combine-data">
              <img className="mr-2" src={profile.profile_picture} width="20" height="20"/>
              <div className="d-flex flex-column">
              <a className="text-info font-weight-bold" href="javascript:void(0);">{shipment.id}</a>
            
             {shipment.visible ?
              <a ><span className="text-info font-weight-bold txn" href="javascript:void(0);">{shipment.id}</span><img src={Verifiedpic} width="10" height="10" className="mb-2"/></a>:null}
              {shipment.visible ? <a><small>{shipment.poId}</small></a> :null}
              </div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="d-flex flex-column">
            <div className="combine-data"> <div class="rounded-circle primary mr-2"></div><a className="font-weight-bold">{shipment.receiver.locationId}</a></div>
            <div className="combine-data"> <div class="rounded-circle secondary mr-2"></div><a className="font-weight-bold">{shipment.supplier.locationId}</a></div>
              </div>
            </div>
            <div className="rTableCell">
            <div className="d-flex flex-column">
            <div className="combine-data"> <div className="mr-2 font-weight-bold">From:</div><a className="text-info font-weight-bold"><small>{shipment.receiver.id}</small></a></div>
            {shipment.id?<div className="combine-data"> <div className="mr-1 wallettext">Wallet Address:</div><a className="font-weight-bold txn1">{shipment.id}</a></div>:null}
            <div className="combine-data"> <div className="mr-4 font-weight-bold">To:</div><a className="text-info font-weight-bold"><small>{shipment.supplier.id}</small></a></div>
            {shipment.id? <div className="combine-data"> <div className="mr-1 wallettext">Wallet Address:</div><a className="font-weight-bold txn1">{shipment.id}</a></div>:null}
              </div>
            
            </div>
              <div className="rTableCell">
                {shipment.shippingDate.length == 10 ? shipment.shippingDate : formatDate(shipment.shippingDate)}</div>
          <div className="rTableCell">{ shipment.status === "CREATED" ? <span className="badge shipped">{shipment.status}</span>:null}
         {shipment.status === "Received" ? <span className="badge received text-center">{shipment.status}</span>:null}
          {shipment.status === "Sent" ? <span className="badge sent text-center">{shipment.status}</span>:null}
          {shipment.status === "In Transit" ? <span className="badge trans text-center">{shipment.status}</span>:null}
          </div>
        <div className="rTableCell">
        <div className="d-flex flex-column">{shipment.visible?<button className="btn btn-outline-info badge text-primary" onClick={()=>dispatch(setVisibleShipments(index, false))}>SHOW LESS</button>:
      <button className="btn btn-outline-info badge text-primary" onClick={()=>dispatch(setVisibleShipments(index, true))}>SHOW MORE</button>}
      {shipment.visible?<button className="btn btn-outline-info badge text-primary mt-4" onClick={()=>{
                       const data = props.shipments[index]
                       dispatch(setTracingShipments(data));
                     props.history.push(`/tracing/${props.shipments[index].id}`)
                     
                
                     }
      }>Track</button>:null}
      </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;



/* {shipment.visible ? <div className="text-info font-weight-bold" href="javascript:void(0);">{shipment.shipmentId}</div>:null}*/