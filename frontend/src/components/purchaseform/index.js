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
  const [products, setProducts] = useState(['bOPV', 'MMR', 'Hib', 'Hep B']);
  const [manufacturers, setManufacturers] = useState([
    'Manufacturer A',
    'Manufacturer D',
    'Manufacturer C',
    'Manufacturer D',
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
      setMessage('Success');
    }else {
      setMessage('Error');
    }
  };
  return (
    <div className="purchaseform">
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Supplier</label>
          <input
            type="text"
            className="form-control"
            placeholder="Select Supplier"
            value={user.name}
          />
          <div className="input-group-append">
            <img src={updownArrow} alt="downarrow" width="16" height="16" />
          </div>
        </div>
        <p>Date: {todayDate}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Delivery To</label>
          <DropdownButton
            name={deliveryTo}
            onSelect={item => setDeliveryTo(item)}
            groups={userNames}
          />
          <div className="input-group-append">
            <img src={updownArrow} alt="downarrow" width="16" height="16" />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="shipmentId">Delivery Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Select Delivery Location"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
          <div className="input-group-append">
            <img src={updownArrow} alt="downarrow" width="16" height="16" />
          </div>
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
        onQuantityChange={e => setQuantity(e.target.value)}
      />
      {/* <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/}
      <button className="btn btn-primary" onClick={onReview}>
        REVIEW
      </button>
      <label className="text text-success">{message}</label>
    </div>
  );
};

export default PurchaseForm;
