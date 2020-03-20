import React from 'react'

import Footer from '../footer';
import HomeIcon from '../../../assets/icons/Overviewselected.png';
import shipIcon from '../../../assets/icons/Shippment.png';
import InventoryIcon from '../../../assets/icons/Inventory.png';
import trackIcon from '../../../assets/icons/Track_Trace.png';
import NetworkIcon from '../../../assets/icons/Inventory.png';
import './style.scss'
const SideBar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="active">
          <img src={HomeIcon} alt="Overview" />
          <span>Overview</span>
        </li>
        <li>
          <img src={shipIcon} alt="Shippment" />
          <span>Shippment</span>
        </li>
        <li>
          <img src={InventoryIcon} alt="Inventory" />
          <span>Inventory</span>
        </li>
        <li>
          <img src={trackIcon} alt="Track & Trace" />
          <span>Track & Trace</span>
        </li>
        <li>
          <img src={NetworkIcon} alt="Network" />
          <span>Network</span>
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default SideBar;