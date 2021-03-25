import React, { useState, useEffect } from 'react';
import Delete from '../../../assets/icons/Delete.png';
import DropdownButton from '../../../shared/dropdownButtonGroup';
import './style.scss';

const EditRow = props => {
  const {
    prod,
    handleQuantityChange,
    handleLabelIdChange,
    index,
    onRemoveRow,
    enableDelete,
    handleProductChange,
    products
  } = props;

  const numbersOnly = (e) => {
    // Handle paste
    if (e.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      e.returnValue = false;
      if(e.preventDefault) e.preventDefault();
    }
  }
  

  return (
    <div class="trow ">
      <div class="w-25  pl-4 tcell p-2">
        <div class=" p-0">
          {/* <div class="profileIconRound recived-bg">OPV</div> */}

          <div class="d-flex flex-column">
            <div class="title recived-text">{prod.productName}</div>
            {prod.productName == '' &&
              <DropdownButton
                name="Select product"
                onSelect={item => { handleProductChange(index, item) }}
                groups={products.filter(p => !p?.isSelected)}
              />
            }
          </div>
        </div>
      </div>
      <div class="w-30 tcell text-center justify-content-center p-2">{prod.manufacturer}</div>
      <div class="w-30 tcell text-center justify-content-center p-2">
        <div className="">
          <input
            className="form-control text-center"
            placeholder="Quantity"
            onKeyPress={numbersOnly}
            value={prod.productQuantity}
            onChange={e => handleQuantityChange(e.target.value, index)}
          />
        </div>
      </div>
      {enableDelete &&
        <div className=" ml-2 bg-light align-self-center">
          <span onClick={() => onRemoveRow(index)}><img className="border-none cursorP shadow p-1 rounded-circle" height="25" src={Delete} /></span>
        </div>
      }
    </div>
    // <div className="rTableRow">
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Product ID"
    //         value={product.productID}
    //         disabled={true}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Product Name"
    //         value={product.productName}
    //         disabled={true}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Manufacturer"
    //         value={product.manufacturer}
    //         disabled={true}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Quantity"
    //         value={product.productQuantity}
    //         onChange={e => handleQuantityChange(e.target.value, index)}
    //       />
    //     </div>
    //   </div>
    //   <div className="rTableCell">
    //     <div className="form-group">
    //       <input
    //         className="form-field"
    //         placeholder="Label Id"
    //         value={product.labelId}
    //         onChange={e => handleLabelIdChange(e.target.value, index)}

    //       />
    //     </div>
    //   </div>
    // </div>


  );
};

export default EditRow;


