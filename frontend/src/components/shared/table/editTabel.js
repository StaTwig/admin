import React from "react";
import DropdownButton from '../dropdownButtonGroup';
import calenderBlue from "../../../assets/icons/calendar-blue.svg";
import upDownArrow from "../../../assets/icons/up-and-down-blue.svg";
import downArrow from "../../../assets/icons/up-and-down-dark.svg";

import './style.scss';

const EditTable = () => {
  return (
    <div className="table editTable">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Name</div>
          <div className="rTableHead"><span>Telephone</span></div>
          <div className="rTableHead">Name</div>
          <div className="rTableHead"><span>Telephone</span></div>
          <div className="rTableHead">Name</div>
          <div className="rTableHead"><span>Telephone</span></div>
          <div className="rTableHead">Name</div>
          <div className="rTableHead"><span>Telephone</span></div>
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
                <input type="text" className="form-field" placeholder="Select Product" />
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input type="date" className="form-field" placeholder="MM/YYYY" />
                <div className="input-group-append">
                  <img src={calenderBlue} alt="downarrow" width="16" height="16" />
                </div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input type="date" className="form-field" placeholder="MM/YYYY" />
                <div className="input-group-append">
                  <img src={calenderBlue} alt="downarrow" width="16" height="16" />
                </div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input type="text" className="form-field" placeholder="Select Product" />
              </div>
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input type="text" className="form-field" placeholder="Select Product" />
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input type="text" className="form-field" placeholder="Select Product" />
                <div className="input-group-append">
                  <img src={downArrow} alt="downarrow" width="16" height="16" />
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

