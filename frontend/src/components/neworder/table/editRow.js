import React from 'react';
import Delete from '../../../assets/icons/Delete.png';
import DropdownButton from '../../../shared/dropdownButtonGroup';
import './style.scss';

const EditRow = props => {
  const {
    prod,
    handleQuantityChange,
    index,
    onRemoveRow,
    category,
    handleProductChange,
    products,
    handleCategoryChange
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
    <div class="trow text-muted">
      <div class="w-25 pl-4 tcell p-2">
        <div class=" p-0">
          <div class="d-flex flex-column">
            <div class="title recived-text">{prod.type}</div>
            {prod.type == '' &&
              <DropdownButton
                name="Category"
                onSelect={item => { handleCategoryChange(index, item) }}
                groups={category}
              />
            }
          </div>
        </div>
      </div>
      <div class="w-30 tcell text-center justify-content-center p-2">
        <div class=" p-0">
          <div class="d-flex flex-row justify-content-between">
            <div class="title recived-text">{prod.name}</div>
            <div class="title recived-text">{prod.id}</div>
            {prod.name == '' &&
              <DropdownButton
                name="Product"
                onSelect={item => { handleProductChange(index, item) }}
                groups={products}
              />
            }
          </div>
        </div>
      </div>
      <div class="w-25 tcell text-center justify-content-center p-2">{prod.manufacturer}</div>
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
      <div className=" ml-2 bg-light align-self-center">
        <span onClick={() => onRemoveRow(index)}><img className="border-none cursorP shadow p-1 rounded-circle" height="25" src={Delete} /></span>
      </div>
    </div>

  );
};

export default EditRow;


