import React from "react";
import DropdownButton from '../../shared/dropdownButtonGroup';
import './style.scss';

const ProductsTable = ({
  tableHeader
}) => {
  return (
    <div className="table productTable">
      <div className="rTable">
        <div className="rTableHeading">
          {
            tableHeader && tableHeader.map((item) => {
              return <div className="rTableHead">{item}</div>
            })
          }
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
                <input type="text" className="form-field" placeholder="Enter Qunatity" />
              </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};



export default ProductsTable;

