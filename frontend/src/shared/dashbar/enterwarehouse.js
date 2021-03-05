import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '../../assets/icons/cross.svg';
import PinGrey from '../../assets/icons/pingrey.png';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import './style.scss';

const EnterWareHouse = props => {
  const region = 'Select Region';
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
        <div>Bharat Bio-tech Warehouse</div>
        <div>
          <u>
            <small>8g4gb4ff4jej9jehrugknasci99988gdjnddbdb</small>
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
            <li className="mb-1">{warehouse?.warehouseCountryId}</li>
            <li className="mb-1">{warehouse?.warehouseCountryName}</li>
            <li className="mb-1">{warehouse?.warehouseId}</li>
            <li className="mb-1">{warehouse?.warehouseName}</li>
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
      <div className="d-flex flex-row justify-content-between prod mb-2">
        <div>Inventory</div>
        <Link to="/productlist/all">
          <div className="text-primary">View All</div>
        </Link>
      </div>

      <div className="panel address searchpanel prodpanel d-flex flex-column">
        {productArray?.map(product => <div className="mb-1 subprod">
          <div className="text-primary" key={product.productId}>
            <strong>{product.productName}</strong>
          </div>
          <div className="d-flex flex-row mb-1">
            <div className="mr-3 text-secondary">Manufacture : {product.manufacturer}</div>
            <div className="text-secondary">
              Quantity : <span className="text-info">{product.quantity}</span>
            </div>
          </div>
          <Link to="/productlist/all">
            <button className="btn btn-outline-info fontSize200 sho mb-2 mt-1">
              SHOW MORE
            </button>
          </Link>
        </div>)}
      </div>
    </div>
  );
};

export default EnterWareHouse;
