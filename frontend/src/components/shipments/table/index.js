import React from 'react';
import { setTracingShipments } from '../../../actions/shipmentActions';
import { useDispatch } from 'react-redux';
import EmptyShipments from '../../../assets/icons/EmptyShipments.png';
import location from '../../../assets/icons/location-icon.png';

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
            {props.shpmnts.map((shipment, index) => {
              let statusStyle = 'bg-primary';
              let status = 'Shipped';
              if (shipment.status === 'RECEIVED') {
                statusStyle = 'bg-success';
                status = 'Delivered';
              }
            return (
              <div className="rTableRow pt-2 pb-2  shadow-none" key={index}>
                {/* <div className="rTableCell">
                  <div className="combine-data">{shipment.receiver.id}</div>
                </div> */}
                <div className="rTableCell">{shipment.id}</div>
                <div className="rTableCell">
                {shipment.shippingDate.split('T')[0].split('-')[2]+"/"+shipment.shippingDate.split('T')[0].split('-')[1]+"/"+shipment.shippingDate.split('T')[0].split('-')[0]}
                </div>

                <div className="rTableCell">{shipment.supplier.locationId}</div>
                <div className="rTableCell">{shipment.receiver.locationId}</div>
                
                <div className="rTableCell">
                <div className={`status secondary-bg ${statusStyle}`}>
                    {status}
                </div>
                </div>
                <div className="rTableCell">
                  <button
                    class="button btn-primary text-light  pl-3 pr-3 pt-1 pb-1"
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