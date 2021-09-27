import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DropdownButton from '../../../shared/dropdownButtonGroup';
import Order from '../../../assets/icons/order.svg';
import './style.scss';
import { createShippingOrderUrl } from '../../../actions/shippingOrderAction';
import Modal from '../../../shared/modal';
import { getWarehouseByOrgId } from '../../../actions/productActions';
import AlertModal from './alertModal';


const CreateShippingOrder = (props) => {
  const [wareHouseId, setWareHouseId] = useState('Select Warehouse ID');
  const [wareHouseIds, setWareHouseIds] = useState([]);
  const [wareHouseLocation, setWareHouseLocation] = useState('');
  const [products, setProducts] = useState(props.purchaseOrder.products);
  const[warehouses,setWareHouses]= useState({})
  const [openCreatedShipping,setOpenCreatedShipping]=useState(false)
  const [ modalProps, setModalProps ] = useState({});
  const [ message, setMessage ] = useState('');
  const profile = useSelector(state => {
    return state.user;
  });

  const closeModal =  () => {
    //setOpenCreatedShipping(false)
    props.history.push('/shipments')
  }
  let totalQuantity = 0;
  props.purchaseOrder.products.forEach(product => totalQuantity += parseInt(product.productQuantity));

  useEffect(() => {
    async function fetchData() {
      const result = await getWarehouseByOrgId(props.purchaseOrder.suppplierOrgID);
     const ids = result.data.map( item => item.id);
      setWareHouseIds(ids);
      setWareHouses(result.data);
     
    }
    fetchData();
  }, []);
  
const onQuantityChange = (e,index) => {
const productsClone = [...products];
productsClone[index].productQuantity = e.target.value;
setProducts(productsClone);
  
}
  const onCreateShippingOrder = async () => {
    const isoDate = new Date().toISOString();
    const data = {
        soPurchaseOrderId: props.purchaseOrder.purchaseOrderID,
        soUpdatedOn: isoDate,
        soAssignedTo: {warehouseId:wareHouseId,warehouseLocation:wareHouseLocation},
        products
    }
    console.log('data', data);
    const result = await createShippingOrderUrl(data);
    setOpenCreatedShipping(true);
    if (result.status === 200) {
      setMessage(result.data.message);
      setModalProps({
        message: 'Created Successfully!',
        type: 'Success'
      })
    }
else {
      setMessage(result.data.message)
      setModalProps({
        message: result.data.message,
        type: 'Failure'
      })
    }
  };



  const month = new Date().getMonth() + 1;
  const todayDate =
    new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
  return (
    <div className="createshipping">
      <p className="date-alignment mr-5">Date: {todayDate}</p>
      <div className="d-flex flex-row ml-4 mb-5 mr-5">
        <div className="input-group">
          <label className="reference ">Warehouse ID</label>
          <div className="form-control">
            <DropdownButton
              name={wareHouseId}
              onSelect={item => { setWareHouseId(item); const location =  warehouses.find(w => w.id === item).postalAddress; setWareHouseLocation(location)  }}
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
            disabled
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
          {products.map((product,i) =>{

             return(
            <tr>
            <th scope="row">
              <div className="square-box" />
            </th>
            <td>{product.productID}</td>
            <td>{product.productName}</td>
            <td>{product.manufacturer}</td>
           
            <td><input
              type="text"
              className="form-controler"
              name="quantity"
              placeholder="Quantity"
              value={product.productQuantity}
              onChange={e => onQuantityChange(e,i)}

            /></td>
            
          
          </tr>)
 } )}
        </tbody>
      </table>
      {openCreatedShipping && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <AlertModal
            onHide={closeModal}
            {...modalProps}
            {...props}
          />
        </Modal>
      )}
      <hr />
      <div className="d-flex justify-content-end">
        <div className="d-flex flex-column mr-5">
          <span>Total Quantity</span>
          <h3 className="text-info">{totalQuantity}</h3>
        </div>
      </div>
      <button
        className="btn btn-orange fontSize20 font-bold mr-2 float-right" onClick={onCreateShippingOrder}

      >
        <img src={Order} width="14" height="14" className="mr-2" />
        <span>Create Shipping Order</span>
      </button>
    </div>

  );
}

export default CreateShippingOrder;