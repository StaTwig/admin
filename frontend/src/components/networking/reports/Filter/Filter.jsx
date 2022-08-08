import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

export default function Filter({ title }) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <div className='form-space-area'>
            <Form.Control
              autoFocus
              placeholder='Type to filter...'
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </div>
          <ul className='list-unstyled mi-custom-list-height'>
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        <div className='table-header-with-filter'>
          <p className='mi-body-sm mi-reset grey-400'>{title}</p>
          <i className='fa-solid fa-sort'></i>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} className='mi-custom-filter'>
        <Dropdown.Item eventKey='1'>Red Data Aplication</Dropdown.Item>
        <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
        <Dropdown.Item eventKey='3'>Orange</Dropdown.Item>
        <Dropdown.Item eventKey='1'>Red-Orange</Dropdown.Item>
        <Dropdown.Item eventKey='1'>Red</Dropdown.Item>
        <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
        <Dropdown.Item eventKey='3'>Orange</Dropdown.Item>
        <Dropdown.Item eventKey='1'>Red</Dropdown.Item>
        <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
        <Dropdown.Item eventKey='3'>Orange</Dropdown.Item>
        <Dropdown.Item eventKey='1'>Red</Dropdown.Item>
        <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
        <Dropdown.Item eventKey='3'>Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
