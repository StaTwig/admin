import React, { useState, useEffect } from "react";
import Delete from "../../../assets/icons/Delete.png";
import { getProductList } from "../../../actions/productActions";
import "./style.scss";

const EditRow = (props) => {
  const {
    prod,
    handleQuantityChange,
    handleManufacturerChange,
    index,
    enableDelete,
    handleCategoryChange,
    handleProductChange,
    handleBatchChange,
    products,
    check,
  } = props;

  const [productsList, setProductsList] = useState([]);
  const [quantityChecker, setQuantityChecker] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const result = await getProductList();
      setProductsList(result.message);
    }

    fetchData();
  }, []);

  const new_products = [];

  if (typeof products != "undefined" && typeof productsList != "undefined") {
    for (var i = 0; i < products?.length; i++) {
      let check = false;
      for (var j = 0; j < productsList?.length; j++) {
        if (products[i].label === productsList[j].productName) {
          check = true;
          break;
        }
      }
      if (check) {
        new_products.push(products[i]);
      }
    }
  }

  const updateQuantity = () => {
    setQuantityChecker(0);
  };
  if (
    check === "0" &&
    quantityChecker === 1 &&
    typeof prod !== "undefined" &&
    typeof prod.name !== "undefined" &&
    typeof productsList !== "undefined"
  ) {
    let qty;
    for (let i = 0; i < productsList?.length; i++) {
      if (prod.name === productsList[i].productName) {
        qty = String(productsList[i].quantity);
        break;
      }
    }
    if (i < productsList?.length) {
      prod.productQuantity = qty;
      handleQuantityChange(prod.productQuantity, index);
      updateQuantity();
    }
  }

  const numbersOnly = (e) => {
    let key;
    if (e.type === "paste") {
      key = e.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  };

  return (
    <div className='row ml-1 mr-1'>
      <div className='trow row mr-1 col'>
        <div className='col tcell'>
          <div className=' p-0'>
            <div className='d-flex flex-column'>
              <div className='title recived-text'>
                {enableDelete ? (
                  <input
                    className='form-control text-center'
                    placeholder='Product Category'
                    value={prod.type}
                    onChange={(e) =>
                      handleCategoryChange(e.target.value, index)
                    }
                  />
                ) : (
                  prod.type
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='Divider1'></div>
        <div className='col tcell'>
          <div className=' p-0'>
            <div className='col tcell text-center justify-content-center pl-0'>
              <div className='title recived-text'>
                {enableDelete ? (
                  <input
                    className='form-control text-center'
                    placeholder='Product Name'
                    value={prod.name}
                    onChange={(e) => {
                      handleProductChange(index, e.target.value);
                    }}
                  />
                ) : (
                  prod.name
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col tcell text-center justify-content-center p-2'>
          {enableDelete ? (
            <input
              className='form-control text-center'
              placeholder='Manufacturer'
              value={prod.manufacturer}
              onChange={(e) => {
                handleManufacturerChange(e.target.value, index);
              }}
            />
          ) : (
            prod.manufacturer
          )}
        </div>

        <div className='col tcell text-center justify-content-center p-2'>
          <div className=''>
            <input
              className='form-control text-center'
              id='checker'
              placeholder='Quantity'
              onKeyPress={numbersOnly}
              value={prod.productQuantity}
              onChange={(e) => {
                handleQuantityChange(e.target.value, index);
              }}
            />
          </div>
        </div>
        <div
          className='title recived-text align-self-center'
          style={{ position: "relative", right: "40px" }}
        >
          <div className='placeholder_id'>Kgs</div>
        </div>

        <div className='col tcell text-center justify-content-center p-2'>
          <div className=''>
            <input
              className='form-control text-center'
              id='checker'
              placeholder='Batch number'
              value={prod.batchNumber}
              onChange={(e) => {
                handleBatchChange(e.target.value, index);
                setQuantityChecker(1);
              }}
            />
          </div>
        </div>
      </div>
      {
        // enableDelete && props.product.length > 1 &&
        //   <div className="m-3 bg-light">
        //   <span className="del-pad shadow border-none rounded-circle ml-2 " onClick={() => onRemoveRow(index)}><img className=" cursorP  p-1" height="30" src={Delete} /></span>
        //   </div>
      }

      {props.product.length > 1 && (
        <div
          className='m-2 pl-3 pt-1'
          style={{ position: "relative", left: "10px" }}
        >
          <span
            className='del-pad shadow border-none rounded-circle mr-1'
            onClick={() => props.onRemoveRow(index)}
          >
            <img
              className='cursorP p-1'
              height='30'
              src={Delete}
              alt='Delete'
            />
          </span>
        </div>
      )}
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
