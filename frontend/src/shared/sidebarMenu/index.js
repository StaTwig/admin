import React from 'react'

import {
  Link
} from "react-router-dom";
import Footer from '../footer';
import HomeIcon from '../../assets/icons/Overviewselected.png';
import HomeSelectedIcon from '../../assets/icons/Overviewselected.png';
import shipIcon from '../../assets/icons/Shippmentselected.png';
import InventoryIcon from '../../assets/icons/Inventoryselected.png';
import trackIcon from '../../assets/icons/Track_Traceselected.png';
import NetworkIcon from '../../assets/icons/blockicon.png';
import DashboardIcon from '../../assets/icons/Dashboard.png';
import DashboardSelectedIcon from '../../assets/icons/Dashboardl.png';
import shipSelectedIcon from '../../assets/icons/Shippmentselected.png';
import InventorySelectedIcon from '../../assets/icons/Inventoryselected.png';
import trackSelectedIcon from '../../assets/icons/Track_Traceselected.png';
import NetworkSelectedIcon from '../../assets/icons/NetworkSelected.svg';
import UtilitiesSelected from '../../assets/icons/utilitieswhite.png';
import UtilitiesIcon from '../../assets/icons/utilitiesblue.png';
import OrderSelectedIcon from '../../assets/icons/OrderSelected.png';
import OrderIcon from '../../assets/icons/OrderSelected.png';
import lastMileIcon from '../../assets/icons/lastMile.png'

import './style.scss'
const SideBar = ({
  match,
  location
}) => {
  const { url } = match;
  return (
    <div className="sidebar">
      <ul >
        <li className={(url === '/overview') ? 'active' : 'inactive'}>
          <Link to="/overview" className="d-inline-block">
            <img src={(url === '/overview') ? HomeSelectedIcon : HomeIcon} alt="Overview" />
            <span className="ml-2">Overview</span>
          </Link>
        </li>

        <li className={(url === '/orders' || url === '/neworder') ? 'active' : ''}>
          <Link to="/orders" className="d-inline-block">
            <img src={(url === '/orders' || url === '/neworder')  ? OrderSelectedIcon : OrderIcon} alt="Orders" />
            <span className="ml-2">Orders</span>
          </Link>
        </li>

        <li className={(url === '/inventory'|| url === '/newinventory'|| url === '/addproduct'|| url === '/productlist/all') ? 'active' : ''}>
          <Link to="/inventory" className="d-inline-block">
            <img src={(url === '/inventory' || url === '/newinventory' || url === '/addproduct'|| url === '/productlist/all') ? InventorySelectedIcon : InventoryIcon} alt="Inventory" />
            <span className="ml-2">Inventory</span>
          </Link>
        </li>
        <li className={(url === '/shipments' || url === '/newshipment'|| url === '/transactionHistory') ? 'active' : ''}>
          <Link to="/shipments" className="d-inline-block">
            <img src={(url === '/shipments' || url === '/newshipment'|| url === '/transactionHistory')  ? shipSelectedIcon : shipIcon} alt="Shippment" />
            <span className="ml-2">Shipments</span>
          </Link>
        </li>
         <li className={(url === '/track') ? 'active' : ''}>
          <Link to="/track" className="d-inline-block">
            <img src={(url === '/track') ? trackSelectedIcon : trackIcon} alt="Track & Trace" />
            <span className="ml-2">Track & Trace</span>
          </Link>
        </li>
        <li className={(url === '/dashboard')  ? 'active' : ''}>
          <Link to="/dashboard" className="d-inline-block">
            <img src={(url === '/dashboard')  ? NetworkSelectedIcon : NetworkIcon} alt="Shippment" />
            <span className="ml-2">Network</span>
          </Link>
        </li>
        <li className={(url === '/lastMile')  ? 'active' : ''}>
          <Link to="/lastMile" className="d-inline-block">
            <img src={(url === '/lastMile')  ? lastMileIcon : lastMileIcon} alt="lastMile" />
            <img src={(url === '/lastMile')  ? lastMileIcon : lastMileIcon} alt="Shippment" />
            <span className="ml-2">Last Mile</span>
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default SideBar;
