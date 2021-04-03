import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '../../assets/icons/cross.svg';
import PinGrey from '../../assets/icons/pingrey.png';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import { useSelector } from "react-redux";
import './style.scss';

const EnterWareHouse = props => {
  const region = 'Select Region';
  const user = useSelector((state) => {
    return state.user;
  });
  const { warehouse, productArray } = props?.dashBarData;
  return (
    <div className="dashbar">
      <div>
        <button
          type="button"
          className="close"
          onClick={() => {
            props.setDashVisible(false)
            //props.setDashBarData({})
          }}
        >
          <img src={CloseIcon} alt="Close" with="30" height="30" />
        </button>
      </div>
      <div className=" panel  mb-3 searchpanel">
        <div>{warehouse?.warehouseName}</div>
        <div>
          <u>
            <small>{user?.walletAddress}&nbsp;</small>
          </u>
          <img src={Verifiedpic} width="15" height="15" className="mt-1" />
        </div>
        <div className="d-flex flex-row mt-2">
          <ul className="mr-3">
            <li className="mb-1">Country ID</li>
            <li className="mb-1">Country</li>
            <li className="mb-1">Warehouse</li>
            <li className="mb-1">Warehouse Name</li>
          </ul>
          <ul>
            <li className="mb-1">{warehouse?.warehouseCountryId}&nbsp;</li>
            <li className="mb-1">{warehouse?.warehouseCountryName}&nbsp;</li>
            <li className="mb-1">{warehouse?.warehouseId}&nbsp;</li>
            <li className="mb-1">{warehouse?.warehouseName}&nbsp;</li>
          </ul>
        </div>
      </div>
      <div className="panel address searchpanel mb-2">
        <div className="row">
          <img src={PinGrey} height="20" width="15" />
          <div className="ml-2 text-secondary">Address</div>
        </div>
        <div>{warehouse?.warehouseAddress}</div>
      </div>
      <div className="d-flex flex-row justify-content-between prod mt-3 mb-2">
        <div className="font-size-one">Inventory</div>
        <Link to="/productlist/all">
          <div className="text-primary ">View All</div>
        </Link>
      </div>

      <div className="panel address searchpanel prodpanel d-flex flex-column inventoryDashboard">
        {productArray?.map(product => <div className="mb-1 subprod">
          <div className="text-primary mt-2" key={product.productId}>
            <strong>{product.productName}</strong>
          </div>
          <div className="d-flex flex-column mb-2">
            <div className="row pb-1 pt-1">
              <span className="col text-secondary">Product ID: </span>
              <span className="col font-weight-bold">{product.productId}</span>
            </div>
            <div className="row pb-1 pt-1">
              <span className="col text-secondary">Product Name: </span>
              <span className="col font-weight-bold">{product.productName}</span>
            </div>
            <div className="row pb-1 pt-1">
              <span className="col text-secondary">Quantity: </span>
              <span className="col font-weight-bold">{product.quantity}</span>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default EnterWareHouse;
