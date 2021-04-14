import React, { useState } from 'react';
import EditRow from './editRow';
import mon from '../../../assets/icons/brand.svg';
import Package from '../../../assets/icons/package.svg';
import quantity from '../../../assets/icons/TotalInventoryAdded_2.png';
import './style.scss';

const EditTable = props => {  
 return (
    <div className="table productTable mb-0 mt-2">
     <div className="d-flex flex-column">
       <div className="row  mb-3">
         <div className="col theader text-center pro"><img src={Package} width="16" height="16" /><span className="pl-3 text-muted">Product Category*</span></div>
         <div className="col theader text-center pro"><img src={Package} width="16" height="16" /><span className="pl-3 text-muted">Product*</span></div>
         <div className="col theader text-center pro"><img src={mon} width="16" height="16" /><span className="pl-3 text-muted">Manufacturer</span></div>
         <div className="col theader text-center pro"><img src={quantity} width="25" height="16" /><span className="pl-3 text-muted">Quantity*</span></div>
         <div className="ml-2 bg-light align-self-center ">&nbsp;</div>
        </div>
        <div className="">
          {props.product.map((product, index) => (
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
