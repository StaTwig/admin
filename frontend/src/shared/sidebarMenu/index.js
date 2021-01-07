import React from 'react'

import {
  Link
} from "react-router-dom";
import Footer from '../footer';
import HomeIcon from '../../assets/icons/Overview.png';
import HomeSelectedIcon from '../../assets/icons/Overviewselected.png';
import shipIcon from '../../assets/icons/Shippment.png';
import InventoryIcon from '../../assets/icons/Inventory.png';
import trackIcon from '../../assets/icons/Track_Trace.png';
import NetworkIcon from '../../assets/icons/Network.svg';
import DashboardIcon from '../../assets/icons/Dashboard.png';
import DashboardSelectedIcon from '../../assets/icons/Dashboardl.png';
import shipSelectedIcon from '../../assets/icons/Shippmentselected.png';
import InventorySelectedIcon from '../../assets/icons/Inventoryselected.png';
import trackSelectedIcon from '../../assets/icons/Track_Traceselected.png';
import NetworkSelectedIcon from '../../assets/icons/NetworkSelected.svg';
import UtilitiesSelected from '../../assets/icons/utilitieswhite.png';
import UtilitiesIcon from '../../assets/icons/utilitiesblue.png';
import './style.scss'
const SideBar = ({
  match,
  location
}) => {
  const { url } = match;
  return (
    <div className="sidebar">
      <ul>
        <li className={(url === '/overview') ? 'active' : ''}>
          <Link to="/overview">
            <img src={(url === '/overview') ? HomeSelectedIcon : HomeIcon} alt="Overview" />
            <span>Overview</span>
          </Link>
        </li>
        <li className={(url === '/dashboard')  ? 'active' : ''}>
          <Link to="/dashboard">
            <img src={(url === '/dashboard')  ? DashboardSelectedIcon : DashboardIcon} alt="Shippment" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={(url === '/shipments' || url === '/newshipment') ? 'active' : ''}>
          <Link to="/shipments">
            <img src={(url === '/shipments' || url === '/newshipment')  ? shipSelectedIcon : shipIcon} alt="Shippment" />
            <span>Shipment</span>
          </Link>
        </li>
        <li className={(url === '/inventory'|| url === '/newinventory') ? 'active' : ''}>
          <Link to="/inventory">
            <img src={(url === '/inventory' || url === '/newinventory') ? InventorySelectedIcon : InventoryIcon} alt="Inventory" />
            <span>Inventory</span>
          </Link>
        </li>
        <li className={(url === '/trackAndTrace') ? 'active' : ''}>
          <Link to="/trackAndTrace">
            <img src={(url === '/trackAndTrace') ? trackSelectedIcon : trackIcon} alt="Track & Trace" />
            <span>Track & Trace</span>
          </Link>
        </li>
        <li className={(url === '/network') ? 'active' : ''} >
          <Link to="/network">
            <img src={(url === '/network') ? NetworkSelectedIcon : NetworkIcon} alt="Network" />
            <span>Network</span>
          </Link>
        </li>
        <li className={(url === '/qrcode') ? 'active' : ''} >
          <Link to="/qrcode">
            <img src={(url === '/qrcode') ? UtilitiesSelected : UtilitiesIcon} alt="Network" />
            <span>Utilities</span>
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default SideBar;