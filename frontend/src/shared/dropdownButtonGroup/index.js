import React, { useState, useRef } from "react";
import parse from 'html-react-parser';
import useOnclickOutside from 'react-cool-onclickoutside';

import upDownArrow from "../../assets/icons/up-and-down-blue.svg";
import './style.scss';

const dropdownButtonGroup = (props) => {
  const [menu, setMenu] = useState(false);
  const { groups, name, onSelect } = props;

  const ref = useRef();
  useOnclickOutside(ref, () => {
    setMenu(false);
  });
  const useParse = name.includes('<');
  return (
    <div className="custom-dropdown">
      <button
        className={`btn-custom-dropdown ${menu && 'active'}`}
        role="button"
        onClick={() => setMenu(!menu)}
      >
        {!useParse && <span>{name}</span>}
        {useParse && <span>{parse(name)}</span>}
        <img src={upDownArrow} alt="downarrow" width="9" height="9" />
      </button>
      {
        menu && <div ref={ref} className="dropdown-menu show transform-group">
          {
            groups && groups.map((item,index) => {
              return (
                <React.Fragment key={index}>
                  <span className="dropdown-item" onClick={() => {
                    setMenu(false);
                    onSelect(item);
                  }} >{ parse(item) }</span>
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



export default dropdownButtonGroup;

