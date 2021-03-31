import React, { useState } from 'react';
import EditRow from './editRow';
import './style.scss';

const EditTable = props => {  
 return (
    <div className="table productTable mt-2">
     <div className="d-flex flex-column">
       <div class="row mb-3">
         <div class="col theader text-left pro">Product Name*</div>
         <div class="col theader text-center pro">Manufacturer</div>
         <div class="col theader text-center pro">Quantity*</div>
         {props.enableDelete &&
           <div class=" ml-2 bg-light align-self-center ">&nbsp;</div>
         }
        </div>
        <div >
          {props.product.map((product, index) => (
            <EditRow
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
