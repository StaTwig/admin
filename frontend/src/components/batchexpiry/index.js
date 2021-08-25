import React, { useState, useEffect } from 'react';
import './style.scss';
import user from '../../assets/icons/brand.svg';
import Quantity from '../../assets/icons/Quantity.png';
import Product from '../../assets/icons/Producttype.png';
import calender from '../../assets/icons/calendar.svg';
import { useDispatch } from 'react-redux';
import { getExpiredProductsByBatch, getNearExpiringProductsByBatch } from '../../actions/inventoryActions';
import { formatDate } from '../../utils/dateHelper';
import { turnOn, turnOff } from '../../actions/spinnerActions';

const BatchExpiry = props => {
  const [data, setData] = useState([]);
  const [enable, setEnable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(turnOn());
      let result;
      if (props.match.params?.category)
        result = await getNearExpiringProductsByBatch();
      else {
        setEnable(false);
        result = await getExpiredProductsByBatch();
      }
      setData(result);
      dispatch(turnOff());
    }
    fetchData();
  }, [props]);
  
  return (
    <div className="batchexpiry">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">{enable ? 'BATCH NEAR EXPIRATION' : 'BATCH EXPIRED'}</h1>
      </div>
      <div className="row">
        <div className=" p-2 rounded full-width-ribbon">
          <div className=" row filter">
            <div className="col-2">
              <img src={Product} width="24" height="24" alt="Product Name" />
              <span className="ml-2 font-small">Product Name</span>
            </div>
            <div className="col-2">
              <img src={Quantity} width="35" height="24" alt="Product Category" />
              <span className="ml-2 font-small">Product Category</span>
            </div>
            <div className="col-2">
              <img src={user} width="16" height="24" alt="Manufacturer" />
              <span className="ml-2 font-small">Manufacturer</span>
            </div>
            <div className="col-2 p-0">
              <img src={Quantity} width="35" height="24" alt="Quantity" />
              <span className="ml-2 font-small">Quantity</span>
            </div>
            <div className="col-2">
              <img src={Quantity} width="35" height="24" alt="Batch Number" />
              <span className="ml-2 font-small">Batch Number</span>
            </div>
            <div className="col-1 pl-0">
              <img src={calender} width="35" height="24" alt="Mfg Date" />
              <span className="ml-1 font-small">Mfg Date</span>
            </div>
            <div className="col-1 p-0">
              <img src={calender} width="35" height="24" alt="Exp Date" />
              <span className="ml-1 font-small">Exp Date</span>
            </div>
          </div>
        </div>
        <div className="ribbon-space col-12 pl-0 pr-0">
          {data.map((exp, i) => 
            <div key={i} className="col-12 p-3 mb-3 rounded row bg-white shadow">
              <div className="col-2 txt txtBlue">{exp.products.name}</div>
              <div className="col-2 txt1 ">{exp.products.type}</div>
              <div className="col-2 txt1 ">{exp.products.manufacturer}</div>
              <div className="col-2 txt1 ">{exp?.quantity ? exp.quantity : 0}{" ("}{exp.products.unitofMeasure? exp.products.unitofMeasure.name:"N/A"}{")"}</div>
              <div className="col-2 txt1 ">{exp.batchNumbers[0]}</div>
              <div className="col-1 txt1 ">{exp.attributeSet.mfgDate ? formatDate(exp.attributeSet.mfgDate) : ''}</div>
              <div className="col-1 txt1 ">{exp.attributeSet.expDate ? formatDate(exp.attributeSet.expDate) : ''}</div>
            </div>
          )}
          {data?.length === 0 && 
            <div className="col-12 p-3 mb-3 rounded row bg-white shadow">
              <div className="col-12 txt text-center txtBlue">No records found</div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default BatchExpiry;
