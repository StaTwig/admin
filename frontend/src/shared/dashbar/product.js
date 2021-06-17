import React from 'react';

const Product = props => {
    const { product, index } = props;

    return (
        <div key={index} className="mb-1 subprod">
            <div className="text-primary mt-2" key={product.productId}>
                <strong>{product.productName}</strong>
            </div>
            <div className="d-flex flex-column mb-2">
                <div className="row pb-1 pt-1">
                    <span className="col text-secondary">Product ID: </span>
                    <span className="col font-weight-bold">{product.productID}</span>
                </div>
                <div className="row pb-1 pt-1">
                    <span className="col text-secondary">Product Name: </span>
                    <span className="col font-weight-bold">{product.productName}</span>
                </div>
                <div className="row pb-1 pt-1">
                    <span className="col text-secondary">Quantity: </span>
                    <span className="col font-weight-bold">{product.productQuantity}</span>
                </div>
            </div>
        </div>
    );
};
export default Product;
