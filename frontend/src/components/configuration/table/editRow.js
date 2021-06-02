import React, { useState } from "react";
import "./style.scss";
import { updateOrgTypesUrl } from "../../../actions/organisationActions";
import { addNewOrgTypesUrl } from "../../../actions/organisationActions";

const EditRow = (props) => {
  const [editButtonStatus, setEditButtonStatus] = useState(false);
  const [changeValue, setValue] = useState("");
  const [changebtn, setbtn] = useState(false);
  const [addnew, setAddnew] = useState(!props.category);
  const [disabled, setDisabled] = useState(true);
  const {
    prod,
    handleQuantityChange,
    index,
    onRemoveRow,
    category,
    handleProductChange,
    products,
    handleCategoryChange,
    add,
  } = props;

  //console.log(add,"9999999999999999");
  console.log(props.category, "wwwwqqqqqqqqq");

  const onEditClick = (e) => {
    setDisabled(!disabled);
    setEditButtonStatus(true);
    //setDisabled(!disabled);
    //setEditButtonStatus(false);
  };

  const onAddClick = (e) => {
    // console.log(e,"oooooooooooooooo");
    const data = {
      name: changeValue,
    };
    addNewOrgTypesUrl(data);
    setAddnew(false);

    // props.category=false;
  };

  const onSaveClick = (e) => {
    const data = {
      id: prod.id,
      name: changeValue,
    };
    updateOrgTypesUrl(data);
    setbtn(true);
    setDisabled(!disabled);
    setEditButtonStatus(false);
  };

  const handleNameChange = (e) => {
    setValue(e);
  };

  return (
    <div className="row ml-3">
      <div className="trow row text-dark col">
        <div className="col tcell text-center justify-content-center p-2">
          <div className="">
            <input
              className="form-control"
              placeholder="Type"
              defaultValue={prod.name}
              disabled={disabled}
              onChange={(e) => handleNameChange(e.target.value, index)}
            />
          </div>
        </div>

        <div className="pr-3">
          <div>
            {editButtonStatus ? (
              <div>
                {addnew ? (
                  <button
                    className="bg-white btn-outline-primary d-width"
                    onClick={onSaveClick}
                  >
                    <i className="fa fa-pencil"></i>
                    <span className="ml-1">{changebtn ? "Saved" : "Save"}</span>
                  </button>
                ) : (
                  <button
                    className="bg-white btn-outline-primary d-width"
                    onClick={onAddClick}
                  >
                    <i className="fa fa-pencil"></i>
                    <span className="ml-1">ADD</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                className="bg-white btn-outline-primary d-width"
                onClick={onEditClick}
              >
                <i className="fa fa-pencil"></i>
                <span className="ml-1">EDIT</span>
              </button>
            )}
          </div>
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
