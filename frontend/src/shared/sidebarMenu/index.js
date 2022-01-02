import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer";
import HomeIcon from "../../assets/icons/Overviewselected.svg";
import shipIcon from "../../assets/icons/Shippmentselected.png";
import InventoryIcon from "../../assets/icons/Inventoryselected.png";
import trackIcon from "../../assets/icons/Track_Traceselected.png";
import NetworkIcon from "../../assets/icons/blockicon.png";
import trackSelectedIcon from "../../assets/icons/Track_Traceselected.png";
import OrderSelectedIcon from "../../assets/icons/OrderSelected.png";
import lastMileIcon from "../../assets/icons/lastMile.png";
import { isAuthenticated } from "../../utils/commonHelper";

import "./style.scss";
const SideBar = ({ match, location, user }) => {
  const { url } = match;
  const [enable, setEnable] = useState(true);
  useEffect(() => {
    if (user?.emailId === "gmr@statledger.io") setEnable(false);
  }, [user]);

  return (
    <div className='sidebar'>
      <ul>
        {isAuthenticated("overview") && enable && (
          <li className={url === "/overview" ? "active" : "inactive"}>
            <Link to='/overview' className='d-inline-block'>
              <img
                src={url === "/overview" ? HomeIcon : HomeIcon}
                alt='Overview'
              />
              <span className='ml-2'>Overview</span>
            </Link>
          </li>
        )}
        {(isAuthenticated("viewInboundOrders") ||
          isAuthenticated("viewOutboundOrders")) &&
          enable && (
            <li
              className={
                url === "/orders" || url === "/neworder" ? "active" : ""
              }
            >
              <Link to='/orders' className='d-inline-block'>
                <img
                  src={
                    url === "/orders" || url === "/neworder"
                      ? OrderSelectedIcon
                      : OrderSelectedIcon
                  }
                  alt='Orders'
                />
                <span className='ml-2'>Orders</span>
              </Link>
            </li>
          )}
        {isAuthenticated("viewInventory") && enable && (
          <li
            className={
              url === "/inventory" ||
              url === "/newinventory" ||
              url === "/productcategory" ||
              url === "/batchexpired" ||
              url === "/batchnearexpiry/product" ||
              url === "/productoutofstock" ||
              url === "/addproduct" ||
              url === "/productlist/all"
                ? "active"
                : ""
            }
          >
            <Link to='/inventory' className='d-inline-block'>
              <img
                src={
                  url === "/inventory" ||
                  url === "/newinventory" ||
                  url === "/productcategory" ||
                  url === "/batchexpired" ||
                  url === "/batchnearexpiry/product" ||
                  url === "/productoutofstock" ||
                  url === "/addproduct" ||
                  url === "/productlist/all"
                    ? InventoryIcon
                    : InventoryIcon
                }
                alt='Inventory'
              />
              <span className='ml-2'>Inventory</span>
            </Link>
          </li>
        )}
        {(isAuthenticated("inboundShipments") ||
          isAuthenticated("outboundShipments")) && (
          <li
            className={
              url === "/shipments" ||
              url === "/newshipment" ||
              url === "/transactionHistory"
                ? "active"
                : ""
            }
          >
            <Link to='/shipments' className='d-inline-block'>
              <img
                src={
                  url === "/shipments" ||
                  url === "/newshipment" ||
                  url === "/transactionHistory"
                    ? shipIcon
                    : shipIcon
                }
                alt='Shippment'
              />
              <span className='ml-2'>Shipments</span>
            </Link>
          </li>
        )}
        {isAuthenticated("overview") && enable && (
          <li className={url === "/dashboard" ? "active" : ""}>
            <Link to='/dashboard' className='d-inline-block'>
              <img
                src={url === "/dashboard" ? NetworkIcon : NetworkIcon}
                alt='Shippment'
              />
              <span className='ml-2'>Network</span>
            </Link>
          </li>
        )}
        {isAuthenticated("trackAndTrace") && enable && (
          <li className={url === "/track" ? "active" : ""}>
            <Link to='/track' className='d-inline-block'>
              <img
                src={url === "/track" ? trackSelectedIcon : trackIcon}
                alt='Track & Trace'
              />
              <span className='ml-2'>Track & Trace</span>
            </Link>
          </li>
        )}
        {enable && (
          <li className={url === "/lastMile" ? "active" : ""}>
            <Link to='/lastMile' className='d-inline-block'>
              <img
                src={url === "/lastMile" ? lastMileIcon : lastMileIcon}
                alt='lastMile'
              />

              <span className='ml-2'>Last Mile</span>
            </Link>
          </li>
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default SideBar;
