import React, { useState } from 'react';
import EditRow from './editRow';
import './style.scss';

const EditTable = props => {

  
 return (
    <div className="table editTable">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead"> Product Name</div>
          <div className="rTableHead">
            <span>Manufacturer</span>
          </div>
          <div className="rTableHead">Quantity</div>
          <div className="rTableHead">
            <span>Mfg Date</span>
          </div>
          <div className="rTableHead">Exp date</div>
          <div className="rTableHead">
            <span>Storage Conditions</span>
          </div>
          <div className="rTableHead">Batch Number</div>
          <div className="rTableHead">
            <span>Serial Numbers</span>
          </div>
        </div>
        <div >
          {props.editRowData.map(rowData => <EditRow {...rowData} />)}
        </div>
      </div>
    </div>
  );
};

export default EditTable;


/*<div className="input-group-append">
<img src={downArrow} alt="downarrow" width="9" height="9" />
</div>*/