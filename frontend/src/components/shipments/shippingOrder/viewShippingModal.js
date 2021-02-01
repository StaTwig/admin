import React from 'react';
import './style.scss';


const ViewShippingModal = () => {
  const month = new Date().getMonth() + 1;
  const todayDate =
  new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
    return(
        <div className="PO">
        <p className="date-alignment mr-5">Date: {todayDate}</p>
        <div className="d-flex flex-row ml-4 mb-5">
            <div className="input-group">
              <label className="reference mr-3">Warehouse ID: </label>
              <div>WA123456</div>
            </div>
            <div className="input-group">
              <label className="reference mr-3">Warehouse Location: </label>
              <div>Hyderabad</div>
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
            <td>sssssssssssssssssssssss</td>
            <td>sssssssssssssssssss</td>
            <td>ssssssssssssssssssssss</td>
            <td>sssssssss</td>
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
            </div>

    );
}

export default ViewShippingModal;