import React, { useState } from 'react';
import EditRow from './editRow';
import './style.scss';

const EditTable = props => {

  
 return (
    <div className="table editTable">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead"> Product ID</div>
          <div className="rTableHead">
            <span>Product Name</span>
          </div>
          <div className="rTableHead">Manufacturer</div>
          <div className="rTableHead">Quantity</div>
          <div className="rTableHead">Lable ID</div>
        </div>
        <div >
         <EditRow {...props} />
        </div>
      </div>
    </div>
  );
};

export default EditTable;


/*<div className="input-group-append">
<img src={downArrow} alt="downarrow" width="9" height="9" />
</div>*/
