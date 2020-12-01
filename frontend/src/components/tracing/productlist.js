import React from 'react';
import './style.scss'

const ProductList = (props) => {
    return (
    Object.keys(props.productCard).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
   <div className="panel">
       {props.productCard.productDetails.map((txn, index) => <div className = "row justify-content-between" key={index}>
            <ul >
            <li>Product Name</li>
            <li>Quantity</li>
            <li>Mfg Date</li>
            <li>Exp Date</li>
            <li>Batch No</li>
            <li>Serial No Range</li>
           </ul>
           <ul className="bold">
            <li>{txn.productName}</li>
            <li>{txn.quantity}</li>
            <li>{txn.manufacturingDate}</li>
            <li>{txn.expiryDate}</li>
            <li>{txn._id.batchNumber}</li>
            <li>{txn.serialNumberFirst}-{txn.serialNumberLast}</li>
           </ul>
           <div></div></div>)}
           </div>

    )
}


export default ProductList;