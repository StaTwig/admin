import React, { useState } from "react";
import parse from "html-react-parser";
import useOnclickOutside from "react-cool-onclickoutside";

import upDownArrow from "../../assets/icons/up-and-down-blue.svg";
import "./style.scss";

const dropdownButtonGroup = (props) => {
  const [menu, setMenu] = useState(false);
  const [typeName, setTypeName] = useState(props.name);
  const { groups, name, namer, onSelect, error, setItemType, onClickOfDropDownItem } = props;

  const ref = useOnclickOutside(() => {
    setMenu(false);
  });
  const useParse = typeName && typeName?.includes("<");
  return (
    <div
      style={{  right: `${props.type === "orgType" ? `1rem` : ``}`}}
      className={`custom-dropdown form-control ${error ? "border-danger" : ""}`}
    >
      <button
        type="button"
        className={`btn-custom-dropdown ${menu && "active"}`}
        name={namer}
        role="button"
        onClick={() => {
          setMenu(!menu);
        }}
      >
        {!useParse && <span style={{  width: `${props.type === "orgType" ? `100px` : `130px`}`}} className="text">{typeName}</span>}
        {useParse && <span className="text">{parse(typeName)}</span>}
        <img src={upDownArrow} alt="downarrow" width="9" height="9" />
      </button>
      {menu && (
        <div ref={ref} className="dropdown-menu show transform-group">
          {groups &&
            groups.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {props.source === "manageOrg" ? (
                    <span
                      className="dropdown-item"
                      onClick={() => {
                      item.namer = namer;
                      setMenu(false);
                      onSelect(item);
                      setTypeName(item.value);
                      setItemType(item.value);
                      // onClickOfDropDownItem(index, props.type, item.value)
                    }}
                    >
                      {item.value}
                    </span>
                    
                  ) : (
                    <span
                      className="dropdown-item"
                      onClick={() => {
                        item.namer = namer;
                        setMenu(false);
                        onSelect(item);
                      }}
                    >
                      {namer == "employee"
                        ? item.firstName +
                        " " +
                        item.lastName +
                        " (" +
                        item.emailId +
                        ")"
                        : item.title
                          ? item.title
                          : item.name}
                    </span>
                  )}                 
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
