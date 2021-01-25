import React from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss';

const PoDetails = (props) => {
  return (
    Object.keys(props.poCard).length === 0 || (!props.poCard.poDetails) ? <div className="row panel">N/A</div> :
      <div className="col panel commonpanle">
        <div className="d-flex flex-row  ">
          <ul className="mr-3 elemens">
            <li className="mb-1 text-secondary">Unicef PO ID</li>
            <li className="mb-1 text-secondary">Vendor Name</li>
            <li className="mb-1 text-secondary">Vendor ID</li>
            {props.menu == true ? <li className="mb-1 text-secondary">Po Item#</li> : null}
            {props.menu == true ? <li className="mb-1 text-secondary">Shipped From</li> : null}
            {props.menu == true ? <li className="mb-1 text-secondary">To Location ID</li> : null}
            {props.menu == true ? <li className="mb-1 text-secondary">To Location</li> : null}
            {props.menu == true ? <li className="mb-1 text-secondary">Material ID</li> : null}
            {props.menu == true ? <li className="mb-1 text-secondary">Product Name</li> : null}
            {props.menu == true ? <li className="text-secondary">Quantity</li> : null}

          </ul>
          <ul className="elemens">
            <li className="mb-1">{props.poCard.poDetails.orderID}</li>
            <li className="mb-1">{props.poCard.poDetails.vendorName}</li>
            <li className="mb-1">{props.poCard.poDetails.vendor}</li>
            {props.menu == true ? <li className="mb-1">{props.poCard.poDetails.poItem}</li> : null}
            {props.menu == true ? <li className="mb-1">{props.poCard.poDetails.incoterms2}</li> : null}
            {props.menu == true ? <li className="mb-1">{props.poCard.poDetails.plant}</li> : null}
            {props.menu == true ? <li className="mb-1">{props.poCard.poDetails.destination}</li> : null}
            {props.menu == true ? <li className="mb-1">{props.poCard.poDetails.material}</li> : null}
            {props.menu == true ? <li className="mb-1">{Object.keys(props.poCard.poDetails.products[0])[0].split('-')[0]}</li> : null}
            {props.menu == true ? <li>{props.poCard.poDetails.quantity}</li> : null}
          </ul>

        </div>
        <div className="arrow float-right" onClick={() => props.setMenu(!props.menu)}><img src={props.menu ?Down:traceDrop} alt="actions" height="7" width="12" /></div>

      </div>
  );
}


export default PoDetails;
