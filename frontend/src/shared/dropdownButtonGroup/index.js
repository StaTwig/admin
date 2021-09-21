import React, { useState, useRef, useEffect } from "react";
import parse from "html-react-parser";
import useOnclickOutside from "react-cool-onclickoutside";

// import upDownArrow from '../../assets/icons/up-and-down-blue.svg';
import upDownArrow from "../../assets/icons/dropdown.svg";
import "./style.scss";

const dropdownButtonGroup = (props) => {
  const [menu, setMenu] = useState(false);
  const {
    groups,
    name,
    name2,
    onSelect,
    isText,
    value,
    changeFn,
    placeholder,
    dClass,
    disabled,
    arrowImg,
  } = props;

  const ref = useOnclickOutside(() => {
    setMenu(false);
  });
  const useParse = name && name.includes("<");
  return (
    <div className='custom-dropdown' ref={ref}>
      {isText ? (
        <input
          className='btn-custom-dropdown form-control'
          onBlur={() =>
            setTimeout(() => {
              if (value) changeFn(value, "y");
              setMenu(false);
            }, 500)
          }
          onKeyDown={(e) =>
            (e.keyCode == 27 || e.keyCode == 13) && setMenu(false)
          }
          onChange={(e) => changeFn(e.target.value)}
          value={value}
          type='text'
          onFocus={() => groups.length && setMenu(true)}
          placeholder={placeholder}
          onClick={() => groups.length && setMenu(true)}
        />
      ) : (
        <button
          className={
            name === name2 ? `btn-custom-dropdown` : `btn-custom-dropdown1 `
          }
          // className={`btn-custom-dropdown ${menu && 'active'}`}
          role='button'
          type='button'
          // disabled={disabled}
          onClick={() => setMenu(!menu)}
        >
          <span className={`${name?.length > 30 && "textNeg"}`}>
            {useParse ? parse(name) : name}
          </span>
          <img
            src={arrowImg ? arrowImg : upDownArrow}
            alt='downarrow'
            className={arrowImg ? "dropdownImg" : "customwh"}
          />
        </button>
      )}
      {menu && !disabled && (
        <div
          ref={ref}
          className={`dropdown-menu show transform-group ${dClass}`}
        >
          {groups &&
            groups.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span
                    className='dropdown-item p-1'
                    onClick={() => {
                      onSelect(item);
                      setMenu(false);
                    }}
                  >
                    {item?.warehouseInventory
                      ? item?.warehouseAddress
                        ? item?.title +
                          "/" +
                          item?.warehouseAddress?.firstLine +
                          ", " +
                          item?.warehouseAddress?.city
                        : item?.title + "/" + item.postalAddress
                      : item?.name
                      ? item?.name
                      : item?.productName
                      ? item?.productName
                      : parse(item)}
                  </span>
                  {index + 1 < groups.length && <hr />}
                </React.Fragment>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default dropdownButtonGroup;
