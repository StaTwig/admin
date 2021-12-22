import React, { useState } from "react";
import parse from "html-react-parser";
import useOnclickOutside from "react-cool-onclickoutside";
import upDownArrow from "../../assets/icons/dropdown.svg";
import "./LocationDropdown.scss";

const LocationDropdown = (props) => {
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
            (e.keyCode === 27 || e.keyCode === 13) && setMenu(false)
          }
          onChange={(e) => changeFn(e.target.value)}
          value={value}
          type='text'
          onFocus={() => groups.length && setMenu(true)}
          placeholder={placeholder}
          onClick={() => groups.length && setMenu(true)}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
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
          <div
            className={`${name?.length > 20 && "textNeg"}`}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "300px",
            }}
          >
            {useParse ? parse(name) : name.split("|")[0]}
          </div>
          <br></br>
          <div
            className={`location-add ${name?.length > 20 && "textNeg-title"}`}
          >
            {useParse ? parse(name) : name.split("|")[1]}
          </div>
          <img
            src={arrowImg ? arrowImg : upDownArrow}
            alt='downarrow'
            className='dropdownIcon'
          />
        </button>
      )}
      {menu && !disabled && (
        <div
          ref={ref}
          className={`dropdown-menu show dropdownCard ${dClass}`}
          style={{ width: "23vw" }}
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
                    {item?.warehouseInventory ? (
                      <div className='locationAdress'>
                        <span
                          className='LocationTitle'
                          style={{
                            fontWeight: "bolder",
                            color: "#0093e9",
                            width: "50%",
                          }}
                        >
                          {item.title}
                        </span>

                        <span className='regionCountry'>
                          {
                            item?.warehouseAddress?.region +
                              ", " +
                              item?.warehouseAddress?.country
                            //  + " " +
                            //   item.postalAddress
                          }
                        </span>
                      </div>
                    ) : (
                      <span>
                        {item?.warehouseInventory
                          ? item?.warehouseAddress
                            ? item?.title +
                              " " +
                              item?.warehouseAddress?.firstLine +
                              " " +
                              item?.warehouseAddress?.city
                            : item?.title + "/" + item.postalAddress
                          : item?.name
                          ? item?.name
                          : item?.productName
                          ? item?.productName
                          : parse(item)}
                      </span>
                    )}
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

export default LocationDropdown;
