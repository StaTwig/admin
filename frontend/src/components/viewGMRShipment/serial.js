import React from "react";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import "./style.scss";

const Serial = (props) => {
  return (
    <div className='panel d-flex flex-column'>
      <div className='d-flex flex-column'>
        <div className='row mb-4'>
          <div className='picture transit-bg'>
            <img src={currentinventory} alt='truck' />
          </div>{" "}
          <div className='col'>
            <div className='label'>Serial Number</div>
            <div className='font-weight-bold'>
              {props.tracingShipment.serialNumber}
            </div>{" "}
          </div>
        </div>
        <div className='row mb-4'>
          <div className='picture1'>
            <div className='symbol-bg'></div>
          </div>
          <div className='col'>
            <div>{props.tracingShipment.supplierLocation}</div>
            <div className='wallet'>{props.tracingShipment.shipmentDate}</div>
          </div>
          <div className='col'>
            <div>Added to inventory by the manufacturer</div>
            <div className='wallet'>
              Wallet Address :{props.tracingShipment.receiver}
            </div>{" "}
          </div>
        </div>

        <div className='row mb-4'>
          <div className='picture1'>
            <div className='symbol-bg'></div>
          </div>
          <div className='col'>
            <div>{props.tracingShipment.supplierLocation}</div>
            <div className='wallet'>
              {props.tracingShipment.estimateDeliveryDate}
            </div>
          </div>
          <div className='col'>
            <div>
              Dispatched from {props.tracingShipment.manufacturerName} Warehouse
            </div>
            <div className='wallet'>
              Wallet Address :{props.tracingShipment.receiver}
            </div>{" "}
          </div>
        </div>

        <div className='row mb-4'>
          <div className='picture1'>
            <div className='symbol-bg'></div>
          </div>
          <div className='col'>{props.tracingShipment.deliveryLocation}</div>
          <div className='col'>{props.tracingShipment.status}</div>{" "}
        </div>

        {props.tracingShipment.status === "Shipped" ? null : (
          <div className='row'>
            <div className='picture1'>
              <div className='last-bg'></div>
            </div>
            <div className='col'>{props.tracingShipment.deliveryLocation}</div>
            <div className='col'>Pending Delivered</div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Serial;
