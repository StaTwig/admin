import React from "react";
import { formatDate } from "../../utils/dateHelper";
import "./style.scss";

const ShipmentDetails = (props) => {
  const { t } = props;
  // console.log('Shipment Details');
  // console.log(props.shipments);
  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <div
      className={
        props.highLight
          ? "col panel commonpanle highlight"
          : "col panel commonpanle"
      }
    >
      <div className='d-flex flex-row'>
        <ul className='mr-1 w-50 elemens'>
            <h6 className='poheads potext mt-3 mb-3'>{t('from')}</h6>
            <li className='mb-1 text-secondary'>{t('organisation_name')}</li>
            <li className='mb-1 text-secondary'>{t('organisation_location')}</li>
            <h6 className='poheads potext mt-3 mb-3'>{t('to')}</h6>
            <li className='mb-1 text-secondary'>{t('organisation_name')}</li>
            <li className='mb-1 text-secondary'>{t('organisation_location')}</li>
            <h6 className='poheads potext mt-3 mb-3'>{t('delivery_details')}</h6>
            <li className='mb-1 text-secondary'>{t('transit_no')}</li>
            <li className='mb-1 text-secondary'>{t('label_code')}</li>
            <li className='mb-1 text-secondary'>{t('shipment_date')}</li>
            <li className='mb-1 text-secondary'>{t('estimated_delivery_date')}</li>
        </ul>
        {/* <li  className="mb-1">{props.shipments.supplier.org.postalAddress.split(',')[0]}</li> */}
        <ul className='w-50 elemens'>
          <h6
            className='poheads potext mt-3 mb-3 text-white'
            style={{ visibility: "hidden" }}
          >
              {t('from')}
          </h6>
          <li className='mb-1'>{props.shipments.supplier?.org?.name}</li>
          {props.shipments.supplier?.org?.postalAddress == null ? (
            <li className='mb-1'>
              {props.shipments.supplier?.warehouse?.postalAddress.split(",")[0]}
            </li>
          ) : (
            <li className='mb-1'>
              {props.shipments.supplier?.org?.postalAddress.split(",")[0]}
            </li>
          )}
          <h6
            className='poheads potext mt-3 mb-3  text-white'
            style={{ visibility: "hidden" }}
          >
              {t('to')}{" "}
          </h6>
          <li className='mb-1'>{props.shipments.receiver?.org?.name}</li>
          {props.shipments.supplier?.org?.postalAddress == null ? (
            <li className='mb-1'>
              {props.shipments.receiver?.warehouse?.postalAddress.split(",")[0]}
            </li>
          ) : (
            <li className='mb-1'>
              {props.shipments.receiver?.org?.postalAddress.split(",")[0]}
            </li>
          )}
          <h6
            className='poheads potext mt-3 mb-3 text-white'
            style={{ visibility: "hidden" }}
          >
              {t('delivery_details')}
          </h6>
          <li className='mb-1'>{props.shipments.airWayBillNo}</li>
          <li className='mb-1'>{props.shipments.label?.labelId}</li>
          <li className='mb-1'>
            {props.shipments.shippingDate?.length === 10
              ? props.shipments.shippingDate
              : formatDate(props.shipments.shippingDate)}{" "}
          </li>

          <li className='mb-1'>
            {props.shipments.expectedDeliveryDate?.length === 0
              ? "-"
              : props.shipments.expectedDeliveryDate?.length === 10
              ? props.shipments.expectedDeliveryDate
              : formatDate(props.shipments.expectedDeliveryDate)}
          </li>
        </ul>
        <div></div>
      </div>
      {/* <div className="arrow float-right" onClick={() => {
           props.setMenuShip(!props.menuShip)
            props.setHighLight(false);
          } }><img src={props.menuShip?Down:traceDrop} alt="actions" height="7" width ="12"

          /></div> */}
    </div>
  );
};

export default ShipmentDetails;
