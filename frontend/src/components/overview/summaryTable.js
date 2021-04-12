import React from "react";
import { useSelector } from "react-redux";
import EmptyShipments from "../../assets/icons/EmptyShipments.png";
import "./table-style.scss";
import alertShip from "../../assets/icons/alert.png";


import shippment from "../../assets/icons/TotalShipmentsCompleted.png"
import inandoutbound from "../../assets/icons/TotalShipmentsCompleted.svg"
import shippmentdate from "../../assets/icons/ShippingDate.svg"
import sent from "../../assets/icons/Sent.svg"
import received from "../../assets/icons/Received1.svg"
import status from "../../assets/icons/Status.svg"


import { formatDate } from "../../utils/dateHelper";

const SummaryTable = (props) => {
  const profile = useSelector((state) => {
    return state.user;
  });
  const { shipments } = props;
  console.log({ shipments });
  let supplierAddress, receiverAddress;
  
  return (
    <React.Fragment>
      {shipments.length === 0 ? (
        <div className="summaryTable justify-content-center ">
          <div className="d-flex flex-column ">
            <img src={EmptyShipments} height="200" width="200" />
          </div>
        </div>
      ) : (
        <div className="summaryTable mt-4">
          <div className="rowData">
            <div className="headline">
              <span style={{position:'relative',top:'25%'}}>
                <img src={shippment} height='17' width='25' className="mr-3"></img>
                <b>Shipment ID</b>                
              </span>
            </div>
            {shipments.map((shipment, index) =>
              index < 5 ? (
                <div className="combine-data" key={index}>
                  <div>{shipment.id}</div>
                  {shipment?.shipmentAlerts?.length > 0 && (
                    <span
                      style={{ backgroundColor: "#EAEAEA", marginLeft: 5 }}
                      className="rounded p-1"
                    >
                      <img style={{ height: 15 }} src={alertShip} />
                    </span>
                  )}
                </div>
              ) : null
            )}
          </div>
          <div className="rowData">
            <div className="headline">
            <span style={{position:'relative',top:'25%'}}>
              <img src={inandoutbound} height='17' width='25' className="mr-3"></img>
              <b>Type</b>
            </span>  
            </div>
            {shipments.map((shipment, index) =>
              index < 5 ? (
                <div className="combine-data" key={index}>
                  <div>
                    {profile.warehouseId == shipment.supplier.locationId
                      ? "Outbound"
                      : "Inbound"}
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div className="rowData">
            <div className="headline">
            <span style={{position:'relative',top:'25%'}}>
            <img src={shippmentdate} height='20' width='20' className="mr-3"></img>
            <b>Shipping Date</b>
              </span> 
            </div>
             
            {shipments.map((shipment, index) =>
              index < 5 ? (
                <div className="combine-data" key={index}>
                  <div>
                    {shipment.shippingDate.length == 10 ? shipment.shippingDate : formatDate(shipment.shippingDate)}
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div className="rowData">
            <div className="headline">
            <span style={{position:'relative',top:'25%'}}>
            <img src={received} height='20' width='20' className="mr-3"></img>
            <b>From</b> 
            </span>
            </div>
            {shipments.map((shipment, index) =>
              index < 5 ? (
                <div className="combine-data" key={index}>
                  <div className="rTableCell">
                    <p className="mb-0 bold">{shipment.supplier.org.name}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>

          <div className="rowData">
            <div className="headline">
            <span style={{position:'relative',top:'25%'}}>
              <img src={sent} height='20' width='20' className="mr-3"></img>
              <b>To</b>
            </span>  
            </div>
            {shipments.map((shipment, index) =>
              index < 5 ? (
                <div className="combine-data" key={index}>
                  <div className="rTableCell">
                    <p className="mb-0 bold">{shipment.receiver.org.name}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div className="rowData">
            <div className="headline">
            <span style={{position:'relative',top:'25%'}}>
            <img src={status} height='20' width='20' className="mr-3"></img>
            <b>Status</b>
            </span>  
            </div>
            {shipments.map((shipment, index) =>
              index < 5 ? (
                <div className="combine-data" key={index}>
                   <div className="status" target={shipment.status}>

                   {shipment.status=="CREATED"?"Shipped":"Delivered"}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
      <div className="summaryTable sm-only">
        <div className="row">
          {shipments.map((shipment, index) =>
            index < 5 ? (
              <div key={index} className="col-sm-12 col-md-6 mb-3">
                <div className="combine-data mb-3">
                  <div className="rTableCell">
                    <p className="mb-0 bold">{shipment.receiver.org.name}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="mr-3">Shipment ID</div>
                  <div className="font-weight-bold">{shipment.id}</div>
                </div>
                <div className="d-flex">
                  <div className="mr-3">Shipping Date</div>
                  <div className="font-weight-bold">
                    {shipment.shippingDate.split("T")[0].split("-")[2] +
                      "/" +
                      shipment.shippingDate.split("T")[0].split("-")[1] +
                      "/" +
                      shipment.shippingDate.split("T")[0].split("-")[0]}
                  </div>
                </div>
                <div className="d-flex">
                  <div className="mr-3">From</div>
                  <div className="rTableCell">
                    <p className="mb-0 bold">{shipment.supplier.org.name}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="mr-3">Type</div>
                  <div className="font-weight-bold">Inbound</div>
                </div>
                <div className="d-flex">
                  <div className="mr-3">Status</div>
                  <div className="font-weight-bold">
                    <div className="status" target={shipment.status}>
                    {shipment.status=="CREATED"?"Shipped":"Delivered"}
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default SummaryTable;
