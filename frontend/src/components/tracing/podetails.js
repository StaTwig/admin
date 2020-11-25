import React from 'react';
import './style.scss';

const PoDetails = (props) => {
    return(
 Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
<div className="row panel justify-content-between">
          <ul >
            <li>Unicef PO ID</li>
            <li>Vendor Name</li>
            <li>Vendor ID</li>
           {props.menu== true ? <li>Po Item#</li> : null}
           {props.menu== true ? <li>Shipped From</li> : null}
           {props.menu== true ? <li>To Location ID</li> : null}
           {props.menu== true ? <li>To Location</li> : null}
           {props.menu== true ? <li>Material ID</li> : null}
           {props.menu== true ? <li>Product Name</li> : null}
           {props.menu== true ? <li>Quantity</li> : null}

           </ul>
           <ul className="bold">
            <li>{props.shipments.poTxns[props.shipments.poTxns.length-1].orderID}</li>
            <li className="vendor">{props.shipments.poTxns[props.shipments.poTxns.length-1].vendorName}</li>
            <li>{props.shipments.poTxns[props.shipments.poTxns.length-1].vendor}</li>
            {props.menu== true ? <li>{props.shipments.poTxns[props.shipments.poTxns.length-1].poItem}</li> : null}
           {props.menu== true ? <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].supplierLocation}</li> : null}
           {props.menu== true ? <li>{props.shipments.poTxns[props.shipments.poTxns.length-1].vendor}</li> : null}
           {props.menu== true ? <li>{props.shipments.poTxns[props.shipments.poTxns.length-1].destination}</li> : null}
           {props.menu== true ? <li>{props.shipments.poTxns[props.shipments.poTxns.length-1].material}</li> : null}
           {props.menu== true ? <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].productName}</li> : null}
           {props.menu== true ? <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].quantity}</li> : null}
           </ul>
           <div></div>
          </div>
         );
        }


export default PoDetails;