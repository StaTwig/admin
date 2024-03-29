import React, { useState } from "react";
import EditRow from "./editRow";
import "./style.scss";

const EditTable = (props) => {
  const [visible, setVisible] = useState(false);
  const { setOpenFailInventory, setInventoryError } = props;
  return (
    <div className=''>
      <div className='d-flex flex-column'>
        {/* <div className="d-flex txtColor flex-row pb-3">
          <div className={visible ? `w-15` : `w-20`}> Product Name</div>
          <div className={visible ? `w-15` : `w-20`}>
            Manufacturer
          </div>
         <div className={visible ? `w-10` : `w-20`}>Quantity</div>
         {visible &&
          <>
            <div className="w-10">
              <span>Mfg Date</span>
            </div>
            <div className="w-10">Exp date</div>
            <div className="w-10">Batch Number</div>
            <div className="w-15">
              <span>Serial Numbers</span>
            </div>
          </>
         }
         <div>
           <span>&nbsp;</span>
         </div>
        </div> */}
        {props.inventories.map((inventory, index) => (
          <EditRow
            key={index}
            {...props}
            {...inventory}
            idx={index}
            setVisible={setVisible}
            setOpenFailInventory={setOpenFailInventory}
            setInventoryError={setInventoryError}
          />
        ))}
      </div>
    </div>
  );
};

export default EditTable;
