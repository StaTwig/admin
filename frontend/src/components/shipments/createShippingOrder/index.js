import React,{useState} from 'react';
import DropdownButton from '../../../shared/dropdownButtonGroup';
import Order from '../../../assets/icons/order.svg';
import './style.scss';
const CreateShippingOrder = () => {
  const[wareHouseId,setWareHouseId]=useState('Select Warehouse ID');
  const[wareHouseIds,setWareHouseIds]=useState([]);
  const[wareHouseLocation,setWareHouseLocation]=useState('');

  const onWareHouseIdSelect = () => {

  }

  const month = new Date().getMonth() + 1;
  const todayDate =
  new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
    return(
        <div className="createshipping">
        <p className="date-alignment mr-5">Date: {todayDate}</p>
        <div className="d-flex flex-row ml-4 mb-5 mr-5">
            <div className="input-group">
              <label className="reference ">Warehouse ID</label>
              <div className="form-control">
              <DropdownButton
                name={wareHouseId}
                onSelect={onWareHouseIdSelect}
                groups={wareHouseIds}
                className="text"
              />
            </div>
            
            </div>
            <div className="input-group ml-5">
              <label className="reference mr-3">Warehouse Location</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Warehouse Location"
              onChange={e => setWareHouseLocation(e.target.value)}
              value={wareHouseLocation}
            />
            </div>
           </div>
           <table className="table poModalTable">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col" class="text-secondary">Product ID</th>
            <th scope="col " class="text-secondary">Product Name</th>
            <th scope="col" class="text-secondary">Manufacturer</th>
             <th scope="col" class="text-secondary">Quantity</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <div className="square-box" />
            </th>
            <td>PR12345</td>
            <td>MMR</td>
            <td>Bharat BioTech</td>
            <td>50000</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="d-flex justify-content-end">
        <div className="d-flex flex-column mr-5">
          <span>Total Quantity</span>
          <h3 className="text-info">50000</h3>
        </div>
      </div>
      <button
            className="btn btn-orange fontSize20 font-bold mr-2 date-alignment"
         
          >
            <img src={Order} width="14" height="14" className="mr-2" />
            <span>Create Shipping Order</span>
          </button>
            </div>

    );
}

export default CreateShippingOrder;