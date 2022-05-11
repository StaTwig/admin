import React from "react";
import "./style.scss";
import { setTracingShipments } from "../../../actions/shipmentActions";
import { useDispatch } from "react-redux";
import alert from "../../../assets/icons/alert.png";
import location from "../../../assets/icons/CurrentLocationWhite.svg";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateHelper";
import Pagination from "@material-ui/lab/Pagination";
import AdvanceTableFilter from "../../../shared/advanceTableFilter";

function Table(props) {
  const dispatch = useDispatch();
  const { shpmnts, t, shouldEnable } = props;
  const shipments = shpmnts();
  shipments.sort(function (a, b) {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });
  const handlePageChange = (event, value) => {
    props.onPageChange(value);
  };
  return (
    <div>
      <table className='table'>
        <AdvanceTableFilter
          data={props.data}
          shipmentIdList={props.shipmentIdList}
          shouldEnable={shouldEnable}
          supplierReceiverList={
            props.user.isCustom ? [] : props.supplierReceiverList
          }
          setShipmentIdFilterOnSelect={props.setShipmentIdFilterOnSelect}
          setFromShipmentFilterOnSelect={props.setFromShipmentFilterOnSelect}
          setToShipmentFilterOnSelect={props.setToShipmentFilterOnSelect}
          setStatusFilterOnSelect={props.setStatusFilterOnSelect}
          setDateFilterOnSelect={props.setDateFilterOnSelect}
          fb='80%'
          showExportFilter={props.showExportFilter}
          setShowExportFilter={props.setShowExportFilter}
          exportFilterData={props.exportFilterData}
          onSelectionOfDropdownValue={props.onSelectionOfDropdownValue}
          onSelectionDateFilter={props.onSelectionDateFilter}
          isReportDisabled={props.isReportDisabled}
          t={t}
        />
        <tbody>
          {/* {shipments.length === 0 && (
            <div className='rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none'>
              {t("no_records_found")}
            </div>
          )}
          {shipments.map((shipment, index) => {
            let statusStyle = "bg-primary";
            let status = "Shipped";
            if (shipment.status === "RECEIVED") {
              statusStyle = "bg-success";
              status = "Delivered";
            }
            let supplierAddress = props.user.emailId === 'gmr@statledger.io' ? shipment.supplier.locationId : shipment.supplier.warehouse.warehouseAddress;
            let wLocation = shipment.supplier.warehouse?.location;
            if (wLocation?.length) {
              supplierAddress =
                wLocation.firstLine + wLocation.secondLine + wLocation.city;
            }
            let receiverAddress = props.user.emailId === 'gmr@statledger.io' ? shipment.receiver.locationId : shipment.receiver.warehouse.warehouseAddress;
            let wrLocation = shipment.receiver.warehouse?.location;
            if (wrLocation?.length) {
              supplierAddress =
                wrLocation.firstLine + wrLocation.secondLine + wrLocation.city;
            }
            return (
              <div
                className='col-12 p-3 mb-3 ml-1 rounded1 row bg-white shadow'
                key={index}
              >
                {" "}
                {/* rTableRow pt-3 pb-3 */}
          {/* <div className="rTableCell">
                  <div className="combine-data">{shipment.receiver.id}</div>
                </div> */}
          {/* <div
                  className='col-1 txt1'
                  style={{ padding: 0, left: "10px" }}
                >
                  <span className='text-primary'>{shipment.id}</span>
                  {shipment?.shipmentAlerts?.length > 0 && (
                    <span
                      style={{ backgroundColor: "#EAEAEA", marginLeft: 5 }}
                      className='rounded p-1'
                    >
                      <img style={{ height: 15 }} src={alert} alt='Alert' />
                    </span>
                  )}
                </div>
                <div
                  className='col-1 txt1'
                  style={{ position: "relative", left: "4.5%" }}
                >
                  {shipment?.shippingDate?.length === 10
                    ? shipment.shippingDate
                    : formatDate(shipment.shippingDate)}
                </div>
                <div
                  className='col-3 txt1 '
                  style={{ position: "relative", left: "10%" }}
                >
                  <p className='mb-0'>
                    {shipment.supplier.org ? shipment.supplier.org.name : props.user.emailId === 'gmr@statledger.io' ? shipment.supplier.id : "-"}
                  </p>
                  <p className='address mb-0 text-muted'>{`${
                    supplierAddress.firstLine ? supplierAddress.firstLine : props.user.emailId === 'gmr@statledger.io' ? shipment.supplier.locationId : ""
                  } ${
                    supplierAddress.secondLine ? supplierAddress.secondLine : ""
                  } ${supplierAddress.city ? supplierAddress.city : ""}\n ${
                    supplierAddress.state ? supplierAddress.state : ""
                  }\n ${
                    supplierAddress.country ? supplierAddress.country : ""
                  } `}</p>
                </div>
                <div
                  className='col-3 txt1 '
                  style={{ position: "relative", left: "12%" }}
                >
                  <p className='mb-0'>
                    {shipment.receiver.org ? shipment.receiver.org.name : props.user.emailId === 'gmr@statledger.io' ? shipment.receiver.id : "-"}
                  </p>
                  <p className='mb-0 address text-muted'>{`${
                    receiverAddress.firstLine ? receiverAddress.firstLine : props.user.emailId === 'gmr@statledger.io' ? shipment.receiver.locationId : ""
                  }  ${
                    receiverAddress.secondLine ? receiverAddress.secondLine : ""
                  } ${receiverAddress.city ? receiverAddress.city : ""} \n ${
                    receiverAddress.state ? receiverAddress.state : ""
                  } \n ${
                    receiverAddress.country ? receiverAddress.country : ""
                  } `}</p>
                </div>
                <div
                  className='rTableCell'
                  style={{ position: "relative", left: "10%" }}
                >
                  <div className={`status secondary-bg ml-3 ${statusStyle}`}>
                    {status}\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                  </div>
                </div>
                <div
                  className='col-1 txt1'
                  style={{ paddingLeft: 0, position: "relative", left: "8%" }}
                >
                  <button
                    className='button btn-primary text-light btn-sm ml-1'
                    disabled={props.user.emailId === 'gmr@statledger.io' ? true : false}
                    onClick={() => {
                      const data = shipments[index];
                      dispatch(setTracingShipments(data));
                      props.history.push(`/tracing/${shipments[index].id}`);
                    }}
                  >
                    <img
                      style={{ padding: 1, height: 15 }}
                      src={location}
                      alt='Location'
                    />
                    <span className='pl-1 text-white'>Track</span>
                  </button>
                </div>
                <div
                  className='rTableCell'
                  style={{ position: "relative", left: "4.5%" }}
                >
                  <Link
                    to={`/${shipment.isCustom === true ? `viewgmrshipment`: `viewshipment`}/${shipment.id}`}
                    className='button btn-sm'
                    style={{ width: "60px" }}
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
 */}

          {/* {shipments.length === 0 && (
            <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">
              {t("no_records_found")}
            </div>
          )} */}

          {shipments.length === 0 && (
            <div className='rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none'>
              {t("no_records_found")}
            </div>
          )}

          {shipments.map((shipment, index) => {
            let statusStyle = "bg-primary";
            let status = t("shipped");
            if (shipment.status === "RECEIVED") {
              statusStyle = "bg-success";
              status = t("delivered");
            }
            let supplierAddress = props.user.isCustom
              ? shipment.supplier.locationId
              : shipment.supplier.warehouse?.warehouseAddress;
            let wLocation = shipment.supplier.warehouse?.location;
            if (wLocation?.length) {
              supplierAddress =
                wLocation?.firstLine + wLocation?.secondLine + wLocation?.city;
            }
            let receiverAddress = props.user.isCustom
              ? shipment.receiver.locationId
              : shipment.receiver.warehouse?.warehouseAddress;
            let wrLocation = shipment.receiver.warehouse?.location;
            if (wrLocation?.length) {
              supplierAddress =
                wrLocation?.firstLine +
                wrLocation?.secondLine +
                wrLocation?.city;
            }
            return (
              <tr>
                <td>
                  <div className='user-info'>
                    <h5 className='table-h5-text shipmentId'>{shipment.id}</h5>
                    {shipment?.shipmentAlerts?.length > 0 && (
                      <span
                        style={{ backgroundColor: "#EAEAEA", marginLeft: 5 }}
                        className='rounded p-1'
                      >
                        <img style={{ height: 15 }} src={alert} alt='Alert' />
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className='user-info'>
                    <h5 className='table-h5-text'>
                      {shipment?.shippingDate?.length === 10
                        ? shipment.shippingDate
                        : formatDate(shipment.shippingDate)}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className='user-info__basic'>
                    <h5 className='mb-0 table-h5-text'>
                      {shipment.supplier.org
                        ? shipment.supplier.org.name
                        : props.user.isCustom
                        ? shipment.supplier.id
                        : "-"}
                    </h5>
                    <p className='text-muted mb-0 table-p-text'>
                      {`${
                        supplierAddress?.firstLine
                          ? supplierAddress?.firstLine
                          : props.user.isCustom
                          ? shipment.supplier.locationId
                          : ""
                      } ${
                        supplierAddress?.secondLine
                          ? supplierAddress?.secondLine
                          : ""
                      } ${
                        supplierAddress?.city ? supplierAddress?.city : ""
                      }\n ${
                        supplierAddress?.state ? supplierAddress?.state : ""
                      }\n ${
                        supplierAddress?.country ? supplierAddress?.country : ""
                      } `}
                    </p>
                  </div>
                </td>
                <td>
                  <div className='user-info__basic'>
                    <h5 className='mb-0 table-h5-text'>
                      {shipment.receiver.org
                        ? shipment.receiver.org.name
                        : props.user.isCustom
                        ? shipment.receiver.id
                        : "-"}
                    </h5>
                    <p className='text-muted mb-0 table-p-text'>
                      {`${
                        receiverAddress?.firstLine
                          ? receiverAddress?.firstLine
                          : props.user.isCustom
                          ? shipment.receiver.locationId
                          : ""
                      }  ${
                        receiverAddress?.secondLine
                          ? receiverAddress?.secondLine
                          : ""
                      } ${
                        receiverAddress?.city ? receiverAddress?.city : ""
                      } \n ${
                        receiverAddress?.state ? receiverAddress?.state : ""
                      } \n ${
                        receiverAddress?.country ? receiverAddress?.country : ""
                      } `}
                    </p>
                  </div>
                </td>
                <td>
                  <div className='table-btns d-flex align-items-center justify-content-center'>
                    <div
                      className={`status  secondary-bgp p-1 mr-3 ${statusStyle}`}
                    >
                      {status}
                    </div>
                  </div>
                </td>
                <td>
                  <div className='table-btns d-flex align-items-center justify-content-center'>
                    {!shipment.isCustom ? (
                      <button
                        className='button btn-primary text-light btn-sm mr-3'
                        onClick={() => {
                          const data = shipments[index];
                          dispatch(setTracingShipments(data));
                          props.history.push(`/tracing/${shipments[index].id}`);
                        }}
                      >
                        <img
                          style={{ padding: 1, height: 15 }}
                          src={location}
                          alt='Location'
                        />
                        <span className='pl-1 text-white'>{t("track")}</span>
                      </button>
                    ) : null}
                    <Link
                      to={`/${
                        shipment.isCustom === true
                          ? `viewgmrshipment`
                          : `viewshipment`
                      }/${shipment.id}`}
                      className='button btn-view-link btn-sm px-4'
                      style={{
                        border: "1px solid #007bff",
                        borderRadius: "6px",
                      }}
                    >
                      {t("view")}
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {shipments?.length > 0 && (
        <div className='d-flex flex-row-reverse'>
          <Pagination
            showFirstButton
            showLastButton
            color='primary'
            count={Math.ceil(props.count / props.limit)}
            onChange={handlePageChange}
          />
          <span
            className='mx-5 my-1 rounded text-dark'
            style={{ fontSize: "14px" }}
          >
            {t("total_records")} {props.count}{" "}
          </span>
        </div>
      )}
    </div>
  );
}

export default Table;
