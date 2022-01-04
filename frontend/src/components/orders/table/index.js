import React from "react";
import user from "../../../assets/icons/user.svg";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateHelper";
import Pagination from "@material-ui/lab/Pagination";
import "./style.scss";

function Table(props) {
  const { ordrs, visible, t } = props;
  const orders = ordrs();
  const handlePageChange = (event, value) => {
    props.onPageChange(value);
  };
  orders.sort(function (a, b) {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div>
      <table className='table'>
        {/* <thead>
        <tr>
          <th>Order Sent To</th>
          <th>Order Date</th>
          <th>Order ID</th>
          <th>Product</th>
          <th>Delivery To</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead> */}
      <tbody>
        {orders.length === 0 && (
          <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none text-center">
            {t('no_records_found')}
          </div>
        )}
        {orders.map((order, index) => {
          let statusStyle = "bg-primary";
          let status = order.poStatus;
          if (order.poStatus === "CREATED") {
            status = visible === "one" ? t('sent') : t('received');
          } else if (order.poStatus === "ACCEPTED") {
            statusStyle = "bg-success";
            status = t('accepted');
          } else if (order.poStatus === "REJECTED") {
            statusStyle = "bg-secondary";
            status = t('rejected');
          } else if (order.poStatus === "TRANSIT&FULLYFULFILLED") {
            statusStyle = "bg-info";
            status = t('transitfullyfilled');
          } else if (order.poStatus === "FULLYFULFILLED") {
            statusStyle = "bg-info";
            status = t('fullyfilled');
          } else if (order.poStatus === "TRANSIT&PARTIALLYFULFILLED") {
            statusStyle = "bg-warning";
            status = t('transitpartiallyfilled');
          } else if (order.poStatus === "PARTIALLYFULFILLED") {
            statusStyle = "bg-warning";
            status = t('partiallyfilled');
          }

            const { customer, products, supplier, creatorOrganisation } = order;
            return (
              <tr>
                <td>
                  <div className='user-info'>
                    <div className='user-info__img'>
                      <img src={user} alt='User' />
                    </div>
              </td>
              <td>
              <Link to={`/vieworder/${order.id}`} className="button px-2 py-1" style={{
                        border: "1px solid #007bff",
                        borderRadius: "6px",
                      }}>
                  {t('view')}
                  </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    {orders?.length > 0 && (
      <div className="d-flex flex-row-reverse">
        <Pagination
          showFirstButton
          showLastButton
          color="primary"
          count={Math.ceil(props.count / 10)}
          onChange={handlePageChange}
        />
        <span
          className="mx-5 my-1 rounded text-dark"
          style={{ fontSize: "14px" }}
        >
          {t('total_records')} {props.count}{" "}
        </span>
      </div>
    )}
    </div>
  );
}

export default Table;
