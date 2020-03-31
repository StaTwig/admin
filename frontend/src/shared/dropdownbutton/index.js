import React, { useState } from "react";
import parse from 'html-react-parser';
import upDownArrow from "../../assets/icons/drop-down.png";
import { logoutUser} from '../../actions/userActions';
import {useDispatch } from 'react-redux';
import './style.scss';

const DropdownButton = ({
    groups
}) => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => { 
    console.log('logout clicked');
    dispatch(logoutUser());
    }  
 
  return (
    <div className="custom-dropdown">
      <button
        className={`btn-custom-dropdown ${menu && 'active'}`}
        role="button"
        onClick={() => setMenu(!menu)}
      >
        <img src={upDownArrow} alt="downarrow" width="16" height="16" />
      </button>
      <button onClick={handleLogout}> LOG OUT</button>
    </div>
  );
};



export default DropdownButton;

