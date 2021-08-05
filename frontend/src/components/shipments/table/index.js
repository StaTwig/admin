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
import Pagination from '@material-ui/lab/Pagination';

const Table = props => {
  const dispatch = useDispatch();
  const {shpmnts } = props;
  const shipments = shpmnts();
  shipments.sort(function(a,b){
    if(a.id>b.id){
      return -1;
    }
    else{
      return 1;
    }
  })
  const handlePageChange  = (event, value) => {
    props.onPageChange(value)
  };
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
              let supplierAddress = shipment.supplier.warehouse.warehouseAddress;
              let wLocation = shipment.supplier.warehouse?.location;
              if (wLocation?.length) {
                supplierAddress = wLocation.firstLine + wLocation.secondLine + wLocation.city;
              }
              let receiverAddress = shipment.receiver.warehouse.warehouseAddress;
              let wrLocation = shipment.receiver.warehouse?.location;
              if (wrLocation?.length) {
                supplierAddress = wrLocation.firstLine + wrLocation.secondLine + wrLocation.city;
              }
            return (
              <div className="rTableRow pt-2 pb-2" key={index}>
                {/* <div className="rTableCell">
                  <div className="combine-data">{shipment.receiver.id}</div>
                </div> */}
                <div className="rTableCell ml-4" style={{padding:0, left:"20px"}}>
                  <span className="text-primary">{shipment.id}</span>
                  {shipment?.shipmentAlerts?.length > 0 &&
                    <span style={{ backgroundColor: '#EAEAEA', marginLeft: 5 }} className="rounded p-1"><img style={{ height: 15 }} src={alert} /></span>
                  }
                </div>
                <div className="col-2 rTableCell text-center" style={{paddingLeft:0, left:"-40px"}}>{shipment.shippingDate.length == 10 ? shipment.shippingDate : formatDate(shipment.shippingDate)}</div>
                <div className="rTableCell " style={{paddingRight:10,paddingLeft:0, left:"15px"}}><p className="mb-0">{shipment.supplier.org ? shipment.supplier.org.name: "-"}</p><p className="address mb-0 text-muted">{`${supplierAddress.firstLine ? supplierAddress.firstLine: ''} ${supplierAddress.secondLine ? supplierAddress.secondLine : ''} ${supplierAddress.city ? supplierAddress.city : ''}\n ${supplierAddress.state ? supplierAddress.state : ''}\n ${supplierAddress.country ? supplierAddress.country : ''} `}</p></div>
                <div className="rTableCell " style={{paddingRight:0,paddingLeft:10, left:"205px"}}><p className="mb-0">{shipment.receiver.org ? shipment.receiver.org.name : "-"}</p><p className="mb-0 address text-muted">{`${receiverAddress.firstLine ? receiverAddress.firstLine : ''}  ${receiverAddress.secondLine ? receiverAddress.secondLine : ''} ${receiverAddress.city ? receiverAddress.city : ''} \n ${receiverAddress.state ? receiverAddress.state : ''} \n ${receiverAddress.country ? receiverAddress.country : ''} `}</p></div>
                <div className="rTableCell text-center" style={{padding:0, left:"300px"}}>
                <div className={`status secondary-bg ${statusStyle}`}>
                    {status}
                </div>
                </div>
                <div className="rTableCell" style={{paddingLeft:0,left:"275px"}}>
                  <button
                    className="button btn-primary text-light"
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
                <div className="rTableCell" style={{left:"130px"}}>
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
              <Pagination showFirstButton showLastButton color="primary" count={Math.ceil(props.count/10)} onChange={handlePageChange} />
              <span className="mx-5 my-1 rounded text-dark">Total Records {props.count} </span>
            </div>            
          )}
          </div>
        </div>
    </div>
  );
};

export default Table;

