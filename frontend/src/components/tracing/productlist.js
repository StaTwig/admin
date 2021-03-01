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
                        <li className="mb-1">Prod-9bhkk6huyt</li>
                        <li className="mb-1">OPV</li>
                        <li className="mb-1">Bharat</li>
                        <li className="mb-1">80,000</li>
                        {props.menuProduct == true ? <li className="mb-1">12/2020</li> : null}
                        {props.menuProduct == true ? <li className="mb-1">02/2022</li> : null}
                        {props.menuProduct == true ? <li className="mb-1">BR-76654</li> : null}
                        {props.menuProduct == true ? <li className="mb-1">SR12-SR90</li> : null}
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
