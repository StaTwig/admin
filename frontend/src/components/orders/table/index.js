import React from "react";
import user from "../../../assets/icons/user.svg";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateHelper";
import Pagination from "@material-ui/lab/Pagination";
import "./style.scss";
import AdvanceTableFilter from "../../../shared/advanceTableFilter";

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
      <table className="table">
      <AdvanceTableFilter
          visible={props.visible}
          data={props.data}
          shouldEnable={true}
          poOrderIdList={props.poOrderIdList}
          poDeliveryLocationsList={props.poDeliveryLocationsList}
          poProductsList={props.poProductsList}
          poOrganisationsList={props.poOrganisationsList}
          setFromToFilterOnSelect={props.setFromToFilterOnSelect}
          setOrderIdNameFilterOnSelect={props.setOrderIdNameFilterOnSelect}
          setStatusFilterOnSelect={props.setStatusFilterOnSelect}
          setProductNameFilterOnSelect={props.setProductNameFilterOnSelect}
          setLocationFilterOnSelect={props.setLocationFilterOnSelect}
          setDateFilterOnSelect={props.setDateFilterOnSelect}
          fb={props.fb}
          showExportFilter={props.showExportFilter}
          setShowExportFilter={props.setShowExportFilter}
          exportFilterData={props.exportFilterData}
          onSelectionOfDropdownValue={props.onSelectionOfDropdownValue}
          onSelectionDateFilter={props.onSelectionDateFilter}
          isReportDisabled={props.isReportDisabled}
          t={t}
          filterPage="orders"
        />
        <tbody>
          {orders.length === 0 && (
            <div className="FullWidth rTableRow pt-2 pb-2 text-center justify-content-center ">
              <span className="text-muted shadow-none">{t('no_records_found')}</span>
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
          else if (order.poStatus === "CANCELLED") {
            statusStyle = "bg-primary";
            status = t('cancelled');
          }

            const { customer, products, supplier, creatorOrganisation } = order;
            return (
              <tr>
                <td>
                  <div className="user-info">
                    <div className="user-info__img">
                      <img src={user} alt="User" />
                    </div>
                    <div className="user-info__basic shipmentId">
                      <h5 className="mb-0 table-h5-text ">
                        {visible === "two"
                          ? creatorOrganisation?.name
                          : supplier.organisation.name}
                      </h5>
                      <p className="mb-0 table-p-text ">
                        {visible === "two"
                          ? creatorOrganisation?.id
                          : supplier.organisation.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="user-info">
                    <h5 className="table-h5-text">
                      {" "}
                      {formatDate(order.creationDate)}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className="user-info">
                    <h5 className="table-h5-text text-muted">{order.id}</h5>
                  </div>
                </td>
                <td>
                  <div className="user-info">
                    <h5 className="table-h5-text text-muted">
                      {truncate(
                        (products[0]?.name || products[0]?.productId) +
                        (products.length > 1
                          ? " + " + (products.length - 1) + " more"
                          : ""),
                        15
                      )}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className="user-info__basic">
                    <h5 className="mb-0 table-h5-text">
                      {customer.warehouse.title}
                    </h5>
                    <p className="text-muted mb-0 table-p-text">
                      {customer.warehouse && customer.warehouse.warehouseAddress
                        ? customer.warehouse.warehouseAddress.firstLine +
                        " " +
                        customer.warehouse.warehouseAddress.city
                        : null}
                    </p>
                  </div>
                </td>
                <td className="d-flex align-items-center justify-content-center">
                  <div
                    className={`status secondary-bg ${statusStyle} py-1`}
                    style={{
                      width: "122px",
                      textAlign: "center",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    {status}
                  </div>
                </td>
                <td>
                  <Link
                    to={`/vieworder/${order.id}`}
                    className="button btn-view-link px-4 py-1"
                    style={{
                      border: "1px solid #007bff",
                      borderRadius: "6px",
                    }}
                  >
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
