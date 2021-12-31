import React from "react";

const Product = (props) => {
  const { product, index } = props;
  //console.log("network",unitofMeasure)

  const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};
  return (
    <div key={index} className='mb-1 subprod'>
      <div className='text-primary mt-2' key={product.productId}>
        <strong>{truncate(product.productName, 40)}</strong>
      </div>
      <div className='d-flex flex-column mb-2'>
        <div className='row pb-1 pt-1'>
          <span className='col text-secondary'>Product ID: </span>
          <span className='col font-weight-bold'>
            {product.productID ? product.productID : product.productId}
          </span>
        </div>
        <div className='row pb-1 pt-1'>
          <span className='col text-secondary'>Product Name: </span>
          <span className='col font-weight-bold'>{truncate(product.productName, 20)}</span>
        </div>
        {product.batchNumber && (
          <div className='row pb-1 pt-1'>
            <span className='col text-secondary'>Batch Number: </span>
            <span className='col font-weight-bold'>{product.batchNumber}</span>
          </div>
        )}
        <div className='row pb-1 pt-1'>
          <span className='col text-secondary'>Quantity: </span>
          <span className='col font-weight-bold'>
            {product.productQuantity
              ? product.productQuantity
              : product.quantity}
            {" ("}
            {product.unitofMeasure ? product.unitofMeasure.name : "N/A"}
            {")"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Product;
