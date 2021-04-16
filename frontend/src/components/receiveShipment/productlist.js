import React, { useState } from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss'

const ProductList = (props) => {
    const [deliveredProduct, setDeliveredProduct] = useState(0);
    let deliveredProductList = [];
    return (
        Object.keys(props.shipments).length === 0? <div className="row panel justify-content-between">N/A</div> :
            <div>
                {props.shipments.products.map((product,index) =>(
                 <div className={props.productHighLight ? "col panel commonpanle highlight " : "col panel commonpanle "}>
                    <div className="d-flex flex-row " >
                        <ul className="mr-2 w-75 elemens">
                            <li className="mb-3" style={{fontSize:'4vh'}}>{product.productName}</li>
                            <li className="mb-1 text-secondary">Product Name</li>
                            <li className="mb-1 text-secondary">Manufacturer</li>
                            <li className="mb-1 text-secondary">Quantity Sent</li>
                            <li className="mb-1 text-secondary">Quantity Received</li>
                            <li className="mb-1 text-secondary">Label ID</li>
                        </ul>
                        <ul className="elemens w-75">
                        <li className="mb-3 text-secondary" style={{padding:'0',textAlign:'right'}}>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => 
                                    {
                                        deliveredProductList.push(deliveredProduct);
                                        props.setDelivered(deliveredProductList);
                                        props.setIndex(index);
                                    }}
                                style={{width:'7vw',height:'3vh', fontSize:'2vh',paddingTop:"0"}}
                                >
                                Save
                            </button>
                            </li>                        
                            <li className="mb-1 text-secondary">{product.productName}</li>
                            <li className=" text-secondary">{product.manufacturer}</li>
                            <li className="mb-1 text-secondary">{product.productQuantity}</li>
                            <li className="text-secondary" style={{paddingTop:'0.2vh'}}>
                            {
                            product['productQuantityDelivered']
                            ?
                            product['productQuantityDelivered']
                            :
                            <input
                            style={{height:'2vh',width:'10vw', fontSize:'2vh',marginTop:'0',marginBottom:'0'}}
                            className="form-control"
                            onChange={e =>
                            setDeliveredProduct(e.target.value)
                            }
                        />
                            }
                            </li>
                            <li className="mb-1 text-secondary">{props.shipments.label.labelId}</li>
                    </ul>
                        <div></div>
                        </div>
                    </div>
                    ))}
                {/* <div className="arrow float-right" onClick={() => {
                    props.setMenuProduct(!props.menuProduct)
                    props.setProductHighLight(false);
                }}><img src={props.menuProduct?Down:traceDrop} alt="actions" height="7" width="12"
                    /></div> */}
            </div>

    )
}


export default ProductList;
