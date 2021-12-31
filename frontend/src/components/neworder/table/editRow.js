import React from "react";
import Delete from "../../../assets/icons/Delete.png";
import Select from "react-select";
import "./style.scss";
const EditRow = (props) => {
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
    if (e.type === "paste") {
      key = e.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    // console.log(e);
    if (!e.target.value && key === 0) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
      e.cancelBubble = true;
      return false;
    } else {
      var regex = /^\d*[0-9]\d*$/;
      if (!regex.test(key)) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
      }
    }
  };
  return (
    <div className="row ml-3">
      <div className="trow row text-dark col">
        <div className="col-3 ml-3 tcell">
          <div className="">
            <div className="col-13 d-flex flex-column">

              <div className="title recived-text">
                {/* <DropdownButton
                  name={prod.type ? prod.type : "Select Product Category"}
                  onSelect={item => { handleCategoryChange(index, item) }}
                  groups={category}
                /> */}

                {console.log(prod.type)}
                <Select
                  className="no-border"
                  placeholder={
                    <div className="select-placeholder-text">
                      Select Product Category
                    </div>
                  }
                  value={
                    prod.type === undefined ||
                    prod.id === undefined ||
                    prod.type === ""
                      ? null
                      : { value: prod.id, label: prod.type }
                  }
                  defaultInputValue={prod.type}
                  onChange={(v) => handleCategoryChange(index, v.value)}
                  options={category}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="divider1"></div>
        <div className="col-4 tcell text-center justify-content-center">
          <div className="">
            <div className="d-flex flex-row justify-content-between">
              <div className="col-10 title recived-text w-50">
                {/* <DropdownButton
                  name={prod.name ? prod.name : "Product Name"}
                  onSelect={item => { handleProductChange(index, item) }}
                  groups={products}
                /> */}
                <Select
                  className="no-border mr-3 text-left"
                  placeholder={
                    <div className="select-placeholder-text">
                      {" "}
                      Product Name{" "}
                    </div>
                  }
                  value={
                    prod.id === undefined ||
                    prod.name === undefined ||
                    prod.name === ""
                      ? null
                      : { value: prod.id, label: prod.name }
                  }
                  defaultInputValue={prod.name}
                  onChange={(v) => {
                    handleProductChange(index, v);
                  }}
                  options={products.filter((p) => p.type === prod.type)}
                />
              </div>
              <div
                className="col-3 title recived-text align-self-center"
                style={{ position: "relative", right: "30px" }}
              >
                {prod.id ? (
                  prod.id
                ) : (
                  <div
                    className=""
                    style={{
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#a8a8a8",
                    }}
                  >
                    Product ID
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 text-center justify-content-center ">
          {prod.manufacturer ? (
            prod.manufacturer
          ) : (
            <div className="select-placeholder-text">Manufacturer</div>
          )}
        </div>
        <div className="divider1"></div>
        <div className="col-2 tcell text-center justify-content-center p-2">
          <div className="">
            <input
              style={{ position: "relative", left: "-20px" }}
              className="form-control text-center"
              placeholder="Enter Quantity"
              onKeyPress={numbersOnly}
              value={prod.productQuantity ? prod.productQuantity : ""}
              onChange={(e) => {
                handleQuantityChange(e.target.value, index);
              }}
            />
          </div>
        </div>
        <div
          className="title recived-text align-self-center"
          style={{ position: "absolute", right: "20px" }}
        >
          {/* prod.unitofMeasure? prod.unitofMeasure.name:null */}
          {prod.unitofMeasure ? (
            <div>
              {prod.unitofMeasure === undefined
                ? null
                : prod.unitofMeasure.name}
            </div>
          ) : (
            <div className="select-placeholder-text">Unit</div>
          )}
        </div>
      </div>
      {props.product.length > 1 && (
        <div className=" m-3 bg-light">
          <span
            className="del-pad shadow border-none rounded-circle ml-2 "
            onClick={() => onRemoveRow(index)}
          >
            <img className=" cursorP  p-1" height="30" src={Delete} alt="" />
          </span>
        </div>
      )}
    </div>
  );
};

export default EditRow;
