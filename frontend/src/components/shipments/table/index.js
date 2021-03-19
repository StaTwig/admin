import React from 'react';
import { setTracingShipments } from '../../../actions/shipmentActions';
import { useDispatch } from 'react-redux';
import EmptyShipments from '../../../assets/icons/EmptyShipments.png';
import alert from '../../../assets/icons/alert.png';
import location from '../../../assets/icons/CurrentLocationWhite.svg';

const Table = props => {
  const dispatch = useDispatch();
  const { loadMore, onLoadMore } = props;
  return (
    <div className="table">
        <div className="rTable">
          {/* <div className="rTableHeading">
            <div className="rTableHead">Customer</div> 
            <div className="rTableHead">Shipment ID</div>
            <div className="rTableHead">Shipment Date</div>
            
            <div className="rTableHead">
              <span>From</span>
            </div>
            <div className="rTableHead">
              <span>To</span>
            </div>
            <div className="rTableHead">
              <span>Status</span>
            </div>
            <div className="rTableHead">
              <span />
            </div>
          </div> */}
          <div className="overflow">
            {props.shpmnts.length == 0 && <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">No records found</div>}
            {props.shpmnts.map((shipment, index) => {
              let statusStyle = 'bg-primary';
              let status = 'Shipped';
              if (shipment.status === 'RECEIVED') {
                statusStyle = 'bg-success';
                status = 'Delivered';
              }
              let supplierAddress = shipment.supplier.warehouse.postalAddress;
              let wLocation = shipment.supplier.warehouse?.location;
              if (wLocation?.length) {
                supplierAddress = wLocation.firstLine + wLocation.secondLine + wLocation.city;
              }
              let receiverAddress = shipment.receiver.warehouse.postalAddress;
              let wrLocation = shipment.receiver.warehouse?.location;
              if (wrLocation?.length) {
                supplierAddress = wrLocation.firstLine + wrLocation.secondLine + wrLocation.city;
              }
            return (
              <div className="rTableRow pt-2 pb-2 shadow-none" key={index}>
                {/* <div className="rTableCell">
                  <div className="combine-data">{shipment.receiver.id}</div>
                </div> */}
                <div className="rTableCell">
                  <span className="text-primary">{shipment.id}</span>
                  {shipment?.shipmentAlerts?.length > 0 &&
                    < span style={{ backgroundColor: '#EAEAEA', marginLeft: 5 }} className="rounded p-1"><img style={{ height: 15 }} src={alert} /></span>
                  }
                </div>
                <div className="rTableCell">
                {shipment.shippingDate.split('T')[0].split('-')[2]+"/"+shipment.shippingDate.split('T')[0].split('-')[1]+"/"+shipment.shippingDate.split('T')[0].split('-')[0]}
                </div>
                <div className="rTableCell"><p className="mb-0 bold">{shipment.supplier.org.name}</p><p className="address mb-0 text-muted">{supplierAddress}</p></div>
                <div className="rTableCell"><p className="mb-0 bold">{shipment.receiver.org.name}</p><p className="mb-0 address text-muted">{receiverAddress}</p></div>
                <div className="rTableCell">
                <div className={`status secondary-bg ${statusStyle}`}>
                    {status}
                </div>
                </div>
                <div className="rTableCell">
                  <button
                    class="button btn-primary text-light pl-3 pr-3 pt-1 pb-1"
                    onClick={() => {
                      const data = props.shpmnts[index];
                      dispatch(setTracingShipments(data));
                      props.history.push(
                        `/tracing/${props.shpmnts[index].id}`,
                      );
                    }}
                  >
                    <img style={{ padding: 1, height: 15}} src={location} />
                    <span className="pl-1">Track</span>
                  </button>
                </div>
                <div className="rTableCell">
                  <button
                    class="button pl-3 pr-3 pt-1 pb-1"
                    onClick={() => { }}
                  >
                    View
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
        {/* {loadMore && (
          <button className=" btn-primary btn mr-2" onClick={onLoadMore}>Load More</button>
          )} */}
    </div>
  );
};

export default Table;

/*//{shipment.products[0].quantity}*/