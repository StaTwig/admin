import React from "react";
import logo from "../../assets/ABInBev.png";
import HomeIcon from "../../assets/icons/home.svg";
import HomeSelectedIcon from "../../assets/icons/home_selected.svg";
import DashboardIcon from "../../assets/icons/dashboard.svg";
import DashboardSelectedIcon from "../../assets/icons/dashboard_selected.svg";
import TransactionIconSelected from "../../assets/icons/transaction_selected.svg";
import TransactionIcon from "../../assets/icons/transaction.svg";
import ManageIcon from "../../assets/icons/manage.svg";
import Logout from "../../assets/icons/logout.svg";
import InventoryIconSelected from "../../assets/icons/inventory_selected.svg";
import InventoryIcon from "../../assets/icons/inventory.svg";
import rightArrow from "../../assets/icons/rightarrow.svg";

const Sidebar = (props) => {
  const { history } = props;
  history.location.pathname;
  return (
    <nav className="sidebar">
      <div className="abinBevLogo">
        <img src={logo} width={90} />
      </div>
      <div className="sidebar-sticky">
        <div className="grid" style={{ rowGap: "20px", alignContent: "end" }}>
          <div
            className={
              history.location.pathname.includes("overview")
                ? "gds-links bord-white"
                : "gds-links"
            }
          >
            <div className="gdsl-in">
              <img src={
                history.location.pathname.includes("overview")
                ? HomeSelectedIcon
                : HomeIcon
              } />
              <div onClick={() => history.push("/overview")}>Overview</div>
            </div>
          </div>
          <div
            className={
              history.location.pathname.includes("dashboard")
                ? "gds-links bord-white"
                : "gds-links"
            }
          >
            <div className="gdsl-in">
              <img src={
                history.location.pathname.includes("dashboard")
                ? DashboardSelectedIcon
                : DashboardIcon
                } />
              <div onClick={() => history.push("/overview")}>Dashboard</div>
            </div>
          </div>

          <div
            className={
              history.location.pathname.includes("transactionHistory")
                ? "gds-links bord-white"
                : "gds-links"
            }
          >
            <div className="gdsl-in">
              <img src={
                history.location.pathname.includes("transactionHistory")
                ? TransactionIconSelected
                : TransactionIcon
              } />
              <div onClick={() => history.push("/transactionHistory")}>
                Transaction History
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
              <img src={
                history.location.pathname.includes("inventory")
                ? InventoryIconSelected
                : InventoryIcon
              } />
              <div onClick={() => history.push("/inventory")}>Inventory</div>
            </div>
          </div>
          <div className="gds-links">
            <div className="gdsl-in">
              <img src={ManageIcon}/>
              <div>Manage Users</div>
            </div>
          </div>
          <div className="gds-links">
            <div className="gdsl-in">
              <img src={Logout}/>
              <div>Logout</div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-warning dahbtngo">
        <span className="whiteC"></span>
        <span className="grid jis">
          <span>ABC Pvt Ltd.</span>
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
