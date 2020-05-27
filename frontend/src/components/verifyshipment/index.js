import React ,{useState}from "react";
import Pen from "../../assets/icons/pen.svg";
import {useSelector} from "react-redux";
import { createShipment} from '../../actions/shipmentActions';
import Modal from '../../shared/modal';
import ShipmentPopUp from './shipmentpopup';
import './style.scss';

const VerifyShipment = () => {
  //const [message, setMessage] = useState('');
  //const [errorMessage, setErrorMessage] = useState('');
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const closeModal = () => {
    setOpenCreatedInventory(false);
  };

   const reviewShipment = useSelector(state => {
    return state.reviewShipment;
  });

  /*const onEdit = ()=>{
    props.history.push('/newshipment');
  }

  console.log('review shipment data', reviewShipment);*/
  const onAssign = async () => {
  console.log('clicked');
  console.log('review shipment data', reviewShipment);
  const data = reviewShipment;
  const result = await createShipment({ data });
  console.log(result);

  if (result.status != 400) {
    setOpenCreatedInventory(true);
  }
  };

  return (
    <div className="verifyshipment">
     <div className="d-flex flex-row justify-content-between">
      <h1 className="breadcrumb">REVIEW SHIPMENTS</h1>
      <button type="button" className="btn btn-outline-info">Export</button>
      </div>
    <div className="card">
            <div className="card-body">
            <h5 className="head">Shipment Details</h5>
            <div className="d-flex flex-row">
            <div className="row mr-auto">
             <ul>
             <li>Shipment Number</li>
             <li>Client Name</li>
             </ul>
              <ul>
             <li>{reviewShipment.shipmentId}</li>
             <li>{reviewShipment.client}</li>
             </ul>
             </div>
         <div className="row mr-auto">
             <ul>
             <li>Supplier</li>
             <li>Supplier Location</li>
             <li>Supplier Date</li>
             </ul>
             <ul>
             <li>{reviewShipment.supplier}</li>
             <li>{reviewShipment.supplierLocation}</li>
             <li>{reviewShipment.shipmentDate}</li>
             </ul>
             </div>
          <div className="row mr-auto">
             <ul>
             <li>Delivery To</li>
             <li>Delivery Location</li>
             <li>Delivery Date</li>
            </ul>
             <ul>
             <li>{reviewShipment.deliveryTo}</li>
             <li>{reviewShipment.deliveryLocation}</li>
             <li>{reviewShipment.estimateDeliveryDate}</li>
             </ul>
             </div>
             </div>
         <h5 className="head">Description Of Goods </h5>
         <div className="d-flex flex-row justify-content-between">
              <ul>
             <li>Product Name</li>
             <li>{reviewShipment.products[0].productName}</li>
             </ul>
             <ul>
             <li>Manufacturer</li>
             <li>{reviewShipment.products[0].manufacturerName}</li>
              </ul>
             <ul>
             <li>Quantity</li>
             <li> {reviewShipment.products[0].quantity}</li>
             </ul>
             <ul>
             <li>Manufacturer Date</li>
             <li>{reviewShipment.products[0].manufacturingDate}</li>
             </ul>
             <ul>
             <li>Expiry Date</li>
             <li>{reviewShipment.products[0].expiryDate}</li>
             </ul>
             <ul>
             <li>Batch Number</li>
             <li>{reviewShipment.products[0].batchNumber}</li>
             </ul>
             <ul>
             <li>Serial Numbers Range</li>
             <li>{reviewShipment.products[0].serialNumber}</li>
             </ul>
          </div>
          <hr />
      <div className="d-flex justify-content-between">
      <div className="total">Total</div>
      <div className="value">Quantity</div>
      <div className="d-flex flex-row">
         <button className="btn-primary btn mr-2" ><img src={Pen} width='15' height='15' className="mr-3" />
                               <span>EDIT</span>
                                   </button>
      <button className="btn-primary btn" onClick={onAssign}>SEND</button>
      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentPopUp onHide={closeModal} //FailurePopUp
          
          />
        </Modal>
      )}
      
      </div>
      </div>
    </div>
    </div>
    </div>
   
   
  );
};

export default VerifyShipment;
/*{message && <div className="alert alert-success">{message}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}*/
