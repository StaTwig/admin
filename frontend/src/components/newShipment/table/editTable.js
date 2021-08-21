import React, { useState } from 'react';
import EditRow from './editRow';
import './style.scss';

const EditTable = props => {
 return (
    <div className="table productTable mt-2">
     <div className="d-flex flex-column">
       <div className="row mb-3">
       <div className="col theader text-center pro">Product Category*</div>
         <div className="col theader text-center pro">Product Name*</div>
         <div className="col theader text-center pro">Manufacturer</div>
         <div className="col theader text-center pro mr-5">Quantity*</div>
         <div className="col theader text-center pro mr-5" style={{position:'relative',left:"-60px"}}>Batch Number</div>
         {props.enableDelete &&
           <div className=" ml-2 bg-light align-self-center ">&nbsp;</div>
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
