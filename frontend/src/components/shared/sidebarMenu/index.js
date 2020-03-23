import React from 'react'

import {
  Link,
  IndexLink
} from "react-router-dom";
import Footer from '../footer';
import HomeIcon from '../../../assets/icons/Overview.png';
import HomeSelectedIcon from '../../../assets/icons/Overviewselected.png';
import shipIcon from '../../../assets/icons/Shippment.png';
import InventoryIcon from '../../../assets/icons/Inventory.png';
import trackIcon from '../../../assets/icons/Track_Trace.png';
import NetworkIcon from '../../../assets/icons/Inventory.png';
import shipSelectedIcon from '../../../assets/icons/Shippmentselected.png';
import InventorySelectedIcon from '../../../assets/icons/Inventoryselected.png';
import trackSelectedIcon from '../../../assets/icons/Track_Traceselected.png';
import NetworkSelectedIcon from '../../../assets/icons/Inventoryselected.png';
import './style.scss'
const SideBar = ({
  match,
  location
}) => {
  const { url } = match;
  return (
    <div className="sidebar">
      <ul>
        <li className={(url === '/') ? 'active' : ''}>
          <Link to="/">
            <img src={(url === '/') ? HomeSelectedIcon : HomeIcon} alt="Overview" />
            <span>Overview</span>
          </Link>
        </li>
        <li className={(url === '/shipments') ? 'active' : ''}>
          <Link to="/shipments">
            <img src={(url === '/shipments') ? shipSelectedIcon : shipIcon} alt="Shippment" />
            <span>Shippment</span>
          </Link>
        </li>
        <li className={(url === '/inventory') ? 'active' : ''}>
          <Link to="/inventory">
            <img src={(url === '/inventory') ? InventorySelectedIcon : InventoryIcon} alt="Inventory" />
            <span>Inventory</span>
          </Link>
        </li>
        <li className={(url === '/trackAndTrace') ? 'active' : ''}>
          <Link to="/trackAndTrace">
            <img src={(url === '/trackAndTrace') ? trackSelectedIcon : trackIcon} alt="Track & Trace" />
            <span>Track & Trace</span>
          </Link>
        </li>
        <li className={(url === '/') ? 'active' : ''}>
          <Link to="/">
            <img src={(url === '/overview') ? NetworkSelectedIcon : NetworkIcon} alt="Network" />
            <span>Network</span>
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default SideBar;