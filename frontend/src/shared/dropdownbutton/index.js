import React, { useState } from "react";
import parse from 'html-react-parser';
import upDownArrow from "../../assets/icons/drop-down.png";
import './style.scss';

const DropdownButton = ({
    groups
}) => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="custom-dropdown">
      <button
        className={`btn-custom-dropdown ${menu && 'active'}`}
        role="button"
        onClick={() => setMenu(!menu)}
      >
        <img src={upDownArrow} alt="downarrow" width="16" height="16" />
      </button>
      {
        menu && <div className="dropdown-menu show transform-group">
          {
            groups && groups.map((item,index) => {
              return (
                <React.Fragment key={item}>
                  <span className="dropdown-item" >{ parse(item) }</span>
                  {
                    (index + 1 < groups.length) && <hr />
                  }
                </React.Fragment>
              )
            })
          }
        </div>
      }
    </div>
  );
};



export default DropdownButton;

