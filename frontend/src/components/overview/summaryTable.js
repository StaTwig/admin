import React from 'react';
import { useSelector } from 'react-redux';
import EmptyShipments from "../../assets/icons/EmptyShipments.png";
import './table-style.scss';


const SummaryTable = props => {

  const profile = useSelector(state => {
    return state.user;
  });
  const { shipments } = props;
  return (
    <React.Fragment>
      {shipments.length === 0 ?  <div className="summaryTable justify-content-center ">
        <div className="d-flex flex-column ">
      <img src={EmptyShipments} height="200" width="200"/>
       </div> 
       </div>  : 
      <div className="summaryTable">
        <div className="rowData mr-4">
          <div className="headline ml-4">Customer</div>
          {shipments.map((shipment, index) => (
            index < 5 ?
            <div className="combine-data" key={index}>
              <img className="round-sign" src={profile.profile_picture} width="15" />
              <a>{shipment.receiver.id.split('-')[1]}</a>
            </div> : null
          ))}
        </div>
        <div className="rowData">
          <div className="headline">Shipment ID</div>
          {shipments.map((shipment, index) => (
            index < 5 ?
            <div className="combine-data" key={index}>
              <div>{shipment.id}</div>
            </div> : null
          ))}
        </div>
        <div className="rowData">
          <div className="headline">Shipping Date</div>
          {shipments.map((shipment, index) => (
            index < 5 ?
            <div className="combine-data" key={index}>
              <div> {shipment.shippingDate.split('T')[0].split('-')[2]+"/"+shipment.shippingDate.split('T')[0].split('-')[1]+"/"+shipment.shippingDate.split('T')[0].split('-')[0]}</div>
            </div> : null
          ))}
        </div>
        <div className="rowData">
          <div className="headline">Current Location</div>
          {shipments.map((shipment, index) => (
            index < 5 ?
            <div className="combine-data" key={index}>
              <div>{shipment.receiver.locationId}</div>
            </div> : null
          ))}
        </div>
        <div className="rowData">
          <div className="headline">Temperature</div>
          {shipments.map((shipment, index) => (
            index < 5 ?
            <div className="combine-data" key={index}>
              <div>8°C</div>
            </div> :null
          ))}
        </div>
        <div className="rowData">
          <div className="headline">Status</div>
          {shipments.map((shipment, index) => (
            index < 5 ?
            <div className="combine-data" key={index}>
              <div className="status" target={shipment.status}>{shipment.status}</div>
            </div> :null
          ))}
        </div>
        </div>
       }
      <div className="summaryTable sm-only">
        <div className="row">
          {shipments.map((shipment, index) => 
          index < 5 ? <div key={index} className="col-sm-12 col-md-6 mb-3">
            <div className="combine-data mb-3">
              <img className="rounded mr-2" src={profile.profile_picture} width="15" />
              <a>{shipment.receiver.id}</a>
            </div>
            <div className="d-flex">
              <div className="mr-3">Shipment ID</div>
              <div className="font-weight-bold">{shipment.id}</div>
            </div>
            <div className="d-flex">
              <div className="mr-3">Shipping Date</div>
              <div className="font-weight-bold">
              {shipment.shippingDate.split('T')[0].split('-')[2]+"/"+shipment.shippingDate.split('T')[0].split('-')[1]+"/"+shipment.shippingDate.split('T')[0].split('-')[0]}
              </div>
            </div>
            <div className="d-flex">
              <div className="mr-3">Current Location</div>
              <div className="font-weight-bold">{shipment.receiver.locationId}</div>
            </div>
            <div className="d-flex">
              <div className="mr-3">Temperature</div>
              <div className="font-weight-bold">8°C</div>
            </div>
            <div className="d-flex">
              <div className="mr-3">Status</div>
              <div className="font-weight-bold">
                <span className="badge badge-pill badge-success p-2">
                  {shipment.status}
                </span>
              </div>
            </div>
          </div>
          :null)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SummaryTable;
