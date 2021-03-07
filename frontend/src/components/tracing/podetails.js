import React from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss';

const PoDetails = (props) => {
  return (
    Object.keys(props.shipments).length === 0 || (!props.shipments.poDetails) ? <div className="row panel">N/A</div> :
      <div className="col panel commonpanle">
        <div className="d-flex flex-row potext mb-4">
            <div className=" text-secondary mr-3">Purchase Order ID</div>  
            <div>{props.shipments.poDetails[0].id}</div>
      </div>
      <div className="poheads potext mb-4">Supplier Details:</div>
      <div className="d-flex flex-row potext mb-4">
        <div className="d-flex flex-column mr-4 text-secondary">
            <div className="mb-3">Organisation ID</div> 
            <div className="mb-3">Organisation Name</div>  
            <div>Supplier Location</div>   
      </div>
      <div className="d-flex flex-column">
            <div className="mb-3">{props.shipments.poDetails[0].supplier.supplierOrganisation}</div>
            <div className="mb-3">Bharat-Bio</div>  
            <div>Mumbai</div>   
      </div>
     
      </div>

      <div className="poheads potext mb-4">Customer Details:</div>
      <div className="d-flex flex-row potext mb-4">
        <div className="d-flex flex-column mr-4 text-secondary">
            <div className="mb-3">Organisation ID</div> 
            <div className="mb-3">Delivery Location ID</div>  
            <div>Delivery Location</div>   
      </div>
      <div className="d-flex flex-column">
            <div className="mb-3">{props.shipments.poDetails[0].customer.customerOrganisation}</div>
            <div className="mb-3">LO-847</div>  
            <div>Delhi</div>   
      </div>
     
      </div>
      <div className="poheads potext mb-4">Product Details:</div>
      <table>
        <thead>
          <tr>
            <th scope="col" className=" potext text-secondary">Product ID</th>
            <th scope="col " className=" potext text-secondary">Product Name</th>
            <th scope="col" className=" potext text-secondary">Manufacturer</th>
             <th scope="col" className=" potext text-secondary">Quantity</th>
            </tr>
        </thead>
        <tbody>
        {props.shipments.poDetails[0].products.map(product => <tr>
          <td><small>{product.productId}</small></td>
          <td><small>OPV</small></td>
          <td><small>Bharat</small></td>
          <td><small>{product.productQuantity}</small></td>
        </tr>)}
         
     </tbody>
      </table>
      <div className="d-flex justify-content-end mt-2">
        <div className="d-flex flex-column">
          <div className=" potext text-secondary">Total Quantity</div>
          <div className="text-info font-weight-bold">{props.shipments.poDetails[0].products[0].productQuantity}</div>
        </div>
      </div>

        <div className="arrow float-right" onClick={() => props.setMenu(!props.menu)}><img src={props.menu ?Down:traceDrop} alt="actions" height="7" width="12" /></div>

      </div>
  );
}


export default PoDetails;