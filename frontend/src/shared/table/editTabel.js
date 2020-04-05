import React from "react";
import DropdownButton from '../dropdownButtonGroup';
import calenderBlue from "../../assets/icons/calendar-blue.svg";
import downArrow from "../../assets/icons/up-and-down-dark.svg";

import './style.scss';

const EditTable = () => {
  return (
    <div className="table editTable">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead"> Product Name</div>
          <div className="rTableHead"><span>Manufacturer</span></div>
          <div className="rTableHead">Quantity</div>
          <div className="rTableHead"><span>Mfg Date</span></div>
          <div className="rTableHead">Exp date</div>
          <div className="rTableHead"><span>Storage Conditions</span></div>
          <div className="rTableHead">Batch Number</div>
          <div className="rTableHead"><span>Serial Numbers</span></div>
        </div>
        <div className="overflow">
          <div className="rTableRow">
            <div className="rTableCell">
              <div className="square-box" />
              <DropdownButton
                name="Select Product"
                groups={['bOPV', 'MMR', 'Hib', 'Hep B']}
              />
            </div>
            <div className="rTableCell">
              <DropdownButton
                name="Select Manufacturer"
                groups={['Manufacturer A <small>Qty: 2148</small>', 'Manufacturer D <small>Qty: 2148</small>', 'Manufacturer C <small>Qty: 2148</small>', 'Manufacturer D <small>Qty: 2148</small>']}
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input type="text" className="form-field" placeholder="Enter Quantity" />
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input type="text" className="form-field" placeholder="MM/YYYY" />
                <div className="input-group-append">
                  <img src={calenderBlue} alt="downarrow" width="9" height="9" />
                </div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input type="text" className="form-field" placeholder="MM/YYYY" />
                <div className="input-group-append">
                  <img src={calenderBlue} alt="downarrow" width="9" height="9" />
                </div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input type="text" className="form-field" placeholder="Enter Storage Conditions" />
              </div>
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input type="text" className="form-field" placeholder="Enter Batch Number" />
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input type="text" className="form-field" placeholder="Enter Serial Numbers" />
                <div className="input-group-append">
                  <img src={downArrow} alt="downarrow" width="9" height="9" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default EditTable;

