import React from "react";

const Product = (props) => {
  const { product, index, t } = props;
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
          <span className='col text-secondary'>{t('product_id')}: </span>
          <span className='col font-weight-bold'>
            {product.productID ? product.productID : product.productId}
          </span>
        </div>
        <div className='row pb-1 pt-1'>
          <span className='col text-secondary'>{t('product_name')}: </span>
          <span className='col font-weight-bold'>{truncate(product.productName, 20)}</span>
        </div>
        {product.batchNumber && (
          <div className='row pb-1 pt-1'>
            <span className='col text-secondary'>{t('batch_no')}: </span>
            <span className='col font-weight-bold'>{product.batchNumber}</span>
          </div>
        )}
        <div className='row pb-1 pt-1'>
          <span className='col text-secondary'>{t('quantity')}: </span>
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
