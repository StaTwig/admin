import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { turnOn , turnOff } from '../../actions/spinnerActions';
import { generateCodes } from '../../actions/productActions';
import BarCode from '../../assets/icons/barcode.png';
import Qr from '../../assets/icons/qrcode.png';
import Download from '../../assets/icons/download.png';
import DownloadOrange from '../../assets/icons/downloadorange.png';
import DownloadYellow from '../../assets/icons/downloadyellow.png'
import BarCodeColor from '../../assets/icons/barcodecolor.png'
import QrCodeColor from '../../assets/icons/qrcolor.png'
import './style.scss';

const QrCode = props => {
  const [barvisible,setBarVisible]=useState(false);
  const [qrvisible,setQrVisible]=useState(false);
  const [jpgvisible,setJpgVisible]=useState(true);
  const[pdfvisible,setPdfVisible]=useState(true);
  const [ type, setType ] = useState('barcode');
  const [ limit, setLimit ] = useState('');
  const dispatch = useDispatch();
  const onDownload = async () => {
    dispatch(turnOn());
    const query = { limit, type };
    const result = await generateCodes(query);
    var file = new Blob([result.data], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    dispatch(turnOff());
  }
    return (
    <div className="qrcode">
      <h1 className="breadcrumb">CODE GENERATOR</h1>
      <div className="card outline">
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-column">
              <div className="caption mb-3">Select the type of code</div>
              <div className="d-flex flex-row mb-5">
                  <div className={barvisible? "panel barcodecommon barcodehighlight mr-4" :"panel barcodecommon barcode mr-4"} 
                    onClick={()=>{
                    setBarVisible(!barvisible)
                    setType('barcode')
                  }
                    }>
                <img 
                src={barvisible ? BarCode : BarCodeColor} 
                height="30" width="30" name="Code" 
                className="mb-4 ml-3"
                />
                <div>2D Barcode</div>
                  </div>
                  <div className={qrvisible? "panel barcodecommon qrhighlight" :"panel barcodecommon qr"} 
                  onClick={()=>{
                    setQrVisible(!qrvisible)
                    setType('qrcode')
                  }}>
                  <img src={qrvisible ? Qr:QrCodeColor} height="30" width="30" name="Code" className="mb-4 ml-3"/>
                  <div className="ml-2">QR Code</div>
                </div>
              </div>
              <div className="form-group mb-5">
                <label htmlFor="shipmentId"> Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="product"
                  value={limit}
                  onChange={e => setLimit(e.target.value)}
                  placeholder="Enter Quantity"
                />
              </div>
              <div className="d-flex flex-row mb-5">
               <button className={jpgvisible?"btn btn-orange mr-4 downloadc downloadhi" :"btn btn-orange mr-4 downloadc"}onClick={()=>setJpgVisible(!jpgvisible)}>
                <img src={jpgvisible ? DownloadOrange: Download} width="14" height="14" className="mr-2" />
                <span>JPG</span>
              </button> 
             <button className={pdfvisible?"btn btn-yellow downloadc pdhi":"btn btn-yellow downloadc"} onClick={()=>setPdfVisible(!pdfvisible)}>
                <img src={pdfvisible?DownloadYellow:Download} width="14" height="14" className="mr-2" />
                <span>PDF</span>
              </button>
             </div>
            <div>
                <button className="btn btn-main-blue" onClick={onDownload}>GENERATE CODE</button>
                </div> 
             </div>
             <div className="d-flex flex-column mt-4">
              <h6 className="mb-2 caption">Preview</h6>
              <div className="scan">QR Code</div>
            </div>
            <div />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
