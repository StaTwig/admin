import React from 'react';
import { setTracingShipments } from '../../../actions/shipmentActions';
import { useDispatch } from 'react-redux';
import EmptyShipments from '../../../assets/icons/EmptyShipments.png';

const Table = props => {
  const dispatch = useDispatch();
  const { loadMore, onLoadMore } = props;
  return (
    <div className="table">
    
    
    
        <div className="rTable">
          <div className="rTableHeading">
            <div className="rTableHead">Customer</div>
            <div className="rTableHead">Shipment ID</div>
            <div className="rTableHead d-flex flex-column"><div>Purchase</div><div>Order ID</div></div>
            <div className="rTableHead d-flex flex-column">
              <div>Prouduct</div>
              <div>Name</div>
            </div>
            <div className="rTableHead">
              <span>Quantity</span>
            </div>
            <div className="rTableHead">
              <span>Supplier</span>
            </div>
            <div className="rTableHead d-flex flex-column">
              <div>Customer</div>
              <div>Location</div>
            </div>
            <div className="rTableHead">
              <span>Delivery Date</span>
            </div>
            <div className="rTableHead">
              <span>Status</span>
            </div>
            <div className="rTableHead">
              <span />
            </div>
          </div>
          <div className="overflow">
            {props.shipments.map((shipment, index) => {
            let statusStyle = 'secondary-bg';
            if (shipment.status === 'CREATED') {
              statusStyle = 'success-bg';
            } else if (shipment.status === 'Received') {
              statusStyle = 'info-bg';
            } else if (shipment.status === 'In Transit') {
              statusStyle = 'warning-bg';
            }
            return (
              <div className="rTableRow" key={index}>
                <div className="rTableCell">
                  <div className="combine-data">{shipment.receiver.id}</div>
                </div>
                <div className="rTableCell">{shipment.id}</div>

                <div className="rTableCell">
                  {shipment.poId}
                </div>
                <div className="rTableCell">
                  {shipment.products[0].productName}
                </div>
                <div className="rTableCell">50000</div>

                <div className="rTableCell">{shipment.supplier.id}</div>
                <div className="rTableCell">{shipment.receiver.locationId}</div>
                <div className="rTableCell">
                {shipment.actualDeliveryDate.split('T')[0].split('-')[2]+"/"+shipment.actualDeliveryDate.split('T')[0].split('-')[1]+"/"+shipment.actualDeliveryDate.split('T')[0].split('-')[0]}
                </div>
                <div className="rTableCell">
                <div className={`status ${statusStyle}`}>
                      {shipment.status}
                </div>
                </div>
                <div className="rTableCell">
                  <button
                    class="button"
                    onClick={() => {
                      const data = props.shipments[index];
                      dispatch(setTracingShipments(data));
                      props.history.push(
                        `/tracing/${props.shipments[index].id}`,
                      );
                    }}
                  >
                    Track
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
        {loadMore && (
          <button className=" btn-primary btn mr-2" onClick={onLoadMore}>Load More</button>
          )}
    </div>
  );
};

export default Table;

/*//{shipment.products[0].quantity}*/