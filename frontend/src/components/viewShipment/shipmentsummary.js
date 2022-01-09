import React from "react";
import { formatDate } from "../../utils/dateHelper";
import "./style.scss";

const ShipmentSummary = (props) => {
  const { t } = props;
  let statusStyle = "bg-primary";
  let status = t("shipped");
  if (props.shipments.status === "RECEIVED") {
    statusStyle = "bg-success";
    status = t("delivered");
  }
  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <div className='panel commonpanle'>
      <div className='d-flex flex-row  '>
        <ul className='mr-1 elemens w-50'>
          <li className='mb-1 text-secondary'>{t("shipment_id")}</li>
          {props.shipments.poId && (
            <li className='mb-1 text-secondary'>{t("po_id")}</li>
          )}
          <li className='mb-1 text-secondary'>{t("shipment_date")}</li>
          <li className='mb-1 text-secondary'>{t("from")}</li>
          <li className='mb-1 text-secondary'>{t("to")}</li>
        </ul>
        <ul className='elemens'>
          <li className='mb-1'>{props.shipments.id}</li>
          {props.shipments.poId && (
            <li className='mb-1'>{props.shipments.poId}</li>
          )}
          <li className='mb-1'>
            {" "}
            {props.shipments.shippingDate?.length === 10
              ? props.shipments.shippingDate
              : formatDate(props.shipments.shippingDate)}{" "}
          </li>
          <li className='mb-1'>{props.shipments.supplier?.org?.name}</li>
          <li className='mb-1'>{props.shipments.receiver?.org?.name}</li>
        </ul>
        <div>
          <span
            className={`badge-warning text-white badge badge-pill status secondary-bg ${statusStyle}`}
          >
            <small>{status}</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentSummary;
