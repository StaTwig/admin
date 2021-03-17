import React, { useState } from 'react';
import EditRow from './editRow';
import './style.scss';

const EditTable = props => {

  
 return (
    <div className="">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between txtColor flex-row pb-3">
          <div className="w-15"> Product Name</div>
          <div className="w-15">
            Manufacturer
          </div>
          <div className="w-10">Quantity</div>
        <div className="w-10">
            <span>Mfg Date</span>
          </div>
          <div className="w-10">Exp date</div>
          <div className="w-10">Batch Number</div>
          <div className="w-15">
            <span>Serial Numbers</span>
         </div>
         <div>
           <span>&nbsp;</span>
         </div>
        </div>
          {props.inventories.map((inventory, index) => <EditRow key={index} {...props} {...inventory} idx={index} />)}
        </div>
    </div>
  );
};

export default EditTable;


/*<div className="input-group-append">
<img src={downArrow} alt="downarrow" width="9" height="9" />
</div>*/
