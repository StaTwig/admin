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
  const { t } = props;
  useEffect(() => {
    async function fetchData() {
      const result = await getOrderAnalytics();
      setOrderAnalytics(result.data.order);
    }
    fetchData();
  }, []);
  return (
    <div className='grid-tile-container'>
      <Link to='/productcategory'>
        <div className='grid-tiles'>
          <div className='picture truck-bg'>
            <img src={TotalInventoryAdded} alt='truck' />
          </div>

          <div className='tile-content'>
            <p className='card-text f-500 tale'>
              {t("total_product_category")}
            </p>
            <h1 className='number-text tale'>
              {props.inventoriesCount}{" "}
              {props.inventoryAnalytics?.totalProductCategory}
            </h1>
          </div>
        </div>
      </Link>

      <Link to='/productoutofstock'>
        <div className='grid-tiles'>
          <div className='picture sent-bg'>
            <img src={currentinventory} alt='truck' />
          </div>

          <div className='tile-content'>
            <p className='card-text f-500 blue'>
              {t("product_out_of_stock")}
            </p>
            <h1 className='number-text blue'>
              {props.currentInventoriesCount}
              {props.inventoryAnalytics?.stockOut}
            </h1>
          </div>
        </div>
      </Link>

      <Link to='/batchnearexpiry/product'>
        <div className='grid-tiles'>
          <div className='picture recived-bg'>
            <img src={Expiration} alt='truck' />
          </div>

          <div className='tile-content'>
            <p className='card-text f-500 orange'>
              {t("batch_near_expiration")}
            </p>
            <h1 className='number-text orange'>{props.inventoryNearExpiration}</h1>
          </div>
        </div>
      </Link>

      <Link to='/batchexpired'>
        <div className='grid-tiles'>
          <div className='picture transit-bg'>
            <img src={TotalVaccineExpired} alt='truck' />
          </div>

          <div className='tile-content'>
            <p className='card-text f-500 darkblue'>
              {t("batch_expired")}
            </p>
            <h1 className='number-text darkblue'>{props.inventoryExpired}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Cards;
