import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import TotalInventoryAdded from '../../assets/icons/TotalInventoryAddedcopy.svg';
import Add from '../../assets/icons/add.svg';
import user from '../../assets/icons/brand.svg';
import Quantity from '../../assets/icons/Quantity.png';
import Product from '../../assets/icons/Producttype.png';

const ProductInventory = props => {
  const [category, setCategory] = useState(props.match.params?.category);
  const [data, setData] = useState([]);
  const [enable, setEnable] = useState(true);
  const { products, inventories } = props;
  console.log(products,"products");
  console.log(inventories,"inventories");
  const categoryArray = products.map(
        product => product.type,
  ).filter((value, index, self) => self.indexOf(value) === index);
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.category){
      let prodArray = [];
      inventories.map((val)=>{
        if(val.payloadData && val.payloadData.data && val.payloadData.data.products && val.payloadData.data.products.length){
            val.payloadData.data.products.map((productRecord)=>{
                if(productRecord.type==props.match.params?.category){
                  prodArray.push(productRecord);
                }
            })
        }
        
      });
      setData(prodArray);
    }
    // else {
    //   setEnable(false);
    //   setData(inventories.filter(r => r.inventoryQuantity <= 0));
    // }
  }, [props]);

  const changeType = (cat) => {
    setCategory(cat);
      let prodArray = [];
      inventories.map((val)=>{
        if(val.payloadData.data.products){
            val.payloadData.data.products.map((productRecord)=>{
                if(productRecord.type==cat){
                  prodArray.push(productRecord);
                }
            })
        }
        
      });
      setData(prodArray);
    }
    // setData(inventories.filter(r => r.payloadData.data.products[0].type == cat));
  return (
    <div className="productinventory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">{enable ? 'PRODUCT CATEGORY' : 'PRODUCTS OUT OF STOCK'}</h1>
        <div className="d-flex">
          <Link to="/newinventory">
            <button className="btn btn-yellow">
              <img src={Add} width="13" height="13" className="mr-2" />
              <span>Add New Category</span>
            </button>
          </Link>
        </div>
      </div>
      {enable && 
      <div className="row mb-4">
        {categoryArray.map(cat => 
          <div className={`panel m-2 ${category == cat && `active`}`} onClick={() => changeType(cat)}>
            <div className="flex flex-column">
              <div className=" picture truck-bg">
                <img src={TotalInventoryAdded} alt="truck" />
              </div>
              <div className="pt-3 flex" >{cat}</div>
            </div>
          </div>
        )}
      </div>
      }
      <div className="row">
        <div className=" p-2 rounded full-width-ribbon">
          <div className=" row filter">
            <div className="col-3">
              <img src={Product} width="24" height="24" alt="Product Name" />
              <span className="ml-2 font-small">Product Name</span>
            </div>
            <div className="col-3">
              <img src={Quantity} width="35" height="24" alt="Product Category" />
              <span className="ml-2 font-small">Product Category</span>
            </div>
            <div className="col-3">
              <img src={user} width="16" height="24" alt="Manufacturer" />
              <span className="ml-2 font-small">Manufacturer</span>
            </div>
            <div className="col-3">
              <img src={Quantity} width="35" height="24" alt="Quantity" />
              <span className="ml-2 font-small">Quantity</span>
            </div>
          </div>
        </div>
        <div className="ribbon-space col-12">
          {data.map((inv, i) => 
            <div key={i} className="col-12 p-3 mb-3 rounded row bg-white shadow">
              <div className="col-3 txt txtBlue">{inv.name?inv.name:"N/A"}</div>
              <div className="col-3 txt ">{inv.type ? inv.type:"N/A"}</div>
              <div className="col-3 txt ">{inv.manufacturer?inv.manufacturer:"N/A"}</div>
              <div className="col-3 txt ">{inv.quantity?inv.quantity:"N/A"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInventory;
