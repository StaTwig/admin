import React from 'react';
import { setTracingShipments } from '../../../actions/shipmentActions';
import { useDispatch } from 'react-redux';
import EmptyShipments from '../../../assets/icons/EmptyShipments.png';
import alert from '../../../assets/icons/alert.png';
import location from '../../../assets/icons/CurrentLocationWhite.svg';
import previous from '../../../assets/icons/previous.png';
import next from '../../../assets/icons/next.png';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/dateHelper';
import './style.scss';

const Table = props => {
  const dispatch = useDispatch();
  const { loadMore, onLoadMore, skip, shpmnts } = props;
  const shipments = shpmnts();
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
          <div className="">
            {shipments.length == 0 && <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">No records found</div>}
            {shipments.map((shipment, index) => {
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
                <div className="rTableCell">{shipment.shippingDate.length == 10 ? shipment.shippingDate : formatDate(shipment.shippingDate)}
                </div>
                <div className="rTableCell"><p className="mb-0 bold">{shipment.supplier.org.name}</p><p className="address mb-0 text-muted">{supplierAddress}</p></div>
                <div className="rTableCell"><p className="mb-0 bold">{shipment.receiver.org.name}</p><p className="mb-0 address text-muted">{receiverAddress}</p></div>
                <div className="rTableCell text-center">
                <div className={`status secondary-bg ${statusStyle}`}>
                    {status}
                </div>
                </div>
                <div className="rTableCell">
                  <button
                    className="button btn-primary text-light pl-3 pr-3 pt-1 pb-1"
                    onClick={() => {
                      const data = shipments[index];
                      dispatch(setTracingShipments(data));
                      props.history.push(
                        `/tracing/${shipments[index].id}`,
                      );
                    }}
                  >
                    <img style={{ padding: 1, height: 15}} src={location} />
                    <span className="pl-1 text-white">Track</span>
                  </button>
                </div>
                <div className="rTableCell">
                  <Link to={`/viewshipment/${shipment.id}`} 
                    className="button pl-3 pr-3 pt-1 pb-1"
                  >
                    View
                  </Link>
                </div>
              </div>
              )
            })}
          {shipments?.length > 0 && (
            <div className="d-flex flex-row-reverse">
              <img style={{ padding: 1, height: 30, cursor: 'pointer' }} onClick={() => shipments.length > 4 && onLoadMore(true)} src={next} />
              <img style={{ padding: 1, height: 30, cursor: 'pointer' }} onClick={() => skip > 0 && onLoadMore(false)} src={previous} />
            </div>
          )}
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