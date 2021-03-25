import React, { useState } from 'react';
import EditRow from './editRow';
import './style.scss';

const EditTable = props => {  
 return (
    <div className="table productTable mt-2">
     <div className="d-flex flex-column">
       <div class="d-flex flex-row  mb-3">
         <div class="w-25 theader text-left pro">Product Name</div>
         <div class="w-30 theader text-center pro">Manufacturer</div>
         <div class="w-30 theader text-center pro">Quantity</div>
         {props.enableDelete &&
           <div class=" ml-2 bg-light align-self-center ">&nbsp;</div>
         }
        </div>
        {/* <div className="rTableHeading">
          <div className="rTableHead"> Product ID</div>
          <div className="rTableHead">
            <span>Product Name</span>
          </div>
          <div className="rTableHead">Manufacturer</div>
          <div className="rTableHead">Quantity</div>
          <div className="rTableHead">Label ID</div>
        </div> */}
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
