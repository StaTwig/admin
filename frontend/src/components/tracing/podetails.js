import React from 'react';
import './style.scss';

const PoDetails = (props) => {
    return(
 Object.keys(props.poCard).length === 0 || (!props.poCard.poDetails) ? <div className="row panel justify-content-between">N/A</div> :
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
            <li>{props.poCard.poDetails.orderID}</li>
            <li className="vendor">{props.poCard.poDetails.vendorName}</li>
            <li>{props.poCard.poDetails.vendor}</li>
            {props.menu== true ? <li>{props.poCard.poDetails.poItem}</li> : null}
           {props.menu== true ? <li>{props.poCard.poDetails.incoterms2}</li> : null}
           {props.menu== true ? <li>{props.poCard.poDetails.plant}</li> : null}
           {props.menu== true ? <li>{props.poCard.poDetails.destination}</li> : null}
           {props.menu== true ? <li>{props.poCard.poDetails.material}</li> : null}
           {props.menu== true ? <li>{Object.keys(props.poCard.poDetails.products[0])[0].split('-')[0]}</li> : null}
           {props.menu== true ? <li>{props.poCard.poDetails.quantity}</li> : null}
           </ul>
           <div></div>
          </div>
         );
        }


export default PoDetails;