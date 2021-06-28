import React, { useState, useEffect } from 'react';
import './style.scss';
import user from '../../assets/icons/brand.svg';
import Quantity from '../../assets/icons/Quantity.png';
import Product from '../../assets/icons/Producttype.png';
import calender from '../../assets/icons/calendar.svg';
import { useDispatch } from 'react-redux';
import { getBatchDetailsByWareHouse } from '../../actions/inventoryActions';
import { turnOn, turnOff } from '../../actions/spinnerActions';
import { formatDate } from '../../utils/dateHelper';

const ViewInventory = props => {
  const [data, setData] = useState([]);
  const { inventories } = props;
  const [more, setMore] = useState([]);
  const dispatch = useDispatch();
  //console.log("inventories",inventories);
  
  const toggleShowMore = async (inventory_id, product_id, index, enable) => {
    if (!enable) {
      dispatch(turnOn());
      let result = await getBatchDetailsByWareHouse(inventory_id, product_id);
      //console.log("resultinviewInventory",result);
      setData(result);
      dispatch(turnOff());
    }
    let new_arr = !enable ? [] : [...more];
    if(enable) setMore([]);
    new_arr[index] = !new_arr[index];
    setMore(m => [...new_arr]);
  }
  
  return (
    <div className="viewinventory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">Inventory</h1>
      </div>
      <div className="row">
        <div className=" p-2 full-width-ribbon">
          <div className=" row filter">
            <div className="col-3">
              <img src={Product} width="24" height="24" alt="Product Name" />
              <span className="ml-2 font-small">Product Name</span>
            </div>
            <div className="col-3">
              <img src={Quantity} width="35" height="24" alt="Product Category" />
              <span className="ml-2 font-small">Product Category</span>
            </div>
            <div className="col-2">
              <img src={user} width="16" height="24" alt="Manufacturer" />
              <span className="ml-2 font-small">Manufacturer</span>
            </div>
            <div className="col-2">
              <img src={Quantity} width="35" height="24" alt="Quantity" />
              <span className="ml-2 font-small">Quantity</span>
            </div>
          </div>
        </div>
        <div className="w-100 pt-5 mt-2">
          {inventories.map((inv, i) => 
            <>
              <div key={i} className="col-12 p-3 mb-3 rounded row bg-white shadow">
                <div className="col-3 txt txtBlue">{inv.products.name}</div>
                <div className="col-3 txt ">{inv.products.type}</div>
                <div className="col-2 txt ">{inv.products.manufacturer}</div>
                <div className="col-2 txt ">{inv.inventoryDetails.quantity ? inv.inventoryDetails.quantity : 0}{" ("}{inv.products.unitofMeasure? inv.products.unitofMeasure.name:"N/A"}{")"}</div>
                <div className="col-2 txt "><button type="button" onClick={() => toggleShowMore(inv.id, inv.products.id, i, more[i])} className="btn btn-outline-primary">Show {more[i] ? `less` :`more`}</button></div>
              </div>
              {more[i] &&
                <div className="row">
                  <div className=" p-2  full-width-ribbon">
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
                      <div className="col-1 p-0">
                        <img src={Quantity} width="35" height="24" alt="Quantity" />
                        <span className="ml-2 font-small">Quantity</span>
                      </div>
                      <div className="col-2">
                        <img src={Quantity} width="35" height="24" alt="Batch Number" />
                        <span className="ml-2 font-small">Batch Number</span>
                      </div>
                      <div className="col-2 pl-0">
                        <img src={calender} width="35" height="24" alt="Mfg Date" />
                        <span className="ml-1 font-small">Mfg Date</span>
                      </div>
                      <div className="col-1 p-0">
                        <img src={calender} width="35" height="24" alt="Exp Date" />
                        <span className="ml-1 font-small">Exp Date</span>
                      </div>
                    </div>
                  </div>
                  <div className="ribbon-space col-12 pl-0 pr-3 ml-2">
                    {data.map((exp, i) =>
                      <div key={i} className="col-12 p-3 mb-3 rounded row bg-white shadow">
                        <div className="col-2 txt txtBlue">{exp.products.name}</div>
                        <div className="col-2 txt ">{exp.products.type}</div>
                        <div className="col-2 txt ">{exp.products.manufacturer}</div>
                        <div className="col-1 txt ">{exp?.quantity ? exp.quantity : 0}</div>
                        <div className="col-2 txt ">{exp.batchNumbers[0]}</div>
                        <div className="col-2 txt ">{formatDate(exp.attributeSet.mfgDate)}</div>
                        <div className="col-1 txt ">{formatDate(exp.attributeSet.expDate)}</div>
                      </div>
                    )}
                  </div>
                </div>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInventory;
