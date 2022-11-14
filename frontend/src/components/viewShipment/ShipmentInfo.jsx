import React from "react";
import { formatDate } from "../../utils/dateHelper";
import "./StyleRefined.css";

function GridRow({ heading, context }) {
  return (
    <div className="ShipmentInfo--grid-column">
      <p className="info-text-width info-content-text text-secondary">
        {heading}
      </p>
      <p className="info-content-text">{context}</p>
    </div>
  );
}

export default function ShipmentInfo(props) {
  const { t } = props;
  return Object.keys(props.shipments).length === 0 ? (
    <div className="row panel justify-content-between">N/A</div>
  ) : (
    <div className="ShipmentInfo--main-container">
      <div className="ShipmentInfo--info-wrapper">
        <p className="info-header-text">{t("from")}</p>
        <div className="ShipmentInfo--content-space">
          <GridRow
            heading={t("organisation_name")}
            context={props.shipments.supplier?.org?.name}
          />
          <GridRow
            heading={t("organisation_location")}
            context={
              props.shipments.supplier?.org?.postalAddress == null
                ? props.shipments.supplier?.warehouse?.postalAddress.split(
                    ","
                  )[0]
                : props.shipments.supplier?.org?.postalAddress.split(",")[0]
            }
          />
        </div>
      </div>
      <div className="ShipmentInfo--info-wrapper">
        <p className="info-header-text">{t("to")}</p>
        <div className="ShipmentInfo--content-space">
          <GridRow
            heading={t("organisation_name")}
            context={props.shipments.receiver?.org?.name}
          />
          <GridRow
            heading={t("organisation_location")}
            context={
              props.shipments.supplier?.org?.postalAddress == null
                ? props.shipments.receiver?.warehouse?.postalAddress.split(
                    ","
                  )[0]
                : props.shipments.receiver?.org?.postalAddress.split(",")[0]
            }
          />
        </div>
      </div>
      <div className="ShipmentInfo--info-wrapper">
        <p className="info-header-text">{t("delivery_details")}</p>
        <div className="ShipmentInfo--content-space">
          <GridRow
            heading={t("transit_no")}
            context={props.shipments.airWayBillNo}
          />
          <GridRow
            heading={t("label_code")}
            context={props.shipments.label?.labelId}
          />
          <GridRow
            heading={t("shipment_date")}
            context={
              props.shipments.shippingDate?.length === 10
                ? props.shipments.shippingDate
                : formatDate(props.shipments.shippingDate)
            }
          />
          <GridRow
            heading={t("estimated_delivery_date")}
            context={
              props?.shipments.expectedDeliveryDate?.length === 0
                ? "-"
                : props.shipments.expectedDeliveryDate?.length === 10
                ? props.shipments.expectedDeliveryDate
                : formatDate(props.shipments.expectedDeliveryDate)
            }
          />
        </div>
      </div>
    </div>
  );
}
