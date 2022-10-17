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
  const { shpmnts, t, shouldEnable } = props;
  const shipments = shpmnts();
  shipments.sort(function (a, b) {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });
  const intelEnabled =
    props.user.type === "Third Party Logistics" ? true : false;
  const dispatch = useDispatch();
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
          supplierReceiverList={intelEnabled ? [] : props.supplierReceiverList}
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
            let supplierAddress = intelEnabled
              ? shipment.supplier.locationId
              : shipment.supplier.warehouse?.warehouseAddress;
            let wLocation = shipment.supplier.warehouse?.location;
            if (wLocation?.length) {
              supplierAddress =
                wLocation?.firstLine + wLocation?.secondLine + wLocation?.city;
            }
            let receiverAddress = intelEnabled
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
                    <h5 className='table-data mi-primary'>{shipment.id}</h5>
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
                    <h5 className='table-data dark'>
                      {shipment?.shippingDate?.length === 10
                        ? shipment.shippingDate
                        : formatDate(shipment.shippingDate)}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className='user-info__basic'>
                    <h5 className='mb-0 table-data dark'>
                      {shipment.supplier.org
                        ? shipment.supplier.org.name
                        : intelEnabled
                        ? shipment.supplier.id
                        : "-"}
                    </h5>
                    <p className=' mb-0  text-sm-2 grey'>
                      {`${
                        supplierAddress?.firstLine
                          ? supplierAddress?.firstLine
                          : intelEnabled
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
                    <h5 className='mb-0 table-data dark'>
                      {shipment.receiver.org
                        ? shipment.receiver.org.name
                        : intelEnabled
                        ? shipment.receiver.id
                        : "-"}
                    </h5>
                    <p className='mb-0 text-sm-2 grey'>
                      {`${
                        receiverAddress?.firstLine
                          ? receiverAddress?.firstLine
                          : intelEnabled
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
                      className={`status-lable secondary-bgp  ${statusStyle}`}
                    >
                      {status}
                    </div>
                  </div>
                </td>
                <td>
                  <div className='table-btns d-flex align-items-center justify-content-center'>
                    {!shipment.intelEnabled ? (
                      <button
                        className='mi-btn mi-btn-sm mi-btn-primary mr-3'
                        onClick={() => {
                          const data = shipments[index];
                          dispatch(setTracingShipments(data));
                          props.history.push(`/track/${shipments[index].id}`);
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
                        intelEnabled === true
                          ? `viewgmrshipment`
                          : `viewshipment`
                      }/${shipment.id}`}
                      className='mi-btn mi-btn-sm mi-btn-secondary-outline'
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
