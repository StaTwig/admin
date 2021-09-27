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
import NetworkIcon from '../../assets/icons/NetworkSelected.svg';
import shipSelectedIcon from '../../assets/icons/Shippmentselected.png';
import InventorySelectedIcon from '../../assets/icons/Inventoryselected.png';
import trackSelectedIcon from '../../assets/icons/Track_Traceselected.png';
import NetworkSelectedIcon from '../../assets/icons/NetworkSelected.svg';
import searchingIcon from "../../assets/icons/searching@2x.png";
import OrderSelectedIcon from '../../assets/icons/orderSelected.png';
import OrderIcon from '../../assets/icons/Orders.png';

import './menu-style.scss'
const DrawerMenu = ({
  match,
  location,
  close
}) => {
  const { url } = match;
  return (
    <div className="mobilemenu">
      <div className="closedrawer" onClick={close}>
        <i className="fa fa-window-close" aria-hidden="true"></i>
      </div>
      <div className="search">
          <input type="text" className="form-control search-field" />
          <img src={searchingIcon} alt="searching" />
        </div>
      <ul>
        <li className={(url === '/overview') ? 'active' : ''}>
          <Link to="/overview">
            <img src={(url === '/overview') ? HomeSelectedIcon : HomeIcon} alt="Overview" />
            <span>Overview</span>
          </Link>
        </li>
        <li className={(url === '/shipments' || url === '/newshipment'|| url === '/transactionHistory') ? 'active' : ''}>
          <Link to="/shipments">
            <img src={(url === '/shipments' || url === '/newshipment'|| url === '/transactionHistory')  ? OrderSelectedIcon : OrderIcon} alt="Shippment" />
            <span>Orders</span>
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
        <li className={(url === '/network') ? 'active' : ''}>
          <Link to="/network">
            <img src={(url === '/network') ? NetworkSelectedIcon : NetworkIcon} alt="Network" />
            <span>Network</span>
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default DrawerMenu;
