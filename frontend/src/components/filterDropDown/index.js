import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./style.scss";


const StyledMenu = withStyles({
  paper: {
    border: "1px solid #D3D4D5",
    borderRadius: "15px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
  },
}))(MenuItem);

const FilterDropDown = (props) => {
  return (
    <>
    {props.MenuBtn === "ExportMenuBtn" ? (<StyledMenu
                    id='customized-menu'
                    anchorEl={props.anchorElEx}
                    keepMounted
                    open={Boolean(props.anchorElEx)}
                    onClose={props.handleClose1}
                    onBlur={props.handleClose1}
                  >
                    <div className='d-flex flex-column align-items-center'>
                    {props.data.map((item, index) => {
          return (
            <StyledMenuItem>
                        <button
                        className={item.checked ? "li-element-selected" : "li-element"}
                        key={item.key}
                        onClick={() => {
                          props.onChangeOfFilterDropDown(index, props.type, item.value);
                        }}
                          type='button'
                          style={{
                            padding: "10px",
                            height: "40px",
                            width: "130px",
                          }}
                          className='btn btn-outline-primary btn-sm'
                        >
                          {item.label}
                        </button>
                      </StyledMenuItem>
          );
        })}
                    </div>
                  </StyledMenu>) : ( <div
      className={`card rounded bg-white border-white 
        ${
          props.type === "export"
            ? "filter-card-export-container"
            : "filter-card-container"
        }`}
    >
      <ul className='ul-element'>
        {props.data.map((item, index) => {
          return (
            <li
              className={item.checked ? "li-element-selected" : "li-element"}
              key={item.key}
              onClick={() => {
                props.onChangeOfFilterDropDown(index, props.type, item.value);
              }}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>)}
    </>
  );
};

export default FilterDropDown;
