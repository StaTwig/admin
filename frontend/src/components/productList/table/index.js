import React, { useState} from 'react';
import Ungrouped from '../ungrouped.js'
import './style.scss'
const Table = props => {
  const [ batch, setBatch] = useState('');
  return (
    <div className="producttable">
      <div className="rTable">
        <div className="overflow">
          {props.inventories.map((inventory,index) => (
            <div>
              <div className="rTableRow">
              <div className="rTableCell">
                <div className="combine-data">
                 {inventory.productName}
                 
                </div>
              </div>
              <div className="rTableCell ml-5">{inventory.manufacturerName}</div>
              <div className="rTableCell ml-5">{inventory.batchNumber}</div>
              <div className="rTableCell font-weight-bold ml-5">{inventory.quantity}</div>
              <div className="rTableCell ml-5">{inventory.createdAt.substring(8,10)+"/"+inventory.createdAt.substring(5,7)+"/"+inventory.createdAt.substring(0,4)}</div>
            <div className="rTableCell ml-5">{inventory.manufacturingDate.substring(5,7)+"/"+inventory.manufacturingDate.substring(0,4)}</div>
          <div className="rTableCell">{inventory.expiryDate.substring(5,7)+"/"+inventory.expiryDate.substring(0,4)}</div>
              <div className="rTableCell">{batch === inventory.batchNumber?<button className="btn btn-outline-info fontSize200 dod" 
              onClick = {()=>{
                setBatch('')
                  }}
            >SHOW LESS</button>:<button className="btn btn-outline-info fontSize200 enlarge" 
             onClick = {()=>{
              setBatch(inventory.batchNumber)
                }}>SHOW MORE</button>}
      
            </div>
            </div>
            {batch === inventory.batchNumber && <Ungrouped batch = {batch} {...props}/> }
            </div>
            
            
          ))}
        
        </div>
      </div>
    </div>
  );
};

export default Table;

/*   <button type="button" class="btn btn-outline-primary">SHOW MORE</button>*/
