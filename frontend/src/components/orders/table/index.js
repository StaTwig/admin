import React from 'react';
import { setTracingShipments } from '../../../actions/shipmentActions';
import { useDispatch } from 'react-redux';
import alert from '../../../assets/icons/alert.png';
import location from '../../../assets/icons/CurrentLocationWhite.svg';
import previous from '../../../assets/icons/previous.png';
import next from '../../../assets/icons/next.png';
import user from '../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/dateHelper';
import Pagination from '@material-ui/lab/Pagination';
import './style.scss';

const Table = props => {
  const {ordrs, visible } = props;
  const orders = ordrs();
  const handlePageChange  = (event, value) => {
    props.onPageChange(value)
  };
  orders.sort(function(a,b){
    if(a.id>b.id){
      return -1;
    }
    else{
      return 1;
    }
  })
  return (
    <div className="table pr-1">
        <div className="rTable">
          <div className="">
          {orders.length == 0 && <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">No records found</div>}
          {orders.map((order, index) => {
              let statusStyle = 'bg-primary';
              let status = order.poStatus;
              if (order.poStatus === 'CREATED') {
                status = visible == 'one' ? 'Sent' : 'Received';
              }
              else if (order.poStatus === 'ACCEPTED') {
                statusStyle = 'bg-success';
                status = 'Accepted';
              }else if (order.poStatus === 'REJECTED') {
                statusStyle = 'bg-danger';
                status = 'Rejected';
              }
              else if (order.poStatus === 'TRANSIT&FULLYFULFILLED') {
                statusStyle = 'bg-info';
                status = 'Transit and FullyFilled';
              }
              else if (order.poStatus === 'FULLYFULFILLED') {
                statusStyle = 'bg-warning';
                status = 'FullyFilled';
              }
              else if (order.poStatus === 'TRANSIT&PARTIALLYFULFILLED') {
                statusStyle = 'bg-info';
                status = 'Transit and Partially Fulfilled';
              }
              else if (order.poStatus === 'PARTIALLYFULFILLED') {
                statusStyle = 'bg-secondary';
                status = 'Partially Fulfilled';
              }

              const { customer, products, supplier, creatorOrganisation } = order;
              return (
              <div className="rTableRow pt-2 pb-2 shadow-none" key={index}>
                    <div className="rTableCell" style={{position:'relative',left:"-20px", width:"200px"}}>
                      <div className="userPic text-right rounded d-flex flex-row">
                        <img src={user} width="30" height="20" alt="User" className="rounded mr-1 align-self-center" />
                        <div className="flex-column d-flex">
                          <span className="text-primary bold">{visible == 'two' ? creatorOrganisation.name : supplier.organisation.name}</span>
                          <p className="address mb-0 text-primary">{visible == 'two' ?creatorOrganisation.id :supplier.organisation.id }</p>
                      </div>
                      </div>
                    </div>
                <div className="rTableCell" style={{position:'relative',left:"30px"}}>
                  {formatDate(order.creationDate)}
                </div>
                  <div className="rTableCell" style={{position:'relative',left:"0px"}}><p className="mb-0 bold address mb-0 text-muted">{order.id}</p></div>
                  <div className="rTableCell" style={{position:'relative',left:"-20px", width:"250px"}}><p className="mb-0 bold mb-0 address text-muted">{products[0]?.name+(products.length > 1 ? ' + '+(products.length-1)+' more' : '')}</p></div> 
                
                <div className="rTableCell  d-flex flex-column" style={{position:"relative", left:"50px", width:"320px"}}> 
                  <span>{customer.organisation.name}</span> 
                  <span className="text-muted ">{customer.warehouse && customer.warehouse.warehouseAddress ?  customer.warehouse.warehouseAddress.firstLine + " "+customer.warehouse.warehouseAddress.city: null}</span>
                </div> 

                <div className="rTableCell " style={{position:'relative',left:"110px"}}> 
                
                <div className={`status secondary-bg ${statusStyle}`}>
                  {status} 
                </div>
                </div>
                
                <div className="rTableCell" style={{position:'relative',left:"85px"}} >
                  <Link to={`/vieworder/${order.id}`}
                    className="button">
                    View
                  </Link>
                </div>
              </div>
            
              )
            })}
          {orders?.length > 0 && (
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
