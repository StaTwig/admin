import React,{useState,useEffect } from 'react';
import { getPurchaseStats } from '../../../actions/poActions';

import './style.scss';

const PoTable = props => {
  const [purchases, setPurchases] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const result = await getPurchaseStats();
      setPurchases(result.data.data.reverse());
    }
    fetchData();
  
  },[]);

  return (
    <div className="table">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Manufacturer</div>
          <div className="rTableHead">Order ID</div>
          <div className="rTableHead">Product Name</div>
          <div className="rTableHead">
            <span>Quantity</span>
          </div>
          <div className="rTableHead">
            <span>Order Date</span>
          </div>
          <div className="rTableHead">
            <span>Delivery To</span>
          </div>
          <div className="rTableHead">
            <span>Delivery Location</span>
          </div>
          <div className="rTableHead">
            <span>Status</span>
          </div>
          
        </div>
        <div className="overflow">
          
        {purchases.map((purchase, index) => {
          const p= JSON.parse(purchase.data);
          console.log('o' , p);
          return(<div> 
            <div className="rTableRow" key={index}>
          <div className="rTableCell">
                   <div className="combine-data">
                  {Object.keys(p.products[0])[0].split('-')[1]}
                 </div>
                 </div>
           <div className="rTableCell">{purchase.key}</div>
                <div className="rTableCell">{Object.keys(p.products[0])[0].split('-')[0]}</div>
                 <div className="rTableCell">{p.products[0][`${Object.keys(p.products[0])[0].split('-')[0]}-${Object.keys(p.products[0])[0].split('-')[1]}`]}
                 </div>
                <div className="rTableCell">{p.date}</div>
           <div className="rTableCell">{p.receiver.name}</div>
           <div className="rTableCell">{p.destination}</div>
                 <div className="rTableCell" ><div className="status"><span className="text">Sent</span></div></div>
               </div>
               </div>)
        
})}
       </div>
      </div>
    </div>
  );
};

export default PoTable;