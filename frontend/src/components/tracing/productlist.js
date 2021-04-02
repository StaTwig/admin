import React from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss'

const ProductList = (props) => {
    return (
        Object.keys(props.shipments).length === 0 ||  (!props.shipments.poDetails) ? <div className="row panel justify-content-between">N/A</div> :
            <div className={props.productHighLight ? "col panel commonpanle highlight " : "col panel commonpanle "}>
                {props.shipments.shipmentDetails[0].products.map((product,index) =>(
                <div className="d-flex flex-row " >
                    <ul className="mr-3 elemens">
                        <li className="mb-1 text-secondary">Product Name</li>
                        <li className="mb-1 text-secondary">Manufacturer</li>
                        <li className="mb-1 text-secondary">Quantity</li>
                        <li className="mb-1 text-secondary">Label ID</li>
                    </ul>
                    <ul className="elemens">
                        <li className="mb-1">{product.productName}</li>
                        <li className="mb-1">{product.manufacturer}</li>
                        <li className="mb-1">{product.productQuantity}</li>
                        <li className="mb-1">{props.shipments.shipmentDetails[0].label.labelId}</li>
                   </ul>
                    <div></div>
                    </div>))}
                {/* <div className="arrow float-right" onClick={() => {
                    props.setMenuProduct(!props.menuProduct)
                    props.setProductHighLight(false);
                }}><img src={props.menuProduct?Down:traceDrop} alt="actions" height="7" width="12"
                    /></div> */}
            </div>

    )
}


export default ProductList;
