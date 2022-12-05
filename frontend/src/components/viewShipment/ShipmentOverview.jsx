import React from "react";
import { formatDate } from "../../utils/dateHelper";

function GridRow({ heading, context, status, statusStyle }) {
  return (
    <div className="ShipmentInfo--content-space-alt">
      <div className="ShipmentInfo--grid-column">
        <p className="info-text-width info-content-text text-secondary">
          {heading}
        </p>
        <div className="context-wrapper-space">
          <p className="info-content-text">{context}</p>
          {status && (
            <span
              className={`badge-warning text-white badge badge-pill status secondary-bg ${statusStyle}`}
            >
              <small>{status}</small>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default function ShipmentOverview(props) {
  const { t } = props;
  let statusStyle = "bg-primary";
  let status = t("shipped");
  if (props.shipments.status === "RECEIVED") {
    statusStyle = "bg-success";
    status = t("delivered");
  }
  return Object.keys(props.shipments).length === 0 ? (
    <div className="row panel justify-content-between">N/A</div>
  ) : (
    <div className="ShipmentInfo--main-container">
      <div className="ShipmentInfo--info-wrapper">
        <GridRow
          heading={t("shipment_id")}
          context={props.shipments.id}
          status={status}
          statusStyle={statusStyle}
        />
        {props.shipments.poId && (
          <GridRow heading={t("po_id")} context={props.shipments.poId} />
        )}
        <GridRow
          heading={t("shipment_date")}
          context={
            props.shipments.shippingDate?.length === 10
              ? props.shipments.shippingDate
              : formatDate(props.shipments.shippingDate)
          }
        />
        <GridRow
          heading={t("from")}
          context={props.shipments.supplier?.org?.name}
        />
        <GridRow
          heading={t("to")}
          context={props.shipments.receiver?.org?.name}
        />
      </div>
    </div>
  );
}
