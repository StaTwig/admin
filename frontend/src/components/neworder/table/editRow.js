import React from 'react';
import Delete from '../../../assets/icons/Delete.png';
import DropdownButton from '../../../shared/dropdownButtonGroup';
import Select from 'react-select';
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
    handleCategoryChange,
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
    if (!regex.test(key)) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  }

  return (
    <div className="row ml-3">
      <div className="trow row text-dark col">
        <div className="col pl-4 tcell p-2">
          <div className=" p-0">
            <div className="d-flex flex-column">
              <div className="title recived-text">
                {/* <DropdownButton
                  name={prod.type ? prod.type : "Select Product Category"}
                  onSelect={item => { handleCategoryChange(index, item) }}
                  groups={category}
                /> */}
                <Select
                  className="no-border"
                  placeholder={<div className="select-placeholder-text">Select Product Category</div>} 
                  
                  defaultInputValue={prod.type}
                  onChange={(v) => handleCategoryChange(index, v.value)}
                  options={category}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col tcell text-center justify-content-center">
          <div className="">
            <div className="d-flex flex-row justify-content-between">
              <div className="title recived-text w-50">
                {/* <DropdownButton
                  name={prod.name ? prod.name : "Product Name"}
                  onSelect={item => { handleProductChange(index, item) }}
                  groups={products}
                /> */}
                <Select
                  className="no-border"
                  placeholder={<div className="select-placeholder-text">Product Name</div>} 
                  value={{value: prod.id, label: prod.name}}
                  defaultInputValue={prod.name}
                  onChange={(v) => handleProductChange(index, v)}
                  options={products}
                />
              </div>
              <div className="title recived-text align-self-center">{prod.id ? prod.id : <div className="placeholder_id">Product ID</div>}</div>
            </div>
          </div>
        </div>
        <div className="col text-center justify-content-center ">&nbsp;&nbsp;{prod.manufacturer ? prod.manufacturer : <div className="placeholder_manufacture">Manufacturer</div>}</div>
        <div className="col tcell text-center justify-content-center p-2">
          <div className="">
            <input
              className="form-control text-center"
              placeholder="Enter Quantity"
              onKeyPress={numbersOnly}
              value={prod.productQuantity ? prod.productQuantity : prod.quantity}
              onChange={e => handleQuantityChange(e.target.value, index)}
            />
          </div>
        </div>
      </div>
      {props.product.length > 0 &&
        <div className=" m-3 bg-light">
          <span className="del-pad shadow border-none rounded-circle ml-2 " onClick={() => onRemoveRow(index)}><img className=" cursorP  p-1" height="30" src={Delete} /></span>
        </div>
      }
    </div>
  );
};

export default EditRow;


