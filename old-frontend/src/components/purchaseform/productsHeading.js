import React from 'react';
import './style.scss';
const tableHeader = ['Product ID', 'Product Name', 'Manufacturer', 'Quantity','Price'];
const ProductsHeading = () => {

    return (
         <div className="rTableHeading">
                    {tableHeader &&
                        tableHeader.map((item, index) => {
                            return (
                                <div key={index} className="rTableHead pro">
                                  {item}
                                </div>
                              );
                
                        })}
                </div>
           
    );

}

export default ProductsHeading;