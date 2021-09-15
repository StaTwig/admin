import React from "react";
import "./style.scss";

const ProductList = (props) => {
  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <div>
      {props.shipments.products.map((product, index) => (
        <div
          className={
            props.productHighLight
              ? "col panel commonpanle highlight mb-3"
              : "col panel commonpanle mb-3"
          }
        >
          <div className='d-flex flex-row '>
            <ul className='w-75 elemens'>
              <li className='mb-1 text-secondary'>Product Name</li>
              <li className='mb-1 text-secondary'>Manufacturer</li>
              <li className='mb-1 text-secondary'>Batch Number</li>
              <li className='mb-1 text-secondary'>Quantity Sent</li>
              <li className='mb-1 text-secondary'>Quantity Received</li>
              <li className='mb-1 text-secondary'>Label ID</li>
            </ul>
            <ul className='elemens w-75'>
              <li className='mb-1'>{product.productName}</li>
              <li className='mb-1'>{product.manufacturer}</li>
              <li className='mb-1'>{product?.batchNumber}</li>
              <li className='mb-1'>
                {product.productQuantity}
                <span>{"  ("}</span>
                {product.unitofMeasure && product.unitofMeasure.name ? (
                  <span>{product.unitofMeasure.name}</span>
                ) : (
                  ""
                )}
                <span>{")"}</span>
              </li>
              <li className='mb-1'>
                {product["productQuantityDelivered"]
                  ? product["productQuantityDelivered"]
                  : ""}
                <span>{"  ("}</span>
                {product.unitofMeasure && product.unitofMeasure.name ? (
                  <span>{product.unitofMeasure.name}</span>
                ) : (
                  ""
                )}
                <span>{")"}</span>
              </li>
              <li className='mb-1'>{props.shipments.label.labelId}</li>
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
  );
};

export default ProductList;
