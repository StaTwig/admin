import React from 'react';
import './style.scss'

const ProductList = (props) => {
    return (
    Object.keys(props.productCard).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
   <div className= {props.productHighLight ? "row panel highlight " : "row panel "}>
       {props.productCard.productDetails.map((txn, index) => <div className="row justify-content-between ml-2 " key={index}>
            <ul >
            <li>Product Name</li>
            <li>Quantity</li>
            <li>Mfg Date</li>
            {props.menuProduct== true ?  <li>Exp Date</li> : null}
            {props.menuProduct== true ? <li>Batch No</li> : null}
            {props.menuProduct== true ? <li>Serial No Range</li> : null}
           </ul>
           <ul className="bold ml-4">
            <li>{txn.productName}</li>
            <li>{txn.quantity}</li>
            <li>{txn.manufacturingDate}</li>
            {props.menuProduct== true ? <li>{txn.expiryDate}</li> : null}
            {props.menuProduct== true ?<li>{txn._id.batchNumber}</li> : null}
            {props.menuProduct== true ?<li>{txn.serialNumberFirst}-{txn.serialNumberLast}</li> : null}
           </ul>
           <div></div></div>)}
           </div>

    )
}


export default ProductList;