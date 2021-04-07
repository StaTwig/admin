import React from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss';

const PoDetails = (props) => {
  return (
    Object.keys(props.shipments).length === 0 || (!props.shipments.poDetails) ? <div className="row panel">N/A</div> :
      <div className="col panel commonpanle">
        <div className="ml-2 mt-2">
        <div className="d-flex flex-row potext mb-4">
            <div className=" text-secondary mr-3">Purchase Order ID</div>  
            <div>{props.shipments.poDetails[0].id}</div>
      </div>
      <div className="poheads potext mb-4">Supplier Details:</div>
      <div className="d-flex flex-row potext mb-4">
        <div className="d-flex flex-column mr-4 text-secondary">
            <div className="mb-3">Organisation ID</div> 
            <div className="mb-3 mt-1">Organisation Name</div>  
            <div className="mt-1">Supplier Location</div>   
      </div>
      <div className="d-flex flex-column">
            <div className="mb-3">{props.shipments.poDetails[0].supplier.supplierOrganisation}</div>
            <div className="mb-3  mt-1">{props.shipments.supplierOrgName}</div>  
            <div className="mt-1">{props.shipments.fromLocation}</div>   
      </div>
     
      </div>

      <div className="poheads potext mb-4">Customer Details:</div>
      <div className="d-flex flex-row potext mb-4">
        <div className="d-flex flex-column mr-4 text-secondary">
            <div className="mb-3">Organisation ID</div> 
            <div className="mb-3 mt-1">Delivery Location ID</div>  
          <div className="mt-1">Delivery Location</div>   
      </div>
      <div className="d-flex flex-column">
            <div className="mb-3">{props.shipments.poDetails[0].customer.customerOrganisation}</div>
            <div className="mb-3 mt-1">{props.shipments.customerOrgName}</div>  
            <div className="mt-1">{props.shipments.toLocation}</div>   
      </div>
     
      </div>
      <div className="poheads potext mb-4">Product Details:</div>
      <table>
        <thead>
          <tr>
            <th scope="col" className=" potexttable text-secondary">Product ID</th>
            <th scope="col " className=" potexttable text-secondary">Product Name</th>
            <th scope="col" className=" potexttable text-secondary">Manufacturer</th>
             <th scope="col" className=" potexttable text-secondary">Quantity</th>
            </tr>
        </thead>
        <tbody>
        {props.shipments.poDetails[0].products.map(product => <tr>
          <td className=" potexttable">{product.productId}</td>
          <td className=" potexttable">N/A</td>
          <td className=" potexttable">N/A</td>
          <td className=" potexttable">{product.productQuantity}</td>
        </tr>)}
         
     </tbody>
      </table>
      <div className="d-flex justify-content-end mt-2">
        <div className="d-flex flex-column">
          <div className=" potext text-secondary mb-2 mt-1">Total Quantity</div>
          <div className="text-info font-weight-bold">{props.shipments.poDetails[0].products[0].productQuantity}</div>
        </div>
      </div>

        <div className="arrow float-right" onClick={() => props.setMenu(!props.menu)}><img src={props.menu ?Down:traceDrop} alt="actions" height="7" width="12" /></div>

      </div>
      </div>
  );
}


export default PoDetails;
