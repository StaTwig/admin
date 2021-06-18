import React, { useState, useEffect } from 'react';
import Delete from '../../../assets/icons/Delete.png';
import DropdownButton from '../../../shared/dropdownButtonGroup';
import Select from 'react-select';
import './style.scss';

const EditRow = props => {
  const {
    prod,
    handleQuantityChange,
    handleLabelIdChange,
    index,
    onRemoveRow,
    enableDelete,
    category,
    handleCategoryChange,
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

//console.log("yyyy",prod);

// const handlee = () =>
// {
//   console.log("Hi");
//     const value = document.getElementById("checker").value;
//     console.log("value is " + value);
//     if(value)
//     {
//       this.props.checkAndTrace(true);
//     }
//     else{
//       this.props.checkAndTrace(false);
//     }
// };

  return (
    <div className="row ml-3 mr-1">
      <div className="trow row mr-1 col">
        <div className="col pl-4 tcell p-2">
          <div className=" p-0">
            {/* <div className="profileIconRound recived-bg">OPV</div> */}

            <div className="d-flex flex-column">
              <div className="title recived-text">
                {/* <DropdownButton
                  name={prod.type ? prod.type : "Select Product Category"}
                  onSelect={item => { handleCategoryChange(index, item) }}
                  groups={category}
                /> */}
                <Select
                  className="no-border"
                  placeholder="Select Product Category"
                  defaultInputValue={prod.type}
                  onChange={(v) => handleCategoryChange(index, v.value)}
                  options={category}
                />
              </div>
            </div>
</div>
</div>

<div className="col pl-4 tcell p-2">
          <div className=" p-0">
            <div className="col tcell text-center justify-content-center pl-0">
              <div className="title recived-text">
              {/* {enableDelete ?
                <DropdownButton
                  //name={prod.name == '' ? "Select product" : prod.name}
                  name={prod.name ?  prod.name: "Select Product Name"}
                  onSelect={item => { handleProductChange(index, item) }}
                  groups={products}
                  // groups={products.filter(p => !p?.isSelected)}
                /> : prod.name
                } */}
                {enableDelete ?
                <Select
                  className="no-border"
                  placeholder="Select Product Name"
                  defaultInputValue={prod.name}
                  onChange={(v) => handleProductChange(index, v)}
                  options={products}
                /> : prod.name
                }
              </div>
              
            </div>
          </div>
        </div>
        <div className="col tcell text-center justify-content-center p-2">{prod.manufacturer ? prod.manufacturer : "Manufacturer"}</div>
        <div className="col tcell text-center justify-content-center p-2">
          <div className="">
            <input
              className="form-control text-center"
              id="checker"
              placeholder="Quantity"
              onKeyPress={numbersOnly}
              value={prod.productQuantity}
              onChange={e => handleQuantityChange(e.target.value, index)}
            />
          </div>
        </div>
      </div>
        {enableDelete && props.product.length > 1 &&
          <div className="m-3 bg-light">
          <span className="del-pad shadow border-none rounded-circle ml-2 " onClick={() => onRemoveRow(index)}><img className=" cursorP  p-1" height="30" src={Delete} /></span>
          </div>
        }
      </div>
    // <div className="rTableRow"
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

