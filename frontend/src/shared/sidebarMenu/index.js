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

const SideBar = (props) => {
  const { match, user, t, trackTraceData } = props;
  const { url } = match;
  const [enable, setEnable] = useState(true);
  useEffect(() => {
    if (user?.isCustom) setEnable(false);
  }, [user]);

  const resetTrackTracePage = () => {
    if (trackTraceData && trackTraceData?.value !== "") {
      trackTraceData?.setValue("");
      trackTraceData?.resetData();
      trackTraceData?.setIsSubmitted(false);
    }
  };

  return (
    <div className='sidebar'>
      <ul>
        {isAuthenticated("overview") && enable && (
          <li className={url === "/overview" ? "active" : "inactive"}>
            <Link to='/overview' className='nav-look-link'>
              <img
                src={url === "/overview" ? HomeIcon : HomeIcon}
                alt='Overview'
              />
              <span>{t("overview")}</span>
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
                <span className='ml-2'>{t("orders")}</span>
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
              <span className='ml-2'>{t("inventory")}</span>
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
              <span className='ml-2'>{t("shipments")}</span>
            </Link>
          </li>
        )}

        {isAuthenticated("overview") && enable && (
          <li className={url === "/dashboard" ? "active" : ""}>
            <Link to='/dashboard' className='d-inline-block'>
              <img
                src={url === "/dashboard" ? NetworkIcon : NetworkIcon}
                alt='Shipment'
              />
              <span className='ml-2'>{t("network")}</span>
            </Link>
          </li>
        )}
        {isAuthenticated("trackAndTrace") && enable && (
          <li className={url === "/track" ? "active" : ""}>
            <Link
              to='/track'
              className='nav-look-link d-inline-block'
              onClick={resetTrackTracePage}
            >
              <img
                src={url === "/track" ? trackSelectedIcon : trackIcon}
                alt='Track &amp; Trace'
              />
              <span>{t("trackntrace")}</span>
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

              <span className='ml-2'>{t("lastmile")}</span>
            </Link>
          </li>
        )}
      </ul>
      <Footer t={t} />
    </div>
  );
};

export default SideBar;
