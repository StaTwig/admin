import React, { useState ,useEffect} from 'react';
import ProductsTable from './products';
import updownArrow from '../../assets/icons/up-and-down-dark.svg';
import './style.scss';
import DropdownButton from '../../shared/dropdownButtonGroup';
import { createPO ,setReviewPos,getProducts,getManufacturers} from '../../actions/poActions';
import { useDispatch,useSelector} from "react-redux";

const tableHeader = ['Product Name', 'Manufacturer', 'Quantity'];

const PurchaseForm = props => {
  const editPo = useSelector(state => {
    return state.editPo;
  });
  const { user, users } = props;

  const userNames = users.map(usr => usr.name);
  const [deliveryTo, setDeliveryTo] = useState(editPo.receiver.name);
  const [sendPOTo, setSendPOTo] = useState(editPo.sendPOTo);
  const [products, setProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [product, setProduct] = useState(Object.keys(editPo.products[0])[0].split('-')[0]);
  const [manufacturer, setManufacturer] = useState(Object.keys(editPo.products[0])[0].split('-')[1]);
  const [quantity, setQuantity] = useState(editPo.products[0][`${product}-${manufacturer}`]);
  const [destination, setDestination] = useState(editPo.destination);
  const [client, setClient] = useState(editPo.client);
  const [message, setMessage] = useState('');
  const month = new Date().getMonth()+1;
  const todayDate = new Date().getDate() + '/' + month + '/'  +new Date().getFullYear();
  const [deliverytoError, setdeliverytoError ] = useState('');
  const [sendPOToError, setSendPOToError ] = useState('');
  const [destinationError, setdestinationError] = useState('');
  const [quantityError, setquantityError] = useState('');
  const [productError, setproductError] = useState('');
  const [manufacturerError, setmanufacturerError] = useState('');
 
  useEffect(() => {
    async function fetchData() {
      const result = await getProducts();
      const manufacturerResult = await getManufacturers();
      const productArray = result.map((product, index) => (
        product.productName
     ))
      setProducts(productArray);
      setManufacturers(manufacturerResult);
    }
    fetchData();
  },[]);

  const onValidate = () => {

if (deliveryTo.length<1||deliveryTo === 'Select Receiver'){
      setdeliverytoError("DeliveryTo must be specified")
      setTimeout(() => {setdeliverytoError('')} , 2000)
    } 

    else if (sendPOTo.length<1||sendPOTo === 'Select'){
      setSendPOToError("Send PO To must be specified")
      setTimeout(() => {setSendPOToError('')} , 2000)
    } 

    
    else if(destination.length<1)
    {
      setdestinationError("Delivery Location must be specified")
      setTimeout(() => {setdestinationError('')} , 2000)
       }
   

    else if(product.length<1||product === 'Select Product'){
      setproductError("Product Name must be Selected")
      setTimeout(() => {setproductError('')} , 2000)
    }
     else if(manufacturer.length<1||manufacturer === 'Select Manufacturer')
     {
      setmanufacturerError("Manufacturer must be selected")
      setTimeout(() => {setmanufacturerError('')} , 2000)
    }
   
    else if(quantity.length<1){
      setquantityError("Quantity must be specified")
      setTimeout(() => {setquantityError('')} , 2000)
    }
    else if(quantity=== '0'){
      setquantityError("Quantity can't be 0")
      setTimeout(() => {setquantityError('')} , 2000)
    }

    else{
     onProceed();
    }
  }
  const dispatch = useDispatch();

  
 

  const onProceed = () =>{
    const deliveryToObject = users.find(usr => usr.name === deliveryTo);
    const sendPOToObject = users.find(usr => usr.name === sendPOTo);
    const productManufacturer = { [`${product}-${manufacturer}`]: quantity };
    const data = {
      data: {
        receiver: deliveryToObject,
        sendpoto: sendPOToObject, 
        supplier: { name: user.name, email: user.email },
        destination,
        client,
        products: [productManufacturer],
        date:todayDate,
      },
    };

    //Store in reducer
    dispatch(setReviewPos(data));
    console.log('new po data', data);

  console.log('clicked');
    //Redirect to review page.
    props.setEditMode(true);
  

    console.log('new po data', data);
    console.log('clicked');

  
    
  }

  const onReview = async () => {
   // const productId = `PO${Math.floor(Math.random() * 90000) + 10000}`;
    const productId = 'PO1805';
    const deliveryToObject = users.find(usr => usr.name === deliveryTo);
    const sendPOToObject = users.find(usr => usr.name === sendPOTo);
    const productManufacturer = { [`${product}-${manufacturer}`]: quantity };
    const data = {
      data: {
        orderID: productId,
        receiver: deliveryToObject,
        sendpoto: sendPOToObject,
        supplier: { name: user.name, email: user.email },
        client,
        destination,
        products: [productManufacturer],
        date:todayDate,
      },
    };

    console.log(data);
    const result = await createPO(data);
    if (result.status === 200) {
      setMessage('Success !');
    }else {
      setMessage('Unable to process , Please Check the Data entered');
    }
  };

  return (
    <div className="purchaseform">
        <p className="date-alignment">Date: {todayDate}</p>
      <div className="d-flex justify-content-between">
      <div className="input-group">
          <label className="reference">Send PO To</label>
          <div className="form-control">
          <DropdownButton
           name={sendPOTo}
            onSelect={item => setSendPOTo(item)}
            groups={userNames}
            className="text"
          />
          </div>
        </div>
        {/* <div className="input-group">
          <label className="reference">Send PO To</label>
          <input
            disabled
            type="text"
            className="form-control"
            placeholder="Select Supplier"
            value={user.name}
          />
         
        </div> */}
        <div className="input-group">
          <label className="reference">Client</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Client"
            value={client}
            onChange={e => setClient(e.target.value)}
          />
         
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Delivery To</label>
          <div className="form-control">
          <DropdownButton
           name={deliveryTo}
            onSelect={item => setDeliveryTo(item)}
            groups={userNames}
            className="text"
          />
          </div>
        </div>
        <div className="input-group">
          <label className="reference">Delivery Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Delivery Location"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
         
        </div>
      </div>
      <hr />
      <ProductsTable
        tableHeader={tableHeader}
        manufacturers={manufacturers}
        products={products}
        onProductSelect={item => setProduct(item)}
        onManufacturerSelect={item => setManufacturer(item)}
        product={product}
        manufacturer={manufacturer}
        quantity={quantity}
        productError={productError}
        manufacturerError={manufacturerError}
        quantityError={quantityError}
        onQuantityChange={e => setQuantity(e.target.value)}
      />
      {/* <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/}
 <hr />
    <div className="d-flex flex-row justify-content-between">
      <div>Total Quantity</div>
        <div className="font-weight-bolder">{quantity}</div>
        <button className="btn btn-orange review" onClick={onValidate}>REVIEW</button>
      </div>
     
      <div className="text text-success">{message}</div>
      <div className="text text-danger">
        
    {deliverytoError}{sendPOToError}{destinationError}{productError}{manufacturerError}{quantityError}
      
      </div>
      
      </div>

      
  );
};

export default PurchaseForm;
