import React, { useState, useEffect } from "react";
import TotalInventoryAdded from "../../../assets/icons/TotalInventoryAddedcopy.svg";
import currentinventory from "../../../assets/icons/CurrentInventory.svg";
import Expiration from "../../../assets/icons/TotalVaccinenearExpiration.svg";
import TotalVaccineExpired from "../../../assets/icons/TotalVaccineExpired.svg";
import { getOrderAnalytics } from "../../../actions/analyticsAction";
import "../style.scss";
import "./cards.scss";
import { Link } from "react-router-dom";

function Cards(props) {
  const [orderAnalytics, setOrderAnalytics] = useState({
    outboundPO: 0,
    inboundPO: 0,
    pendingOrders: 0,
    rejectedOrders: 0,
  });
  const {t} = props;
  useEffect(() => {
    async function fetchData() {
      const result = await getOrderAnalytics();
      setOrderAnalytics(result.data.order);
    }
    fetchData();
  }, []);
  return (
    <div className="grid-tile-container">
          <Link to="/productcategory">
            <div onClick={() => props.setData("one")} className="grid-tiles">
              <div className="picture truck-bg">
                <img src={TotalInventoryAdded} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="truck-text font-weight-bold">{t('total_product_category')}</p>
                <h1 className="count truck-text">
                  {props.inventoriesCount} {props.inventoryAnalytics?.totalProductCategory}
                </h1>
              </div>
            </div>
          </Link>

          <Link to="/productoutofstock">
            <div className="grid-tiles">
              <div className="picture sent-bg">
                <img src={currentinventory} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="sent-text font-weight-bold">
                {t('product_out_of_stock')}
                </p>
                <h1 className="count sent-text">
                  {props.currentInventoriesCount}
                  {props.inventoryAnalytics?.stockOut}
                </h1>
              </div>
            </div>
          </Link>

          <Link to="/batchnearexpiry/product">
            <div className="grid-tiles">
              <div className="picture recived-bg">
                <img src={Expiration} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="recived-text font-weight-bold">
                {t('batch_near_expiration')}
                </p>
                <h1 className="count recived-text">
                  {props.inventoryNearExpiration}
                </h1>
              </div>
            </div>
          </Link>

          <Link to="/batchexpired">
            <div className="grid-tiles">
              <div className="picture transit-bg">
                <img src={TotalVaccineExpired} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="transit-text font-weight-bold">{t('batch_expired')}</p>
                <h1 className="count transit-text">{props.inventoryExpired}</h1>
              </div>
            </div>
          </Link>
        </div>
  );
}

export default Cards;
