import React, { useState } from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss'

const ProductList = (props) => {
    const [deliveredProductList, setDeliveredProductList] = useState(0);
    return (
        Object.keys(props.shipments).length === 0? <div className="row panel justify-content-between">N/A</div> :
            <div className={props.productHighLight ? "col panel commonpanle highlight " : "col panel commonpanle "}>
                {props.shipments.products.map((product,index) =>(
                <div className="d-flex flex-row " >
                    <ul className="mr-2 w-75 elemens">
                        <li className="mb-1" style={{listStyle: 'none', fontSize:'3vh',fontWeight:500, fontColor:'red'}}>{product.productName}</li>
                        <li className="mb-1 text-secondary">Product Name</li>
                        <li className="mb-1 text-secondary">Manufacturer</li>
                        <li className="mb-1 text-secondary">Quantity Received</li>
                        <li className="mb-1 text-secondary">Quantity Delivered</li>
                        <li className="mb-1 text-secondary">Label ID</li>
                    </ul>
                    <ul className="elemens w-75">
                    <li className="mb-1 text-secondary" style={{listStyle: 'none', fontSize:'3vh', textAlign:'right'}}>
                        <button
                            className="btn btn-outline-primary mr-4"
                            onClick={() => 
                                {
                                    props.setDelivered(deliveredProductList);
                                    props.setIndex(index);
                                }}
                            style={{width:'6vw',height:'4vh', fontSize:'2vh'}}
                            >
                            Save
                        </button>
                        </li>                        
                        <li className="mb-1 text-secondary">{product.productName}</li>
                        <li className="mb-1 text-secondary">{product.manufacturer}</li>
                        <li className="mb-1 text-secondary">{product.productQuantity}</li>
                        <li className="mb-1 text-secondary">
                        {
                        product['productQuantityDelivered']
                        ?
                        product['productQuantityDelivered']
                        :
                        <input
                        width="10" 
                        height="10"
                        className="form-control"
                        onChange={e =>
                          setDeliveredProductList(e.target.value)
                        }
                      />
                        }
                        </li>
                        <li className="mb-1 text-secondary">{props.shipments.label.labelId}</li>
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
