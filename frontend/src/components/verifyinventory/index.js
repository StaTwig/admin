import React ,{useState}from "react";
import {useSelector} from "react-redux";
import Pen from "../../assets/icons/pen.svg";
import {addInventory} from "../../actions/inventoryActions";
import Modal from '../../shared/modal';
import InventoryPopUp from './inventorypopup';
import './style.scss';


const VerifyInventory = (props) => {
    const reviewInventory = useSelector(state => {
        return state.reviewInventory;
      
      });

      const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const closeModal = () => {
    props.history.push('/inventory');
  };

      const onAssign = async () => {
        console.log('clicked');
        console.log('review inventory data', reviewInventory);
        const data = reviewInventory;
        const result = await addInventory({ data });
        console.log(result);
      
        if (result.status != 400) {
          setOpenCreatedInventory(true);
        }
        };
      
        const onEdit= () => {
          props.history.push('/newinventory');
        }; 
     
  return (
    <div className="verifyinventory">
     <div className="d-flex flex-row justify-content-between">
      <h1 className="breadcrumb">REVIEW INVENTORY</h1>
      <button type="button" className="btn btn-outline-info">Export</button>
      </div>
    <div className="card">
            <div className="card-body">
         <h5 className="head">Description Of Goods </h5>
         <div className="d-flex flex-row justify-content-between">
              <ul>
             <li className="bold">Product Name</li>
             <li>{reviewInventory.productName}</li>
             </ul>
             <ul>
             <li className="bold">Manufacturer</li>
               <li>{reviewInventory.manufacturerName}</li>
              </ul>
             <ul>
             <li className="bold">Quantity</li>
             <li>{reviewInventory.quantity}</li>
             </ul>
             <ul>
             <li className="bold">Manufacturer Date</li>
             <li>{reviewInventory.manufacturingDate}</li>
             </ul>
             <ul>
             <li className="bold">Expiry Date</li>
             <li>{reviewInventory.expiryDate}</li>
             </ul>
             <ul>
             <li className="bold">Batch Number</li>
                 <li>{reviewInventory.batchNumber}</li>
             </ul>
             <ul>
             <li className="bold"> Serial Numbers Range</li>
             <li>{reviewInventory.serialNumber}</li>
             </ul>
          </div>
          <hr />
      <div className="d-flex justify-content-between">
      <div className="total">Total</div>
      <div className="value">{reviewInventory.quantity}</div>
      <div className="d-flex flex-row">
         <button className="btn-primary btn mr-2" onClick={onEdit}><img src={Pen} width='15' height='15' className="mr-3" />
                               <span>EDIT</span>
                                   </button>
      <button className="btn-primary btn" onClick={onAssign}>ADD INVENTORY</button>

      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <InventoryPopUp onHide={closeModal} //FailurePopUp
          
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

export default VerifyInventory;

