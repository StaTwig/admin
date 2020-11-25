import React from 'react';
import './style.scss'

const ProductList = (props) => {
    return (
    Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className="row panel justify-content-between">
            <ul >
            <li>Material ID</li>
            <li>Product Name</li>
            <li>Quantity</li>
            <li>Mfg Date</li>
            <li>Exp Date</li>
            <li>Batch No</li>
            <li>Optimum Temp</li>
            <li>Serial No</li>
           </ul>
           <ul className="bold">
            <li>{props.shipments.poTxns[props.shipments.poTxns.length-1].material}</li>
            <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].productName}</li>
            <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].quantity}</li>
            <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].manufacturingDate}</li>
            <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].expiryDate}</li>
            <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].batchNumber}</li>
            <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].storageConditionmin} to
            <span className="ml-1">{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].storageConditionmax}</span></li>
            <li>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].products[0].serialNumber}</li>
           </ul>
           <div></div>
           </div>

    )
}


export default ProductList;