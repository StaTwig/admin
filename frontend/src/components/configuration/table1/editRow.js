import React from "react";
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
  };

  return (
    <div className="row ml-3">
      <div className="trow row text-dark col">
        <div className="col tcell text-center justify-content-center p-2">
          <div className="">
            <input
              className="form-control"
              placeholder="Type"
              value={
                prod.productQuantity ? prod.productQuantity : prod.quantity
              }
              onChange={(e) => handleQuantityChange(e.target.value, index)}
            />
          </div>
        </div>
        <div className="pr-3">
          <button className="bg-white btn-outline-primary d-width">
            <i className="fa fa-pencil"></i>
            <span className="ml-1">Edit</span>
          </button>
        </div>
      </div>
      {/* {props.product.length > 0 &&
        <div className=" m-3 bg-light">
          <span className="del-pad shadow border-none rounded-circle ml-2 " onClick={() => onRemoveRow(index)}><img className=" cursorP  p-1" height="30" src={Delete}/></span>
        </div>
      } */}
    </div>
  );
};

export default EditRow;

// import React from 'react';
// // import Delete from '../../../assets/icons/Delete.png';
// import DropdownButton from '../../../shared/dropdownButtonGroup';
// import './style.scss';

// const EditRow = props => {
//   const {
//     prod,
//     handleQuantityChange,
//     index,
//     onRemoveRow,
//     category,
//     handleProductChange,
//     products,
//     handleCategoryChange,
//   } = props;

//   return (
//     <div className="row ml-3">
//       <div className="trow row text-dark col">
//         <div className="col pl-4 tcell p-2">
//           <div className=" p-0">
//             <div className="d-flex flex-column">
//               <div className="title recived-text">

//                 <input
//               className="form-control text-center"
//               placeholder="Quantity"
//                 />
//               </div>
//             </div>
//           </div>
//           </div>
//             </div>
//           </div>

//   );
// };

// export default EditRow;
