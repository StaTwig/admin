import React from "react";
import "./style.scss";
import rightArrow from "../../assets/icons/rightarrow.svg";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';

const Sidebar = (props) => {
  const { history } = props;
  history.location.pathname;
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <nav className="sidebar">
      <div className="foodledgerLogo">
        <span className="logo1">FOOD</span> <span className="logo2">LEDGER</span>
      </div>
      <div className="sidebar-sticky">
        <div className="grid" style={{ rowGap: "20px", alignContent: "end" }}>
          <div
            className={
              history.location.pathname.includes("transactions")
                ? "gds-links bord-white"
                : "gds-links"
            }
          >
            <div className="gdsl-in">
              <div onClick={() => history.push("/transactions")}>
                <i className="fa fa-newspaper-o mr-10"></i> Transactions
              </div>
            </div>
          </div>
          <div
            className={
              history.location.pathname.includes("inventory")
                ? "gds-links bord-white"
                : "gds-links"
            }
          >
            <div className="gdsl-in">
              <div onClick={() => history.push("/inventory")}> <i className="fa fa-glass mr-10"></i> Inventory</div>
            </div>
          </div>
          <div className="gds-links">
            <div className="gdsl-in">
              <div onClick={() => dispatch(logoutUser())}> <i className="fa fa-sign-out mr-10"></i> Logout</div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-warning dahbtngo">
        <span className="whiteC"></span>
        <span className="grid jis">
          <span>{user?.firstName}</span>
          <span style={{ fontSize: "10px" }}>My Settings</span>
        </span>
        <span>
          <img src={rightArrow} />
        </span>
      </button>      
    </nav>
  );
};

export default Sidebar;
