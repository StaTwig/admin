import React from 'react';
import { setTracingShipments } from '../../../actions/shipmentActions';
import { useDispatch } from 'react-redux';
import alert from '../../../assets/icons/alert.png';
import location from '../../../assets/icons/CurrentLocationWhite.svg';
import previous from '../../../assets/icons/previous.png';
import next from '../../../assets/icons/next.png';
import user from '../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';

const Table = props => {
  const dispatch = useDispatch();
  const { loadMore, onLoadMore, skip, shpmnts } = props;
  const shipments = shpmnts();
  return (
    <div className="table">
        <div className="rTable">
          <div className="">
              <div className="rTableRow pt-2 pb-2 shadow-none">
                <div className="rTableCell">
                  <div className="userPic text-center rounded d-flex flex-row">
                    <img src={user} width="30" height="20" alt="User" className="rounded mr-1 align-self-center" />
                    <div className="flex-column d-flex">
                    <span className="text-primary bold">Serum Institute</span>
                    <p className="address mb-0 text-primary">B97MKHFUIL</p>
                  </div>
                  </div>
                </div>
                <div className="rTableCell">
                  10/02/2021
                </div>
                <div className="rTableCell"><p className="mb-0 bold address mb-0 text-muted">B97MKHFUIL</p></div>
                <div className="rTableCell"><p className="mb-0 bold mb-0 address text-muted">MMR</p></div>
                <div className="rTableCell flex-column">
                  <span>Sydney</span>
                  <span>HG123</span>
                </div>
                <div className="rTableCell">
                  &nbsp;
                </div>
                <div className="rTableCell">
                  &nbsp;
                </div>
              </div>
              <div className="rTableRow pt-2 pb-2 shadow-none">
                <div className="rTableCell">
                  <div className="userPic text-center rounded d-flex flex-row">
                    <img src={user} width="30" height="20" alt="User" className="rounded mr-1 align-self-center" />
                    <div className="flex-column d-flex">
                    <span className="text-primary bold">Serum Institute</span>
                    <p className="address mb-0 text-primary">B97MKHFUIL</p>
                  </div>
                  </div>
                </div>
                <div className="rTableCell">
                  10/02/2021
                </div>
                <div className="rTableCell"><p className="mb-0 bold address mb-0 text-muted">B97MKHFUIL</p></div>
                <div className="rTableCell"><p className="mb-0 bold mb-0 address text-muted">MMR</p></div>
                <div className="rTableCell flex-column">
                  <span>Sydney</span>
                  <span>HG123</span>
                </div>
                <div className="rTableCell">
                  &nbsp;
                </div>
                <div className="rTableCell">
                  &nbsp;
                </div>
              </div>
              
              <div className="d-flex flex-row-reverse">
              <img style={{ padding: 1, height: 30, cursor: 'pointer' }} src={next} />
              <img style={{ padding: 1, height: 30, cursor: 'pointer' }} src={previous} />
            </div>
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