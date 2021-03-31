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

import './style.scss';

const Table = props => {
  const dispatch = useDispatch();
  const { loadMore, onLoadMore, skip, ordrs, visible } = props;
  const orders = ordrs();
  return (
    <div className="table">
        <div className="rTable">
          <div className="">
            {orders.map((order, index) => {
              let statusStyle = 'bg-primary';
              let status = order.poStatus;
              if (order.poStatus === 'RECEIVED') {
                statusStyle = 'bg-success';
                status = 'Delivered';
              }
              const { customer, products, supplier } = order;
              return (
              <div key={index} className="rTableRow pt-2 pb-2 shadow-none">
                <div className="rTableCell">
                  <div className="userPic text-center rounded d-flex flex-row">
                    <img src={user} width="30" height="20" alt="User" className="rounded mr-1 align-self-center" />
                    <div className="flex-column d-flex">
                      <span className="text-primary bold">{visible == 'one' ? customer.organisation.name : supplier.organisation.name}</span>
                      <p className="address mb-0 text-primary">{visible == 'one' ? customer.organisation.id : supplier.organisation.id}</p>
                  </div>
                  </div>
                </div>
                <div className="rTableCell">
                  {formatDate(order.creationDate)}
                </div>
                  <div className="rTableCell"><p className="mb-0 bold address mb-0 text-muted">{order.id}</p></div>
                  <div className="rTableCell"><p className="mb-0 bold mb-0 address text-muted">{products[0]?.name+(products.length > 1 ? ' + '+(products.length-1)+' more' : '')}</p></div>
                <div className="rTableCell d-flex flex-column">
                  <span>{customer.warehouse?.warehouseAddress?.city}</span>
                  <span className="text-muted">{customer.shippingAddress.shippingAddressId}</span>
                </div>
                <div className="rTableCell">
                <div className={`status secondary-bg ${statusStyle}`}>
                    {status}
                </div>
                </div>
                <div className="rTableCell">
                  <Link to={`/vieworder/${order.id}`} 
                    className="button pl-3 pr-3 pt-1 pb-1"
                  >
                    View
                  </Link>
                </div>
              </div>
              )
            })}
          {orders?.length > 0 && (
            <div className="d-flex flex-row-reverse">
              <img style={{ padding: 1, height: 30, cursor: 'pointer' }} onClick={() => orders.length > 4 && onLoadMore(true)} src={next} />
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