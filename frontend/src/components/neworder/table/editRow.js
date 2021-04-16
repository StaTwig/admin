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
                <DropdownButton
                  name={prod.type ? prod.type : "Select Product Category"}
                  onSelect={item => { handleCategoryChange(index, item) }}
                  groups={category}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col tcell text-center justify-content-center p-2">
          <div className=" p-0">
            <div className="d-flex pt-1 flex-row justify-content-between">
              <div className="title col-6 recived-text">
                <DropdownButton
                  name={prod.name ? prod.name : "Product Name"}
                  onSelect={item => { handleProductChange(index, item) }}
                  groups={products}
                />
              </div>
              <div className="title recived-text">{prod.id ? prod.id : "Product ID"}</div>
            </div>
          </div>
        </div>
        <div className="col tcell text-center justify-content-center p-2">&nbsp;&nbsp;{prod.manufacturer ? prod.manufacturer : "Manufacturer"}</div>
        <div className="col tcell text-center justify-content-center p-2">
          <div className="">
            <input
              className="form-control text-center"
              placeholder="Quantity"
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


