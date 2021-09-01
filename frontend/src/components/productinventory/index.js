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
  const [more, setMore] = useState([]);

  const { products, inventories } = props;
  // console.log(products,"products");
  // console.log(inventories,"inventories");
  const categoryArray = products.map(
        product => product.type,
  ).filter((value, index, self) => self.indexOf(value) === index);

   console.log(inventories);
  useEffect(() => {
    //console.log(props.match);
    if (props.match && props.match.params && props.match.params.category){
      let prodArray = [];
      inventories.map((val) => {
        
        // if(val.payloadData && val.payloadData.data && val.payloadData.data.products && val.payloadData.data.products.length){
        //     val.payloadData.data.products.map((productRecord)=>{
                if(val.products.type==props.match.params?.category){
                  prodArray.push(val);
            //     }
            // })
        }
        
      });
      setData(prodArray);
    }
    else {
      setEnable(false);
      const inv = inventories.filter(r => r.inventoryDetails.quantity <= 0);
      console.log(inv);
      setData(inventories.filter(r =>  r.inventoryDetails.quantity <= 0));
    }
  }, [inventories, props]);
  //console.log("propscategory ",data)

  const changeType = (cat) => {
    setCategory(cat);
      let prodArray = [];
      inventories.map((val)=>{
        // if(val.payloadData.data.products){
            // val.payloadData.data.products.map((productRecord)=>{
                if(val.products.type==cat){
                  prodArray.push(val);
                }
            // })
        // }
        
      });
      setData(prodArray);
    }
    // setData(inventories.filter(r => r.payloadData.data.products[0].type == cat));
  return (
    <div className="productinventory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">{enable ? 'PRODUCT CATEGORY' : 'PRODUCTS OUT OF STOCK'}</h1>
        <div className="d-flex">
        <Link to="/addNewCategory">
            <button className="btn btn-yellow mr-3" style={{position:"relative", top:"-15px"}}>
              <img src={Add} width="13" height="13" className="mr-2 mb-1" />
              <span><b>Add New Category</b></span>
            </button>
          </Link>
        </div>
      </div>
      {enable && 
    <div class="main">
      <div className="row ml-0 flex-nowrap"> 
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
      </div>
        }
      <div className="row">
        <div className="p-2 mt-3 rounded full-width-ribbon">
          <div className="row filter">
            <div className="col-3">
              <img src={Product} width="16" height="16" alt="Product Name" />
              <span className="ml-2 font-small">Product Name</span>
            </div>
            <div className="col-3">
              <img src={Quantity} width="25" height="16" alt="Product Category" />
              <span className="ml-2 font-small">Product Category</span>
            </div>
            <div className="col-3">
              <img src={user} width="16" height="16" alt="Manufacturer" />
              <span className="ml-2 font-small">Manufacturer</span>
            </div>
            <div className="col-2">
              <img src={Quantity} width="25" height="16" alt="Quantity" />
              <span className="ml-2 font-small">Quantity</span>
            </div>
          </div>
        </div>
        {
          console.log(data)
        }
        <div className="ribbon-space col">
          {data.map((inv, i) => 
            <div key={i} className="col mb-3 rounded row bg-white shadow">
              <div className="col-3 txt ">{inv.products.name?inv.products.name:"N/A"}</div>
              <div className="col-3 txt1">{inv.products.type ? inv.products.type:"N/A"}</div>
              <div className="col-2 txt1">{inv.products.manufacturer?inv.products.manufacturer:"N/A"}</div>
              <div className="col-2 txt1 text-right">{inv.inventoryDetails.quantity?inv.inventoryDetails.quantity:"N/A"}{"  ("}{inv.products.unitofMeasure?inv.products.unitofMeasure.name:"N/A"}{")"}</div>
              <div className="col"><button type="button" onClick={() => props.history.push(`/viewproduct`, {data: inv})} className="bttn1-blue blue-primary">Show more</button></div>
              </div>
            // </div>
          )}
          {data?.length === 0 && 
            <div className="col-12 p-3 mb-3 rounded row bg-white shadow">
              <div className="col-12 txt text-center txtBlue">No records found</div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductInventory;
