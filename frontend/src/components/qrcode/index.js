import React from 'react';
import BarCode from '../../assets/icons/barcode.png';
import Qr from '../../assets/icons/qrcode.png';
import Download from '../../assets/icons/download.png';
import './style.scss';

const QrCode = props => {
    return (
    <div className="qrcode">
      <h1 className="breadcrumb">CODE GENERATOR</h1>
      <div className="card outline">
        <div className="card-body">
         <div className="d-flex flex-row justify-content-between">
             <div className="d-flex flex-column">
              <div className="caption mb-3">Select the type of code</div>
              <div className="d-flex flex-row mb-5">
                  <div className="panel barcode mr-4">
                <img src={BarCode} height="30" width="30" name="Code" className="mb-4 ml-3"/>
                <div>2D Barcode</div>
                  </div>
                  <div className="panel barcode qr">
                  <img src={Qr} height="30" width="30" name="Code" className="mb-4 ml-3"/>
                  <div className="ml-2">QR Code</div>
                  </div>
              </div>
              <div className="form-group mb-5">
                <label htmlFor="shipmentId"> Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="product"
                  placeholder="Enter Quantity"
                />
              </div>
              <div className="d-flex flex-row mb-5">
               <button className="btn btn-orange mr-4 download">
                <img src={Download} width="14" height="14" className="mr-2" />
                <span>JPG</span>
              </button> 
             <button className="btn btn-yellow download">
                <img src={Download} width="14" height="14" className="mr-2" />
                <span>PDF</span>
              </button>
             </div>
            <div>
                <button className="btn btn-main-blue">GENERATE CODE</button>
                </div> 
             </div>
             <div className="d-flex flex-column mt-4">
              <h6 className="mb-2 caption">Preview</h6>
              <div className="scan">
                QR Code
         </div>
         </div>
         <div></div>
         <div></div>
         </div>
        </div>
        </div>
        </div>
              
  );
};

export default QrCode;
