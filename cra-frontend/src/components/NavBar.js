import React from "react";

import "./NavBar.css";
import nav1 from "../../assets/home@2x.png";
import nav2 from "../../assets/truck@2x.png";
import nav3 from "../../assets/package@2x.png";
import nav4 from "../../assets/searching@2x.png";

const NavBar = () => {
  return (
    <div>
      <svg className='Rectangle_101'>
        <rect id='Rectangle_101' rx='5' ry='5' x='0' y='0'></rect>
      </svg>
      <div id='icons'>
        <img src={nav1} id='home' alt='Home' />
        <img src={nav2} id='truck' alt='Shipment' />
        <img src={nav3} id='package' alt='Package' />
        <img src={nav4} id='search' alt='Search' />
      </div>
      <section id='title'>
        <button className='btn Overview' onclick='window.location.href ='>
          Overview
        </button>
        <button className='btn1 Inventory' onclick='window.location.href ='>
          Inventory
        </button>
        <button className='btn1 Shippment' onclick='window.location.href ='>
          Shippment
        </button>
        <button className='btn1 Track' onclick='window.location.href ='>
          Track
        </button>
      </section>
      <svg className='Rectangle_100'>
        <rect id='Rectangle_100' rx='5' ry='5' x='0' y='0'></rect>
      </svg>
    </div>
  );
};

export default NavBar;

/*import React from 'react'
`
const NavBar = () => (
  <div>
    <div><Link to="/">Home</Link> <Link to="/hello">Hello</Link> <Link to="/counter">Counter</Link></div>
  </div>
)

export default NavBar*/
