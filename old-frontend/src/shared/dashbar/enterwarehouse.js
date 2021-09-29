import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '../../assets/icons/cross.svg';
import PinGrey from '../../assets/icons/pingrey.png';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import { useSelector } from "react-redux";
import location from '../../assets/icons/CurrentLocationWhite.svg';
import { formatDate } from '../../utils/dateHelper';
import Product from './product';
import './style.scss';

const EnterWareHouse = props => {
  const region = 'Select Region';
  const user = useSelector((state) => {
    return state.user;
  });
  const { warehouse, productArray } = props?.dashBarData;
  const { dashBarData } = props;
  
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
          <img src={CloseIcon} alt="Close" with="30" height="30" className="close-icon" />
        </button>
      </div>
      <div className="panel mb-3 searchpanel">
        <div>{props.visible ? 'Shipment ID: '+dashBarData.id : warehouse?.warehouseName }</div>
        <div>
          <u>
            <small>{user?.walletAddress}&nbsp;</small>
          </u>
          <img src={Verifiedpic} width="15" height="15" className="mt-1" />
        </div>
        {!props.visible &&
          <div className="d-flex text-white flex-row mt-2">
            <ul className="mr-3 text-light">
              <li className="mb-1">Country ID</li>
              <li className="mb-1">Country</li>
              <li className="mb-1">Location</li>
              <li className="mb-1">Location Name</li>
            </ul>
            <ul className="text-light">
              <li className="mb-1">{warehouse?.warehouseCountryId}&nbsp;</li>
              <li className="mb-1">{warehouse?.warehouseCountryName}&nbsp;</li>
              <li className="mb-1">{warehouse?.warehouseId}&nbsp;</li>
              <li className="mb-1">{warehouse?.warehouseName}&nbsp;</li>
            </ul>
          </div>
        }
      </div>
      {props.visible &&
        <div className="d-flex flex-row justify-content-between prod mt-3 mb-2">
          <div className="font-size-one">Shipment Details</div>
          <button
            className="button btn-primary d-flex text-light pl-3 pr-3 pt-2 pb-2"
            onClick={() => {
              props.history.push(
                `/tracing/${dashBarData.id}`,
              );
            }}
          >
            <img style={{ padding: 1, height: 15}} src={location} />
            <span className="pl-1 text-white">Track</span>
          </button>
        </div>
      }
      <div className="panel address searchpanel mb-2">
        {!props.visible ?
          <>
          <div className="row">
            <img src={PinGrey} height="20" width="15" />
            <div className="ml-2 text-secondary">Address</div>
          </div>
          <div>{warehouse?.warehouseAddress}</div>
          </>
          :
          <div className="">
            <h6>From</h6>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Organisation Name</div>
              <div className="col">{dashBarData.supplier.org.name}</div>
            </div>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Organisation Location</div>
              <div className="col">{dashBarData.supplier.warehouse.warehouseAddress.city}</div>
            </div>
            <h6 className="pt-2">To</h6>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Organisation Name</div>
              <div className="col">{dashBarData.receiver?.org?.name}</div>
            </div>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Organisation Location</div>
              <div className="col">{dashBarData.receiver?.warehouse?.warehouseAddress?.city}</div>
            </div>
            <h6 className="pt-2">Delivery Details</h6>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Transit Number</div>
              <div className="col">{dashBarData.airWayBillNo}</div>
            </div>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Label Code</div>
              <div className="col">{dashBarData.label.labelId}</div>
            </div>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Shipment Date</div>
              <div className="col">{dashBarData.shippingDate?.length == 10 ? dashBarData.shippingDate : formatDate(dashBarData.shippingDate)}</div>
            </div>
            <div className="row pt-1 pb-1">
              <div className="col text-muted">Estimated Delivery Date</div>
              <div className="col">{dashBarData.actualDeliveryDate?.length == 10 ? dashBarData.actualDeliveryDate : formatDate(dashBarData.actualDeliveryDate)}</div>
            </div>
          </div>
        }
      </div>
      <div className="d-flex flex-row justify-content-between prod mt-3 mb-2">
        <div className="font-size-one">{props.visible ? 'Product Details' : 'Inventory'}</div>
        <Link to={props.visible ? "/viewshipment/"+dashBarData.id : "/viewinventory/"+warehouse?.warehouseId}>
          <div className="text-primary ">View All</div>
        </Link>
      </div>

      <div className="panel address searchpanel prodpanel d-flex flex-column inventoryDashboard">
       
          {productArray?.length > 0 ? productArray?.map((product, index) =>
            <Product product={product} index={index} key={index} />
          ) : 
          dashBarData?.products?.map((product, index) =>
            <Product product={product} index={index} key={index} />
          )}
          {productArray?.length==0 && <center><h5 style={{color: "#0093E9", fontSize: "12px", textAlign:"center"}}>No Items to show</h5></center>}
      </div>
    </div>
  );
};

export default EnterWareHouse;
