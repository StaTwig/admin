import React, { useState } from 'react';
import ProductsTable from './products';
import updownArrow from '../../assets/icons/up-and-down-dark.svg';
import './style.scss';
import DropdownButton from '../../shared/dropdownButtonGroup';
import { createPO } from '../../actions/poActions';

const tableHeader = ['Product Name', 'Manufacturer', 'Quantity'];

const PurchaseForm = props => {
  const { user, users } = props;

  const userNames = users.map(usr => usr.name);
  const [deliveryTo, setDeliveryTo] = useState('Thrinethra');
  const [products, setProducts] = useState(['bOPV', 'MMR', 'PVC', 'BCG','RV','Hep B']);
  const [manufacturers, setManufacturers] = useState([
                    'Bharat Biotech',
                  'Aroma Biotech',
                  'Chronly industries',
                  'GH Pharmas',

  ]);

  const [product, setProduct] = useState('Select Product');
  const [manufacturer, setManufacturer] = useState('Select Manufacturer');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const todayDate = new Date().getDate() + '/' + new Date().getMonth() + '/'  +new Date().getFullYear();

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
    debugger;
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
        onQuantityChange={e => setQuantity(e.target.value.replace(/\D/,''))}
      />
      {/* <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/}
      
     <button className="btn btn-primary review" onClick={onReview}>
        REVIEW
      </button>
      <div className="text text-success">{message}</div>
      
      
      </div>

      
  );
};

export default PurchaseForm;
