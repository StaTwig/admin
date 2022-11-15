import React from "react";

function GridRow({ heading, context }) {
  return (
    <div className="ShipmentInfo--grid-column-alt">
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
      <div className="ShipmentInfo--main-container-alt">
        <div className="ShipmentInfo--info-wrapper">
          <div className="ShipmentInfo--content-space-2">
            <GridRow
              heading={t("shipment_date")}
              context={
                props.shipments.shippingDate.split("T")[0].split("-")[2] +
                "/" +
                props.shipments.shippingDate.split("T")[0].split("-")[1] +
                "/" +
                props.shipments.shippingDate.split("T")[0].split("-")[0]
              }
            />
          </div>
        </div>
        <div className="ShipmentInfo--info-wrapper">
          <p className="info-header-text">{t("from")}</p>
          <div className="ShipmentInfo--content-space-2">
            <GridRow
              heading={t("organisation_name")}
              context={props.shipments.supplier.org.name}
            />
            <GridRow
              heading={t("organisation_location")}
              context={props.shipments.supplier.warehouse.title}
            />
          </div>
        </div>
        <div className="ShipmentInfo--info-wrapper">
          <p className="info-header-text">{t("to")}</p>
          <div className="ShipmentInfo--content-space-2">
            <GridRow
              heading={t("organisation_name")}
              context={props.shipments.receiver.org.name}
            />
            <GridRow
              heading={t("organisation_location")}
              context={props.shipments.receiver.warehouse.title}
            />
          </div>
        </div>
      </div>
  );
}
