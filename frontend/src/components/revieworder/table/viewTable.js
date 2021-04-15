import React, { useState } from 'react';
import ViewRow from './viewRow';
import './style.scss';
import mon from '../../../assets/icons/brand.svg';
import Package from '../../../assets/icons/package.svg';
import quantity from '../../../assets/icons/TotalInventoryAdded_2.png';

const ViewTable = props => {  
 return (
    <div className="table productTable mb-0  mt-2">
     <div className="d-flex flex-column">
       <div className="row ml-3 mb-3">
         <div className="col theader text-center pro"><img src={Package} width="16" height="16" /><span className="pl-2 text-muted">Product Category*</span></div>
         <div className="col theader text-center pro"><img src={Package} width="16" height="16" /><span className="pl-2 text-muted">Product*</span></div>
         <div className="col theader text-center pro"><img src={mon} width="16" height="16" /><span className="pl-2 text-muted">Manufacturer</span></div>
         <div className="col theader text-center pro"><img src={quantity} width="24" height="16" /><span className="pl-2 text-muted">Quantity*</span></div>
        </div>
        <div className="">
          {props.product.map((product, index) => (
            <ViewRow
              key={index}
              prod={product}
              {...props}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTable;