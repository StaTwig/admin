import React from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss'

const ProductList = (props) => {
    return (
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
            <div className={props.productHighLight ? "col panel commonpanle highlight " : "col panel commonpanle "}>
                <div className="d-flex flex-row " >
                    <ul className="mr-3 elemens">
                    <li className="mb-1 text-secondary">Product ID</li>
                        <li className="mb-1 text-secondary">Product Name</li>
                        <li className="mb-1 text-secondary">Manufacturer</li>
                        <li className="mb-1 text-secondary">Quantity</li>
                        {props.menuProduct == true ? <li className="mb-1 text-secondary">Mfg Date</li> : null}
                        {props.menuProduct == true ? <li className="mb-1 text-secondary">Exp Date</li> : null}
                        {props.menuProduct == true ? <li className="mb-1 text-secondary">Batch No</li> : null}
                        {props.menuProduct == true ? <li className="mb-1 text-secondary">Serial No</li> : null}
                    </ul>
                    <ul className="elemens">
                        <li className="mb-1"></li>
                        <li className="mb-1"></li>
                        <li className="mb-1"></li>
                        <li className="mb-1"></li>
                        {props.menuProduct == true ? <li className="mb-1"></li> : null}
                        {props.menuProduct == true ? <li className="mb-1"></li> : null}
                        {props.menuProduct == true ? <li className="mb-1"></li> : null}
                        {props.menuProduct == true ? <li className="mb-1"></li> : null}
                    </ul>
                    <div></div></div>
                <div className="arrow float-right" onClick={() => {
                    props.setMenuProduct(!props.menuProduct)
                    props.setProductHighLight(false);
                }}><img src={props.menuProduct?Down:traceDrop} alt="actions" height="7" width="12"
                    /></div>
            </div>

    )
}


export default ProductList;
