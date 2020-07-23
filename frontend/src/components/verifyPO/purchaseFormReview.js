import React,{useState} from "react";
import ProductsTableReview from './productsReview';
import {useSelector, useDispatch} from "react-redux";
import { createPO,setEditPos,resetEditPos} from '../../actions/poActions';
import Pen from "../../assets/icons/po.svg";
import Modal from '../../shared/modal';
import PoPopUp from './poPopUp';
import './style.scss';



const tableHeader = ['Product Name', 'Manufacturer', 'Quantity'];

const PurchaseFormReview = props => {
  const dispatch= useDispatch();
  const month = new Date().getMonth()+1;
  const todayDate = new Date().getDate() + '/' + month + '/'  +new Date().getFullYear();
  const [openCreatedPo, setOpenCreatedPo] = useState(false);
  const [productID, setProductID] = useState('');

    const reviewPo = useSelector(state => {
        return state.reviewPo;
      
      });
     

      const closeModal = () => {
        props.setEditMode(false);
      };
    
      const onEdit = () => {
        dispatch(setEditPos(reviewPo));
        props.setEditMode(true);
      };
    
          
            

  const onAssign = async () => {
    const data = reviewPo;
    console.log('data', data)
    const result = await createPO(data);
    console.log('result', result);
    setProductID(result.data.orderID)
    if (result.status != 400) {
      dispatch(resetEditPos());
      setOpenCreatedPo(true);
 }
    }
  return (
    <div className="purchaseform">
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Supplier</label>
          <input
            disabled
            type="text"
            className="form-control"
            placeholder="Select Supplier"
            value={reviewPo.data.supplier.name}
          />
         
        </div>
        <p>Date: {todayDate}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Delivery To</label>
        
          <input
          disabled
           type="text"
           className="form-control"
           placeholder="Select Supplier"
           value={reviewPo.data.receiver.name}
           
          />
      
        </div>
        <div className="input-group">
          <label className="reference">Delivery Location</label>
          <input
          disabled
            type="text"
            className="form-control"
            placeholder="Enter Delivery Location"
            value={reviewPo.data.destination}
    
          />
         
        </div>
      </div>
      <hr />
      <ProductsTableReview
        tableHeader={tableHeader}
        products={reviewPo.data.products}
      />
      {/* <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/}


    
      
     <button className="btn btn-orange review " onClick={onAssign} >
        CREATE
      </button>

      <button className="btn edit mr-4" onClick={onEdit}><img src={Pen} width='15' height='15' className=" mr-2" />
                               <span>EDIT</span>
                                   </button>
 
      {openCreatedPo && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <PoPopUp onHide={closeModal}  productID={productID}//FailurePopUp
          
          />
        </Modal>
      )}
    
      
      </div>

      
  );
};

export default PurchaseFormReview;
