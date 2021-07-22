import React, { useState } from 'react';
import EditRow from './editRow';
import mon from '../../../assets/icons/brand.svg';
import Package from '../../../assets/icons/package.svg';
import quantity from '../../../assets/icons/TotalInventoryAdded_2.png';
import './style.scss';

const EditTable = props => {  
 return (
    <div className="table productTable mb-0 mt-1">
     <div className="d-flex flex-column">
       <div className="row  mb-2" style={{position:"relative", left:"0px"}}>
         <div className="col-4 theader text-center"><img src={Package} width="16" height="16" /><span className="ml-2 text-muted required-field">Product Category</span></div>
         <div className="col-3 theader text-center"><img src={Package} width="16" height="16" /><span className="ml-2 text-muted required-field">Product</span></div>
         <div className="col theader text-center ml-2"><img src={mon} width="16" height="16" /><span className="ml-2 text-muted">Manufacturer</span></div>
         <div className="col theader text-center mr-5"><img src={quantity} width="25" height="16" /><span className="ml-2 text-muted required-field">Quantity</span></div>
        
        </div>
        <div className="">
          {props.product && props.product.map((product, index) => (
            <EditRow
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

export default EditTable;


/*<div className="input-group-append">
<img src={downArrow} alt="downarrow" width="9" height="9" />
</div>*/
