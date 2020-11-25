import React from 'react';
import './style.scss';

const ProductsTable = props => {
 /* const product = Object.keys(props.productData.poTxns.products)[0].split('-')[0];
  const manufacturer = Object.keys(props.productData.poTxns.products[0])[0].split('-')[1];
  const quantity = props.productData.poTxns.products[0][`${product}-${manufacturer}`]; */
  return (
    <div className="table productTable mt-2">
      <div className="rTable">
        <div className="rTableHeading">
          {props.tableHeader &&
            props.tableHeader.map((item, index) => {
              return (
                <div key={index} className="rTableHead pro">
                  {item}
                </div>
              );
            })}
        </div>
        <div>
          <div className="rTableRow">
          <div className="rTableCell">
          <input
            disabled
            type="text"
            className="form-control"
            value={props.productData.poTxns[props.productData.poTxns.length-1].material}
          />
         </div>
            <div className="rTableCell">
            <input
            disabled
            type="text"
            className="form-control"
            value = {props.productData.poTxns[props.productData.poTxns.length-1].vendorName}
           
          />
            </div>
            <div className="rTableCell">
            <input
            disabled
            type="text"
            className="form-control"
            value={props.productData.shipmentTxns[props.productData.shipmentTxns.length-1].products[0].productName}
          />
            </div>
            <div className="rTableCell">
              <div className="form-group">
              <input
            disabled
            type="text"
            className="form-control"
            value={props.productData.shipmentTxns[props.productData.shipmentTxns.length-1].products[0].quantity}
          />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
