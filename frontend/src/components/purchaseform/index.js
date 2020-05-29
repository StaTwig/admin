import React, { useState } from 'react';
import ProductsTable from './products';
import updownArrow from '../../assets/icons/up-and-down-dark.svg';
import './style.scss';
import DropdownButton from '../../shared/dropdownButtonGroup';
import { createPO ,setReviewPos} from '../../actions/poActions';
import { useDispatch} from "react-redux";





const tableHeader = ['Product Name', 'Manufacturer', 'Quantity'];

const PurchaseForm = props => {
  const { user, users } = props;

  const userNames = users.map(usr => usr.name);
  const [deliveryTo, setDeliveryTo] = useState('select receiver');
  const [products, setProducts] = useState(['bOPV', 'MMR', 'PVC', 'BCG','RV','Hep B']);
  const [manufacturers, setManufacturers] = useState([
                    'Bharat Biotech',
                  'Aroma Biotech',
                  'Chronly industries',
                  'GH Pharmas',

  ]);

  const [product, setProduct] = useState('select product');
  const [manufacturer, setManufacturer] = useState('select manufacturer');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const month = new Date().getMonth()+1;
  const todayDate = new Date().getDate() + '/' + month + '/'  +new Date().getFullYear();
  const [deliverytoError, setdeliverytoError ] = useState('');
  const [destinationError, setdestinationError] = useState('');
  const [quantityError, setquantityError] = useState('');
  const [productError, setproductError] = useState('');
  const [manufacturerError, setmanufacturerError] = useState('');
 
  
  const onValidate = () => {

if (deliveryTo.length<1){
      setdeliverytoError("DeliveryTo must be specified")
      setTimeout(() => {setdeliverytoError('')} , 2000)
    } 
   
    else if(destination.length<1)
    {
      setdestinationError("Delivery Location must be specified")
      setTimeout(() => {setdestinationError('')} , 2000)
       }
   

    else if(product.length<1||product === 'select product'){
      setproductError("Product Name must be Selected")
      setTimeout(() => {setproductError('')} , 2000)
    }
     else if(manufacturer.length<1||manufacturer === 'select manufacturer')
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

  var numbers = [0,1,2,3,4,5,6,7,8,9];

const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


  const onProceed = () =>{
    const productId = 'PO'+ shuffleArray(numbers).slice(0,4).join('');
    console.log(productId);
    const deliveryToObject = users.find(usr => usr.name === deliveryTo);
    const productManufacturer = { [`${product}-${manufacturer}`]: quantity };
    const data = {
      data: {
        orderID: productId,
        receiver: deliveryToObject,
        supplier: { name: user.name, email: user.email },
        destination,
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
    const productManufacturer = { [`${product}-${manufacturer}`]: quantity };
    const data = {
      data: {
        orderID: productId,
        receiver: deliveryToObject,
        supplier: { name: user.name, email: user.email },
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
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Supplier</label>
          <input
            disabled
            type="text"
            className="form-control"
            placeholder="Select Supplier"
            value={user.name}
          />
         
        </div>
        <p>Date: {todayDate}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Delivery To</label>
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
          <label htmlFor="shipmentId">Delivery Location</label>
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
      
     <button className="btn btn-orange review" onClick={onValidate}>
        REVIEW
      </button>
      <div className="text text-success">{message}</div>
      <div className="text text-primary">
        
      {deliverytoError}{destinationError}{productError}{manufacturerError}{quantityError}
      
      </div>
      
      </div>

      
  );
};

export default PurchaseForm;
