import React from 'react';
import { setTracingShipments } from '../../../actions/shipmentActions';
import { useDispatch } from 'react-redux';
import EmptyShipments from '../../../assets/icons/EmptyShipments.png';

const Table = props => {
  const dispatch = useDispatch();
  const { loadMore, onLoadMore } = props;
  return (
    <div className="table">
      {props.shipments.length === 0 ? (
        <img src={EmptyShipments} height="300" width="300" />
      ) : (
        <div className="rTable">
          <div className="rTableHeading">
            <div className="rTableHead">Client</div>
            <div className="rTableHead">Shipment ID</div>
            <div className="rTableHead">Product Name</div>
            <div className="rTableHead">
              <span>Quantity</span>
            </div>
            <div className="rTableHead">
              <span>Shipment Date</span>
            </div>
            <div className="rTableHead">
              <span>Delivery To</span>
            </div>
            <div className="rTableHead">
              <span>Delivery Location</span>
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
            if (shipment.status === 'Shipped') {
              statusStyle = 'success-bg';
            } else if (shipment.status === 'Received') {
              statusStyle = 'info-bg';
            } else if (shipment.status === 'In Transit') {
              statusStyle = 'warning-bg';
            }
            return (
              <div className="rTableRow" key={index}>
                <div className="rTableCell">
                  <div className="combine-data">{shipment.client}</div>
                </div>
                <div className="rTableCell">{shipment.shipmentId}</div>

                <div className="rTableCell">
                  {shipment.products[0].productName}
                </div>
                <div className="rTableCell">
                  {shipment.products[0].quantity}
                </div>
                <div className="rTableCell">{shipment.shipmentDate}</div>

                <div className="rTableCell">{shipment.deliveryTo}</div>
                <div className="rTableCell">{shipment.deliveryLocation}</div>
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
                        `/tracing/${props.shipments[index].shipmentId}`,
                      );
                    }}
                  >
                    Track
                  </button>
                </div>
              </div>
            )})}
          </div>
          {loadMore && (
            <button className="btn btn-success" onClick={onLoadMore}>
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
